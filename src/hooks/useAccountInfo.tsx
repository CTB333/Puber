import { useCallback, useEffect, useState } from "react";
import useFetch from "./useFetch";
import { stringify } from "../utils";
import { useUser } from "../providers";
import useOnChange from "./useOnChange";
import { useFocusEffect } from "@react-navigation/native";

const initialError = {
  userName: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  server: "",
};

const useAccountInfo = () => {
  const { data, success, isPending, put, error: fetchError } = useFetch();
  const { user, setUser } = useUser();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState(true);
  const [notiStatus, setNotiStatus] = useState(true);

  const [error, setError, errorChange] = useOnChange(initialError);

  useFocusEffect(
    useCallback(() => {
      console.log(`Focus Effect`);

      if (!user) return;

      console.log(stringify(user));

      setUserName(user.userName);
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPassword(user.password);
      setRsvpStatus(user.rsvpStatus);
      setNotiStatus(user.notiStatus);
    }, [stringify(user)])
  );

  useEffect(() => {
    if (!fetchError) return;
    setError((prev) => ({ ...prev, server: fetchError }));
  }, [stringify(fetchError)]);

  useEffect(() => {
    if (!data) return;
    setUser(data);
  }, [stringify(data)]);

  const clearError = () => {
    setError(initialError);
  };

  const validate = () => {
    clearError();
    if (firstName.length == 0) {
      setError((prev) => ({ ...prev, firstName: "Missing first name" }));
      return false;
    }
    if (lastName.length == 0) {
      setError((prev) => ({ ...prev, lastName: "Missing last name" }));
      return false;
    }
    if (email.length == 0) {
      setError((prev) => ({ ...prev, email: "Missing email" }));
      return false;
    }
    if (userName.length == 0) {
      setError((prev) => ({ ...prev, userName: "Missing user name" }));
      return false;
    }
    if (password.length == 0) {
      setError((prev) => ({ ...prev, password: "Missing password" }));
      return false;
    }

    return true;
  };

  const submit = () => {
    if (!validate()) return;
    if (!user) return;

    put(`users/${user.id}`, {
      userName,
      email,
      firstName,
      lastName,
      password,
      rsvpStatus,
      notiStatus,
      rating: user.rating,
    });
  };

  return {
    submit,
    error,
    errorChange,
    loading: isPending,
    success,

    userName,
    setUserName,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    rsvpStatus,
    setRsvpStatus,
    notiStatus,
    setNotiStatus,
  };
};

export default useAccountInfo;
