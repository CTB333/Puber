import { Text, View } from "react-native";
import { Party, PartyDistance } from "../interfaces";
import STYLES from "../styles";
import PressOpaque from "./PressOpaque";
import Icon from "./Icon";
import CONSTANTS from "../Constants";
import COLORS from "../colors";
import { dateToString } from "../utils";
import StarRow from "./StartRow";
import { Constants } from "expo-camera";

type PartySnippetProps = {
  primaryColor?: boolean;
  lessOpaque?: boolean;
  party: Party;
  distance?: PartyDistance;
  onPress?: () => void;
};

const PartySnippet = ({
  party,
  distance,
  primaryColor,
  lessOpaque,
  onPress,
}: PartySnippetProps) => {
  return (
    <PressOpaque
      onPress={onPress}
      style={(pressed) => [
        STYLES.row,
        CONSTANTS.ScreenWidth,
        STYLES.rad15,
        STYLES.p15,
        pressed || !primaryColor ? STYLES.bgAccent : STYLES.bgPrimary,
        {
          justifyContent: "space-between",
          height: CONSTANTS.ScreenHieght / 6,
          width: CONSTANTS.ScreenWidth - 30
        },
        lessOpaque
          ? {
              opacity: pressed ? 0.75 : 1,
            }
          : undefined,
      ]}
    >
      <View style={[STYLES.even]}>
        <Text style={[STYLES.fs2, STYLES.bold, STYLES.colorWhite]}>
          {party.title}
        </Text>
        <Text style={[STYLES.fs1, STYLES.colorWhite]}>
          {dateToString(new Date(party.date.dateTime))}
        </Text>
        {distance ? (
          <Text style={[STYLES.fs1, STYLES.colorWhite]}>
            {distance.distance} Miles Away
          </Text>
        ) : null}

        <StarRow filled={party.rating} />
      </View>
      <View style={[STYLES.center]}>
        <Icon size={35} color={COLORS.white} name="right" />
      </View>
    </PressOpaque>
  );
};

export default PartySnippet;
