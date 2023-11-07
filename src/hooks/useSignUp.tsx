import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { stringify } from "../utils";
import { useUser } from "../providers";
import useOnChange from "./useOnChange";
import useRememberUser from "./useRememberUser";

const initialError = {
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  password: "",
  rePassword: "",
  server: "",
};

const useSignUp = () => {
  const { data, isPending, success, error: fetchError, post } = useFetch();
  const { setUser } = useUser();
  const { store } = useRememberUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [error, setError, errorChange] = useOnChange(initialError);

  useEffect(() => {
    if (fetchError) setError((prev) => ({ ...prev, server: fetchError }));
    else clearError();
  }, [fetchError]);

  useEffect(() => {
    if (!data) return;
    console.log(`User: ${stringify(data)}`);
    console.log();
    setUser(data);
    store(data.id);
  }, [stringify(data)]);

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
    if (rePassword.length == 0) {
      setError((prev) => ({ ...prev, rePassword: "Missing repeat password" }));
      return false;
    }
    if (password !== rePassword) {
      setError((prev) => ({ ...prev, rePassword: "Passwords do not match" }));
      return false;
    }
    return true;
  };

  const clearError = () => {
    setError(initialError);
  };

  const submit = () => {
    if (!validate()) return;

    let userData = {
      firstName,
      lastName,
      email,
      userName,
      password,
    };

    post(`users`, userData);
  };

  return {
    submit,
    error,
    errorChange,
    isPending,
    success,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    userName,
    setUserName,
    password,
    setPassword,
    rePassword,
    setRePassword,
  };
};

export default useSignUp;
