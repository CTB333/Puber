import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import {
  useDrawerHeader,
  useEnableDrawerSwipe,
  useGetAllUsers,
} from "../hooks";
import { useSetHeader } from "../hooks";
import { UserSnippet } from "../components";
import { useUser } from "../providers";
import { ListScreenProps } from "../navigation";
import { User } from "../interfaces";

const ListScreen = ({ navigation }: ListScreenProps) => {
  useEnableDrawerSwipe();
  useDrawerHeader();

  // const { user } = useUser();
  const { users } = useGetAllUsers();

  const toUser = (user: User) => {
    navigation.navigate("User", { user });
  };

  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>ListScreen</Text>
      {users.map((user) => {
        return (
          <UserSnippet onPress={() => toUser(user)} key={user.id} user={user} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ListScreen;
