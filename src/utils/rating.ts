import { Party, PartyData } from "../interfaces";

const RATING5 = 5;
const RATING4 = 4;
const RATING3 = 3;
const RATING2 = 2;
const RATING1 = 1;

const RateParty = (party: Party | PartyData) => {
  const desc = party.desc;
  const rsvps = party.guests;
  const capacity = party.capacity;

  const descRating = ratePartyByDesc(desc);

  if (rsvps.length == 0) return descRating;

  const capacityRating = ratePartyByCapacity(rsvps.length, capacity);

  if (descRating > capacityRating) return descRating;

  return capacityRating;
};

const ratePartyByCapacity = (rsvps: number, capacity: number) => {
  const LARGEST = Math.floor(capacity / 4) * 3;
  const SMALLEST = Math.floor(LARGEST / 4);

  const SMALL = SMALLEST * 2;
  const MEDIUM = SMALLEST * 3;

  if (rsvps >= LARGEST) return RATING5;

  if (rsvps <= LARGEST && rsvps >= MEDIUM) return RATING4;

  if (rsvps <= MEDIUM && rsvps >= SMALL) return RATING3;

  if (rsvps <= SMALL && rsvps >= SMALLEST) return RATING2;

  return RATING1;
};

const ratePartyByDesc = (desc: string) => {
  const MAX_AVG_WORDS = 20;
  const MIN_AVG_WORDS = 15;

  const SHORT = MIN_AVG_WORDS / 3;
  const MEDIUM = SHORT * 2;

  const words = desc.trim().split(" ");

  if (words.length > MAX_AVG_WORDS) return RATING5;

  if (words.length <= MAX_AVG_WORDS && words.length >= MIN_AVG_WORDS)
    return RATING4;

  if (words.length <= MIN_AVG_WORDS && words.length >= MEDIUM) return RATING3;

  if (words.length <= MEDIUM && words.length >= SHORT) return RATING2;

  return RATING1;
};

export default RateParty;
