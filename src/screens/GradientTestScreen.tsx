import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { fonts } from '../utils/fonts';
import { MeshGradient } from '../components/MeshGradient';

export const GradientTestScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MeshGradient 
        colors={{
          primary: '#FFEB85',
          secondary: '#85FFB5'
        }}
        intensity={0.7}
        speed={1}
      />

      <View style={styles.content}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={50} style={styles.button}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </BlurView>
        ) : (
          <TouchableOpacity 
            style={styles.buttonAndroid}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    overflow: 'hidden',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonAndroid: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});