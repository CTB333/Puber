import React, { useCallback, useEffect } from "react";
import STYLES from "../styles";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type CollapsableProps = {
  open: boolean;
  duration?: number;
  children: React.ReactNode;
};

const Collapsable = ({ children, open, duration }: CollapsableProps) => {
  const sharedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const number = interpolate(sharedValue.value, [0, 1], [0, 100], "clamp");
    const opacity = interpolate(
      sharedValue.value,
      [0, 0.1, 1],
      [0, 0, 1],
      "clamp"
    );
    return {
      maxHeight: `${number}%`,
      opacity,
    };
  }, []);

  useEffect(() => {
    animate(open);
  }, [open]);

  const animate = useCallback((open: boolean) => {
    sharedValue.value = withTiming(open ? 1 : 0, {
      duration: duration ?? 500,
    });
  }, []);

  return (
    <Animated.View
      style={[STYLES.width, { overflow: "hidden" }, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
};

export default Collapsable;
