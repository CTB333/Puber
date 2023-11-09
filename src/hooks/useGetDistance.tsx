import { useEffect } from "react";
import { Party, PartyDistance } from "../interfaces";
import useFetch from "./useFetch";
import useGetUserLocation from "./useGetUserLocation";
import CONSTANTS from "../Constants";
import { stringify } from "../utils";
import useOnChange from "./useOnChange";

const useGetDistance = (parties: Party[], partiesChange: number) => {
  const { location: userLocation, locationChange } = useGetUserLocation();
  const [distances, setDistances, distancesChange] = useOnChange<
    PartyDistance[]
  >([]);

  useEffect(() => {
    if (parties.length == 0) return;
    getDistances();
  }, [partiesChange, locationChange]);

  const partyToLatLng = (party: Party) =>
    `${party.location.lat},${party.location.lng}`;

  const createQuery = () => {
    if (!userLocation) return;

    let allDestinations = parties.map(partyToLatLng);
    let destinations = allDestinations.join("|");

    let origin = `${userLocation.lat},${userLocation.lng}`;

    let query = CONSTANTS.DistanceURL(
      destinations,
      origin,
      CONSTANTS.GoogleAPIKey
    );

    return query;
  };

  const getDistances = () => {
    let url = createQuery();
    if (!url) return;

    (async () => {
      try {
        let res = await fetch(url);
        let json = await res.json();
        updateDestinations(json);
      } catch (e: any) {
        console.log(`Google Distance Error: ${stringify(e)}`);
      }
    })();
  };

  const updateDestinations = (data: any) => {
    if (!data) return;

    let elements = data.rows[0].elements;
    let newDistances: PartyDistance[] = [];

    elements.forEach((elem: any, index: number) => {
      let distance = parseFloat(elem.distance.text.split(" ")[0]);
      newDistances.push({
        distance,
        partyId: parties[index].id,
      });
    });

    setDistances(newDistances);
  };

  return {
    userLocation,
    distances,
    distancesChange,
  };
};

export default useGetDistance;
