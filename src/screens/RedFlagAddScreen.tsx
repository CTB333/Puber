import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { RedFlagAddScreenProps } from "../navigation";
import {
  useAddRedFlag,
  useErrorMsg,
  useGoBackHeader,
  useOnSuccess,
  useSuccessMessage,
} from "../hooks";
import { DropDown, FormHeader, UserHeader } from "../components";
import { DropDownOptionType, Input } from "../components/inputs";
import { RedFlagType } from "../interfaces";
import { ActionButton } from "../components/buttons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RedFlagAddScreen = ({ navigation, route }: RedFlagAddScreenProps) => {
  const flagUser = route.params.user;
  useGoBackHeader();
  const { bottom } = useSafeAreaInsets();

  const {
    submit,
    loading,
    success,
    error,
    errorChange,

    allFlagTypes,
    flagType,
    setFlagType,
    desc,
    setDesc,
  } = useAddRedFlag(flagUser);

  const successMsg = useSuccessMessage();
  useOnSuccess(() => {
    successMsg(`User Flagged`, `Red Flag Set On ${flagUser.userName}`);
    goBack();
  }, success);

  useErrorMsg(error, errorChange);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        STYLES.page,
        STYLES.column,
        STYLES.space,
        { paddingBottom: bottom },
      ]}
    >
      <View>
        <FormHeader title={`Flag ${flagUser.userName}`} />
        <UserHeader hideStars user={flagUser} />
        <DropDown
          placeHolder="Flag Type"
          options={allFlagTypes.map((type) => ({
            key: type,
            value: type,
            text: type,
          }))}
          state={{ key: flagType, value: flagType, text: flagType }}
          setState={(val) =>
            val ? setFlagType(val.value as RedFlagType) : undefined
          }
        />
        <Input placeholder="Flag Description" state={desc} setState={setDesc} />
      </View>

      <View style={[STYLES.center, STYLES.width]}>
        <ActionButton
          bold
          big
          disabled={loading}
          text="Flag User"
          onPress={submit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RedFlagAddScreen;
