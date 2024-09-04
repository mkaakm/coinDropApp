import { View, StyleSheet, } from 'react-native';
import CoinContainer from '../components/CoinContainer/CoinContainer';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CoinContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
