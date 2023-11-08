import { Pressable, StyleSheet, Text, View } from "react-native";
import STYLES from "../../styles";

type RadioButtonProps = {
  onPress?: () => void;
  enabled?: boolean;
  text: string;
};

const RadioButton = ({ onPress, enabled, text }: RadioButtonProps) => {
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
        },
        pressed ? styles.opacity : undefined,
      ]}
    >
      <Text style={[STYLES.fs2, STYLES.colorPrimary]}>{text}</Text>
      <View
        style={[
          STYLES.border,
          enabled ? STYLES.bgAccent : undefined,
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
