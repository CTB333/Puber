import { View } from "react-native";
import Icon from "./Icon";
import COLORS from "../colors";
import STYLES from "../styles";

type StarRowProps = {
  filled?: number;
  color?: string;
};

const StarRow = ({ filled, color }: StarRowProps) => {
  const stars = [0, 0, 0, 0, 0];

  return (
    <View style={[STYLES.row]}>
      {stars.map((_S, index) => {
        return (
          <Icon
            key={index}
            size={35}
            color={color ?? COLORS.white}
            name={filled && filled >= index ? "starFill" : "star"}
          />
        );
      })}
    </View>
  );
};

export default StarRow;
