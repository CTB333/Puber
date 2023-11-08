import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { AddPartyScreenProps } from "../navigation";
import { useEffect } from "react";
import {
  useAccountHeader,
  useAddParty,
  useEnableDrawerSwipe,
  useErrorMsg,
  useModalComponent,
  useOnSuccess,
  useSuccessMessage,
} from "../hooks";
import { FormHeader, Input, ScrollFooterSpace } from "../components";
import { ScrollView } from "react-native-gesture-handler";
import { ActionButton, Button } from "../components/buttons";

const AddPartyScreen = ({ navigation }: AddPartyScreenProps) => {
  useEnableDrawerSwipe();
  useAccountHeader();

  const {
    submit,
    success,
    loading,
    error,
    errorChange,
    addressError,
    addressErrorChange,

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
  } = useAddParty();

  const successMsg = useSuccessMessage();

  useOnSuccess(() => {
    successMsg(`Success`, `Party Created`);
    navigation.navigate("Home");
  }, success);

  useErrorMsg(error, errorChange);
  useErrorMsg(addressError, addressErrorChange);

  return (
    <View style={[STYLES.page, STYLES.relative, STYLES.center]}>
      <ScrollView style={[STYLES.flex, STYLES.width]}>
        <FormHeader title="Basic Info" />
        <Input placeholder="Party Title" state={title} setState={setTitle} />
        <Input placeholder="Party Desc" state={desc} setState={setDesc} />

        <FormHeader title="Location Info" />
        <Input placeholder="Street" state={street} setState={setStreet} />
        <Input placeholder="City" state={city} setState={setCity} />
        <Input placeholder="Zip" state={zip} setState={setZip} />
        <Input placeholder="State" state={state} setState={setState} />
        <Input
          disabled
          placeholder="Country"
          state={country}
          setState={setCountry}
        />

        <FormHeader title="Date Info" />
        <Input placeholder="Party Date" state={date} setState={setDate} />
        <Input
          placeholder="Start Time"
          state={startTime}
          setState={setStartTime}
        />
        <Input placeholder="End Time" state={endTime} setState={setEndTime} />

        <ScrollFooterSpace divideBy={3} />
      </ScrollView>
      <View style={[STYLES.center]}>
        <ActionButton disabled={loading} text="Submit" onPress={submit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddPartyScreen;
