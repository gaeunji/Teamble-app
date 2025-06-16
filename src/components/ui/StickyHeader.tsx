import { useRef } from "react";
import { ScrollView, ScrollViewProps, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export function StickyHeader(
  props: ScrollViewProps & {
    renderHeader?: () => React.ReactNode;
    renderContent?: () => React.ReactNode;
    headerHeight?: number;
  }
) {
  const {
    renderHeader,
    renderContent,
    headerHeight = 100,
    ...restProps
  } = props;

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
          translateY: Math.min(scrollY.value, headerHeight),
        },
      ],
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
        <View style={[styles.headerPlaceholder, { height: headerHeight }]} />
        {renderContent && <View style={styles.content}>{renderContent()}</View>}
      </Animated.ScrollView>
      {renderHeader && (
        <Animated.View
          style={[styles.header, { height: headerHeight }, headerAnimatedStyle]}
        >
          {renderHeader()}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerPlaceholder: {
    position: "relative",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  content: {
    flex: 1,
  },
});
