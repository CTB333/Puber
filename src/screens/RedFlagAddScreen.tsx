import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { RedFlagAddScreenProps } from "../navigation";

const RedFlagAddScreen = ({ navigation }: RedFlagAddScreenProps) => {
  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>RedFlagAddScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RedFlagAddScreen;
