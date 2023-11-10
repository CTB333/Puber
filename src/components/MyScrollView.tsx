import { useEffect, useState } from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";

type MyScrollViewProps = {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
  showIndicator?: boolean;
};

const MyScrollView = ({
  children,
  styles,
  showIndicator,
}: MyScrollViewProps) => {
  const [height, setHeight] = useState(0);

  return (
    <ScrollView
      showsVerticalScrollIndicator={showIndicator}
      style={
        Array.isArray(styles)
          ? [...styles, height != 0 ? { maxHeight: height } : undefined]
          : [styles, height != 0 ? { maxHeight: height } : undefined]
      }
      contentContainerStyle={height != 0 ? [{ height }] : undefined}
    >
      <View onLayout={(e) => setHeight(e.nativeEvent.layout.height)}>
        {children}
      </View>
    </ScrollView>
  );
};

export default MyScrollView;
