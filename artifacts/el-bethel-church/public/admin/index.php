<?php
define('EB_ADMIN', true);
require __DIR__ . '/lib.php';
send_security_headers();
header('X-Frame-Options: DENY');
start_session();
$configured = is_configured();
$logged = $configured && is_logged_in();
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="csrf" content="<?= htmlspecialchars($_SESSION['csrf'], ENT_QUOTES) ?>">
<title>El-Bethel website editor</title>
<link rel="icon" href="/favicon.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="admin.css?v=2">
</head>
<body class="<?= $logged ? 'is-app' : 'is-gate' ?>">

<?php if (!$configured): ?>
  <main class="gate">
    <img src="/images/logo.jpg" alt="" class="gate-logo">
    <h1>Website editor</h1>
    <p class="gate-note">The editor is not switched on yet. Please contact <?= htmlspecialchars(SUPPORT_NAME) ?>.</p>
  </main>

<?php elseif (!$logged): ?>
  <main class="gate">
    <img src="/images/logo.jpg" alt="" class="gate-logo">
    <h1>Website editor</h1>
    <p class="gate-note">Sign in to update photos, the popup and the scrolling banner on ebchristianfellowship.org.</p>
    <form id="login" class="gate-form" novalidate>
      <label>Username <input name="username" autocomplete="username" required autofocus></label>
      <label>Password <input name="password" type="password" autocomplete="current-password" required></label>
      <p class="form-error" role="alert" hidden></p>
      <button type="submit" class="btn btn-gold btn-wide">Sign in</button>
    </form>
  </main>

<?php else: ?>
  <header class="topbar">
    <a class="brand" href="/admin/">
      <img src="/images/logo.jpg" alt="">
      <span>El-Bethel<small>Website editor</small></span>
    </a>
    <nav class="topbar-actions">
      <a class="btn btn-ghost" href="/" target="_blank" rel="noopener">Open the website</a>
      <button class="btn btn-ghost" id="logout" type="button">Sign out</button>
    </nav>
  </header>

  <div class="layout">
    <nav class="sections" id="sections" aria-label="What would you like to change?"></nav>
    <main class="editor" id="editor" tabindex="-1">
      <p class="loading">Loading…</p>
    </main>
  </div>

  <aside class="help">
    <strong>Need something bigger?</strong>
    New pages, sermons, events, layout or colours are handled by <?= htmlspecialchars(SUPPORT_NAME) ?><?= SUPPORT_CONTACT !== '' ? ' (' . htmlspecialchars(SUPPORT_CONTACT) . ')' : '' ?>.
  </aside>

  <div class="savebar is-clean" id="savebar">
    <span id="savebar-text">Everything is published</span>
    <div>
      <button type="button" class="btn btn-ghost" id="discard" hidden>Undo changes</button>
      <button type="button" class="btn btn-gold" id="save" disabled>Publish changes</button>
    </div>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite" hidden></div>
<?php endif; ?>

<?php if ($configured): ?><script src="admin.js?v=2"></script><?php endif; ?>
</body>
</html>
