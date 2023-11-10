import { useEffect, useState } from "react";
import { useSearch } from "../providers";
import useGetAllParties from "./useGetAllParties";
import { stringify } from "../utils";
import { Party, PartyDistance } from "../interfaces";
import useGetUserLocation from "./useGetUserLocation";
import useFetch from "./useFetch";
import useGetDistance from "./useGetDistance";

const useFilterParties = (deps?: any[]) => {
  const { search, filters, searchRadius } = useSearch();
  const { parties, partiesChange, loading } = useGetAllParties(deps);
  const { userLocation, distances, distancesChange } = useGetDistance(
    parties,
    partiesChange
  );

  const [filteredDistance, setFilteredDistance] = useState<PartyDistance[]>([]);
  const [filtered, setFiltered] = useState<Party[]>([]);

  useEffect(() => {
    filter();
  }, [
    partiesChange,
    distancesChange,
    search,
    stringify(filters),
    searchRadius,
  ]);

  const filter = () => {
    let newParties = [...parties];

    if (filters.length > 0) {
      newParties = filterByTags(newParties);
    }

    if (search.length > 0) {
      newParties = filterBySearch(newParties);
    }

    newParties = filterByRadius(newParties);

    setFiltered(newParties);
  };

  const filterByTags = (newParties: Party[]) => {
    let collectedIds: number[] = [];
    let validParties: Party[] = [];

    for (let tag of filters) {
      newParties.forEach((party) => {
        if (collectedIds.includes(party.id)) return;
        if (!party.tags.includes(tag)) return;

        collectedIds.push(party.id);
        validParties.push(party);
      });
    }

    return validParties;
  };

  const filterBySearch = (newParties: Party[]) => {
    let collectedIds: number[] = [];
    let validParties: Party[] = [];
    let queries = search.trim().split(" ");

    for (let query of queries) {
      newParties.forEach((party) => {
        if (collectedIds.includes(party.id)) return;

        let matchFound =
          party.title.includes(query) ||
          party.desc.includes(query) ||
          party.location.fullAddress.includes(query);

        if (!matchFound) return;

        collectedIds.push(party.id);
        validParties.push(party);
      });
    }

    return validParties;
  };

  const filterByRadius = (newParties: Party[]) => {
    let newPartyIds = newParties.map((party) => party.id);
    let validDistances = distances.filter(
      (distance) =>
        newPartyIds.includes(distance.partyId) &&
        searchRadius > distance.distance
    );

    let validDistancePartyIds = validDistances.map(
      (distance) => distance.partyId
    );
    let validParties = newParties.filter((party) =>
      validDistancePartyIds.includes(party.id)
    );

    setFilteredDistance(validDistances);
    return validParties;
  };

  return {
    allParties: parties,
    allDistances: distances,
    parties: filtered,
    distances: filteredDistance,
    loading,
    userLocation,
  };
};

export default useFilterParties;
