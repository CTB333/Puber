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
  liscence?: string;
  image?: string;
};

export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  liscence?: string;
  image?: string;
};
