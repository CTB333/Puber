import { useState, useEffect } from "react";
import { stringify } from "../utils";
import CONSTANTS from "../Constants";
import useOnChange from "./useOnChange";

interface UseFetchResult {
  data: any | null;
  dataChange: number;
  isPending: boolean;
  success: boolean;
  error: any | null;
  get: (url: string, baseURL?: string) => void;
  post: (url: string, data: any, baseURL?: string) => void;
  put: (url: string, data: any, baseURL?: string) => void;
  del: (url: string, baseURL?: string) => void;
}

const useFetch = (): UseFetchResult => {
  const [data, setData, dataChange] = useOnChange<any | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [abort, setAbort] = useState<AbortController | null>(null);
  const [tOut, setTOut] = useState<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     fetch(url)
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw Error("Error fetching users data");
  //         }
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setData(data);
  //         setIsPending(false);
  //         setError(null);
  //       })
  //       .catch((err) => {
  //         setIsPending(false);
  //         setError(err.message);
  //       });
  //   }, 1000);
  // }, [url]);

  const toUrl = (url: string, baseURL?: string) => {
    if (!baseURL) return CONSTANTS.URL + url;

    return baseURL + url;
  };

  const get = async (url: string, baseURL?: string) => {
    console.log("outside try")
    try {
      console.log("inside try")
      let controller = createAbortController();
      console.log("1");
      let res = await fetch(toUrl(url, baseURL), {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      console.log("2");
      let json = await res.json();
      console.log("3");
      console.log("json: "+json);
      successCall(json);
    } catch (e: any) {
      console.log(e);
      err(e.message);
    }
  };

  const post = async (url: string, data: any, baseURL?: string) => {
    try {
      let controller = createAbortController();
      let res = await fetch(toUrl(url, baseURL), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: stringify(data),
      });
      let json = await res.json();
      successCall(json);
    } catch (e: any) {
      err(e.message);
    }
  };

  const put = async (url: string, data: any, baseURL?: string) => {
    try {
      let controller = createAbortController();
      let res = await fetch(toUrl(url, baseURL), {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: stringify(data),
      });
      let json = await res.json();
      successCall(json);
    } catch (e: any) {
      err(e.message);
    }
  };

  const del = async (url: string, baseURL?: string) => {
    try {
      let controller = createAbortController();
      let res = await fetch(toUrl(url, baseURL), {
        method: "DELETE",
        signal: controller.signal,
      });
      let json = await res.json();
      successCall(json);
    } catch (e: any) {
      err(e.message);
    }
  };

  const createAbortController = () => {
    if (isPending && abort) {
      console.log(`Aborting Old`);
      abort.abort();
    }

    let controller = new AbortController();

    setAbort(controller);

    let timeout = setTimeout(() => {
      controller.abort();
    }, 5000);

    setTOut(timeout);

    setIsPending(true);

    return controller;
  };

  const successCall = (data: any) => {
    clearTOut();
    setData(data);
    setIsPending(false);
    setSuccess(true);
    setError(null);
  };

  const err = (msg?: string) => {
    setIsPending(false);
    setSuccess(false);
    clearTOut();
    setError(msg ?? "Internal Front-End Error");
  };

  const clearTOut = () => {
    if (tOut) clearTimeout(tOut);
    setTOut(null);
    setAbort(null);
  };

  return { data, dataChange, isPending, success, error, get, post, put, del };
};

export default useFetch;
