export type RedFlag = {
  id: number;
  onUser: number;
  fromUser: number;
  type: RedFlagType;
  desc: string;
  date: number;
};

export type RedFlagData = {
  onUser: number;
  fromUser: number;
  type: RedFlagType;
  desc: string;
  date: number;
};

export enum RedFlagType {
  Creep = "Creeper",
  Idiot = "Unsolicited Idiocy",
  VK = "Vibe Killer",
}

export const AllFlagTypes = [
  RedFlagType.Creep,
  RedFlagType.Idiot,
  RedFlagType.VK,
];
