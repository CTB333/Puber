import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { AddPartyScreenProps } from "../navigation";
import { useEffect } from "react";
import { useEnableDrawerSwipe } from "../hooks";

const AddPartyScreen = ({ navigation }: AddPartyScreenProps) => {
  useEnableDrawerSwipe();

  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>AddPartyScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddPartyScreen;
