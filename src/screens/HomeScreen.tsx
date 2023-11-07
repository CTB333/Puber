import { View, Text } from "react-native";
import STYLES from "../styles";
import { Button, DrawerSceneWrapper, DropDown, Input } from "../components";
import { HomeScreenProps } from "../navigation";
import {
  useDrawerHeader,
  useEnableDrawerSwipe,
  useSelect,
  useSetHeader,
} from "../hooks";
import { useState } from "react";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  useEnableDrawerSwipe();
  useDrawerHeader();

  return (
    <View style={[STYLES.page, STYLES.center, STYLES.p30]}>
      <View
        style={[
          STYLES.flex,
          STYLES.rad15,
          STYLES.bgPrimary,
          STYLES.borderWhite,
          STYLES.center,
          STYLES.width,
          STYLES.shadow,
        ]}
      >
        <Text style={[STYLES.colorWhite]}>Put Map In Here</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
