import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import {
  useDrawerHeader,
  useEnableDrawerSwipe,
  useGetAllParties,
  useGetAllUsers,
} from "../hooks";
import { useSetHeader } from "../hooks";
import { UserSnippet } from "../components";
import { useUser } from "../providers";
import { ListScreenProps } from "../navigation";
import { Party, User } from "../interfaces";
import { ScrollView } from "react-native-gesture-handler";

const ListScreen = ({ navigation }: ListScreenProps) => {
  useEnableDrawerSwipe();
  useDrawerHeader();

  // const { user } = useUser();
  const { users } = useGetAllUsers();
  const { parties } = useGetAllParties();

  const toUser = (user: User) => {
    navigation.navigate("User", { user });
  };

  const toParty = (party: Party) => {
    navigation.navigate("Party", {party});
  }

  return (
    <View style={[STYLES.page, STYLES.center]}>
      <ScrollView style={[STYLES.width]}>
        <Text>ListScreen</Text>
        <ScrollView horizontal style={[STYLES.width]}>
          {users.map((user) => {
            return (
              <UserSnippet onPress={() => toUser(user)} key={user.id} user={user} />
            );
          })}
        </ScrollView>
        {parties.map((party) => {
            return (
              <UserSnippet onPress={() => toParty(party)} key={party.id} user={party} />
            );
          })}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({});

export default ListScreen;
