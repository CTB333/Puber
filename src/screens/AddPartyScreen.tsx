import { View, Image, StyleSheet } from "react-native";
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
import {
  FormHeader,
  Icon,
  Input,
  PressOpaque,
  RadioButton,
  ScrollFooterSpace,
} from "../components";
import { ScrollView } from "react-native-gesture-handler";
import { ActionButton, Button } from "../components/buttons";
import { AllPartyTags } from "../interfaces";
import CONSTANTS from "../Constants";
import COLORS from "../colors";
import CameraScreen from "./CameraScreen";

const AddPartyScreen = ({ navigation }: AddPartyScreenProps) => {
  useEnableDrawerSwipe();
  useAccountHeader();

  const {
    submit,
    reset,
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
    hideAddress,
    setHideAddress,
    tags,
    setTags,

    image,
    cameraRef,
    openCamera,
    closeCamera,
    cameraOpen,
    takePicture,
  } = useAddParty();

  const successMsg = useSuccessMessage();

  useOnSuccess(() => {
    successMsg(`Success`, `Party Created`);
    reset();
    navigation.navigate("Home");
  }, success);

  useErrorMsg(error, errorChange);
  useErrorMsg(addressError, addressErrorChange);

  if (cameraOpen)
    return (
      <CameraScreen
        takePicture={takePicture}
        cameraRef={cameraRef}
        closeCamera={closeCamera}
        boxHeight={CONSTANTS.PartyImageHeight}
      />
    );

  return (
    <View style={[STYLES.page, STYLES.relative, STYLES.center]}>
      <ScrollView style={[STYLES.flex, STYLES.width]}>
        <PressOpaque
          onPress={openCamera}
          style={[
            STYLES.center,
            STYLES.width,
            STYLES.rad15,
            STYLES.bgPrimary,
            { height: CONSTANTS.PartyImageHeight, overflow: "hidden" },
          ]}
        >
          {image ? (
            <Image
              style={[STYLES.flex, STYLES.width, STYLES.height]}
              source={{ uri: image.uri }}
            />
          ) : (
            <Icon name="upload" size={40} color={COLORS.white} />
          )}
        </PressOpaque>
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
        <View style={{ marginBottom: 15 }} />
        <RadioButton
          enabled={hideAddress}
          text={"Hide Address"}
          onPress={() => setHideAddress((prev) => !prev)}
        />

        <FormHeader title="Date Info" />
        <Input placeholder="Party Date" state={date} setState={setDate} />
        <Input
          placeholder="Start Time"
          state={startTime}
          setState={setStartTime}
        />
        <Input placeholder="End Time" state={endTime} setState={setEndTime} />

        <FormHeader title="Categories" />
        {AllPartyTags.map((tag) => {
          return (
            <View key={tag} style={[{ marginBottom: 15 }]}>
              <RadioButton
                enabled={tags.includes(tag)}
                text={tag}
                onPress={() => setTags(tag)}
              />
            </View>
          );
        })}

        <ScrollFooterSpace divideBy={6} />
      </ScrollView>
      <View style={[STYLES.center]}>
        <ActionButton disabled={loading} text="Submit" onPress={submit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddPartyScreen;
