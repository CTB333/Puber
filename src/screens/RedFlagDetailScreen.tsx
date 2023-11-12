import { View, Image, Text, StyleSheet, SafeAreaView } from "react-native";
import STYLES from "../styles";
import { RedFlagDetailScreenProps } from "../navigation";
import { useGoBackHeader, useSuccessMessage } from "../hooks";
import redFlagImage from "../assets/redflag.png";
import useGetRedFlag from "../hooks/useGetRedFlag";
import { FormHeader } from "../components";
import { ActionButton } from "../components/buttons";

const RedFlagDetailScreen = ({ navigation, route }: RedFlagDetailScreenProps) => {
  useGoBackHeader();;

  const redFlag = useGetRedFlag(route.params.id)
  const successMsg = useSuccessMessage();

  const contest = () => {
    successMsg("Contest Submitted")
  }

  if(redFlag != undefined){
    return (
      <SafeAreaView style={[STYLES.flex, STYLES.page]}>
        <View style={[STYLES.height]}>
          <View style={[
            STYLES.row,
            STYLES.width,
            STYLES.center,
            { justifyContent: "space-around" },
          ]}>
            <Image style={{ width: 150, height: 150 }} source={redFlagImage} />
            <Text style={[STYLES.center, STYLES.fs4, STYLES.bold]}>{redFlag.type}</Text>
            </View>
              <FormHeader title="Description" />
            <Text style={[
                STYLES.colorPrimary,
                STYLES.fs1,
                STYLES.bold,
                STYLES.textCenter
            ]}>
              {redFlag.desc}
            </Text>
            <View style={[
              STYLES.row,
              STYLES.width,
              STYLES.center,
              STYLES.mv15
            ]}>
              <ActionButton onPress={contest} text="Contest Red Flag" />
            </View>
          </View>
      </SafeAreaView>
    )
  };
};

const styles = StyleSheet.create({});

export default RedFlagDetailScreen;
