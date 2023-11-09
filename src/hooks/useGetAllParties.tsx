import { useEffect, useState } from "react";
import { Party } from "../interfaces";
import useFetch from "./useFetch";
import { stringify } from "../utils";
import useOnChange from "./useOnChange";

const useGetAllParties = (deps?: any[]) => {
  const { data, isPending, get } = useFetch();
  const [parties, setParties, partiesChange] = useOnChange<Party[]>([]);

  useEffect(() => {
    getParties();
  }, deps ?? []);

  useEffect(() => {
    if (!data) return;
    setParties(data);
  }, [stringify(data)]);

  const getParties = () => {
    get(`parties`);
  };

  return { parties, loading: isPending, partiesChange };
};

export default useGetAllParties;
