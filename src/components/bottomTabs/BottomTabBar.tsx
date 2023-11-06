import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import STYLES from "../../styles";
import COLORS from "../../colors";
import BottomTabBarItem from "./BottomTabBarItem";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { stringify } from "../../utils";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const BottomTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  const [locations, setLocations] = useState<{ x: number; index: number }[]>(
    []
  );

  const onLayout = (event: LayoutChangeEvent, index: number) => {
    let value = {
      x: event.nativeEvent.layout.x,
      index,
    };

    if (locations.length == routes.length) return;

    setLocations((prev) => [...prev, value]);
  };

  const xOffset = useDerivedValue(() => {
    if (locations.length !== routes.length) return 0;

    return [...locations].find(({ index }) => index === activeIndex)!.x - 25;
  }, [activeIndex, locations.length]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });

  return (
    <View style={[STYLES.bgPrimary, { paddingBottom: bottom }]}>
      <AnimatedSvg
        // xmlns="http://www.w3.org/2000/svg"
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[animatedStyle, { position: "absolute" }]}
        fill="none"
      >
        <Path
          fill={COLORS.secondary}
          d="M20 0H0c11.046 0 20 8.954 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.046 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={[styles.container]}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];
          return (
            <BottomTabBarItem
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => onLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default BottomTabBar;
