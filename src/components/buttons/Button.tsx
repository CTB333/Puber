import { View, Text, StyleSheet, Pressable } from "react-native";
import STYLES from "../../styles";
import COLORS from "../../colors";

export type ButtonProps = {
  onPress?: () => void;
  text?: string;
  disabled?: boolean;
  bold?: boolean;
  big?: boolean;
};

const Button = ({ onPress, text, disabled, bold, big }: ButtonProps) => {
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
        bold ? { borderWidth: 2 } : undefined,
      ]}
    >
      <Text
        style={[
          big ? STYLES.fs2 : STYLES.fs1,
          STYLES.colorPrimary,
          bold ? STYLES.bold : undefined,
        ]}
      >
        {text ?? "Button"}
      </Text>
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
