export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  rsvpStatus: boolean;
  notiStatus: boolean;
  rating: number;
};

export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
};
