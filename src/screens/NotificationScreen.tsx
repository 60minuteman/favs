import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { fonts } from '../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import type { NavigationProp } from '../types';

interface NotificationScreenProps {}

export const NotificationScreen: React.FC<NotificationScreenProps> = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ImageBackground 
      source={require('../assets/images/d-bg2.png')}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.header}>
          Prime test app
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <Button 
            title="Open\nCamera" 
            onPress={() => navigation.navigate('Camera')}
            style={styles.squareButton}
            textStyle={styles.buttonText}
            hapticStyle="complete"
          />
          <Button 
            title="Test\nGradient" 
            onPress={() => navigation.navigate('GradientTest')}
            style={styles.squareButton}
            textStyle={styles.buttonText}
            hapticStyle="medium"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 32,
    fontFamily: fonts.bold,
    fontWeight: 'bold', 
    textAlign: 'center',
    color: '#000000',
    lineHeight: 40,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 34,
    gap: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  squareButton: {
    backgroundColor: '#000',
    flex: 1,
    aspectRatio: 1,
    borderRadius: 24,
    height: undefined,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: fonts.bold,
    textAlign: 'center',
  }
});