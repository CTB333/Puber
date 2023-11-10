import { View, Text, StyleSheet } from "react-native";
import STYLES from "../styles";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearch } from "../providers";
import { DropDown, DropDownOptionType, Input, RadioButton } from "./inputs";
import COLORS from "../colors";
import CONSTANTS from "../Constants";
import { AllPartyTags, PartyTag } from "../interfaces";
import FormHeader from "./FormHeader";
import MyScrollView from "./MyScrollView";
type DrawerProps = DrawerContentComponentProps;

const Drawer = ({}: DrawerProps) => {
  const {
    search,
    setSearch,
    filters,
    setFilters,
    searchRadius,
    setSearchRadius,
  } = useSearch();

  const distanceOptions = [15, 30, 60, 100];
  const onSelectDistance = (val?: DropDownOptionType) => {
    if (!val) return setSearchRadius(15);
    let distance = parseInt(val.value);
    setSearchRadius(distance);
  };

  const selectFilter = (filter: PartyTag) => {
    let newFilters = [...filters];
    if (filters.includes(filter))
      newFilters = newFilters.filter((check) => check !== filter);
    else newFilters.push(filter);
    setFilters(newFilters);
  };

  return (
    <SafeAreaView
      style={[
        STYLES.p25,
        STYLES.border,
        STYLES.flex,
        STYLES.bgPrimary,
        styles.container,
      ]}
    >
      <MyScrollView showIndicator={false}>
        <View style={[STYLES.width, { paddingTop: 50 }]}>
          <Input
            placeholder="Search Parties"
            state={search}
            setState={setSearch}
            color={COLORS.white}
          />
          <View style={{ marginTop: 15 }} />
          <DropDown
            state={{
              key: `${searchRadius}`,
              value: `${searchRadius}`,
              text: `${searchRadius} Miles`,
            }}
            setState={onSelectDistance}
            options={distanceOptions.map((dist) => ({
              key: `${dist}`,
              value: `${dist}`,
              text: `${dist} Miles`,
            }))}
            placeHolder="Search Radius"
            color={COLORS.white}
          />

          <FormHeader color={COLORS.white} title="Filter By" />

          {AllPartyTags.map((tag) => {
            const enabled = filters.includes(tag);
            return (
              <View key={tag} style={[{ marginBottom: 15 }]}>
                <RadioButton
                  color={COLORS.white}
                  enabled={enabled}
                  text={tag}
                  onPress={() => selectFilter(tag)}
                />
              </View>
            );
          })}
        </View>
      </MyScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Drawer;
