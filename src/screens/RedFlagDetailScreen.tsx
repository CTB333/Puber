import { View, Image, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { RedFlagDetailScreenProps } from "../navigation";
import { useGoBackHeader } from "../hooks";
import redFlagImage from "../assets/redflag.png";

const RedFlagDetailScreen = ({ navigation, route }: RedFlagDetailScreenProps) => {
  useGoBackHeader();;

  return (
    <View style={[
      STYLES.row,
      STYLES.width,
      STYLES.center,
      { justifyContent: "space-between" },
    ]}>
      <Image style={{ width: 150, height: 150 }} source={redFlagImage} />
      <Text
        style={[
          STYLES.colorPrimary,
          STYLES.fs1,
          STYLES.bold,
          { textAlign: "center", maxWidth: "45%" },
        ]}
      >
        {}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RedFlagDetailScreen;
