import { View, Text, StyleSheet, Image } from "react-native";
import STYLES from "../styles";
import { DriverApplicationScreenProps } from "../navigation";
import { useDriverApplication, useErrorMsg, useGoBackHeader } from "../hooks";
import { FormHeader, Icon, PressOpaque } from "../components";
import COLORS from "../colors";
import { ActionButton } from "../components/buttons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CameraScreen from "./CameraScreen";

const DriverApplicationScreen = ({
  navigation,
}: DriverApplicationScreenProps) => {
  const { bottom } = useSafeAreaInsets();

  const {
    submit,
    error,
    errorChange,

    image,

    cameraRef,
    openCamera,
    closeCamera,
    cameraOpen,
    takePicture,
  } = useDriverApplication();

  useGoBackHeader([cameraOpen]);

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
          ) : (
            <Icon name="upload" size={40} color={COLORS.white} />
          )}
        </PressOpaque>
      </View>

      <View style={[STYLES.center]}>
        <ActionButton bold text="Apply" onPress={submit} />
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
