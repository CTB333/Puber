import { Pressable, StyleSheet, Text, View } from "react-native";
import STYLES from "../../styles";
import COLORS from "../../colors";

type RadioButtonProps = {
  onPress?: () => void;
  enabled?: boolean;
  text: string;
  color?: string;
};

const RadioButton = ({ onPress, enabled, text, color }: RadioButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        STYLES.row,
        STYLES.pv10,
        STYLES.ph15,
        STYLES.center,
        STYLES.rad15,
        STYLES.border,
        {
          justifyContent: "space-between",
          borderColor: color ? color : COLORS.primary,
        },
        pressed ? styles.opacity : undefined,
      ]}
    >
      <Text style={[STYLES.fs2, { color: color ? color : COLORS.primary }]}>
        {text}
      </Text>
      <View
        style={[
          STYLES.border,
          enabled ? STYLES.bgAccent : undefined,
          {
            borderColor: color ? color : COLORS.primary,
          },
          styles.circle,
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  opacity: {
    opacity: 0.5,
  },
});

export default RadioButton;
