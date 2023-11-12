import { View } from "react-native";
import RedFlagSnippet from "./RedFlagSnippet";
import { RedFlag } from "../interfaces";
import useRedFlagNav from "../hooks/useRedFlagNav";

type RedFlagListProps = {
  flags: RedFlag[];
};

const RedFlagList = ({ flags }: RedFlagListProps) => {
  const toFlag = useRedFlagNav();

  return (
    <View>
      {flags.map((flag) => {
        return (
          <View style={[{ marginBottom: 15 }]} key={flag.id}>
            <RedFlagSnippet onPress={() => toFlag(flag)} flag={flag} />
          </View>
        );
      })}
    </View>
  );
};

export default RedFlagList;
