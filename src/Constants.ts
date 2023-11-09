import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

const CONSTANTS = {
  ScreenHieght: height,
  ScreenWidth: width,
  URL: "https://fdc0-69-193-26-42.ngrok-free.app/", // Must include '/' at the end of url
  GeoCodeURL: "https://maps.googleapis.com/maps/api/geocode/json?address=",
  GoogleAPIKey: "AIzaSyDZXuezXmHuoBbecqGqZz0IW0kv7S65Pes", // This will be deleted at the end of the semester https://console.cloud.google.com/google/maps-apis/home?project=swen-444
};

export default CONSTANTS;
