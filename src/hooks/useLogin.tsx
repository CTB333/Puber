import { useState } from "react";
import useFetch from "./useFetch";
import useOnChange from "./useOnChange";

const initialError = {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    rePassword: "",
    server: "",
  };

const useLogin = () => {
    const { data, isPending, success, error: fetchError, get } = useFetch();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError, errorChange] = useOnChange(initialError);

    const clearError = () => {
        setError(initialError);
      };

    const validate = () => {
        clearError();
        if (userName.length == 0) {
          console.log("error name")
          setError((prev) => ({ ...prev, userName: "Missing user name" }));
          return false;
        }
        if (password.length == 0) {
          console.log("error password")
          setError((prev) => ({ ...prev, password: "Missing password" }));
          return false;
        }
        return true;
    };

    const submit = () => {
        if (!validate()) return;
        //return true;
        console.log("here");
        get('users');
        console.log(data);
        console.log(success);
        return true;
      };

    return {
        submit,
        error,
        errorChange,
        isPending,
        success,
        userName,
        setUserName,
        password,
        setPassword
      };
}

export default useLogin;