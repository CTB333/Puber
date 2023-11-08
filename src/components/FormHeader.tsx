import { Text, View } from "react-native";
import STYLES from "../styles";

type FormHeaderProps = {
  title?: string;
  marginTop?: number;
  marginBottom?: number;
};

const FormHeader = ({ title, marginBottom, marginTop }: FormHeaderProps) => {
  return (
    <View
      style={[
        STYLES.width,
        STYLES.mv20,
        marginBottom != undefined ? { marginBottom } : undefined,
        marginTop != undefined ? { marginTop } : undefined,
      ]}
    >
      {title ? (
        <View style={[STYLES.width, STYLES.center, { paddingBottom: 10 }]}>
          <Text style={[STYLES.fs2, STYLES.bold, STYLES.colorPrimary]}>
            {title}
          </Text>
        </View>
      ) : null}
      <View style={[STYLES.width, STYLES.border]} />
    </View>
  );
};

export default FormHeader;
