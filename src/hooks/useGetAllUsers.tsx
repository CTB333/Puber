import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { stringify } from "../utils";
import { User } from "../interfaces";
import useOnChange from "./useOnChange";

const useGetAllUsers = () => {
  const { data, isPending, get } = useFetch();
  const [users, setUsers, usersChange] = useOnChange<User[]>([]);

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
    usersChange,
  };
};

export default useGetAllUsers;
