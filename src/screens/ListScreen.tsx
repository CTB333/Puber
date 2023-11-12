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
import {
  FormHeader,
  PartySnippet,
  PartySnippetList,
  UserSnippet,
} from "../components";
import { useUser } from "../providers";
import { ListScreenProps } from "../navigation";
import { Party, User } from "../interfaces";
import { ScrollView } from "react-native-gesture-handler";

const ListScreen = ({ navigation }: ListScreenProps) => {
  useEnableDrawerSwipe();
  useDrawerHeader();

  const { users } = useGetAllUsers();

  const { parties, distances } = useFilterParties([navigation.isFocused()]);

  const toUser = (user: User) => {
    navigation.navigate("User", { user });
  };

  const toParty = usePartyNav();

  return (
    <View style={[STYLES.page, STYLES.center]}>
      <ScrollView style={[STYLES.width]}>
        <FormHeader title="Friends" />
        <ScrollView horizontal style={[STYLES.width]}>
          {users.map((user) => {
            return (
              <View key={user.id} style={[{ marginRight: 15 }]}>
                <UserSnippet onPress={() => toUser(user)} user={user} />
              </View>
            );
          })}
        </ScrollView>
        <FormHeader title="Parties" />
        {parties.map((party) => {
          return (
            <View style={[{ marginBottom: 15 }]} key={party.id}>
              <PartySnippet
                onPress={() => toParty(party)}
                primaryColor
                party={party}
                distance={distances.find(
                  (distance) => party.id === distance.partyId
                )}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ListScreen;
