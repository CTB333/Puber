import { useEffect, useState } from "react";
import useAddPartyLocation from "./useAddPartyLocation";
import {
  dateAndTimeStringToDate,
  dateToString,
  isDateAfterToday,
  isStringValidDate,
  isStringValidTime,
  stringify,
} from "../utils";
import useFetch from "./useFetch";
import { Party, PartyData, PartyTag } from "../interfaces";
import useOnChange from "./useOnChange";
import { useUser } from "../providers";

const initialError = {
  title: "",
  desc: "",
  date: "",
  startTime: "",
  endTime: "",
  server: "",
};

const useAddParty = () => {
  const { data, post, error: fetchError } = useFetch();
  const { user } = useUser();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(dateToString(new Date()));
  const [startTime, setStartTime] = useState("9:00 PM");
  const [endTime, setEndTime] = useState("12:00 PM");
  const [hideAddress, setHideAddress] = useState(false);
  const [tags, setTags] = useState<PartyTag[]>([]);
  const {
    partyLocation,
    partyLocationChange,
    submit: submitAddress,
    reset: resetAddress,
    error: addressError,
    errorChange: addressErrorChange,

    street,
    setStreet,
    city,
    setCity,
    zip,
    setZip,
    state,
    setState,
    country,
    setCountry,
  } = useAddPartyLocation();

  const [error, setError, errorChange] = useOnChange(initialError);

  useEffect(() => {
    if (!fetchError) return;

    setError((prev) => ({ ...prev, server: fetchError }));
  }, [stringify(fetchError)]);

  useEffect(() => {
    if (!partyLocation) return;

    submit();
  }, [partyLocationChange]);

  useEffect(() => {
    for (let key in addressError) {
      let value = addressError[key as keyof typeof addressError];
      if (value.length > 0) {
        errorOut();
        break;
      }
    }
  }, [addressErrorChange]);

  useEffect(() => {
    if (!data) return;

    console.log(`Party: ${stringify(data)}`);
    console.log();

    setSuccess(true);
    setLoading(false);
  }, [stringify(data)]);

  const clearError = () => {
    setError(initialError);
  };

  const errorOut = () => {
    setSuccess(false);
    setLoading(false);
    return false;
  };

  const validate = () => {
    clearError();

    if (!partyLocation) {
      setError((prev) => ({
        ...prev,
        server: `Internal Front-End Error: Missing Party Location`,
      }));
      return errorOut();
    }
    if (title.length == 0) {
      setError((prev) => ({ ...prev, title: `Missing party title` }));
      return errorOut();
    }
    if (desc.length == 0) {
      setError((prev) => ({ ...prev, desc: `Missing party desc` }));
      return errorOut();
    }
    if (date.length == 0) {
      setError((prev) => ({ ...prev, date: `Missing party date` }));
      return errorOut();
    }
    if (startTime.length == 0) {
      setError((prev) => ({ ...prev, startTime: `Missing party start time` }));
      return errorOut();
    }
    if (endTime.length == 0) {
      setError((prev) => ({ ...prev, endTime: `Missing party end time` }));
      return errorOut();
    }

    if (!isStringValidDate(date)) {
      setError((prev) => ({
        ...prev,
        date: `Date should be in mm/dd/yy format`,
      }));
      return errorOut();
    }

    if (!isStringValidTime(startTime)) {
      setError((prev) => ({
        ...prev,
        startTime: `Time should be in hh:mm AM/PM format`,
      }));
      return errorOut();
    }

    if (!isStringValidTime(endTime)) {
      setError((prev) => ({
        ...prev,
        startTime: `Time should be in hh:mm AM/PM format`,
      }));
      return errorOut();
    }

    if (!isDateAfterToday(dateAndTimeStringToDate(date, startTime))) {
      setError((prev) => ({
        ...prev,
        date: `Date and start time must be after today`,
      }));
      return errorOut();
    }

    return true;
  };

  const selectTag = (tag: PartyTag) => {
    let newTags = [...tags];
    if (newTags.includes(tag)) newTags = newTags.filter((old) => old !== tag);
    else newTags.push(tag);

    setTags(newTags);
  };

  const reset = () => {
    clearError();
    resetAddress();
    setTitle("");
    setDesc("");
    setDate(dateToString(new Date()));
    setStartTime("9:00 PM");
    setEndTime("12:00 PM");
    setTags([]);
  };

  const submit = () => {
    if (!validate()) return;
    if (!partyLocation) return;

    let dateTime = dateAndTimeStringToDate(date, startTime);

    let party: PartyData = {
      userId: user!.id,
      title,
      desc,
      location: partyLocation,
      date: {
        date,
        start: startTime,
        end: endTime,
        dateTime: dateTime.getTime(),
      },
      tags,
      drivers: [],
      guests: [],
      hideAddress,
    };

    post(`parties`, party);
  };

  return {
    submit: () => {
      setSuccess(false);
      setLoading(true);
      submitAddress();
    },
    success,
    reset,
    loading,
    error,
    addressError,
    addressErrorChange,
    errorChange,

    title,
    setTitle,
    desc,
    setDesc,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    street,
    setStreet,
    city,
    setCity,
    zip,
    setZip,
    state,
    setState,
    country,
    setCountry,
    hideAddress,
    setHideAddress,
    tags,
    setTags: selectTag,
  };
};

export default useAddParty;
