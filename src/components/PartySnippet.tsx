import { Text, View } from "react-native";
import { Party, PartyDistance } from "../interfaces";
import STYLES from "../styles";
import PressOpaque from "./PressOpaque";
import Icon from "./Icon";
import CONSTANTS from "../Constants";
import COLORS from "../colors";
import { dateToString } from "../utils";
import StarRow from "./StartRow";

type PartySnippetProps = {
  primaryColor?: boolean;
  lessOpaque?: boolean;
  party: Party;
  distance?: PartyDistance;
};

const PartySnippet = ({
  party,
  distance,
  primaryColor,
  lessOpaque,
}: PartySnippetProps) => {
  return (
    <PressOpaque
      style={(pressed) => [
        STYLES.row,
        STYLES.width,
        STYLES.rad15,
        STYLES.p15,
        pressed || !primaryColor ? STYLES.bgAccent : STYLES.bgPrimary,
        {
          justifyContent: "space-between",
          height: CONSTANTS.ScreenHieght / 6,
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

        <StarRow />
      </View>
      <View style={[STYLES.center]}>
        <Icon size={35} color={COLORS.white} name="right" />
      </View>
    </PressOpaque>
  );
};

export default PartySnippet;
