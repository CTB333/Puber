import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { useEnableDrawerSwipe } from "../hooks";

const ListScreen = () => {
  useEnableDrawerSwipe();

  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>ListScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ListScreen;
