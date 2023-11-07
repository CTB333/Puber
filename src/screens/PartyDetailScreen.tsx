import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { PartyDetailScreenProps } from "../navigation";
import { useGoBackHeader } from "../hooks";

const PartyDetailScreen = ({ navigation }: PartyDetailScreenProps) => {
  useGoBackHeader();
  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>PartyDetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PartyDetailScreen;
