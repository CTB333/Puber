import * as Location from "expo-location";
import { useEffect, useState } from "react";
import useOnChange from "./useOnChange";
import useErrorMsg from "./useErrorMsg";

const initialError = {
  permission: "",
};

const useGetUserLocation = () => {
  const [location, setLocation, locationChange] = useOnChange<
    { lat: number; lng: number } | undefined
  >(undefined);
  const [error, setError, errorChange] = useOnChange(initialError);

  useEffect(() => {
    getLocation();
  }, []);

  useErrorMsg(error, errorChange);

  const getLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError((prev) => ({
          permission: "Permission to access location was denied",
        }));
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    })();
  };

  return {
    location,
    locationChange,
  };
};

export default useGetUserLocation;
