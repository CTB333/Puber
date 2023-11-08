export type Party = {
  id: number;
  title: string;
  desc: string;
  location: PartyLocation;
  date: PartyDate; // Should we allow multiple day parties?
  tags: PartyTag[];
  userId: number;
};

export type PartyData = {
  userId: number;
  title: string;
  desc: string;
  location: PartyLocation;
  date: PartyDate;
  tags: PartyTag[];
};

export type PartyDate = {
  date: string;
  start: string;
  end: string;
  dateTime: number;
};

export enum PartyTag {
  TwentyOne = "21 +",
  Byob = "Byob",
  Byow = "Byow",
  Rager = "Rager",
  Calm = "Calm",
  X = "X-Rated",
}

export type Address = {
  street: string;
  city: string;
  zip: string;
  state: string;
  country: string;
};

export type PartyLocation = Address & {
  fullAddress: string;
  lat: number;
  lng: number;
};
