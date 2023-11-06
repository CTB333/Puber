import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { DriverApplicationScreenProps } from "../navigation";

const DriverApplicationScreen = ({
  navigation,
}: DriverApplicationScreenProps) => {
  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>DriverApplicationScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DriverApplicationScreen;
