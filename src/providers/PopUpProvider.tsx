import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import STYLES from "../styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type PopUpProviderContextStateType = {
  popUpStyle: ViewStyle;
  titleStyle: TextStyle;
  subTitleStyle: TextStyle;

  title?: string;
  subTitle?: string;
};

type PopUpProviderContextType = {
  setPopUp: (options?: PopUpProviderContextStateType) => void;
  flash: (duration?: number) => void;
};

const initialState: PopUpProviderContextStateType = {
  popUpStyle: {},
  titleStyle: {},
  subTitleStyle: {},
};

const initialValue: PopUpProviderContextType = {
  setPopUp: (options?: PopUpProviderContextStateType) => {},
  flash: (duration?: number) => {},
};

const PopUpProviderContext =
  createContext<PopUpProviderContextType>(initialValue);

export const usePopUp = () => useContext(PopUpProviderContext);

type PopUpProviderProps = {
  children: React.ReactNode;
};

const PopUpProvider = ({ children }: PopUpProviderProps) => {
  const { top } = useSafeAreaInsets();
  const animation = useSharedValue(0);
  const [height, setHeight] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const animationStyle = useAnimatedStyle(() => {
    let translateHeight = height + top;
    let translateY = interpolate(
      animation.value,
      [0, 1],
      [-translateHeight, 0],
      "clamp"
    );
    return {
      transform: [{ translateY }],
    };
  }, [height]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     flash();
  //   }, 1000);
  // }, []);

  const [state, setState] =
    useState<PopUpProviderContextStateType>(initialState);

  const open = () => {
    animation.value = withTiming(1, { duration: 250 });
  };

  const close = () => {
    animation.value = withTiming(0, { duration: 250 });
  };

  const flash = (duration?: number) => {
    if (flashing) return;
    open();
    setFlashing(true);

    setTimeout(() => {
      close();
      setTimeout(() => {
        setFlashing(false);
      }, 250);
    }, duration ?? 1750);
  };

  const setPopUp = (options?: PopUpProviderContextStateType) => {
    setState(options ?? initialState);
  };
  const value = {
    setPopUp,
    flash,
  };

  return (
    <PopUpProviderContext.Provider value={value}>
      <View style={[STYLES.flex, { position: "relative" }]}>
        <Animated.View
          onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
          style={[
            STYLES.width,
            STYLES.ph15,
            styles.popUpContainer,
            { top: top },
            animationStyle,
          ]}
        >
          <View
            style={[
              STYLES.width,
              STYLES.center,
              STYLES.height,
              STYLES.rad15,
              STYLES.bgPrimary,
              STYLES.borderWhite,
              STYLES.shadow,
              state.popUpStyle,
            ]}
          >
            {state.title ? (
              <Text
                style={[
                  STYLES.fs2,
                  STYLES.colorWhite,
                  STYLES.bold,
                  state.titleStyle,
                ]}
              >
                {state.title}
              </Text>
            ) : null}
            {state.subTitle ? (
              <Text
                style={[STYLES.fs1, STYLES.colorWhite, state.subTitleStyle]}
              >
                {state.subTitle}
              </Text>
            ) : null}
          </View>
        </Animated.View>
        {children}
      </View>
    </PopUpProviderContext.Provider>
  );
};

const styles = StyleSheet.create({
  popUpContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "10%",
    zIndex: 10,
  },
});

export default PopUpProvider;
