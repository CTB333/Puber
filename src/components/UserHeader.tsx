import { View, Text } from "react-native";
import STYLES from "../styles";
import Icon from "./Icon";
import StarRow from "./StartRow";
import { User } from "../interfaces";
import COLORS from "../colors";
import UserCircle from "./UserCircle";

type UserHeaderProps = {
  user?: User | null;
  hideStars?: boolean;
  onUserPress?: () => void;
};

const UserHeader = ({ user, hideStars, onUserPress }: UserHeaderProps) => {
  return (
    <View style={[STYLES.center]}>
      <UserCircle user={user} onPress={onUserPress} size={110} />
      <View style={[{ marginBottom: 15 }]} />
      <Text style={[STYLES.fs2, STYLES.bold, STYLES.colorPrimary]}>
        {user?.firstName ?? ""} {user?.lastName ?? ""}
      </Text>
      <View style={[{ marginBottom: 15 }]} />
      {!hideStars ? (
        <StarRow color={COLORS.accent} filled={user?.rating} />
      ) : null}
    </View>
  );
};

export default UserHeader;
