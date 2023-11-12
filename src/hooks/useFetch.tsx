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
  errorChange: number;
  get: (url: string, baseURL?: string) => void;
  post: (url: string, data: any, baseURL?: string) => void;
  put: (url: string, data: any, baseURL?: string) => void;
  del: (url: string, baseURL?: string) => void;
}

const useFetch = (): UseFetchResult => {
  const [data, setData, dataChange] = useOnChange<any | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError, errorChange] = useOnChange<string | null>(null);
  const [abort, setAbort] = useState<AbortController | null>(null);
  const [tOut, setTOut] = useState<NodeJS.Timeout | null>(null);

  const allowedStatusCodes = [200, 201];

  const toUrl = (url: string, baseURL?: string) => {
    if (!baseURL) return CONSTANTS.URL + url;

    return baseURL + url;
  };

  const get = async (url: string, baseURL?: string) => {
    try {
      let controller = createAbortController();
      let res = await fetch(toUrl(url, baseURL), {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!allowedStatusCodes.includes(res.status))
        throw new Error(`Internal Server Error: ${res.status}`);
      let json = await res.json();
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
      if (!allowedStatusCodes.includes(res.status))
        throw new Error(`Internal Server Error: ${res.status}`);
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
      if (!allowedStatusCodes.includes(res.status))
        throw new Error(`Internal Server Error: ${res.status}`);
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
      if (!allowedStatusCodes.includes(res.status))
        throw new Error(`Internal Server Error: ${res.status}`);
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
    setSuccess(false);

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

  return {
    data,
    dataChange,
    errorChange,
    isPending,
    success,
    error,
    get,
    post,
    put,
    del,
  };
};

export default useFetch;
