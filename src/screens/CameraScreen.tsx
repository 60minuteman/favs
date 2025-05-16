import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, SafeAreaView, StatusBar } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { fonts } from '../utils/fonts';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraHeader } from '../components/CameraHeader';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const scannerSize = SCREEN_WIDTH * 0.7; // Scanner size is 70% of screen width

export const CameraScreen: React.FC = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      const photo = await cameraRef.current?.takePictureAsync();
      if (photo) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setImage(photo.uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {!image ? (
        <CameraView 
          ref={cameraRef}
          style={styles.camera} 
          facing={facing}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.1)', 'transparent']}
            locations={[0, 0.25, 0.5, 0.75, 1]}
            style={styles.topGradient}
          />
          <View style={{ marginTop: 30 }}>
            <CameraHeader 
              streakCount={7} 
              onSettingsPress={() => navigation.navigate('Home')}
            />
          </View>

          <View style={[styles.scannerContainer, { marginBottom: 120 }]}>
            <Image 
              source={require('../../assets/icons/frame.png')}
              style={styles.scanner}
              resizeMode="contain"
            />
          </View>

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
            locations={[0, 0.25, 0.5, 0.75, 1]}
            style={styles.bottomGradient}
          />
          <View style={styles.controls}>
            <TouchableOpacity>
              <Image source={require('../../assets/icons/gallery.png')} style={styles.controlIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Image source={require('../../assets/icons/snap.png')} style={styles.snapIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraFacing}>
              <Image source={require('../../assets/icons/flip.png')} style={styles.controlIcon} />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.previewContainer}>
          <LinearGradient
            colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.1)', 'transparent']}
            locations={[0, 0.25, 0.5, 0.75, 1]}
            style={styles.previewTopGradient}
          />
          <View style={styles.previewWrapper}>
            <Image source={{ uri: image }} style={styles.preview} resizeMode="contain" />
          </View>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
            locations={[0, 0.25, 0.5, 0.75, 1]}
            style={styles.previewBottomGradient}
          />
          <View style={styles.controls}>
            <TouchableOpacity style={styles.button} onPress={() => setImage(null)}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.usePhotoButton]} 
              onPress={() => {
                // Handle the captured image
                console.log('Using image:', image);
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  topGradient: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
  },
  bottomGradient: {
    width: '100%',
    height: 250,
    position: 'absolute',
    bottom: 0,
  },
  previewTopGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    zIndex: 1,
  },
  previewBottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanner: {
    width: scannerSize,
    height: scannerSize,
  },
  controls: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 56,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 80,
  },
  usePhotoButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.bold,
    marginBottom: 20,
  },
  captureButton: {
    width: 71,
    height: 71,
    borderRadius: 35.5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlIcon: {
    width: 32,
    height: 32,
  },
  snapIcon: {
    width: 40,
    height: 40,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
  }
}); 