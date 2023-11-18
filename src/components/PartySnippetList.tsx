import { View } from "react-native";
import { Party } from "../interfaces";
import PartySnippet from "./PartySnippet";
import { usePartyNav } from "../hooks";

type PartySnippetListProps = {
  parties: Party[];
};

const PartySnippetList = ({ parties }: PartySnippetListProps) => {
  const toParty = usePartyNav();
  return (
    <View>
      {parties.map((party) => {
        return (
          <View style={[{ marginBottom: 15 }]} key={party.id}>
            <PartySnippet
              onPress={() => toParty(party)}
              primaryColor
              party={party}
            />
          </View>
        );
      })}
    </View>
  );
};

export default PartySnippetList;
