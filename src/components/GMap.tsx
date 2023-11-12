import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import STYLES from "../styles";
import CONSTANTS from "../Constants";
import { Pressable, View } from "react-native";
import Icon from "./Icon";
import COLORS from "../colors";
import { useState } from "react";

type GMapProps = {
  initial: {
    lat: number;
    lng: number;
  };
  children?: React.ReactNode | React.ReactNode[];
};

const GMap = ({ initial, children }: GMapProps) => {
  const initialRegion = {
    latitude: initial.lat,
    longitude: initial.lng,
    longitudeDelta: 0.25,
    latitudeDelta: 0.25,
  };

  const [region, setRegion] = useState(initialRegion);

  return (
    <View style={[STYLES.width, STYLES.relative, STYLES.height]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={[STYLES.width, STYLES.height]}
        customMapStyle={CONSTANTS.MapStyle}
        initialRegion={initialRegion}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {children}
      </MapView>
      <Pressable
        onPress={() => setRegion(initialRegion)}
        style={[STYLES.absolute, { top: 15, right: 15 }]}
      >
        {({ pressed }) => (
          <View style={[STYLES.bgPrimary, STYLES.p5, STYLES.rad15]}>
            <Icon
              name="userLocation"
              color={pressed ? COLORS.accent : COLORS.white}
              size={35}
            />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default GMap;
