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
  id:                 "easter-2026-v1",   // change when content changes
  enabled:            true,
  delayMs:            1200,               // 1.2 s after page load
  showOnceForHours:   24,                 // show once per day per visitor

  badge:       "Upcoming Event",
  title:       "Easter Celebration 2026",
  description: "Join us for a powerful Easter celebration as we proclaim the risen Christ. \"Worthy Is The Lamb\" — Revelation 5:12",
  date:        "Sunday, April 19, 2026",
  time:        "3:30 PM – 7:00 PM",
  location:    "7th Floor Tower 1, SMDC Grace Residences Function Hall, Levi Mariano, Taguig City",
  image:       "easter-flyer.jpg",
  cta: {
    label:    "View Event Details",
    href:     "/events/easter-celebration-2026",
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
