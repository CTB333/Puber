import { StyleSheet, TextInput, Text, View } from "react-native";
import COLORS from "../../colors";
import STYLES from "../../styles";
import useOpen from "../../hooks/useOpen";

type InputProps = {
  placeholder?: string;
  disabled?: boolean;
  state: string;
  setState: (val: string) => void;
  color?: string;
};

const Input = ({
  placeholder,
  disabled,
  state,
  setState,
  color,
}: InputProps) => {
  const [isFocused, focus, unFocus] = useOpen();
  return (
    <View style={[STYLES.width]}>
      <Text
        style={[
          STYLES.mh10,
          STYLES.fs1,
          {
            color: isFocused ? COLORS.accent : color ? color : COLORS.primary,
          },
        ]}
      >
        {placeholder ?? "PlaceHolder"}
      </Text>
      <TextInput
        onFocus={focus}
        onBlur={unFocus}
        editable={!disabled}
        placeholder=""
        value={state}
        onChangeText={setState}
        style={[
          STYLES.fs2,
          STYLES.p5,
          STYLES.colorPrimary,
          styles.container,
          {
            color: isFocused ? COLORS.accent : color ? color : COLORS.primary,
            borderColor: isFocused
              ? COLORS.accent
              : color
              ? color
              : COLORS.primary,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
});

export default Input;
