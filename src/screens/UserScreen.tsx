import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { UserScreenProps } from "../navigation";
import { useGoBackHeader } from "../hooks";

const UserScreen = ({ navigation }: UserScreenProps) => {
  useGoBackHeader();
  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>UserScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserScreen;
