import { View, Text, StyleSheet, Pressable } from "react-native";
import STYLES from "../../styles";
import COLORS from "../../colors";

type ButtonProps = {
  onPress?: () => void;
  text?: string;
  disabled?: boolean;
};

const Button = ({ onPress, text, disabled }: ButtonProps) => {
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
      <Text>{text ?? "Button"}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  opacity: {
    opacity: 0.5,
  },
});

export default Button;
