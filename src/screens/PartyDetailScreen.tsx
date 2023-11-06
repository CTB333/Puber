import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { PartyDetailScreenProps } from "../navigation";

const PartyDetailScreen = ({ navigation }: PartyDetailScreenProps) => {
  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>PartyDetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PartyDetailScreen;
