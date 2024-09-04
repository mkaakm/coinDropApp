import { useEffect } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const FallingCoin = ({ x, onComplete }) => {
  const translateY = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT - 60,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      if (onComplete) {
        onComplete();
      }
    });
  }, []);

  return (
    <Animated.View
      style={[
        styles.coin,
        { transform: [{ translateY }], left: x },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  coin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'gold',
    position: 'absolute',
    top: 0,
  },
});

export default FallingCoin;
