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
  tickets?: { tier: string; price: string }[];
  tags: string[];
  flyer?: string;
}

const CHURCH = "El-Bethel Christian Fellowship Church";

export const events: EventData[] = [
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
    organizer: CHURCH,
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
    slug: "easter-celebration-april-5",
    title: "Fête de Pâques — Easter Celebration",
    category: "Special Service",
    dateISO: "2026-04-05",
    date: "April 5, 2026",
    time: "4:00 PM",
    endTime: "6:30 PM",
    isMultiDay: false,
    location: "El-Bethel Main Sanctuary",
    address: "7th Floor, KMC Armstrong Corporate Center, HV Dela Costa Street, Salcedo Village, Makati City",
    organizer: CHURCH,
    excerpt: "Rejoice! He is risen! Join El-Bethel as we celebrate Easter Sunday with Spirit-filled worship, a resurrection message, and the joy of our church family.",
    description: "Easter is the most glorious day in the Christian calendar — the day death was defeated and hope was restored. On April 5, 2026, El-Bethel Christian Fellowship Church gathers to celebrate the resurrection of Jesus Christ with heartfelt worship, a powerful Easter message, and the warmth of our growing church family.\n\nWhether you are a long-time member or joining us for the very first time, you are warmly invited. Come and celebrate the greatest victory in history: He is risen!",
    whatToExpect: [
      "Joyful, Spirit-led corporate worship to open the celebration",
      "A resurrection-centred Easter message",
      "Time of response, prayer, and new commitments",
      "Warm fellowship and community celebration after the service",
      "A welcoming environment for first-time guests and families",
    ],
    accentColor: "bg-amber-600",
    isFeatured: true,
    registrationRequired: false,
    cost: "Free — all are welcome",
    tags: ["easter", "2026", "resurrection", "celebration", "special"],
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
    organizer: CHURCH,
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
    organizer: CHURCH,
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
  {
    id: 6,
    slug: "easter-celebration-2026",
    title: "Easter Celebration 2026",
    category: "Special Service",
    dateISO: "2026-04-19",
    date: "April 19, 2026",
    time: "3:30 PM",
    endTime: "7:00 PM",
    isMultiDay: false,
    location: "SMDC Grace Residences Function Hall",
    address: "7th Floor Tower 1, SMDC Grace Residences Function Hall, Levi Mariano, Taguig City",
    organizer: CHURCH,
    excerpt: "\"Worthy Is The Lamb\" — Join El-Bethel for a powerful Easter Celebration as we proclaim the risen Christ and worship together in joy and reverence.",
    description: "Easter is the cornerstone of everything we believe. On April 19, 2026, El-Bethel Christian Fellowship Church invites you to join our Easter Celebration — a joyful, Spirit-filled service built around one declaration: He is risen.\n\nThemed \"Worthy Is The Lamb\" from Revelation 5:12, this evening will be filled with corporate worship, a resurrection-centred message, and a time of response as we honour the Lamb of God who conquered death.\n\nThe service will be held at the SMDC Grace Residences Function Hall in Taguig City — a beautiful venue for our growing church family and your invited guests. Everyone is warmly welcome.",
    whatToExpect: [
      "Powerful corporate worship — contemporary and Spirit-led",
      "Easter message centred on the resurrection of Jesus Christ",
      "Special declaration: \"Worthy Is The Lamb\" — Revelation 5:12",
      "Opportunity for response, prayer, and new commitments",
      "A joyful community celebration with your church family",
    ],
    schedule: [
      { time: "3:00 PM", item: "Doors open — welcome and registration" },
      { time: "3:30 PM", item: "Worship begins" },
      { time: "4:15 PM", item: "Easter message" },
      { time: "5:15 PM", item: "Response time and prayer" },
      { time: "5:45 PM", item: "Community celebration and fellowship" },
      { time: "7:00 PM", item: "Service concludes" },
    ],
    accentColor: "bg-amber-600",
    isFeatured: true,
    registrationRequired: true,
    cost: "Ticketed event — registration required",
    tickets: [
      { tier: "Standard", price: "₱300" },
      { tier: "Regular",  price: "₱500" },
      { tier: "VIP",      price: "₱1,000" },
    ],
    tags: ["easter", "2026", "celebration", "resurrection", "taguig", "ticketed"],
    flyer: "easter-flyer.jpg",
  },
];

export const allCategories = Array.from(new Set(events.map((e) => e.category))).sort();

export const upcomingEvents = events
  .filter((e) => new Date(e.dateISO) >= new Date("2025-03-24"))
  .sort((a, b) => a.dateISO.localeCompare(b.dateISO));

export const featuredEvents = events.filter((e) => e.isFeatured);
