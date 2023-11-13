import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import STYLES from "../styles";
import { PartyDetailScreenProps } from "../navigation";
import {
  useGetUser,
  useGoBackHeader,
  useOnSuccess,
  useSuccessMessage,
} from "../hooks";
import CONSTANTS from "../Constants";
import {
  Button,
  FormHeader,
  ScrollFooterSpace,
  UserHeader,
  UserSnippet,
} from "../components";
import { ActionButton } from "../components/buttons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePartyDetail from "../hooks/usePartyDetail";
import { User } from "../interfaces";

const PartyDetailScreen = ({ navigation, route }: PartyDetailScreenProps) => {
  useGoBackHeader();
  const { bottom } = useSafeAreaInsets();

  const {
    host,
    party,
    drivers,
    hasDrivers,
    guests,
    toggleAllGuests,
    showAllGuestsValue,

    rsvp,
    loading,
    success,
    userIsRsvpd,
    userIsDriver,
    removeDriver,
  } = usePartyDetail(route.params.party);

  const succesMsg = useSuccessMessage();
  useOnSuccess(() => {
    succesMsg(`Rsvp ${userIsRsvpd ? `Accepted` : `Removed`}`);
  }, success);

  const toUser = (user: User) => {
    navigation.navigate("User", { user });
  };

  const toDriversApp = () => {
    navigation.navigate("DriverApplication", { party });
  };

  return (
    <View style={[STYLES.page, { paddingHorizontal: 0, paddingVertical: 0 }]}>
      <ScrollView
        overScrollMode="never"
        scrollIndicatorInsets={{ right: 1 }}
        style={[STYLES.width]}
      >
        <View
          style={[
            STYLES.bgPrimary,
            STYLES.width,
            STYLES.relative,
            { height: CONSTANTS.PartyImageHeight },
          ]}
        >
          <Image source={{ uri: party.image }} style={[STYLES.absoluteFill]} />
        </View>
        <View style={[STYLES.p15]}>
          {/* Tags And Title */}
          <FormHeader marginTop={0} title={party.title} />
          <View
            style={[
              STYLES.width,
              STYLES.p5,
              STYLES.even,
              STYLES.row,
              { flexWrap: "wrap" },
            ]}
          >
            {party.tags.map((tag) => {
              return (
                <View
                  key={tag}
                  style={[STYLES.border, STYLES.p5, STYLES.rad15, STYLES.ph10]}
                >
                  <Text style={[STYLES.fs1, STYLES.colorPrimary]}>{tag}</Text>
                </View>
              );
            })}
          </View>

          {/* Title And Desc */}
          <View style={[STYLES.mv15, STYLES.center]}>
            <Text style={[STYLES.fs1, STYLES.colorPrimary, STYLES.textCenter]}>
              {party.desc}
            </Text>
            {!party.hideAddress ? (
              <View style={[{ marginBottom: 15 }]} />
            ) : null}
            {!party.hideAddress ? (
              <Text
                style={[
                  STYLES.fs2,
                  STYLES.bold,
                  STYLES.colorPrimary,
                  STYLES.textCenter,
                ]}
              >
                {party.location.fullAddress}
              </Text>
            ) : null}
          </View>

          {/* Dates */}
          <FormHeader marginTop={0} title="Date" />
          <View style={[STYLES.width, STYLES.center]}>
            <Text
              style={[
                STYLES.fs1,
                STYLES.width,
                STYLES.border,
                STYLES.p10,
                STYLES.rad15,
                STYLES.colorPrimary,
                STYLES.textCenter,
              ]}
            >
              <Text style={[STYLES.bold]}>{party.date.date}</Text>{" "}
              {party.date.start} - {party.date.end}
            </Text>
          </View>

          {/* Host */}
          <FormHeader title="Hosted By" />
          <View style={[STYLES.center]}>
            <UserHeader user={host} />
            <View style={[{ marginBottom: 15 }]} />
            <Button
              text="View Host"
              onPress={host ? () => toUser(host) : undefined}
            />
          </View>

          {/* Drivers */}
          {hasDrivers ? (
            <>
              <FormHeader title="Drivers" />
              <View
                style={[
                  STYLES.center,
                  STYLES.row,
                  STYLES.even,
                  { flexWrap: "wrap", marginBottom: 15 },
                ]}
              >
                {drivers.map((driver) => (
                  <View
                    key={driver.id}
                    style={[STYLES.center, STYLES.mv15, { width: "50%" }]}
                  >
                    <UserSnippet user={driver} />
                  </View>
                ))}
              </View>
              <View style={[STYLES.center]}>
                <Button
                  disabled={loading}
                  onPress={userIsDriver ? removeDriver : toDriversApp}
                  text={userIsDriver ? "Quit Driving" : "Apply"}
                />
              </View>
            </>
          ) : null}

          {/* Guests */}
          <FormHeader title="Guest List" />
          <View
            style={[
              STYLES.center,
              STYLES.row,
              STYLES.even,
              { flexWrap: "wrap", marginBottom: 15 },
            ]}
          >
            {guests.map((guest) => (
              <View
                key={guest.id}
                style={[STYLES.center, STYLES.mv15, { width: "50%" }]}
              >
                <UserSnippet onPress={() => toUser(guest)} user={guest} />
              </View>
            ))}
          </View>
          {party.guests.length > 4 ? (
            <View style={[STYLES.center]}>
              <Button
                onPress={toggleAllGuests}
                text={showAllGuestsValue ? "View Less" : "View All"}
              />
            </View>
          ) : null}
        </View>

        {/* Fin */}
        <ScrollFooterSpace divideBy={20} />
      </ScrollView>
      <View style={[STYLES.center, STYLES.p10, { paddingBottom: bottom }]}>
        <ActionButton
          onPress={rsvp}
          disabled={loading}
          big
          bold
          text={userIsRsvpd ? "Remove RSVP" : "RSVP"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PartyDetailScreen;
