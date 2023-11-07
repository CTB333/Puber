import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { AccountScreenProps } from "../navigation";
import { useGoBackHeader, useLogout } from "../hooks";
import { Button } from "../components";

const AccountScreen = ({ navigation }: AccountScreenProps) => {
  useGoBackHeader();
  const endSession = useLogout();

  const logout = () => {
    endSession();
    navigation.reset({
      routes: [
        {
          name: "Splash",
        },
      ],
      index: 0,
    });
  };

  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>AccountScreen</Text>
      <Button text="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
