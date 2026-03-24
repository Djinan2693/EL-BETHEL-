export interface SermonData {
  id: number;
  slug: string;
  title: string;
  speaker: string;
  date: string;
  dateISO: string;
  topic: string;
  series: string;
  excerpt: string;
  thumbnail: string | null;
  videoUrl: string;
  transcriptExcerpt: string;
  scripture: string;
  duration: string;
}

export const sermons: SermonData[] = [
  {
    id: 1,
    slug: "the-god-who-restores",
    title: "The God Who Restores",
    speaker: "Ps. Rene Santos",
    date: "March 16, 2025",
    dateISO: "2025-03-16",
    topic: "Healing",
    series: "Rebuild",
    excerpt:
      "God is not finished with you. In Joel 2, the prophet declares that the Lord will restore the years the locust has eaten — every season of loss, every wasted year, every broken dream. This message unpacks what divine restoration looks like in the everyday lives of modern believers.",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=placeholder-01",
    transcriptExcerpt:
      "There is a promise in Joel that stops me every time I read it. 'I will restore the years...' Not 'I will make it slightly better.' Not 'I will compensate you.' God says — I will restore. Completely. What the enemy stole, what time devoured, what your own choices cost you — the Lord says He can and will give it back. That is the nature of our God.",
    scripture: "Joel 2:25–27",
    duration: "46:12",
  },
  {
    id: 2,
    slug: "walking-in-the-spirit",
    title: "Walking in the Spirit",
    speaker: "Ptr. Ana Reyes",
    date: "March 9, 2025",
    dateISO: "2025-03-09",
    topic: "Holy Spirit",
    series: "The Kingdom Life",
    excerpt:
      "Galatians 5 gives us one of the most practical pictures of the Spirit-filled life. Walking in the Spirit isn't a feeling — it's a direction. This message explores what it means to yield daily to the Holy Spirit and what fruit that yields in your relationships, work, and inner life.",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=placeholder-02",
    transcriptExcerpt:
      "Paul doesn't say 'float in the Spirit' or 'arrive in the Spirit.' He says walk. Walking implies effort — one foot in front of the other, day after day, in the same direction. The Spirit-filled life is not a one-time experience. It is a continuous, deliberate, daily choosing to go where the Spirit leads.",
    scripture: "Galatians 5:16–25",
    duration: "42:38",
  },
  {
    id: 3,
    slug: "blessed-are-the-pure-in-heart",
    title: "Blessed Are the Pure in Heart",
    speaker: "Ps. Rene Santos",
    date: "March 2, 2025",
    dateISO: "2025-03-02",
    topic: "Discipleship",
    series: "The Kingdom Life",
    excerpt:
      "The Beatitudes are not a checklist of spiritual achievements — they are a portrait of kingdom character. In this message from the Sermon on the Mount, we explore what it means to have a pure heart in a world that celebrates divided loyalties and private compromises.",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=placeholder-03",
    transcriptExcerpt:
      "Purity of heart is not the absence of temptation. It is singleness of devotion. The Greek word here — katharos — is the same word used for water that has been filtered, metal that has been refined, cloth that has been washed clean. Jesus is describing a heart with one master and one allegiance: God alone.",
    scripture: "Matthew 5:8",
    duration: "49:05",
  },
  {
    id: 4,
    slug: "overcoming-anxiety",
    title: "Overcoming Anxiety: The Peace That Passes Understanding",
    speaker: "Ps. David Lim",
    date: "February 23, 2025",
    dateISO: "2025-02-23",
    topic: "Healing",
    series: "Rebuild",
    excerpt:
      "Anxiety is not a moral failure — but it is a spiritual invitation. Philippians 4 gives us one of the most counter-intuitive prescriptions in all of Scripture: instead of managing worry, replace it with prayer. This message is for everyone carrying weight they were never meant to carry alone.",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=placeholder-04",
    transcriptExcerpt:
      "Paul wrote Philippians from prison. That is the context of 'do not be anxious about anything.' He is not dismissing your problems. He is telling you, from a prison cell, that there is a peace available to you that defies all circumstances and surpasses all human logic. That peace has a name: it is Jesus Christ.",
    scripture: "Philippians 4:6–7",
    duration: "40:55",
  },
  {
    id: 5,
    slug: "the-power-of-corporate-prayer",
    title: "The Power of Corporate Prayer",
    speaker: "Ptr. Ana Reyes",
    date: "February 16, 2025",
    dateISO: "2025-02-16",
    topic: "Prayer",
    series: "Rooted",
    excerpt:
      "Acts 4 records one of the most explosive prayer meetings in church history. The disciples prayed, the building shook, and boldness came. This message makes the case that something unique and irreplaceable happens when the church gathers together before the throne of God.",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=placeholder-05",
    transcriptExcerpt:
      "When they had prayed — not when the pastor prayed, not when the worship team prayed — when they had prayed, the place shook. Corporate prayer is not a polite tradition. It is a weapon. It is the gathered church exercising its God-given authority over the spiritual forces arrayed against it.",
    scripture: "Acts 4:23–31",
    duration: "41:22",
  },
  {
    id: 6,
    slug: "built-on-the-rock",
    title: "Built on the Rock",
    speaker: "Ps. Rene Santos",
    date: "February 9, 2025",
    dateISO: "2025-02-09",
    topic: "Foundations",
    series: "Rooted",
    excerpt:
      "Jesus ends the Sermon on the Mount with a parable about two builders and two foundations. The storm comes for both — the wise and the foolish. The difference is not circumstance, it is foundation. What are you building your life on, and will it hold when the rains fall?",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=placeholder-06",
    transcriptExcerpt:
      "Notice that Jesus does not say the wise man's house skips the storm. Both houses face the same rain, the same flood, the same wind. The difference is not in the weather — it is in the foundation. If your faith only works when life is easy, it is sand. The Rock is Jesus, and His Word is what you build on.",
    scripture: "Matthew 7:24–27",
    duration: "47:18",
  },
  {
    id: 7,
    slug: "go-and-make",
    title: "Go and Make: The Church's Unfinished Assignment",
    speaker: "Ps. David Lim",
    date: "February 2, 2025",
    dateISO: "2025-02-02",
    topic: "Missions",
    series: "Sent",
    excerpt:
      "The Great Commission is not a suggestion for the especially bold — it is the marching order of every believer. This message challenges the comfortable idea that missions is someone else's calling and invites every member of El-Bethel into the adventure of becoming a sent person.",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=placeholder-07",
    transcriptExcerpt:
      "The word 'go' in Matthew 28 is not a command to move geographically. The literal translation is 'as you are going.' As you go to work, as you go to school, as you go to the market — make disciples. The mission field is not a destination you travel to. It is the space you already occupy.",
    scripture: "Matthew 28:18–20",
    duration: "44:40",
  },
  {
    id: 8,
    slug: "the-prodigal-father",
    title: "The Prodigal Father: Understanding God's Extravagant Grace",
    speaker: "Ps. Rene Santos",
    date: "January 26, 2025",
    dateISO: "2025-01-26",
    topic: "Grace",
    series: "Rebuild",
    excerpt:
      "We often call it the Parable of the Prodigal Son — but the real scandal is the father. The father who runs. The father who throws a party. The father who gives the robe, the ring, the sandals before a single word of repentance is completed. This message explores the extravagance of God's love.",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=placeholder-08",
    transcriptExcerpt:
      "In the first-century Jewish world, a grown man did not run. It was beneath his dignity. But the father in Jesus' story — who represents God — sees his son 'while he was still a great way off,' and he hitches up his robe and he sprints. God does not wait for you to clean yourself up. He runs to meet you in your mess.",
    scripture: "Luke 15:11–32",
    duration: "51:04",
  },
  {
    id: 9,
    slug: "covenant-community",
    title: "Covenant Community: Why You Can't Follow Jesus Alone",
    speaker: "Ptr. Ana Reyes",
    date: "January 19, 2025",
    dateISO: "2025-01-19",
    topic: "Community",
    series: "Together",
    excerpt:
      "Individualism is the air we breathe in modern culture — but it is alien to the New Testament. The early church didn't just attend services; they shared meals, goods, and lives. This message re-imagines what belonging to one another actually looks like in a city like Makati.",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=placeholder-09",
    transcriptExcerpt:
      "Acts 2:42 says they devoted themselves — to the apostles' teaching, and to fellowship, and to the breaking of bread, and to prayers. Four things. All four communal. None of them are solo activities. The early church did not think of spiritual growth as a personal project. It was a shared one.",
    scripture: "Acts 2:42–47",
    duration: "43:28",
  },
  {
    id: 10,
    slug: "the-names-of-god",
    title: "Jehovah Jireh: The Lord Who Provides",
    speaker: "Ps. Samuel Lim",
    date: "January 12, 2025",
    dateISO: "2025-01-12",
    topic: "Faith",
    series: "Rooted",
    excerpt:
      "On the mountain of the Lord, it will be provided. Abraham speaks these words not knowing how — only Who. This message from El-Bethel's founding pastor opens our annual series on the names of God with a timely reminder that our Provider is always ahead of our need.",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=placeholder-10",
    transcriptExcerpt:
      "Abraham called the name of that place 'The Lord Will Provide.' He didn't name it 'The Lord Provided.' He named it with a future tense — because the provision of God is not a past event you look back at. It is a present reality you stand in and a future promise you walk toward.",
    scripture: "Genesis 22:9–14",
    duration: "50:15",
  },
  {
    id: 11,
    slug: "your-body-is-a-temple",
    title: "Your Body Is a Temple: Stewardship of the Whole Person",
    speaker: "Ps. David Lim",
    date: "January 5, 2025",
    dateISO: "2025-01-05",
    topic: "Discipleship",
    series: "Together",
    excerpt:
      "The Gospel is not just about saving souls — it is about the redemption of whole persons. This practical message challenges the sacred-secular divide and invites believers to honour God in their physical health, mental wellbeing, rest habits, and the choices they make with their bodies.",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=placeholder-11",
    transcriptExcerpt:
      "Paul says your body is the temple of the Holy Spirit. Not was. Not will be. Is. Right now, the same Spirit who raised Jesus from the dead lives in your physical frame. That changes how you eat, how you sleep, how you treat stress, how you think about exercise — not out of vanity, but out of worship.",
    scripture: "1 Corinthians 6:19–20",
    duration: "38:47",
  },
  {
    id: 12,
    slug: "sent-into-the-city",
    title: "Sent Into the City: Manila as Our Mission Field",
    speaker: "Ps. David Lim",
    date: "December 29, 2024",
    dateISO: "2024-12-29",
    topic: "Missions",
    series: "Sent",
    excerpt:
      "What does it mean to be the church in Makati City — a district of banks, law firms, embassies, and gated villages? This year-end message calls El-Bethel to see Metro Manila not as a place to escape, but as a mission field to inhabit with the presence and love of Jesus Christ.",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=placeholder-12",
    transcriptExcerpt:
      "Jeremiah tells the exiles to seek the welfare of the city where I have sent you. They didn't choose Babylon. God sent them there. El-Bethel did not accidentally end up on the 7th floor of a corporate building in the financial district of Manila. We are here on assignment. This city is our Babylon — and we are sent to bless it.",
    scripture: "Jeremiah 29:4–7",
    duration: "53:30",
  },
];

/* ── Derived filter sets ─────────────────────────────────────────── */
export const allSpeakers = Array.from(new Set(sermons.map((s) => s.speaker))).sort();
export const allSeries   = Array.from(new Set(sermons.map((s) => s.series))).sort();
export const allTopics   = Array.from(new Set(sermons.map((s) => s.topic))).sort();
