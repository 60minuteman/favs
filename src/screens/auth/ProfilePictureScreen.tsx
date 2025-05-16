import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import type { RootStackScreenProps } from '../../navigation/AppNavigator';
import { AuthHeader } from '../../components/AuthHeader';
import { Button } from '../../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { fonts } from '../../utils/fonts';

type Props = RootStackScreenProps<'ProfilePicture'>;

export const ProfilePictureScreen: React.FC<Props> = ({ navigation, route }) => {
  const { firstName, lastName, birthday } = route.params;
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleAddProfilePicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    navigation.navigate('Permission');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />
      <View style={styles.content}>
        <Text style={styles.title}>Add a profile picture</Text>
        <Text style={styles.subtitle}>Help people recognize you</Text>

        <View style={styles.pictureContainer}>
          <TouchableOpacity
            style={styles.pictureButton}
            onPress={handleAddProfilePicture}
          >
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <>
                <View style={styles.placeholderCircle}>
                  <Text style={styles.placeholderText}>{firstName?.[0]?.toUpperCase() || '+'}</Text>
                </View>
                <Text style={styles.addPhotoText}>tap to add photo</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <Button
          title={profileImage ? "Continue" : "Skip for now"}
          onPress={handleNext}
          style={styles.nextButton}
          textStyle={styles.nextButtonText}
          hapticStyle="complete"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.bold,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: 'rgba(0, 0, 0, 0.7)',
    marginBottom: 40,
    textAlign: 'center',
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pictureButton: {
    alignItems: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  placeholderCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 64,
    fontFamily: fonts.semiBold,
    color: '#007AFF',
  },
  addPhotoText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#007AFF',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    borderRadius: 14,
    height: 56,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
}); 