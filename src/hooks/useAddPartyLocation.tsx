import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import useOnChange from "./useOnChange";
import { stringify } from "../utils";
import CONSTANTS from "../Constants";
import { PartyLocation } from "../interfaces";

import { View, Text, ScrollView } from "react-native";
import STYLES from "../styles";
import { Button, DropDown, FormHeader, MyScrollView } from "../components";
import useModalComponent from "./useModalComponent";
import { ActionButton } from "../components/buttons";

const initialError = {
  street: "",
  city: "",
  zip: "",
  state: "",
  country: "",
  server: "",
};

const useAddPartyLocation = () => {
  const { data, dataChange, error: fetchError, isPending, get } = useFetch();

  const [partyLocation, setPartyLocation, partyLocationChange] = useOnChange<
    PartyLocation | undefined
  >(undefined);
  const [locationOptions, setLocationOptions, locationOptionsChange] =
    useOnChange<PartyLocation[]>([]);
  const [chosenLocation, setChosenLocation, chosenLocationChange] = useOnChange<
    PartyLocation | undefined
  >(undefined);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("US");

  const [error, setError, errorChange] = useOnChange(initialError);

  const { open, close, isOpen } = useModalComponent(
    (close) => (
      <View
        style={[
          STYLES.width,
          STYLES.bgWhite,
          STYLES.rad15,
          STYLES.p15,

          STYLES.shadow,
          { overflow: "hidden", maxHeight: "50%" },
        ]}
      >
        <MyScrollView styles={[STYLES.width]}>
          <View style={[STYLES.width, STYLES.center]}>
            <FormHeader marginTop={0} marginBottom={10} title="Warning" />
            <Text style={[STYLES.fs1, STYLES.colorPrimary]}>
              Multiple Address Found For:
            </Text>
            <Text
              style={[
                STYLES.fs1,
                STYLES.colorPrimary,
                STYLES.bold,
                STYLES.textCenter,
              ]}
            >
              {createFullAddress()}
            </Text>
            <Text style={[STYLES.fs1, STYLES.colorPrimary]}>
              Did your mean any of the following?
            </Text>

            <View style={[{ marginTop: 10 }]} />

            <DropDown
              placeHolder="Found Addresses"
              state={
                chosenLocation
                  ? {
                      key: chosenLocation.fullAddress,
                      value: chosenLocation.fullAddress,
                      text: chosenLocation.fullAddress,
                    }
                  : undefined
              }
              setState={(value) =>
                setChosenLocation(
                  locationOptions.find(
                    (option) => value?.key === option.fullAddress
                  )
                )
              }
              options={locationOptions.map((option) => ({
                key: option.fullAddress,
                value: option.fullAddress,
                text: option.fullAddress,
              }))}
            />

            <View style={[{ marginTop: 15 }]} />

            <View style={[STYLES.row, STYLES.width, STYLES.even]}>
              <Button text="Choose On Map" onPress={close} />
              <ActionButton
                disabled={chosenLocation === undefined}
                text="Select Location"
                onPress={syncroniseState}
              />
            </View>
          </View>
        </MyScrollView>
      </View>
    ),
    [
      street,
      city,
      zip,
      state,
      country,
      locationOptionsChange,
      chosenLocationChange,
    ]
  );

  useEffect(() => {
    if (!fetchError) return;

    setError((prev) => ({ ...prev, server: fetchError }));
  }, [stringify(fetchError)]);

  useEffect(() => {
    if (!data?.results) return;

    recieveData();
  }, [dataChange]);

  useEffect(() => {
    if (locationOptions.length == 0) return;
    open();
  }, [locationOptionsChange]);

  useEffect(() => {
    if (isOpen) return;

    if (!chosenLocation) return;

    syncroniseState();

    setPartyLocation(chosenLocation);
  }, [chosenLocationChange, isOpen]);

  const clearError = () => {
    setError(initialError);
  };

  const validate = () => {
    clearError();

    if (street.length == 0) {
      setError((prev) => ({ ...prev, street: "Missing street address" }));
      return false;
    }
    if (city.length == 0) {
      setError((prev) => ({ ...prev, city: "Missing city" }));
      return false;
    }
    if (zip.length == 0) {
      setError((prev) => ({ ...prev, zip: "Missing zip code" }));
      return false;
    }
    if (state.length == 0) {
      setError((prev) => ({ ...prev, state: "Missing state" }));
      return false;
    }
    if (country.length == 0) {
      setError((prev) => ({ ...prev, country: "Missing country" }));
      return false;
    }

    return true;
  };

  // Create google request url
  const createQuery = () => {
    let fullAddress = createFullAddress();
    let query =
      fullAddress.split(" ").join("+") + `&key=${CONSTANTS.GoogleAPIKey}`;

    // console.log(`Query: ${query}`);
    return query;
  };

  const createFullAddress = () => {
    return `${street.trim()}, ${city.trim()} ${zip.trim()}, ${state.trim()} , ${country.trim()}`;
  };

  const reset = () => {
    clearError();
    setPartyLocation(undefined);
    setLocationOptions([]);
    setChosenLocation(undefined);
    setStreet("");
    setCity("");
    setZip("");
    setState("");
    setCountry("US");
  };

  // Submit Address to google to get lat/lng
  const submit = () => {
    if (!validate()) return;

    get(createQuery(), CONSTANTS.GeoCodeURL);
  };

  // Syncronise hook state and chosen location
  const syncroniseState = () => {
    if (!chosenLocation) return;
    setStreet(chosenLocation.street);
    setState(chosenLocation.state);
    setCity(chosenLocation.city);
    setZip(chosenLocation.zip);
    setCountry(chosenLocation.country);
    if (isOpen) close();
  };

  // Get Address Data from google response
  const getDataAddressComponents = (addressComponents: any[]) => {
    let wantedKeys = [
      "street_number",
      "route",
      "locality",
      "administrative_area_level_1",
      "country",
      "postal_code",
    ];
    let components = {
      street_number: "",
      route: "",
      locality: "",
      administrative_area_level_1: "",
      country: "",
      postal_code: "",
    };
    console.log(`Address Components: `);

    for (let component of addressComponents) {
      let componentType = component.types[0];

      if (!wantedKeys.includes(componentType)) continue;

      let wantedKey = wantedKeys.find((key) => componentType == key)!;
      components[wantedKey as keyof typeof components] = component.short_name;
    }

    let googleStreet = `${components.street_number} ${components.route}`;
    let googleZip = `${components.postal_code}`;
    let googleCountry = `${components.country}`;
    let googleCity = `${components.locality}`;
    let googleState = `${components.administrative_area_level_1}`;
    let googleFull = `${googleStreet} ${googleCity} ${googleState} ${googleZip} ${googleCountry}`;

    return {
      googleStreet,
      googleZip,
      googleCountry,
      googleCity,
      googleState,
      googleFull,
    };
  };

  // Combinge google data into Puber Data
  const getDataLocation = (result: any): PartyLocation => {
    let addressComponents = result.address_components;
    let geometry = result.geometry.location;
    let lat = geometry.lat;
    let lng = geometry.lng;
    let {
      googleStreet,
      googleZip,
      googleCountry,
      googleCity,
      googleState,
      googleFull,
    } = getDataAddressComponents(addressComponents);

    return {
      street: googleStreet,
      city: googleCity,
      state: googleState,
      zip: googleZip,
      country: googleCountry,
      fullAddress: googleFull,
      lat,
      lng,
    };
  };

  // Do what needs to be done with the location data from google
  const recieveData = () => {
    let results = data?.results;

    if (!Array.isArray(results))
      return setError((prev) => ({
        ...prev,
        server: "Internal Front-End Error: GeoCoding",
      }));
    if (data.status !== "OK")
      return setError((prev) => ({
        ...prev,
        server: "Internal Front-End Error: Status Not OK",
      }));

    if (results.length <= 0)
      return setError((prev) => ({
        ...prev,
        server: "Address could not be found please re-enter",
      }));

    const locations: PartyLocation[] = results.map((result) =>
      getDataLocation(result)
    );

    // console.log(`Locations: ${stringify(locations)}`);
    // console.log();

    if (locations.length !== 1) {
      setLocationOptions(locations);
      return;
    }

    setChosenLocation(locations[0]);
  };

  return {
    submit,
    reset,
    error,
    errorChange,
    validate,

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

    partyLocation,
    partyLocationChange,
  };
};

export default useAddPartyLocation;
