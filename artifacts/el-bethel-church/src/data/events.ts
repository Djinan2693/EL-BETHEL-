export interface EventData {
  id: number;
  slug: string;
  title: string;
  category: string;
  dateISO: string;
  date: string;
  time: string;
  endTime: string;
  isMultiDay: boolean;
  dateRange?: string;
  location: string;
  address: string;
  organizer: string;
  excerpt: string;
  description: string;
  whatToExpect: string[];
  schedule?: { time: string; item: string }[];
  accentColor: string;
  isFeatured: boolean;
  registrationRequired: boolean;
  cost: string;
  tags: string[];
}

export const events: EventData[] = [
  {
    id: 1,
    slug: "sunday-worship-april-6",
    title: "Sunday Worship Service",
    category: "Weekly",
    dateISO: "2025-04-06",
    date: "April 6, 2025",
    time: "4:00 PM",
    endTime: "6:30 PM",
    isMultiDay: false,
    location: "El-Bethel Main Sanctuary",
    address: "7th Floor, KMC Armstrong Corporate Center, HV Dela Costa Street, Salcedo Village, Makati City",
    organizer: "El-Bethel Christian Fellowship",
    excerpt: "Join us this Palm Sunday weekend for Spirit-led worship, expository preaching, and the warmth of our church family — right in the heart of Makati City.",
    description: "Every Sunday, El-Bethel gathers as a family to worship, hear the Word of God, and strengthen one another in faith. Our Sunday service is the heartbeat of everything we do — a weekly encounter with the living God designed for both long-time believers and first-time guests.\n\nWe believe Sunday worship is not a performance or a programme. It is a people gathering before their Father. You will experience authentic praise, biblically grounded preaching, and a community that is genuinely glad you came.",
    whatToExpect: [
      "Warm welcome from our Connect Team — you won't walk in unnoticed",
      "Contemporary and classic worship led by our El-Bethel Worship Team",
      "Expository sermon from our pastoral team (averaging 40–50 minutes)",
      "Ministry opportunity for prayer and response at the close of service",
      "Light refreshments and community fellowship after the service",
    ],
    schedule: [
      { time: "3:45 PM", item: "Doors open — Connect Team on standby" },
      { time: "4:00 PM", item: "Worship begins" },
      { time: "4:35 PM", item: "Announcements & Tithes and Offerings" },
      { time: "4:45 PM", item: "Message begins" },
      { time: "5:35 PM", item: "Response time & closing prayer" },
      { time: "5:45 PM", item: "Fellowship & refreshments" },
      { time: "6:30 PM", item: "Service concludes" },
    ],
    accentColor: "bg-primary",
    isFeatured: true,
    registrationRequired: false,
    cost: "Free — all are welcome",
    tags: ["worship", "weekly", "all-ages", "palm-sunday"],
  },
  {
    id: 2,
    slug: "sunday-worship-april-13",
    title: "Sunday Worship Service",
    category: "Weekly",
    dateISO: "2025-04-13",
    date: "April 13, 2025",
    time: "4:00 PM",
    endTime: "6:30 PM",
    isMultiDay: false,
    location: "El-Bethel Main Sanctuary",
    address: "7th Floor, KMC Armstrong Corporate Center, HV Dela Costa Street, Salcedo Village, Makati City",
    organizer: "El-Bethel Christian Fellowship",
    excerpt: "Join us this Sunday for Spirit-led worship, expository preaching, and the warmth of our church family. All are welcome.",
    description: "Every Sunday, El-Bethel gathers as a family to worship, hear the Word of God, and strengthen one another in faith. Our Sunday service is the heartbeat of everything we do — a weekly encounter with the living God designed for both long-time believers and first-time guests.\n\nWe believe Sunday worship is not a performance or a programme. It is a people gathering before their Father. You will experience authentic praise, biblically grounded preaching, and a community that is genuinely glad you came.",
    whatToExpect: [
      "Warm welcome from our Connect Team — you won't walk in unnoticed",
      "Contemporary and classic worship led by our El-Bethel Worship Team",
      "Expository sermon from our pastoral team (averaging 40–50 minutes)",
      "Ministry opportunity for prayer and response at the close of service",
      "Light refreshments and community fellowship after the service",
    ],
    schedule: [
      { time: "3:45 PM", item: "Doors open — Connect Team on standby" },
      { time: "4:00 PM", item: "Worship begins" },
      { time: "4:35 PM", item: "Announcements & Tithes and Offerings" },
      { time: "4:45 PM", item: "Message begins" },
      { time: "5:35 PM", item: "Response time & closing prayer" },
      { time: "5:45 PM", item: "Fellowship & refreshments" },
      { time: "6:30 PM", item: "Service concludes" },
    ],
    accentColor: "bg-primary",
    isFeatured: false,
    registrationRequired: false,
    cost: "Free — all are welcome",
    tags: ["worship", "weekly", "all-ages"],
  },
  {
    id: 3,
    slug: "good-friday-prayer-vigil",
    title: "Good Friday Prayer Vigil",
    category: "Special Service",
    dateISO: "2025-04-18",
    date: "April 18, 2025",
    time: "9:00 PM",
    endTime: "12:00 AM",
    isMultiDay: false,
    location: "El-Bethel Main Sanctuary",
    address: "7th Floor, KMC Armstrong Corporate Center, HV Dela Costa Street, Salcedo Village, Makati City",
    organizer: "Ps. Rene Santos",
    excerpt: "A solemn, Spirit-filled night of prayer and reflection as we remember the weight of the cross and the sacrifice of our Lord Jesus Christ.",
    description: "Good Friday is the most solemn night in the Christian calendar — the night we remember what love costs. El-Bethel holds a Prayer Vigil from 9 PM through midnight, creating a sacred space for reflection, repentance, and gratitude.\n\nThe service moves through seven stations corresponding to the seven last words of Christ. It is liturgical without being rigid, emotional without being manipulative — a genuine encounter with the story of the cross.",
    whatToExpect: [
      "Seven-station meditation on the last words of Christ",
      "Candlelit sanctuary setting",
      "Moments of silent prayer and guided confession",
      "Corporate worship through hymns and contemporary songs",
      "Communion (the Lord's Supper) at the close",
    ],
    schedule: [
      { time: "9:00 PM", item: "Opening worship and preparation of hearts" },
      { time: "9:20 PM", item: "The Seven Last Words — stations 1–3" },
      { time: "10:00 PM", item: "Corporate intercession" },
      { time: "10:30 PM", item: "The Seven Last Words — stations 4–7" },
      { time: "11:20 PM", item: "Holy Communion" },
      { time: "11:50 PM", item: "Silent prayer and closing benediction" },
      { time: "12:00 AM", item: "Close of vigil" },
    ],
    accentColor: "bg-slate-800",
    isFeatured: true,
    registrationRequired: false,
    cost: "Free",
    tags: ["holy-week", "prayer", "good-friday", "special"],
  },
  {
    id: 4,
    slug: "easter-sunrise-service",
    title: "Easter Sunrise Service",
    category: "Special Service",
    dateISO: "2025-04-20",
    date: "April 20, 2025",
    time: "5:30 AM",
    endTime: "8:00 AM",
    isMultiDay: false,
    location: "KMC Armstrong Rooftop Garden",
    address: "KMC Armstrong Corporate Center, HV Dela Costa Street, Salcedo Village, Makati City",
    organizer: "Ps. Rene Santos",
    excerpt: "Celebrate the resurrection of Jesus Christ at dawn, watching the sun rise over Makati City as we declare: He is risen! Breakfast served after the service.",
    description: "There is something irreplaceable about greeting Easter at sunrise — watching the light break through darkness as we sing of a resurrection that changed everything. El-Bethel has held this sunrise tradition for over a decade, and it remains one of the most beloved gatherings of the year.\n\nWe gather on the rooftop of KMC Armstrong with the Makati City skyline as a backdrop, and worship as dawn breaks over the metro. Breakfast is served afterwards for the whole family.",
    whatToExpect: [
      "Open-air worship as the sun rises over Makati City",
      "A resurrection-centred message (30 minutes)",
      "Easter communion for all believers",
      "Family photo opportunity with the city skyline",
      "Full Filipino breakfast for all attendees — no charge",
    ],
    schedule: [
      { time: "5:30 AM", item: "Gathering on the rooftop — worship begins at sunrise" },
      { time: "5:50 AM", item: "Opening prayer and Easter declaration" },
      { time: "6:00 AM", item: "Resurrection message" },
      { time: "6:30 AM", item: "Holy Communion" },
      { time: "6:50 AM", item: "Praise and celebration worship" },
      { time: "7:10 AM", item: "Family photos" },
      { time: "7:20 AM", item: "Filipino breakfast served" },
      { time: "8:00 AM", item: "Close" },
    ],
    accentColor: "bg-amber-600",
    isFeatured: true,
    registrationRequired: true,
    cost: "Free — registration required for catering",
    tags: ["easter", "holy-week", "family", "sunrise", "resurrection"],
  },
  {
    id: 5,
    slug: "sunday-worship-april-27",
    title: "Sunday Worship Service",
    category: "Weekly",
    dateISO: "2025-04-27",
    date: "April 27, 2025",
    time: "4:00 PM",
    endTime: "6:30 PM",
    isMultiDay: false,
    location: "El-Bethel Main Sanctuary",
    address: "7th Floor, KMC Armstrong Corporate Center, HV Dela Costa Street, Salcedo Village, Makati City",
    organizer: "El-Bethel Christian Fellowship",
    excerpt: "Join us the Sunday after Easter as we continue to celebrate the resurrection and carry its joy into everyday life. All are welcome.",
    description: "Every Sunday, El-Bethel gathers as a family to worship, hear the Word of God, and strengthen one another in faith. Our Sunday service is the heartbeat of everything we do — a weekly encounter with the living God designed for both long-time believers and first-time guests.\n\nThis Sunday, fresh from our Easter celebrations, we continue to press into what the resurrection means for our Monday-to-Saturday lives. All are warmly welcome.",
    whatToExpect: [
      "Warm welcome from our Connect Team — you won't walk in unnoticed",
      "Contemporary and classic worship led by our El-Bethel Worship Team",
      "Expository sermon from our pastoral team (averaging 40–50 minutes)",
      "Ministry opportunity for prayer and response at the close of service",
      "Light refreshments and community fellowship after the service",
    ],
    schedule: [
      { time: "3:45 PM", item: "Doors open — Connect Team on standby" },
      { time: "4:00 PM", item: "Worship begins" },
      { time: "4:35 PM", item: "Announcements & Tithes and Offerings" },
      { time: "4:45 PM", item: "Message begins" },
      { time: "5:35 PM", item: "Response time & closing prayer" },
      { time: "5:45 PM", item: "Fellowship & refreshments" },
      { time: "6:30 PM", item: "Service concludes" },
    ],
    accentColor: "bg-primary",
    isFeatured: false,
    registrationRequired: false,
    cost: "Free — all are welcome",
    tags: ["worship", "weekly", "all-ages", "post-easter"],
  },
];

/* ── Derived filter sets ─────────────────────────────────────────── */
export const allCategories = Array.from(new Set(events.map((e) => e.category))).sort();

export const upcomingEvents = events
  .filter((e) => new Date(e.dateISO) >= new Date("2025-03-24"))
  .sort((a, b) => a.dateISO.localeCompare(b.dateISO));

export const featuredEvents = events.filter((e) => e.isFeatured);
