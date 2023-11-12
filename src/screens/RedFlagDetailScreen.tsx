import { View, Image, Text, StyleSheet, SafeAreaView } from "react-native";
import STYLES from "../styles";
import { RedFlagDetailScreenProps } from "../navigation";
import { useGoBackHeader, useSuccessMessage } from "../hooks";
import redFlagImage from "../assets/redflag.png";
import useGetRedFlag from "../hooks/useGetRedFlag";
import { FormHeader } from "../components";
import { ActionButton } from "../components/buttons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { dateToString } from "../utils";

const RedFlagDetailScreen = ({
  navigation,
  route,
}: RedFlagDetailScreenProps) => {
  useGoBackHeader();

  const redFlag = route.params.flag;
  const successMsg = useSuccessMessage();
  const { bottom } = useSafeAreaInsets();

  const contest = () => {
    successMsg("Contest Submitted");
  };

  return (
    <View
      style={[
        STYLES.flex,
        STYLES.column,
        STYLES.space,
        STYLES.page,
        { paddingBottom: bottom },
      ]}
    >
      <View>
        <View
          style={[
            STYLES.row,
            STYLES.width,
            STYLES.center,
            { justifyContent: "space-around" },
          ]}
        >
          <Image style={{ width: 150, height: 150 }} source={redFlagImage} />
          <View style={[STYLES.center]}>
            <Text
              style={[
                STYLES.textCenter,
                STYLES.colorPrimary,
                STYLES.fs4,
                STYLES.bold,
              ]}
            >
              {redFlag.type}
            </Text>
            <Text style={[STYLES.textCenter, STYLES.colorPrimary, STYLES.fs2]}>
              {dateToString(new Date(redFlag.date))}
            </Text>
          </View>
        </View>
        <FormHeader title="Description" />
        <Text
          style={[
            STYLES.colorPrimary,
            STYLES.fs1,
            STYLES.bold,
            STYLES.textCenter,
          ]}
        >
          {redFlag.desc}
        </Text>
      </View>

      <View style={[STYLES.row, STYLES.width, STYLES.center, STYLES.mv15]}>
        <ActionButton onPress={contest} text="Contest Red Flag" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RedFlagDetailScreen;
