import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
type DrawerProps = DrawerContentComponentProps;

const Drawer = ({}: DrawerProps) => {
  return (
    <SafeAreaView
      style={[
        STYLES.p25,
        STYLES.border,
        STYLES.flex,
        STYLES.bgPrimary,
        styles.container,
      ]}
    >
      <Text style={[STYLES.fs2, STYLES.colorWhite]}>Drawer</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Drawer;
