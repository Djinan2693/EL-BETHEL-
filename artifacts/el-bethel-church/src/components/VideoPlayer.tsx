/**
 * VideoPlayer.tsx
 *
 * Renders a responsive video embed for YouTube or Facebook sermons.
 * Falls back gracefully when the URL is invalid, unembeddable, or unknown.
 *
 * Usage:
 *   <VideoPlayer videoUrl={sermon.videoUrl} videoPlatform={sermon.videoPlatform} title={sermon.title} />
 */

import { useState } from "react";
import { ExternalLink, PlayCircle, Video } from "lucide-react";
import { resolveEmbed, VideoPlatform } from "@/lib/video";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  videoUrl: string;
  videoPlatform?: VideoPlatform;
  title: string;
  /** Optional label shown below the video (e.g. "Ps. John · March 2025") */
  subtitle?: string;
}

export function VideoPlayer({ videoUrl, videoPlatform, title, subtitle }: VideoPlayerProps) {
  const embed = resolveEmbed(videoUrl, videoPlatform);
  const [fbError, setFbError] = useState(false);

  // ── YouTube — direct iframe, always reliable ────────────────────────────────
  if (embed.platform === "youtube" && embed.embedUrl) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl shadow-primary/20">
        <iframe
          src={embed.embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    );
  }

  // ── Facebook — iframe with error-state fallback ─────────────────────────────
  if (embed.platform === "facebook" && embed.embedUrl && !fbError) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl shadow-primary/20">
        <iframe
          src={embed.embedUrl}
          title={title}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          scrolling="no"
          className="absolute inset-0 w-full h-full border-0"
          onError={() => setFbError(true)}
        />
      </div>
    );
  }

  // ── Facebook fallback (embedding failed or URL not embeddable) ──────────────
  if (embed.platform === "facebook") {
    return (
      <FacebookFallback url={embed.originalUrl} title={title} subtitle={subtitle} />
    );
  }

  // ── No valid URL yet — polished "coming soon" placeholder ───────────────────
  return <VideoPlaceholder title={title} subtitle={subtitle} />;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FacebookFallback({
  url, title, subtitle,
}: { url: string; title: string; subtitle?: string }) {
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-primary shadow-2xl shadow-primary/20 flex flex-col items-center justify-center gap-5 p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-[#1877F2]/20" />
      <div className="relative z-10 flex flex-col items-center text-center gap-4 max-w-md">
        <div className="w-16 h-16 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/40 flex items-center justify-center">
          <Video size={28} className="text-[#1877F2]" aria-hidden="true" />
        </div>
        <div>
          <p className="text-secondary text-[11px] font-bold uppercase tracking-widest mb-2">
            Facebook Video
          </p>
          <p className="text-white font-serif font-bold text-lg md:text-xl leading-snug mb-1">
            {title}
          </p>
          {subtitle && (
            <p className="text-white/50 text-sm">{subtitle}</p>
          )}
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          This video is hosted on Facebook. Tap below to watch the full sermon.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch "${title}" on Facebook (opens in a new tab)`}
        >
          <Button
            className="rounded-full gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-0"
            size="lg"
          >
            <ExternalLink size={15} aria-hidden="true" />
            Watch on Facebook
          </Button>
        </a>
      </div>
    </div>
  );
}

function VideoPlaceholder({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-primary shadow-2xl shadow-primary/20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-secondary/20 flex flex-col items-center justify-center gap-4 p-8">
        <div className="w-16 h-16 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center">
          <PlayCircle size={30} className="text-secondary" aria-hidden="true" />
        </div>
        <div className="text-center">
          <p className="text-secondary text-[11px] font-bold uppercase tracking-widest mb-2">
            Coming Soon
          </p>
          <p className="text-white font-serif font-bold text-lg md:text-xl leading-snug">
            {title}
          </p>
          {subtitle && (
            <p className="text-white/50 text-sm mt-1">{subtitle}</p>
          )}
        </div>
        <p className="text-white/40 text-xs">Video will be available shortly</p>
      </div>
    </div>
  );
}
