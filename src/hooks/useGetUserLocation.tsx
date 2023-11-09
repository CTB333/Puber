import * as Location from "expo-location";
import { useEffect, useState } from "react";
import useOnChange from "./useOnChange";

const initialError = {
  permission: "",
};

const useGetUserLocation = () => {
  const [location, setLocation] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  const [error, setError, errorChange] = useOnChange(initialError);

  useEffect(() => {
    getLocation();
  }, []);

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
    error,
    errorChange,
  };
};

export default useGetUserLocation;
