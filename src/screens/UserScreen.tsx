import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { UserScreenProps } from "../navigation";
import { useAddFlagHeader, useGetAllRedFlags, useGoBackHeader } from "../hooks";
import { RedFlagSnippet } from "../components";
import { RedFlag, RedFlagData } from "../interfaces";

const UserScreen = ({ navigation, route }: UserScreenProps) => {

  /**I added code here so I could access the red flags, all of it is non ideal please get rid of it
   * it doesn't even filter to just the red flags for a person, everyone has every red flag
   */

  const redFlags = useGetAllRedFlags().flags

  const toFlag = (flag: RedFlag) =>{
    navigation.navigate("RedFlagDetail", flag);
  }

  useAddFlagHeader(route.params.user);
  return (
    <View style={[STYLES.page, STYLES.center]}>
      <Text>UserScreen</Text>
      {redFlags.map((redFlag) => {
        return (
          <RedFlagSnippet onPress={() => toFlag(redFlag)} key={redFlag.id} flag={redFlag} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserScreen;
