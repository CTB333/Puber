import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { RedFlagDetailScreenProps } from "../navigation";
import { useGoBackHeader } from "../hooks";

const RedFlagDetailScreen = ({ navigation }: RedFlagDetailScreenProps) => {
  useGoBackHeader();
  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>RedFlagDetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RedFlagDetailScreen;
