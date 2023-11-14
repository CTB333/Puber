import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";

type PressOpaqueProps = {
  children?: React.ReactNode | ((pressed: boolean) => React.ReactNode);
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle> | ((pressed: boolean) => StyleProp<ViewStyle>);
};

const PressOpaque = ({
  disabled,
  children,
  onPress,
  style,
}: PressOpaqueProps) => {
  const childTakesPress = typeof children == "function";
  const styleIsFunc = typeof style == "function";
  const styleIsArray = styleIsFunc
    ? Array.isArray(style(false))
    : Array.isArray(style);

  // const parentStyles = (pressed: boolean) => styleIsArray ? styleIsFunc ? ...style(pressed) :  : styleIsFunc ? style(pressed) : style
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        styleIsFunc ? style(pressed) : style,
      ]}
    >
      {childTakesPress ? ({ pressed }) => children(pressed) : children}
    </Pressable>
  );
};

export default PressOpaque;
