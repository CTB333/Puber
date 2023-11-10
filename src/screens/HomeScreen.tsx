import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Animated from "react-native-reanimated";
import STYLES from "../styles";
import { GMap, Loading, PartySnippet } from "../components";
import { HomeScreenProps } from "../navigation";
import {
  useDrawerHeader,
  useEnableDrawerSwipe,
  useFilterParties,
  useHomeSnippetAnimation,
} from "../hooks";
import CONSTANTS from "../Constants";
import MarkerMed from "../assets/MarkerMed.png";
import MarkerBig from "../assets/MarkerBig.png";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  useEnableDrawerSwipe();
  useDrawerHeader();

  const { parties, distances, userLocation } = useFilterParties([
    navigation.isFocused(),
  ]);

  const { selected, animationStyle, onSelect } =
    useHomeSnippetAnimation(parties);

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
            <GMap initial={userLocation}>
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
            </GMap>
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
              {selected ? (
                <PartySnippet
                  lessOpaque
                  party={selected}
                  distance={distances.find(
                    (distance) => selected.id === distance.partyId
                  )}
                />
              ) : null}
            </Animated.View>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
