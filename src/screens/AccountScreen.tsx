import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { AccountScreenProps } from "../navigation";

const AccountScreen = ({ navigation }: AccountScreenProps) => {
  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>AccountScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
