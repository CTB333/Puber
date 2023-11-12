import { View } from "react-native";
import { Party } from "../interfaces";
import PartySnippet from "./PartySnippet";

type PartySnippetListProps = {
  parties: Party[];
};

const PartySnippetList = ({ parties }: PartySnippetListProps) => {
  return (
    <View>
      {parties.map((party) => {
        return (
          <View style={[{ marginBottom: 15 }]} key={party.id}>
            <PartySnippet primaryColor party={party} />
          </View>
        );
      })}
    </View>
  );
};

export default PartySnippetList;
