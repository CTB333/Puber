import { View } from "react-native";
import CONSTANTS from "../Constants";

type ScrollFooterSpaceProps = {
  divideBy?: number;
  multiplyBy?: number;
};

const ScrollFooterSpace = ({
  divideBy,
  multiplyBy,
}: ScrollFooterSpaceProps) => {
  let height = CONSTANTS.ScreenHieght;

  if (divideBy) {
    height = height / divideBy;
  } else {
    height = height / 2;
  }

  if (multiplyBy) {
    height = height * multiplyBy;
  } else {
    height = height * 1;
  }

  return (
    <View
      style={[
        {
          height,
        },
      ]}
    />
  );
};

export default ScrollFooterSpace;
