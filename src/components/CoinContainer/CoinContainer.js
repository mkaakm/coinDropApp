import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FallingCoin from '../FallingCoin/FallingCoin';

const { width: SCREEN_WIDTH} = Dimensions.get('window');
const MAX_COINS = 20;
const CoinContainer = () => {
  const [coins, setCoins] = useState([]);
  const [removalTimer, setRemovalTimer] = useState(null);
  const [coinId, setCoinId] = useState(0);

  const addCoin = () => {
    if (coins.length >= MAX_COINS) return;
    setCoinId(prevCoinId => prevCoinId + 1);
    setCoins((prevCoins) => {
      const newCoin = {
        id: coinId,
        x: Math.random() * (SCREEN_WIDTH - 30),
        fallen: false,
      };
      return [...prevCoins, newCoin]
    });
    
  };

  const handleComplete = (id) => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) =>
        coin.id === id ? { ...coin, fallen: true } : coin
      )
    );

    if (coins.length >= MAX_COINS) {
      startRemovalTimer();
    }
  };

  const startRemovalTimer = () => {
    if (removalTimer) return;

    setRemovalTimer(
      setInterval(() => {
        setCoins((prevCoins) => {
          const updatedCoins = prevCoins.slice(1);
          if (updatedCoins.length === 0) {
            clearInterval(removalTimer);
            setRemovalTimer(null);
          }
          return updatedCoins;
        });
      }, 1000)
    );
  };

  useEffect(() => {
    return () => {
      if (removalTimer) clearInterval(removalTimer);
    };
  }, [removalTimer]);

  return (
    <TouchableOpacity style={styles.container} onPress={addCoin}>
      <View style={styles.innerContainer}>
        {coins.map((coin) =>
          coin.fallen ? (
            <View
              key={coin.id}
              style={[styles.coin, { left: coin.x, bottom: 0 }]}
            />
          ) : (
            <FallingCoin
              key={coin.id}
              x={coin.x}
              onComplete={() => handleComplete(coin.id)}
            />
          )
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    width:'100%',
  },
  innerContainer: {
    flex: 1,
    width:'100%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  coin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'gold',
    position: 'absolute',
  },
});

export default CoinContainer;
