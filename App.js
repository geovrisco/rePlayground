/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  View,
  Dimensions,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('screen');

const App = () => {
  const posY = useSharedValue(0);
  const posX = useSharedValue(0);
  const animationSize = useSharedValue({width: width / 2, height: height / 4});
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: posY.value * 100},
        {translateX: posX.value * 100},
      ],
      width: withTiming(animationSize.value.width, {duration: 1000}),
      height: withTiming(animationSize.value.height, {duration: 600}),
    };
  });

  const handleTransform = () => {
    posY.value = withTiming(-2, {duration: 1000});
    animationSize.value = {width: (width * 90) / 100, height: height / 4};
  };
  const handleRevert = () => {
    posY.value = withTiming(0, {duration: 1000});
    animationSize.value = {width: width / 2, height: height / 4};
  };

  // const handlePress
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          White
        </Text>
      </Animated.View>
      <View style={{flexDirection: 'row', position: 'absolute', bottom: 0}}>
        {/* <Button onPress={() => (posY.value = withSpring(-1))} title="up" />
        <Button onPress={() => (posY.value = withSpring(1))} title="down" />
        <Button
          onPress={() => (
            (posY.value = withSpring(0)), (posX.value = withSpring(0))
          )}
          title="mid"
        />
        <Button onPress={() => (posX.value = withSpring(-1))} title="left" />
        <Button onPress={() => (posX.value = withSpring(1))} title="right" /> */}
        <Button onPress={handleTransform} title="transform" />
        <Button onPress={handleRevert} title="revert" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'dodgerblue',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
