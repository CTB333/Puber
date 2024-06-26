import { Text, View } from "react-native";
import { User } from "../interfaces";
import STYLES from "../styles";
import Icon from "./Icon";
import COLORS from "../colors";
import PressOpaque from "./PressOpaque";
import UserCircle from "./UserCircle";

type UserSnippetProps = {
  user?: User;
  onPress?: () => void;
};

const height = 125;

const UserSnippet = ({ user, onPress }: UserSnippetProps) => {
  return (
    <PressOpaque
      onPress={onPress}
      style={[
        STYLES.column,
        STYLES.center,
        STYLES.rad15,
        STYLES.bgWhite,
        { height, width: height, justifyContent: "space-evenly" },
      ]}
    >
      <UserCircle user={user} color={COLORS.primary} size={50} />
      <Text style={[STYLES.fs1, STYLES.bold, STYLES.colorPrimary]}>
        {user?.userName ?? "No User Yet"}
      </Text>
    </PressOpaque>
  );
};

export default UserSnippet;
