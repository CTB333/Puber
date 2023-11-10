import { View } from "react-native";
import RedFlagSnippet from "./RedFlagSnippet";
import { RedFlag } from "../interfaces";

type RedFlagListProps = {
  flags: RedFlag[];
};

const RedFlagList = ({ flags }: RedFlagListProps) => {
  return (
    <View>
      {flags.map((flag) => {
        return (
          <View style={[{ marginBottom: 15 }]} key={flag.id}>
            <RedFlagSnippet flag={flag} />
          </View>
        );
      })}
    </View>
  );
};

export default RedFlagList;
