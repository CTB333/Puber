import { StyleSheet, TextInput, Text, View } from "react-native";
import COLORS from "../../colors";
import STYLES from "../../styles";
import { useOpen } from "../../hooks";

type InputProps = {
  placeholder?: string;
  state: string;
  setState: (val: string) => void;
};

const Input = ({ placeholder, state, setState }: InputProps) => {
  const [isFocused, focus, unFocus] = useOpen();
  return (
    <View style={[STYLES.width]}>
      <Text
        style={[
          STYLES.mh10,
          STYLES.fs1,
          STYLES.colorPrimary,
          isFocused ? { color: COLORS.accent } : undefined,
        ]}
      >
        {placeholder ?? "PlaceHolder"}
      </Text>
      <TextInput
        onFocus={focus}
        onBlur={unFocus}
        placeholder=""
        value={state}
        onChangeText={setState}
        style={[
          STYLES.fs2,
          STYLES.p5,
          styles.container,
          isFocused
            ? { borderColor: COLORS.accent, color: COLORS.accent }
            : undefined,
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
