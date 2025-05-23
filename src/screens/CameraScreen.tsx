import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, SafeAreaView, StatusBar, Animated } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { fonts } from '../utils/fonts';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraHeader } from '../components/CameraHeader';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const focusCircleSize = SCREEN_WIDTH * 0.75; // Reduced to 75% to ensure it fits properly
const innerCircleSize = focusCircleSize - 60;
const balancerWidth = focusCircleSize * 0.3;

export const CameraScreen: React.FC = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const cameraRef = useRef<CameraView>(null);
  const pulseAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  if (!permission) {
    return (
      <View style={[styles.container, styles.centeredContainer]}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.centeredContainer]}>
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
        navigation.navigate('ImagePreview', { imageUri: photo.uri });
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}
      />
      
      {/* Top Gradient Overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.1)', 'transparent']}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={styles.topGradient}
        pointerEvents="none"
      />
      
      {/* Header Overlay */}
      <View style={styles.headerOverlay}>
        <CameraHeader 
          streakCount={7} 
          onSettingsPress={() => navigation.navigate('Home')}
        />
      </View>

      {/* Scanner Overlay */}
      <View style={styles.scannerOverlay}>
        <Animated.View style={[styles.focusCircleOuter, {
          transform: [{
            scale: pulseAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.05]
            })
          }],
          opacity: pulseAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1]
          })
        }]}>
          <View style={styles.focusCircleInner}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
          </View>
          <View style={[styles.horizontalLine, styles.leftLine]} />
          <View style={[styles.horizontalLine, styles.rightLine]} />
          <View style={[styles.verticalLine, styles.topLine]} />
          <View style={[styles.verticalLine, styles.bottomLine]} />
        </Animated.View>
      </View>

      {/* Bottom Gradient Overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={styles.bottomGradient}
        pointerEvents="none"
      />
      
      {/* Controls Overlay */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Image source={require('../../assets/icons/gallery.png')} style={styles.controlIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner}>
            <Image source={require('../../assets/icons/snap.png')} style={styles.snapIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
          <Image source={require('../../assets/icons/flip.png')} style={styles.controlIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  camera: {
    flex: 1,
  },
  topGradient: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  bottomGradient: {
    width: '100%',
    height: 250,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  scannerOverlay: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    bottom: 200,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  focusCircleOuter: {
    width: focusCircleSize,
    height: focusCircleSize,
    borderRadius: focusCircleSize / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusCircleInner: {
    width: innerCircleSize,
    height: innerCircleSize,
    borderRadius: innerCircleSize / 2,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
  },
  cornerTL: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  cornerTR: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 20,
    height: 20,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 20,
    height: 20,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  horizontalLine: {
    position: 'absolute',
    width: balancerWidth,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    top: '50%',
  },
  leftLine: {
    left: -balancerWidth / 2,
  },
  rightLine: {
    right: -balancerWidth / 2,
  },
  verticalLine: {
    position: 'absolute',
    width: 1,
    height: balancerWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    left: '50%',
  },
  topLine: {
    top: -balancerWidth / 2,
  },
  bottomLine: {
    bottom: -balancerWidth / 2,
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
    zIndex: 1,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  captureButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: 'rgba(255,255,255,0.9)',
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
  headerOverlay: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 1,
  },
});