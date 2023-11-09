import { StyleSheet, View } from "react-native";
import STYLES from "../styles";
import COLORS from "../colors";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const width = 50;

type LoadingProps = {
  color?: string;
};

const Loading = ({ color }: LoadingProps) => {
  const animation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    let rotateZ = `${interpolate(animation.value, [0, 1], [0, 360])}deg`;
    return {
      transform: [
        {
          rotateZ,
        },
      ],
    };
  });

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    animation.value = withRepeat(
      withSequence(
        withRepeat(withTiming(1, { duration: 750 }), 2),
        withTiming(0, { duration: 750 })
      ),
      -1
    );
  };
  return (
    <View style={[STYLES.center, STYLES.relative, styles.container]}>
      <View
        style={[
          STYLES.width,
          STYLES.height,
          styles.radius,
          styles.opacity,
          { borderColor: color ?? COLORS.white },
        ]}
      />
      <Animated.View
        style={[
          STYLES.width,
          STYLES.height,
          STYLES.absolute,
          styles.radius,
          animatedStyle,
          {
            borderTopColor: color ?? COLORS.white,
            borderColor: COLORS.transparent,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
  radius: {
    borderRadius: width / 2,
    borderWidth: 8,
  },
  opacity: {
    opacity: 0.5,
  },
});

export default Loading;
