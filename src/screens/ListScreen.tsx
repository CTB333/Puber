import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { useDrawerHeader, useEnableDrawerSwipe } from "../hooks";
import { useSetHeader } from "../hooks";
import { UserSnippet } from "../components";
import { useUser } from "../providers";

const ListScreen = () => {
  useEnableDrawerSwipe();
  useDrawerHeader();

  const { user } = useUser();

  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>ListScreen</Text>
      <UserSnippet user={user!} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ListScreen;
