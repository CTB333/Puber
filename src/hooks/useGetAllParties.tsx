import { useEffect, useState } from "react";
import { Party } from "../interfaces";
import useFetch from "./useFetch";
import { stringify } from "../utils";

const useGetAllParties = (deps?: any[]) => {
  const { data, isPending, get } = useFetch();
  const [parties, setParties] = useState<Party[]>([]);

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

  return { parties, loading: isPending };
};

export default useGetAllParties;
