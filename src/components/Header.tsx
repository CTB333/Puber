import { StyleSheet, View, Text } from "react-native";
import Icon from "./Icon";
import PressOpaque from "./PressOpaque";
import STYLES from "../styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackHeaderProps } from "@react-navigation/stack";
import COLORS from "../colors";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { useHeader } from "../providers";

const Header = ({
  layout: { height },
}: StackHeaderProps | BottomTabHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const { left, right, title, visible } = useHeader();
  return (
    <View
      style={[
        STYLES.bgPrimary,
        STYLES.ph25,
        styles.container,
        {
          paddingTop: top + 10,
          paddingBottom: 15,
          opacity: 1,
          // height: visible ? undefined : 0,
        },
      ]}
    >
      <View
        style={[
          { opacity: left && left.name && left.visibile != false ? 1 : 0 },
        ]}
      >
        <PressOpaque onPress={left && left.onPress ? left.onPress : undefined}>
          <Icon
            name={left && left.name ? left.name : "left"}
            size={left && left.size ? left.size : 20}
            color={left && left.color ? left.color : COLORS.white}
          />
        </PressOpaque>
      </View>

      <View
        style={[
          STYLES.absoluteFill,
          STYLES.center,
          {
            paddingTop: top + 10,
            paddingBottom: 15,
            pointerEvents: "none",
          },
        ]}
      >
        <Text style={[STYLES.fs1, STYLES.colorWhite]}>{title}</Text>
      </View>

      <View
        style={[
          { opacity: right && right?.name && right.visibile != false ? 1 : 0 },
        ]}
      >
        <PressOpaque
          onPress={right && right.onPress ? right.onPress : undefined}
        >
          <Icon
            name={right && right.name ? right.name : "right"}
            size={right && right.size ? right.size : 20}
            color={right && right.color ? right.color : COLORS.white}
          />
        </PressOpaque>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Header;
