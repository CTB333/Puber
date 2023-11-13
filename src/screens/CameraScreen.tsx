import { View, Text, StyleSheet, Image } from "react-native";
import STYLES from "../styles";
import { useNoHeader } from "../hooks";
import { Button, Icon, PressOpaque } from "../components";
import { Camera } from "expo-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../colors";

type CameraScreenProps = {
  closeCamera: () => void;
  takePicture: () => Promise<void>;
  cameraRef: React.MutableRefObject<Camera | null>;
  boxHeight?: number;
};

const CameraScreen = ({
  closeCamera,
  cameraRef,
  takePicture,
  boxHeight,
}: CameraScreenProps) => {
  useNoHeader();
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[STYLES.flex]}>
      <Camera
        style={[STYLES.flex, STYLES.relative]}
        ref={(ref) => {
          cameraRef.current = ref;
        }}
      >
        {boxHeight ? (
          <View style={[STYLES.absoluteFill]}>
            <View style={[STYLES.width, STYLES.flex, styles.overlayColor]} />
            <View style={[STYLES.width, { height: boxHeight }, STYLES.row]}>
              <View
                style={[styles.overlayColor, STYLES.height, { minWidth: 15 }]}
              />
              <View
                style={[
                  STYLES.bgTransparent,
                  STYLES.borderWhite,
                  STYLES.rad10,
                  STYLES.flex,
                  { borderWidth: 4, height: boxHeight },
                ]}
              />
              <View
                style={[styles.overlayColor, STYLES.height, { minWidth: 15 }]}
              />
            </View>
            <View style={[STYLES.width, STYLES.flex, styles.overlayColor]} />
          </View>
        ) : null}

        <View
          style={[
            STYLES.absolute,
            STYLES.center,
            STYLES.row,
            STYLES.p15,
            {
              top: 0,
              left: 0,
              right: 0,
              justifyContent: "flex-end",
              zIndex: 10,
            },
          ]}
        >
          <PressOpaque onPress={closeCamera} style={[STYLES.center]}>
            <Icon name="cross" color={COLORS.white} size={25} />
          </PressOpaque>
        </View>

        <View
          style={[
            STYLES.absolute,
            STYLES.center,
            { bottom, left: 0, right: 0 },
          ]}
        >
          <PressOpaque
            onPress={takePicture}
            style={[STYLES.center, styles.capture]}
          >
            <View style={[styles.captureCircle]} />
          </PressOpaque>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  capture: {
    width: 75,
    height: 75,
    borderColor: COLORS.white,
    borderWidth: 4,
    backgroundColor: COLORS.accent,
    borderRadius: 75,
  },
  captureCircle: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 75,
  },
  overlayColor: {
    backgroundColor: COLORS.primary,
    opacity: 0.95,
  },
});

export default CameraScreen;
