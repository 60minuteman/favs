import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { MeshGradient } from '../components/MeshGradient';
import type { RootStackScreenProps } from '../navigation/AppNavigator';

type Props = RootStackScreenProps<'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('PhoneAuth');
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MeshGradient style={styles.background} />
      <Image
        source={require('../assets/icons/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  logo: {
    width: 150,
    height: 150,
  },
}); 