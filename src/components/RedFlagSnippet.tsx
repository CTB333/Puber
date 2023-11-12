import { Text, View } from "react-native";
import STYLES from "../styles";
import Icon from "./Icon";
import COLORS from "../colors";
import { RedFlag } from "../interfaces";
import PressOpaque from "./PressOpaque";
import { dateToString } from "../utils";

type RedFlagSnippetProps = {
  flag: RedFlag;
  onPress?: () => void;
};

const RedFlagSnippet = ({ onPress, flag }: RedFlagSnippetProps) => {
  return (
    <PressOpaque
      onPress={onPress}
      style={[
        STYLES.row,
        STYLES.bgWhite,
        STYLES.rad15,
        STYLES.space,
        STYLES.p10,
      ]}
    >
      <View style={[STYLES.row]}>
        <View style={[STYLES.center, { marginRight: 15 }]}>
          <Icon name="flag" size={40} color={COLORS.red} />
        </View>
        <View>
          <Text style={[STYLES.fs1, STYLES.colorPrimary, STYLES.bold]}>
            {flag.type}
          </Text>
          <Text style={[STYLES.fs1, STYLES.colorPrimary]}>{flag.desc}</Text>
          <Text style={[STYLES.fs1, STYLES.colorPrimary]}>
            Filed On: {dateToString(new Date(flag.date))}
          </Text>
        </View>
      </View>
      <View style={[STYLES.center]}>
        <Icon name="right" size={25} color={COLORS.primary} />
      </View>
    </PressOpaque>
  );
};

export default RedFlagSnippet;
