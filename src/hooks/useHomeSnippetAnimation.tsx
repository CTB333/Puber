import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Party } from "../interfaces";
import useSelect from "./useSelect";
import { useEffect } from "react";
import { stringify } from "../utils";

const useHomeSnippetAnimation = (parties: Party[]) => {
  const { select, selected, unselect } = useSelect<Party>({
    options: parties,
  });

  const animation = useSharedValue(0);
  const animationStyle = useAnimatedStyle(() => {
    let translateY = interpolate(animation.value, [0, 1], [1000, 0]);
    return {
      transform: [{ translateY }],
    };
  });
  const onSelect = (party: Party) => {
    const isSelected = selected?.id == party.id;

    if (!isSelected) {
      select(party);
      animation.value = withTiming(1, { duration: 250 });
      return;
    }

    animation.value = withTiming(0, { duration: 250 });
    setTimeout(() => {
      unselect();
    }, 150);
  };

  useEffect(() => {
    if (selected && !parties.find((party) => party.id == selected.id))
      onSelect(selected);
  }, [stringify(parties)]);

  return {
    selected,
    animationStyle,
    onSelect,
  };
};

export default useHomeSnippetAnimation;
