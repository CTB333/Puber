import {
  Pressable,
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
} from "react-native";
import COLORS from "../../colors";
import STYLES from "../../styles";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

type BottomTabBarItemProps = {
  onPress: () => void;
  active: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
};

const BottomTabBarItem = ({
  onPress,
  active,
  options,
  onLayout,
}: BottomTabBarItemProps) => {
  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0.5, { duration: 250 }),
        },
      ],
    };
  });

  const animatedIconContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 1, { duration: 250 }),
    };
  });

  return (
    <Pressable
      onLayout={onLayout}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.opacity : undefined,
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          animatedCircleStyle,
          active ? { backgroundColor: COLORS.accent } : { marginTop: 10 },
        ]}
      >
        <Animated.View
          style={[
            STYLES.absoluteFill,
            STYLES.center,
            animatedIconContainerStyle,
          ]}
        >
          {options?.tabBarIcon ? (
            options.tabBarIcon({
              focused: active,
              color: COLORS.white,
              size: 30,
            })
          ) : (
            <Text style={[STYLES.colorWhite]}>?</Text>
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    marginTop: -5,
  },
  circle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
  opacity: {
    opacity: 0.5,
  },
});

export default BottomTabBarItem;
