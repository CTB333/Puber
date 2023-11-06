import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { RedFlagDetailScreenProps } from "../navigation";

const RedFlagDetailScreen = ({ navigation }: RedFlagDetailScreenProps) => {
  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>RedFlagDetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RedFlagDetailScreen;
