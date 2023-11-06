import { View, Text } from "react-native";
import STYLES from "../styles";
import { Button, DrawerSceneWrapper, DropDown, Input } from "../components";
import { HomeScreenProps } from "../navigation";
import { useEnableDrawerSwipe, useSelect } from "../hooks";
import { useState } from "react";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  useEnableDrawerSwipe();

  const { selected, select, options } = useSelect({
    options: ["Cats", "Dogs", "Gods"],
  });
  const [state, setState] = useState("");

  const goToSplashScreen = () => {
    navigation.navigate("Splash");
  };

  const goToPartyDetail = () => {
    navigation.navigate("PartyDetail");
  };
  const goToRedFlagAdd = () => {
    navigation.navigate("RedFlagAdd");
  };
  const goToRedFlagDetail = () => {
    navigation.navigate("RedFlagDetail");
  };
  const goToUser = () => {
    navigation.navigate("User");
  };
  const goToAccount = () => {
    navigation.navigate("Account");
  };
  const goToDriverApplication = () => {
    navigation.navigate("DriverApplication");
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>HomeScreen</Text>
      <DropDown
        placeHolder="Gods"
        allowSelectNone
        options={options}
        state={selected}
        setState={select}
      />
      <Input state={state} setState={setState} placeholder="Dogs" />
      <Button text="To Splash" onPress={goToSplashScreen} />
      <Button text="To PartyDetail" onPress={goToPartyDetail} />
      <Button text="To RedFlagAdd" onPress={goToRedFlagAdd} />
      <Button text="To RedFlagDetail" onPress={goToRedFlagDetail} />
      <Button text="To User" onPress={goToUser} />
      <Button text="To Account" onPress={goToAccount} />
      <Button text="To DriverApplication" onPress={goToDriverApplication} />
      <Button text="Open Drawer" onPress={openDrawer} />
    </View>
  );
};

export default HomeScreen;
