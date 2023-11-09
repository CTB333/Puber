import { View, Text } from "react-native";
import STYLES from "../styles";
import {
  Button,
  DrawerSceneWrapper,
  DropDown,
  Input,
  Loading,
  PartySnippet,
} from "../components";
import { HomeScreenProps } from "../navigation";
import {
  useDrawerHeader,
  useEnableDrawerSwipe,
  useErrorMsg,
  useGetAllParties,
  useGetUserLocation,
  useHomeSnippetAnimation,
  useSelect,
  useSetHeader,
} from "../hooks";
import { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import CONSTANTS from "../Constants";
import MarkerMed from "../assets/MarkerMed.png";
import MarkerBig from "../assets/MarkerBig.png";
import { Party } from "../interfaces";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { stringify } from "../utils";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  useEnableDrawerSwipe();
  useDrawerHeader();

  const { location: userLocation, error, errorChange } = useGetUserLocation();
  const { parties } = useGetAllParties([navigation.isFocused()]);

  const { selected, animationStyle, onSelect } =
    useHomeSnippetAnimation(parties);

  useErrorMsg(error, errorChange);

  return (
    <View style={[STYLES.page, STYLES.center, STYLES.p30]}>
      <View
        style={[
          STYLES.flex,
          STYLES.rad15,
          STYLES.bgPrimary,
          STYLES.borderWhite,
          STYLES.width,
          STYLES.shadow,
          { overflow: "hidden" },
        ]}
      >
        {!userLocation ? (
          <View style={[STYLES.flex, STYLES.center]}>
            <Loading />
          </View>
        ) : (
          <View style={[STYLES.relative, STYLES.width, STYLES.height]}>
            <MapView
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              style={[STYLES.width, STYLES.height]}
              customMapStyle={CONSTANTS.MapStyle}
              initialRegion={{
                latitude: userLocation.lat,
                longitude: userLocation.lng,
                longitudeDelta: 0.25,
                latitudeDelta: 0.25,
              }}
            >
              {parties.map((party, index) => {
                const coordinate = {
                  latitude: party.location.lat,
                  longitude: party.location.lng,
                };
                const isSelected = selected?.id == party.id;
                return (
                  <Marker
                    onPress={() => onSelect(party)}
                    icon={isSelected ? MarkerBig : MarkerMed}
                    key={index}
                    coordinate={coordinate}
                  />
                );
              })}
            </MapView>
            <Animated.View
              style={[
                STYLES.absolute,
                STYLES.width,
                STYLES.center,
                STYLES.ph15,
                animationStyle,
                {
                  bottom: 15,
                  left: 0,
                },
              ]}
            >
              {selected ? <PartySnippet party={selected} /> : null}
            </Animated.View>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
