import { View, Text } from "react-native";
import STYLES from "../styles";
import { Button, DrawerSceneWrapper, DropDown, Input } from "../components";
import { HomeScreenProps } from "../navigation";
import {
  useDrawerHeader,
  useEnableDrawerSwipe,
  useGetAllParties,
  useSelect,
  useSetHeader,
} from "../hooks";
import { useState } from "react";
import { stringify } from "../utils";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  useEnableDrawerSwipe();
  useDrawerHeader();

  const { parties } = useGetAllParties([navigation.isFocused()]);

  return (
    <View style={[STYLES.page, STYLES.center, STYLES.p30]}>
      <ScrollView
        style={[
          STYLES.flex,
          STYLES.rad15,
          STYLES.bgPrimary,
          STYLES.borderWhite,
          STYLES.width,
          STYLES.p10,
          STYLES.shadow,
        ]}
      >
        {parties.map((party) => {
          return (
            <View key={party.id} style={[{ marginBottom: 15 }]}>
              <Text style={[STYLES.colorWhite]}>{stringify(party)}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
