import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { useDrawerProgress } from "@react-navigation/drawer";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import COLORS from "../colors";

type DrawerSceneWrapperProps = {
  children?: React.ReactNode;
};

const DrawerSceneWrapper = ({ children }: DrawerSceneWrapperProps) => {
  const progress = useDrawerProgress();

  const animatedStyle = useAnimatedStyle(() => {
    let scale = interpolate(progress.value, [0, 1], [1, 0.8], "clamp");
    let rotateY = `${interpolate(
      progress.value,
      [0, 1],
      [0, -30],
      "clamp"
    )}deg`;
    let translateX = interpolate(progress.value, [0, 1], [0, -75], "clamp");

    return {
      transform: [
        { perspective: 1000 },
        { scale },
        { rotateY },
        { translateX },
      ],
      borderRadius: interpolate(progress.value, [0, 1], [0, 30], "clamp"),
      borderWidth: interpolate(progress.value, [0, 1], [0, 1], "clamp"),
      borderColor: COLORS.white,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    overflow: "hidden",
  },
});

export default DrawerSceneWrapper;
