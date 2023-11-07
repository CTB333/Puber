import { useState, useEffect } from "react";
import { stringify } from "../utils";

interface UseFetchResult {
  data: any | null;
  isPending: boolean;
  success: boolean;
  error: any | null;
  get: (url: string) => void;
  post: (url: string, data: any) => void;
  put: (url: string, data: any) => void;
  del: (url: string) => void;
}

const URL =
  "https://6096-2605-8300-ff01-154-91de-76ed-61b8-7b38.ngrok-free.app/";

const useFetch = (): UseFetchResult => {
  const [data, setData] = useState<any | null>(null);
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

  const get = async (url: string) => {
    try {
      let controller = createAbortController();
      let res = await fetch(URL + url, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      let json = await res.json();
      successCall(json);
    } catch (e: any) {
      err(e.message);
    }
  };

  const post = async (url: string, data: any) => {
    try {
      let controller = createAbortController();
      let res = await fetch(URL + url, {
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

  const put = async (url: string, data: any) => {
    try {
      let controller = createAbortController();
      let res = await fetch(URL + url, {
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

  const del = async (url: string) => {
    try {
      let controller = createAbortController();
      let res = await fetch(URL + url, {
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

  return { data, isPending, success, error, get, post, put, del };
};

export default useFetch;
