<?php
/**
 * El-Bethel admin panel — JSON API used by admin.js.
 *   POST ?action=login     {username, password}
 *   POST ?action=logout
 *   GET  ?action=load      → {defaults, content, backups}
 *   POST ?action=save      {content}
 *   POST ?action=upload    multipart "image"
 *   POST ?action=restore   {name}
 */
define('EB_ADMIN', true);
require __DIR__ . '/lib.php';

send_security_headers();
start_session();

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

function body_json() {
    $raw = file_get_contents('php://input');
    if (strlen($raw) > 512 * 1024) fail('Request too large.', 413);
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function list_backups() {
    $files = glob(BACKUP_DIR . '/*.json') ?: [];
    rsort($files);
    $out = [];
    foreach ($files as $f) {
        $name = basename($f);
        $ts = DateTime::createFromFormat('Ymd-His', substr($name, 0, 15));
        $out[] = ['name' => $name, 'date' => $ts ? $ts->format('c') : null, 'restore' => strpos($name, 'restore') !== false, 'original' => strpos($name, 'original') !== false];
    }
    return $out;
}

if (!is_configured()) fail('The admin panel is not set up yet. Please contact ' . SUPPORT_NAME . '.', 503);

switch ($action) {

case 'login':
    if ($method !== 'POST') fail('Method not allowed', 405);
    require_csrf();
    ensure_dirs();
    if (login_locked()) fail('Too many attempts. Please wait 15 minutes and try again.', 429);
    $b = body_json();
    $user = is_string($b['username'] ?? null) ? trim($b['username']) : '';
    $pass = is_string($b['password'] ?? null) ? $b['password'] : '';
    $okUser = hash_equals(strtolower(ADMIN_USER), strtolower($user));
    $okPass = password_verify($pass, ADMIN_PASSWORD_HASH);
    if (!$okUser || !$okPass) {
        record_failed_login();
        usleep(400000);
        fail('Wrong username or password.', 401);
    }
    clear_failed_logins();
    session_regenerate_id(true);
    $_SESSION['user'] = ADMIN_USER;
    $_SESSION['last'] = time();
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
    json_out(['ok' => true, 'csrf' => $_SESSION['csrf']]);

case 'logout':
    if ($method !== 'POST') fail('Method not allowed', 405);
    require_csrf();
    $_SESSION = [];
    session_regenerate_id(true);
    json_out(['ok' => true]);

case 'load':
    require_login();
    ensure_dirs();
    json_out([
        'ok'       => true,
        'defaults' => read_json_file(DEFAULTS_FILE),
        'content'  => read_json_file(CONTENT_FILE),
        'backups'  => list_backups(),
    ]);

case 'save':
    if ($method !== 'POST') fail('Method not allowed', 405);
    require_login();
    require_csrf();
    ensure_dirs();
    $b = body_json();
    $clean = sanitize_content($b['content'] ?? null);

    // If the popup changed, give it a new id so every visitor sees it again,
    // even those who closed the previous one.
    $prev = read_json_file(CONTENT_FILE) ?: read_json_file(DEFAULTS_FILE);
    $prevPopup = $prev['announcement'] ?? [];
    $a = $clean['announcement']; $p = $prevPopup;
    unset($a['id'], $p['id'], $p['delayMs'], $a['delayMs']);
    if (isset($p['cta']['external'])) unset($p['cta']['external']);
    foreach ($p as $k => $v) if ($v === null) $p[$k] = '';
    ksort($a); ksort($p);
    $clean['announcement']['id'] = (json_encode($a) !== json_encode($p) || empty($prevPopup['id']))
        ? 'popup-' . date('YmdHis')
        : $prevPopup['id'];

    $saved = save_content($clean);
    json_out(['ok' => true, 'content' => $saved, 'backups' => list_backups()]);

case 'upload':
    if ($method !== 'POST') fail('Method not allowed', 405);
    require_login();
    require_csrf();
    ensure_dirs();
    json_out(['ok' => true, 'path' => handle_upload($_FILES['image'] ?? null)]);

case 'restore':
    if ($method !== 'POST') fail('Method not allowed', 405);
    require_login();
    require_csrf();
    ensure_dirs();
    $name = basename((string)(body_json()['name'] ?? ''));
    if (!preg_match('/^\d{8}-\d{6}-[a-z]*\.json$/', $name) || !is_file(BACKUP_DIR . '/' . $name)) fail('This version no longer exists.');
    $data = read_json_file(BACKUP_DIR . '/' . $name);
    if (!$data) fail('This version is damaged and cannot be restored.');
    $clean = sanitize_content($data);
    $clean['announcement']['id'] = $data['announcement']['id'] ?? ('popup-' . date('YmdHis'));
    $saved = save_content($clean, 'restore');
    json_out(['ok' => true, 'content' => $saved, 'backups' => list_backups()]);

default:
    fail('Unknown action', 404);
}
