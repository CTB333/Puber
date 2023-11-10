import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { stringify } from "../utils";
import { User } from "../interfaces";

const useGetAllUsers = () => {
  const { data, isPending, get } = useFetch();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    recieveData();
  }, [stringify(data)]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    get("users");
  };

  const recieveData = () => {
    if (!data) return;
    setUsers(data);
  };

  return {
    success: isPending,
    users,
  };
};

export default useGetAllUsers;
