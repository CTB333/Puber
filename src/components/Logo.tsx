import { View, Image } from "react-native";
import PuberLogo from "../assets/PuberLogo.png";
import STYLES from "../styles";

type LogoProps = {
  size: number;
};

const Logo = ({ size }: LogoProps) => {
  return (
    <View style={[STYLES.center, { width: size, height: size }]}>
      <Image style={{ width: size, height: size }} source={PuberLogo} />
    </View>
  );
};

export default Logo;
