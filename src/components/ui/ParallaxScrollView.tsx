import { useRef } from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const HEADER_HEIGHT = 300;

export function ParallaxScrollView(
  props: ScrollViewProps & {
    renderBackground?: () => React.ReactNode;
    renderForeground?: () => React.ReactNode;
    renderFixedHeader?: () => React.ReactNode;
    fadeOutForeground?: boolean;
    renderContent?: () => React.ReactNode;
  }
) {
  const {
    renderBackground,
    renderForeground,
    renderFixedHeader,
    fadeOutForeground,
    renderContent,
    ...restProps
  } = props;

  const { height: windowHeight } = useWindowDimensions();
  const scrollY = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scrollY.value * 0.5,
        },
      ],
    };
  });

  const foregroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scrollY.value,
        },
      ],
      opacity: fadeOutForeground
        ? 1 - Math.min(scrollY.value / HEADER_HEIGHT, 1)
        : 1,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        {...restProps}
      >
        <View style={[styles.header, { height: HEADER_HEIGHT }]}>
          {renderBackground && (
            <Animated.View style={[styles.background, headerAnimatedStyle]}>
              {renderBackground()}
            </Animated.View>
          )}
          {renderForeground && (
            <Animated.View style={[styles.foreground, foregroundAnimatedStyle]}>
              {renderForeground()}
            </Animated.View>
          )}
        </View>
        {renderContent && <View style={styles.content}>{renderContent()}</View>}
      </Animated.ScrollView>
      {renderFixedHeader && (
        <View style={styles.fixedHeader}>{renderFixedHeader()}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "relative",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  foreground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
