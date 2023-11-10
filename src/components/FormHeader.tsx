import { Text, View } from "react-native";
import STYLES from "../styles";

type FormHeaderProps = {
  title?: string;
  color?: string;
  marginTop?: number;
  marginBottom?: number;
};

const FormHeader = ({
  title,
  marginBottom,
  marginTop,
  color,
}: FormHeaderProps) => {
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
          <Text
            style={[
              STYLES.fs2,
              STYLES.bold,
              STYLES.colorPrimary,
              color ? { color } : undefined,
            ]}
          >
            {title}
          </Text>
        </View>
      ) : null}
      <View
        style={[
          STYLES.width,
          STYLES.border,
          color ? { borderColor: color } : undefined,
        ]}
      />
    </View>
  );
};

export default FormHeader;
