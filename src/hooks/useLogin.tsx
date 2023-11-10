import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import useOnChange from "./useOnChange";
import { stringify } from "../utils";
import { useUser } from "../providers";
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

const useLogin = () => {
    const { data, isPending, error: fetchError, get } = useFetch();
    const {setUser} = useUser();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {store} = useRememberUser();
    const [success, setSuccess] = useState(false);
    const [error, setError, errorChange] = useOnChange(initialError);
    const [correctUser, setCorrectUser] = useState("");

    useEffect(() => {
      if(!fetchError) return
      setError((prev) => ({ ...prev, server: fetchError}));
    }, [stringify([fetchError])])

    useEffect(() => {
      validateUser();
    }, [stringify(data)])

    const clearError = () => {
        setError(initialError);
      };

    const validate = () => {
        clearError();
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

    const validateUser = () =>{
      if(!data){
        return
      }
      for(const user of data){
        if(user.userName == userName && user.password == password){
          setUser(user)
          store(user.id)
          setSuccess(true)
          return
        }
      }

      setError(prev => ({...prev, server: `Username and Password don't match`}))
    }

    const submit = () => {
        setSuccess(false)
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
      };
}

export default useLogin;