import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { RedFlagAddScreenProps } from "../navigation";
import { useGoBackHeader } from "../hooks";

const RedFlagAddScreen = ({ navigation }: RedFlagAddScreenProps) => {
  useGoBackHeader();
  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>RedFlagAddScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RedFlagAddScreen;
