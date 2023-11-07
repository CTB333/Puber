import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { useDrawerHeader, useEnableDrawerSwipe } from "../hooks";
import { useSetHeader } from "../hooks";

const ListScreen = () => {
  useEnableDrawerSwipe();
  useDrawerHeader();

  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>ListScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ListScreen;
