export type RedFlag = {
  id: number;
  userId: number;
  type: RedFlagType;
  desc: string;
};

export type RedFlagData = {
  userId: number;
  type: RedFlagType;
  desc: string;
};

export enum RedFlagType {
  Creep = "Creeper",
  Idiot = "Unsolicited Idiocy",
  VK = "Vibe Killer",
}
