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
    const [correctUser, setCorrectUser] = useState("");

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

    const validateUser = () =>{
      for(const users in data){
        if(users.userName == userName){
          if(users.password == password){
            return true;
          }
        }
      }
    }

    const submit = () => {
        if (!validate()) return;
        get(`users`)
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
        setPassword,
        validateUser,
        correctUser
      };
}

export default useLogin;