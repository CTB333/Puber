import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import COLORS from "../colors";

type BaseIconProps = {
  size: number;
  color: string;
};

const IconList = {
  cross: (props: BaseIconProps) => (
    <Entypo {...props} name="circle-with-cross" />
  ),
  user: (props: BaseIconProps) => <FontAwesome {...props} name="user-circle" />,
  list: (props: BaseIconProps) => <FontAwesome {...props} name="th-list" />,
  search: (props: BaseIconProps) => (
    <FontAwesome5 {...props} name="search-location" />
  ),
  add: (props: BaseIconProps) => <MaterialIcons {...props} name="add-circle" />,
  location: (props: BaseIconProps) => <Entypo {...props} name="location" />,
  locationPin: (props: BaseIconProps) => (
    <Entypo {...props} name="location-pin" />
  ),
  up: (props: BaseIconProps) => <Ionicons {...props} name="caret-up-circle" />,
  down: (props: BaseIconProps) => (
    <Ionicons {...props} name="caret-down-circle" />
  ),
  left: (props: BaseIconProps) => (
    <Ionicons {...props} name="caret-back-circle" />
  ),
  right: (props: BaseIconProps) => (
    <Ionicons {...props} name="caret-forward-circle" />
  ),
  star: (props: BaseIconProps) => <AntDesign {...props} name="staro" />,
  starFill: (props: BaseIconProps) => <AntDesign {...props} name="star" />,
  upload: (props: BaseIconProps) => <Feather {...props} name="upload" />,
  flag: (props: BaseIconProps) => <Ionicons {...props} name="flag" />,
  addFlag: (props: BaseIconProps) => (
    <MaterialCommunityIcons {...props} name="flag-plus" />
  ),
  save: (props: BaseIconProps) => <MaterialIcons {...props} name="save" />,
  userLocation: (props: BaseIconProps) => (
    <MaterialIcons {...props} name="my-location" />
  ),
};

type IconName =
  | "cross"
  | "user"
  | "list"
  | "search"
  | "add"
  | "location"
  | "locationPin"
  | "up"
  | "down"
  | "left"
  | "right"
  | "star"
  | "starFill"
  | "upload"
  | "flag"
  | "addFlag"
  | "save"
  | "userLocation";

export type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

const Icon = ({ name, size, color }: IconProps) => {
  let IconComponent = IconList[name];
  return <IconComponent size={size ?? 15} color={color ?? COLORS.primary} />;
};

export default Icon;
