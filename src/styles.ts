import { StyleSheet } from "react-native";
import COLORS from "./colors";

const STYLES = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  even: {
    justifyContent: "space-evenly",
  },
  page: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: COLORS.secondary,
  },
  width: {
    width: "100%",
  },
  height: {
    height: "100%",
  },

  absoluteFill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  absolute: {
    position: "absolute",
  },
  relative: {
    position: "relative",
  },

  fs1: { fontSize: 15 },
  fs2: { fontSize: 20 },
  fs3: { fontSize: 25 },
  fs4: { fontSize: 30 },
  bold: { fontWeight: "bold" },
  textCenter: { textAlign: "center" },

  border: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  borderWhite: {
    borderWidth: 1,
    borderColor: COLORS.white,
  },

  p5: {
    padding: 5,
  },
  p10: {
    padding: 10,
  },
  p15: {
    padding: 15,
  },
  p20: {
    padding: 20,
  },
  p25: {
    padding: 25,
  },
  p30: {
    padding: 30,
  },

  ph5: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  ph10: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  ph15: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  ph20: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  ph25: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  ph30: {
    paddingLeft: 30,
    paddingRight: 30,
  },

  pv5: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  pv10: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  pv15: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  pv20: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  pv25: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  pv30: {
    paddingTop: 30,
    paddingBottom: 30,
  },

  m5: {
    margin: 5,
  },
  m10: {
    margin: 10,
  },
  m15: {
    margin: 15,
  },
  m20: {
    margin: 20,
  },
  m25: {
    margin: 25,
  },
  m30: {
    margin: 30,
  },

  mh5: {
    marginLeft: 5,
    marginRight: 5,
  },
  mh10: {
    marginLeft: 10,
    marginRight: 10,
  },
  mh15: {
    marginLeft: 15,
    marginRight: 15,
  },
  mh20: {
    marginLeft: 20,
    marginRight: 20,
  },
  mh25: {
    marginLeft: 25,
    marginRight: 25,
  },
  mh30: {
    marginLeft: 30,
    marginRight: 30,
  },

  mv5: {
    marginTop: 5,
    marginBottom: 5,
  },
  mv10: {
    marginTop: 10,
    marginBottom: 10,
  },
  mv15: {
    marginTop: 15,
    marginBottom: 15,
  },
  mv20: {
    marginTop: 20,
    marginBottom: 20,
  },
  mv25: {
    marginTop: 25,
    marginBottom: 25,
  },
  mv30: {
    marginTop: 30,
    marginBottom: 30,
  },

  rad10: {
    borderRadius: 10,
  },
  rad15: {
    borderRadius: 15,
  },
  rad30: {
    borderRadius: 30,
  },

  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6.21,
    elevation: 15,
  },

  bgPrimary: { backgroundColor: COLORS.primary },
  bgSecondary: { backgroundColor: COLORS.secondary },
  bgWhite: { backgroundColor: COLORS.white },
  bgAccent: { backgroundColor: COLORS.accent },

  colorPrimary: { color: COLORS.primary },
  colorSecondary: { color: COLORS.secondary },
  colorWhite: { color: COLORS.white },
  colorAccent: { color: COLORS.accent },
});

export default STYLES;
