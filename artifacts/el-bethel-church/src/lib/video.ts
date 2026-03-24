/**
 * video.ts — Platform detection & URL normalisation for sermon embeds.
 *
 * Supported platforms: YouTube, Facebook
 * Add new platforms here; the VideoPlayer component reads from this module.
 */

export type VideoPlatform = "youtube" | "facebook" | "unknown";

export interface VideoEmbed {
  platform: VideoPlatform;
  /** Ready-to-use iframe src, or null if the URL cannot be embedded. */
  embedUrl: string | null;
  originalUrl: string;
}

// ── YouTube ──────────────────────────────────────────────────────────────────

/**
 * Extracts the YouTube video ID from any common URL shape:
 *   - youtube.com/watch?v=ID
 *   - youtu.be/ID
 *   - youtube.com/embed/ID
 */
function extractYouTubeId(url: string): string | null {
  // watch?v=ID (also handles &v= inside longer query strings)
  let m = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  // youtu.be/ID
  m = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  // youtube.com/embed/ID
  m = url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  return null;
}

// ── Platform detection ────────────────────────────────────────────────────────

export function detectPlatform(url: string): VideoPlatform {
  if (!url) return "unknown";
  if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
  if (/facebook\.com|fb\.watch/.test(url)) return "facebook";
  return "unknown";
}

// ── Embed URL resolver ────────────────────────────────────────────────────────

/**
 * Resolves any video URL to an embeddable iframe src.
 * Pass `platform` to override auto-detection (rarely needed).
 *
 * Returns `embedUrl: null` when the URL is invalid or unrecognised —
 * the VideoPlayer component shows a polished fallback in that case.
 */
export function resolveEmbed(
  url: string,
  platform?: VideoPlatform,
): VideoEmbed {
  const p: VideoPlatform = platform ?? detectPlatform(url);

  if (p === "youtube") {
    const id = extractYouTubeId(url);
    return {
      platform: "youtube",
      embedUrl: id
        ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
        : null,
      originalUrl: url,
    };
  }

  if (p === "facebook") {
    // Facebook embeds use their /plugins/video.php proxy.
    // The video must be public; private/friends-only videos will show an error
    // inside the iframe, which the VideoPlayer handles with a graceful fallback.
    const embedUrl =
      `https://www.facebook.com/plugins/video.php` +
      `?href=${encodeURIComponent(url)}` +
      `&show_text=false&width=720&autoplay=false`;
    return { platform: "facebook", embedUrl, originalUrl: url };
  }

  return { platform: "unknown", embedUrl: null, originalUrl: url };
}
