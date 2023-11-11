import { useEffect, useState } from "react";
import { Party, PartyTag, User } from "../interfaces";
import useGetAllUsers from "./useGetAllUsers";
import useGetUser from "./useGetUser";
import useOpen from "./useOpen";
import { useUser } from "../providers";
import useFetch from "./useFetch";
import { stringify } from "../utils";

const useParyDetail = (routeParty: Party) => {
  const {
    user: host,
    users: allUsers,
    usersChange: allUsersChange,
  } = useGetUser(routeParty.userId);
  const { user } = useUser();
  const {
    data,
    isPending: loading,
    success,
    put,
    error,
    errorChange,
  } = useFetch();
  const [party, setParty] = useState(routeParty);

  const [showAllGuestsValue, _open, _close, toggleAllGuests] = useOpen();

  const drivers = party.drivers
    .map((dirverId) => allUsers.find((user) => user.id == dirverId))
    .filter((user) => (user ? true : false)) as User[];
  const guests = party.guests
    .map((guestId) => allUsers.find((user) => user.id == guestId))
    .filter((user, index) =>
      user ? (!showAllGuestsValue && index > 3 ? false : true) : false
    ) as User[];
  const userIsRsvpd = party.guests.find((guest) => user?.id == guest)
    ? true
    : false;
  const hasDrivers = party.tags.includes(PartyTag.Drivers);

  useEffect(() => {
    if (!data) return;
    setParty(data);
  }, [stringify(data)]);

  const rsvp = () => {
    if (!user) return;

    let rsvpIds = [...party.guests];

    if (userIsRsvpd) rsvpIds = rsvpIds.filter((rsvpId) => rsvpId !== user.id);
    else rsvpIds.push(user.id);

    put(`parties/${party.id}`, {
      ...party,
      guests: rsvpIds,
    });
  };

  return {
    host,
    party,
    drivers,
    hasDrivers,
    guests,
    toggleAllGuests,
    showAllGuestsValue,

    rsvp,
    loading,
    success,
    userIsRsvpd,
  };
};

export default useParyDetail;
