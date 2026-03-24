import type { VideoPlatform } from "@/lib/video";

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
  /**
   * Full video URL — YouTube or Facebook public video/live replay.
   * Examples:
   *   YouTube:  "https://www.youtube.com/watch?v=abc123XYZ"
   *   Facebook: "https://www.facebook.com/YourPage/videos/123456789"
   */
  videoUrl: string;
  /**
   * Optional — auto-detected from videoUrl if omitted.
   * Set explicitly to "facebook" or "youtube" to override detection.
   */
  videoPlatform?: VideoPlatform;
  transcriptExcerpt: string;
  scripture: string;
  duration: string;
}

export const sermons: SermonData[] = [
  {
    id: 1,
    slug: "the-god-who-restores",
    title: "The God Who Restores",
    speaker: "Pastor Patrick Tshiunza",
    date: "March 16, 2025",
    dateISO: "2025-03-16",
    topic: "Healing",
    series: "Sunday Service",
    excerpt:
      "God is not finished with you. In Joel 2, the prophet declares that the Lord will restore the years the locust has eaten — every season of loss, every wasted year, every broken dream. This message unpacks what divine restoration looks like in the everyday lives of modern believers.",
    thumbnail: null,
    videoUrl: "https://www.youtube.com/watch?v=PkA0KzKdR6E",
    transcriptExcerpt:
      "There is a promise in Joel that stops me every time I read it. 'I will restore the years...' Not 'I will make it slightly better.' Not 'I will compensate you.' God says — I will restore. Completely. What the enemy stole, what time devoured, what your own choices cost you — the Lord says He can and will give it back. That is the nature of our God.",
    scripture: "Joel 2:25–27",
    duration: "46:12",
  },
  {
    id: 2,
    slug: "walking-in-the-spirit",
    title: "Walking in the Spirit",
    speaker: "Pastor Patrick Tshiunza",
    date: "March 9, 2025",
    dateISO: "2025-03-09",
    topic: "Holy Spirit",
    series: "Sunday Service",
    excerpt:
      "Galatians 5 gives us one of the most practical pictures of the Spirit-filled life. Walking in the Spirit isn't a feeling — it's a direction. This message explores what it means to yield daily to the Holy Spirit and what fruit that yields in your relationships, work, and inner life.",
    thumbnail: null,
    videoUrl: "https://www.facebook.com/61566950657090/videos/1729689948441096",
    videoPlatform: "facebook",
    transcriptExcerpt:
      "Paul doesn't say 'float in the Spirit' or 'arrive in the Spirit.' He says walk. Walking implies effort — one foot in front of the other, day after day, in the same direction. The Spirit-filled life is not a one-time experience. It is a continuous, deliberate, daily choosing to go where the Spirit leads.",
    scripture: "Galatians 5:16–25",
    duration: "42:38",
  },
  {
    id: 3,
    slug: "blessed-are-the-pure-in-heart",
    title: "Blessed Are the Pure in Heart",
    speaker: "Pastor Patrick Tshiunza",
    date: "March 2, 2025",
    dateISO: "2025-03-02",
    topic: "Discipleship",
    series: "Sunday Service",
    excerpt:
      "The Beatitudes are not a checklist of spiritual achievements — they are a portrait of kingdom character. In this message from the Sermon on the Mount, we explore what it means to have a pure heart in a world that celebrates divided loyalties and private compromises.",
    thumbnail: null,
    videoUrl: "https://www.facebook.com/61566950657090/videos/1457367335980772",
    videoPlatform: "facebook",
    transcriptExcerpt:
      "Purity of heart is not the absence of temptation. It is singleness of devotion. The Greek word here — katharos — is the same word used for water that has been filtered, metal that has been refined, cloth that has been washed clean. Jesus is describing a heart with one master and one allegiance: God alone.",
    scripture: "Matthew 5:8",
    duration: "49:05",
  },
];

export const allSpeakers = [...new Set(sermons.map((s) => s.speaker))];
export const allSeries   = [...new Set(sermons.map((s) => s.series))];
export const allTopics   = [...new Set(sermons.map((s) => s.topic))];
