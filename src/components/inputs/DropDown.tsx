import { Pressable, Text, View } from "react-native";
import useOpen from "../../hooks/useOpen";
import STYLES from "../../styles";
import COLORS from "../../colors";
import Collapsable from "../Collapsable";

export type DropDownOptionType = {
  key: string;
  value: string;
  text?: string;
};

type DropDownProps = {
  placeHolder?: string;
  allowSelectNone?: boolean;
  state?: DropDownOptionType;
  setState: (val?: DropDownOptionType) => void;
  options: DropDownOptionType[];
  color?: string;
};

const DropDown = ({
  allowSelectNone,
  state,
  setState,
  options,
  placeHolder,
  color,
}: DropDownProps) => {
  const [isOpen, _open, close, toggle] = useOpen();

  const onSelect = (option?: DropDownOptionType) => {
    setState(option);
    close();
  };

  return (
    <View style={[STYLES.width]}>
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      >
        <Text
          style={[
            STYLES.mh10,
            STYLES.fs1,
            {
              color: isOpen ? COLORS.accent : color ? color : COLORS.primary,
            },
          ]}
        >
          {placeHolder ?? "Placeholder"}
        </Text>
        <View
          style={[
            STYLES.border,
            STYLES.rad10,
            STYLES.p5,
            {
              borderColor: isOpen
                ? COLORS.accent
                : color
                ? color
                : COLORS.primary,
            },
          ]}
        >
          <Text
            style={[
              STYLES.fs2,
              {
                color: isOpen ? COLORS.accent : color ? color : COLORS.primary,
              },
            ]}
          >
            {state?.text ?? state?.value ?? " "}
          </Text>
        </View>
      </Pressable>

      <Collapsable open={isOpen}>
        <View>
          {allowSelectNone ? (
            <Pressable
              onPress={() => onSelect(undefined)}
              style={({ pressed }) => [
                STYLES.border,
                STYLES.rad10,
                STYLES.p5,
                STYLES.mv5,
                {
                  borderColor: pressed
                    ? COLORS.accent
                    : color
                    ? color
                    : COLORS.primary,
                },
              ]}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    STYLES.fs2,
                    {
                      color: pressed
                        ? COLORS.accent
                        : color
                        ? color
                        : COLORS.primary,
                    },
                  ]}
                >
                  None
                </Text>
              )}
            </Pressable>
          ) : undefined}
          {options.map((option, index) => {
            return (
              <Pressable
                onPress={() => onSelect(option)}
                key={option.key}
                style={({ pressed }) => [
                  STYLES.border,
                  STYLES.rad10,
                  STYLES.p5,
                  STYLES.mv5,
                  {
                    borderColor: pressed
                      ? COLORS.accent
                      : color
                      ? color
                      : COLORS.primary,
                  },
                ]}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      STYLES.fs2,
                      {
                        color: pressed
                          ? COLORS.accent
                          : color
                          ? color
                          : COLORS.primary,
                      },
                    ]}
                  >
                    {option.text ?? option.value}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </Collapsable>
    </View>
  );
};

export default DropDown;
