export type Party = {
  id: number;
  title: string;
  desc: string;
  location: PartyLocation;
  date: PartyDate; // Should we allow multiple day parties?
  tags: PartyTag[];
  drivers: number[];
  guests: number[];
  hideAddress: boolean;
  userId: number;
};

export type PartyData = {
  userId: number;
  title: string;
  desc: string;
  location: PartyLocation;
  date: PartyDate;
  tags: PartyTag[];
  drivers: number[];
  guests: number[];
  hideAddress: boolean;
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
  Drivers = "Drivers",
  Uberable = "Uberable",
  Tech = "Tech",
  Art = "Art",
  Food = "Food",
}

export const AllPartyTags = [
  PartyTag.TwentyOne,
  PartyTag.Byob,
  PartyTag.Byow,
  PartyTag.Rager,
  PartyTag.Calm,
  PartyTag.X,
  PartyTag.Drivers,
  PartyTag.Uberable,
  PartyTag.Tech,
  PartyTag.Art,
  PartyTag.Food,
];

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

export type PartyDistance = {
  distance: number;
  partyId: number;
};
