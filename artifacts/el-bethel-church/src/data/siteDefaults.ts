/**
 * Default values for the content editable from /admin.
 * Kept free of imports so vite.config.ts can also read it (it copies these
 * defaults to /admin so the panel can show them before the first save).
 */
export const siteDefaults = {
  ticker: {
    enabled: false,
    speed: "normal",
    items: [],
  },
  home: {
    heroTitleLine1: "Where Faith",
    heroTitleLine2: "& Family Meet",
    heroSubtitle:
      "A Spirit-filled community in the heart of Makati City — dedicated to knowing Christ and making Him known in every area of life.",
    heroSlides: [
      { src: "hero-slide-1.jpg", alt: "Worship and praise at El-Bethel Christian Fellowship Church" },
      { src: "hero-slide-2.jpg", alt: "Community and fellowship at El-Bethel Christian Fellowship Church" },
      { src: "hero-slide-3.jpg", alt: "Sunday service at El-Bethel Christian Fellowship Church" },
      { src: "hero-slide-4.jpg", alt: "Pastor preaching at El-Bethel Christian Fellowship Church" },
    ],
    stats: [
      { value: "20+", label: "Years of Ministry" },
      { value: "100+", label: "Church Family" },
      { value: "6", label: "Active Ministries" },
    ],
    storyTitle: "A Place to Belong",
    storyImage: "about-community.jpg",
    galleryTitle: "Life at El-Bethel",
    gallery: [
      { src: "gallery-01.jpg", alt: "Worship team leading in prayer during Sunday service" },
      { src: "gallery-02.jpg", alt: "Congregation raising hands in worship at El-Bethel" },
      { src: "gallery-03.jpg", alt: "Church member in quiet prayer during service" },
      { src: "gallery-04.jpg", alt: "Congregation attentively listening to the message" },
      { src: "gallery-05.jpg", alt: "Pastor preaching with keyboard player during Sunday service" },
      { src: "gallery-06.jpg", alt: "Church family gathered in worship" },
      { src: "gallery-07.jpg", alt: "Congregation in a moment of worship and praise" },
      { src: "gallery-08.jpg", alt: "Members seated and engaged during Sunday service" },
      { src: "gallery-09.jpg", alt: "Church members standing in worship" },
      { src: "gallery-10.jpg", alt: "Pastor joyfully ministering to the congregation" },
      { src: "gallery-11.jpg", alt: "Pastor praying with church members after service" },
      { src: "gallery-12.jpg", alt: "Brothers in faith worshipping together" },
      { src: "gallery-13.jpg", alt: "Worship service at El-Bethel with full congregation" },
    ],
  },
  contact: {
    phoneNote: "Mon – Fri, 9 AM – 5 PM",
    emailNote: "We reply within 24 hours",
    areaLine: "Salcedo Village, Makati City",
    buildingLine: "7th Floor, KMC Armstrong Corporate Center",
    directions:
      "We are located in the heart of Salcedo Village — easily accessible by MRT, Grab, or car from all across Metro Manila.",
    officeHours: "Sunday: After service",
    mapLink: "",
  },
};
