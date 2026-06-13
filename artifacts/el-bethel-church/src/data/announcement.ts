/**
 * ANNOUNCEMENT MODAL CONFIG
 * ─────────────────────────────────────────────────────────────────────────────
 * Edit this file to change what the popup shows — no need to touch the component.
 *
 * KEY FIELDS
 *   id              → Unique string. Changing it resets "already seen" for all visitors.
 *   enabled         → Set to `false` to instantly disable the popup site-wide.
 *   delayMs         → How long (ms) to wait before the popup appears. 0 = immediate.
 *   showOnceForHours→ 0 = show every visit. 24 = once per day. 168 = once per week.
 *   image           → Filename inside /public/images/ (e.g. "easter-flyer.jpg")
 *   cta.href        → Internal route ("/events/easter-celebration-2026") or full URL.
 *   cta.external    → true if the link opens a new tab (external websites).
 */

export interface AnnouncementConfig {
  id: string;
  enabled: boolean;
  delayMs: number;
  showOnceForHours: number;
  badge?: string;
  title: string;
  description: string;
  date?: string;
  time?: string;
  location?: string;
  image?: string;
  cta?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

// ─── ACTIVE ANNOUNCEMENT ────────────────────────────────────────────────────
// Switch `enabled` to false to remove the popup without deleting the config.
export const announcement: AnnouncementConfig = {
  id:                 "new-location-2026-v2",   // change when content changes
  enabled:            true,
  delayMs:            900,
  showOnceForHours:   72,

  badge:       "Important Update",
  title:       "New Location Alert !!!",
  description: "El-Bethel Christian Fellowship Church is now welcoming everyone at our new church address.",
  date:        "June 14, 2026",
  time:        "4:00 PM – 6:30 PM",
  location:    "Sunshine Place Jupiter Makati (Roof Deck Venue)",
  image:       "new-location-2026-v2.jpg",
  cta: {
    label:    "View Contact Page",
    href:     "/contact",
    external: false,
  },
};

// ─── EXAMPLE: Address change announcement ────────────────────────────────────
// Swap the export above with this block to show the location alert instead.
//
// export const announcement: AnnouncementConfig = {
//   id:                 "new-location-2026-v1",
//   enabled:            true,
//   delayMs:            1000,
//   showOnceForHours:   72,
//
//   badge:       "Important Notice",
//   title:       "We Have a New Location!",
//   description: "El-Bethel Christian Fellowship Church is moving to a new address. Join us at our new home starting March 8, 2026.",
//   date:        "Starting March 8, 2026",
//   time:        "4:00 PM – 6:30 PM",
//   location:    "7th Floor, KMC Armstrong Corporate Center, HV Dela Costa Street, Salcedo Village, Makati City",
//   image:       "new-location.jpg",
//   cta: {
//     label:    "Get Directions",
//     href:     "https://maps.google.com/?q=KMC+Armstrong+Corporate+Center+Makati",
//     external: true,
//   },
// };
