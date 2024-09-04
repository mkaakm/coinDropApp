import { View, StyleSheet } from 'react-native';

const Coin = () => {
  return <View style={styles.coin} />;
};

const styles = StyleSheet.create({
  coin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'gold',
    position: 'absolute',
  },
});

export default Coin;
