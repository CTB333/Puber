import { Image, View } from "react-native";
import STYLES from "../styles";
import Icon from "./Icon";
import COLORS from "../colors";
import { User } from "../interfaces";
import PressOpaque from "./PressOpaque";

type UserCircleProps = {
  user?: User | null;
  size?: number;
  color?: string;
  onPress?: () => void;
};

const UserCircle = ({ size, user, color, onPress }: UserCircleProps) => {
  const SIZE = size ?? 25;

  return (
    <PressOpaque disabled={onPress == undefined} onPress={onPress}>
      {user?.image ? (
        <View
          style={[
            {
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE,
              overflow: "hidden",
            },
          ]}
        >
          <Image
            style={[STYLES.width, STYLES.height]}
            source={{ uri: user.image }}
          />
        </View>
      ) : (
        <View>
          <Icon name="user" color={color ?? COLORS.primary} size={SIZE} />
        </View>
      )}
    </PressOpaque>
  );
};

export default UserCircle;
