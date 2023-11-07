import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { DriverApplicationScreenProps } from "../navigation";
import { useGoBackHeader } from "../hooks";

const DriverApplicationScreen = ({
  navigation,
}: DriverApplicationScreenProps) => {
  useGoBackHeader();
  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>DriverApplicationScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DriverApplicationScreen;
