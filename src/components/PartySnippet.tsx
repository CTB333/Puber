import { Text, View } from "react-native";
import { Party, PartyDistance } from "../interfaces";
import STYLES from "../styles";
import PressOpaque from "./PressOpaque";
import Icon from "./Icon";
import CONSTANTS from "../Constants";
import COLORS from "../colors";
import { dateToString } from "../utils";

type PartySnippetProps = {
  party: Party;
  distance?: PartyDistance;
};

const PartySnippet = ({ party, distance }: PartySnippetProps) => {
  const stars = [0, 0, 0, 0, 0];
  return (
    <PressOpaque
      style={(pressed) => [
        STYLES.row,
        STYLES.width,
        STYLES.rad15,
        STYLES.p15,
        STYLES.bgAccent,
        {
          opacity: pressed ? 0.9 : 1,
          justifyContent: "space-between",
          height: CONSTANTS.ScreenHieght / 6,
        },
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

        <View style={[STYLES.row]}>
          {stars.map((_S, index) => {
            return (
              <Icon key={index} size={35} color={COLORS.white} name="star" />
            );
          })}
        </View>
      </View>
      <View style={[STYLES.center]}>
        <Icon size={35} color={COLORS.white} name="right" />
      </View>
    </PressOpaque>
  );
};

export default PartySnippet;
