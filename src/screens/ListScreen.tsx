import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import {
  useDrawerHeader,
  useEnableDrawerSwipe,
  useFilterParties,
  useGetAllParties,
  useGetAllUsers,
  usePartyNav,
} from "../hooks";
import { useSetHeader } from "../hooks";
import { FormHeader, PartySnippet, PartySnippetList, UserSnippet } from "../components";
import { useUser } from "../providers";
import { ListScreenProps } from "../navigation";
import { Party, User } from "../interfaces";
import { ScrollView } from "react-native-gesture-handler";

const ListScreen = ({ navigation }: ListScreenProps) => {
  useEnableDrawerSwipe();
  useDrawerHeader();

  // const { user } = useUser();
  const { users } = useGetAllUsers();
  //const { parties } = useGetAllParties();
  const { parties, distances } = useFilterParties([
    navigation.isFocused(),
  ]);

  const toUser = (user: User) => {
    navigation.navigate("User", { user });
  };

  const toParty = usePartyNav();

  // const toParty = (party: Party) => {
  //   navigation.navigate("Party", {party});
  // }

  return (
    <View style={[STYLES.page, STYLES.center]}>
      <ScrollView style={[STYLES.width]}>
        <FormHeader title="Friends" />
        <ScrollView horizontal style={[STYLES.width]}>
          {users.map((user) => {
            return (
              <View style={[{marginRight: 15}]}>
                <UserSnippet onPress={() => toUser(user)} key={user.id} user={user} />
              </View>
            );
          })}
        </ScrollView>
        <FormHeader title="Parties" />
        {/* <PartySnippetList parties={parties}/> */}
        {parties.map((party) => {
            return (
              <View style={[{ marginBottom: 15 }]} key={party.id}>
                <PartySnippet primaryColor party={party} distance={distances.find((distance) => party.id === distance.partyId)} />
              </View>
            );
          })}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({});

export default ListScreen;
