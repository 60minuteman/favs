import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { fonts } from '../utils/fonts';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CIRCLE_SIZE = SCREEN_WIDTH * 0.8;

type ImagePreviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ImagePreview'>;
type ImagePreviewScreenRouteProp = RouteProp<RootStackParamList, 'ImagePreview'>;

interface ImagePreviewScreenProps {}

export const ImagePreviewScreen: React.FC<ImagePreviewScreenProps> = () => {
  const navigation = useNavigation<ImagePreviewScreenNavigationProp>();
  const route = useRoute<ImagePreviewScreenRouteProp>();
  const { imageUri } = route.params;

  const handleRetake = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.goBack();
  };

  const handleSubmit = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log('Using image:', imageUri);
    // Navigate back to home or wherever you want to go after using the photo
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Image */}
      <Image source={{ uri: imageUri }} style={styles.backgroundImage} resizeMode="cover" />
      
      {/* Dark Overlay */}
      <View style={styles.darkOverlay} />
      
      {/* Circular Crop Area */}
      <View style={styles.cropContainer}>
        <View style={styles.circularFrame}>
          <Image source={{ uri: imageUri }} style={styles.circularImage} resizeMode="cover" />
        </View>
      </View>
      
      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
          <Text style={styles.retakeText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
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
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  cropContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularFrame: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.8)',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  circularImage: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },
  controls: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    zIndex: 2,
  },
  retakeButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  submitButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  retakeText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
});