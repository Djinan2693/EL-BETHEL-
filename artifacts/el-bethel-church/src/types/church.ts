export interface ChurchInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  founded: number;
  socialMedia: {
    facebook: string;
    youtube: string;
    instagram: string;
  };
}

export interface Sermon {
  id: number;
  title: string;
  pastor: string;
  date: string;
  category: string;
  scripture: string;
  duration: string;
  thumbnail: string | null;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
}

export interface Ministry {
  id: number;
  name: string;
  tagline: string;
  description: string;
  leader: string;
}

export interface Pastor {
  id: number;
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
}
