import React from "react";
import { Pressable, View } from "react-native";

type PressOpaqueProps = {
  children: React.ReactNode | ((pressed: boolean) => React.ReactNode);
  onPress?: () => void;
};

const PressOpaque = ({ children, onPress }: PressOpaqueProps) => {
  const childTakesPress = typeof children == "function";
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
    >
      {childTakesPress ? ({ pressed }) => children(pressed) : children}
    </Pressable>
  );
};

export default PressOpaque;
