import { View, Text, StyleSheet, Image } from "react-native";
import STYLES from "../styles";
import { DriverApplicationScreenProps } from "../navigation";
import {
  useDriverApplication,
  useErrorMsg,
  useGoBackHeader,
  useOnSuccess,
  useSuccessMessage,
} from "../hooks";
import { FormHeader, Icon, PressOpaque } from "../components";
import COLORS from "../colors";
import { ActionButton } from "../components/buttons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CameraScreen from "./CameraScreen";
import { useUser } from "../providers";

const DriverApplicationScreen = ({
  navigation,
  route,
}: DriverApplicationScreenProps) => {
  const { bottom } = useSafeAreaInsets();
  const party = route.params.party;
  const { user } = useUser();

  const {
    submit,
    loading,
    success,
    error,
    errorChange,

    image,

    cameraRef,
    openCamera,
    closeCamera,
    cameraOpen,
    takePicture,
  } = useDriverApplication(party);
  useGoBackHeader([cameraOpen]);

  const successMsg = useSuccessMessage();
  useOnSuccess(() => {
    successMsg(`Application Accepted`);
    navigation.goBack();
  }, success);

  useErrorMsg(error, errorChange);

  if (cameraOpen)
    return (
      <CameraScreen
        takePicture={takePicture}
        cameraRef={cameraRef}
        closeCamera={closeCamera}
        boxHeight={250}
      />
    );

  return (
    <View
      style={[
        STYLES.page,
        STYLES.column,
        STYLES.space,
        { paddingBottom: bottom },
      ]}
    >
      <View>
        <FormHeader marginTop={0} title="Driver Application" />
        <View style={[STYLES.center]}>
          <Text style={[STYLES.fs1, STYLES.colorPrimary, STYLES.textCenter]}>
            To apply as a driver one must submit an updated Drivers License
          </Text>
        </View>
        <View style={[{ marginBottom: 15 }]} />
        <PressOpaque
          onPress={openCamera}
          style={[STYLES.bgPrimary, STYLES.rad15, STYLES.center, styles.upload]}
        >
          {image ? (
            <Image
              style={[STYLES.flex, STYLES.width, STYLES.height]}
              source={{ uri: image.uri }}
            />
          ) : user && user.liscence && user.liscence.length > 0 ? (
            <Image
              style={[STYLES.flex, STYLES.width, STYLES.height]}
              source={{ uri: user.liscence }}
            />
          ) : (
            <Icon name="upload" size={40} color={COLORS.white} />
          )}
        </PressOpaque>
      </View>

      <View style={[STYLES.center]}>
        <ActionButton disabled={loading} bold text="Apply" onPress={submit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upload: {
    height: 250,
    overflow: "hidden",
  },
});

export default DriverApplicationScreen;
