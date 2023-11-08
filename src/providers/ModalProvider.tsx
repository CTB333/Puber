import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Text, View } from "react-native";
import STYLES from "../styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CONSTANTS from "../Constants";

type ModalContextStateType = {
  component: React.ReactNode | null;
  isOpen: boolean;
};

type ModalContextType = ModalContextStateType & {
  setComponent: (component: React.ReactNode | null) => void;
  open: () => void;
  close: () => void;
};

const initialState: ModalContextStateType = {
  component: null,
  isOpen: false,
};

const initialValue: ModalContextType = {
  ...initialState,
  setComponent: (component) => {},
  open: () => {},
  close: () => {},
};

const ModalContext = createContext<ModalContextType>(initialValue);

export const useModal = () => useContext(ModalContext);

type ModalProviderProps = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: ModalProviderProps) => {
  const animation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    let translateY = interpolate(
      animation.value,
      [0, 1],
      [CONSTANTS.ScreenHieght, 0],
      "clamp"
    );
    return {
      transform: [{ translateY }],
    };
  });

  const [component, setComponent] = useState<React.ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => {
    setIsOpen(true);
    animation.value = withTiming(1, { duration: 250 });
  };

  const close = () => {
    animation.value = withTiming(0, { duration: 250 });
    setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  const value = {
    component,
    setComponent,
    open,
    close,
    isOpen,
  };

  return (
    <ModalContext.Provider value={value}>
      <View style={[STYLES.flex, STYLES.width, STYLES.relative]}>
        <Animated.View
          style={[
            STYLES.absolute,
            STYLES.width,
            STYLES.height,
            animatedStyle,
            { zIndex: 5 },
          ]}
        >
          <View
            style={[
              STYLES.width,
              STYLES.height,
              STYLES.center,
              STYLES.relative,
            ]}
          >
            <View
              style={[STYLES.absoluteFill, STYLES.bgPrimary, { opacity: 0.5 }]}
            />
            <View
              style={[STYLES.ph15, STYLES.width, STYLES.center, STYLES.height]}
            >
              {component}
            </View>
          </View>
        </Animated.View>
        {children}
      </View>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
