import { View, Text, StyleSheet, Pressable } from "react-native";
import STYLES from "../../styles";
import COLORS from "../../colors";
import { ButtonProps } from "./Button";

const ActionButton = ({ onPress, text, disabled }: ButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        STYLES.ph15,
        STYLES.pv10,
        STYLES.rad15,
        styles.container,
        pressed || disabled ? styles.opacity : undefined,
      ]}
    >
      <Text style={[STYLES.fs1, STYLES.colorWhite]}>
        {text ?? "Action Button"}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.accent,
  },
  opacity: {
    opacity: 0.5,
  },
});

export default ActionButton;
