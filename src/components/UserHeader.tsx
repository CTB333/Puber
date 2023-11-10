import { View, Text } from "react-native";
import STYLES from "../styles";
import Icon from "./Icon";
import StarRow from "./StartRow";
import { User } from "../interfaces";
import COLORS from "../colors";

type UserHeaderProps = {
  user?: User | null;
};

const UserHeader = ({ user }: UserHeaderProps) => {
  return (
    <View style={[STYLES.center]}>
      <Icon name="user" size={110} />
      <View style={[{ marginBottom: 15 }]} />
      <Text style={[STYLES.fs2, STYLES.bold, STYLES.colorPrimary]}>
        {user?.firstName ?? ""} {user?.lastName ?? ""}
      </Text>
      <View style={[{ marginBottom: 15 }]} />
      <StarRow color={COLORS.accent} filled={user?.rating} />
    </View>
  );
};

export default UserHeader;
