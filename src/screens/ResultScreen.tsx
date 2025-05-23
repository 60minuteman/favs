import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { fonts } from '../utils/fonts';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export const ResultScreen = ({ navigation }: Props) => {
  const handleClose = () => {
    navigation.goBack();
  };

  const handleSendVibes = () => {
    // Handle sending vibes
    console.log('Sending good vibes...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>YELLOW CANARY</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1553264701-d138db4fd5d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' }}
          style={styles.birdImage}
          resizeMode="contain"
        />

        <Text style={styles.scoreText}>453</Text>
        
        <Text style={styles.meetText}>MEET MY NEW FRIEND</Text>

        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://picsum.photos/200/200' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>FOLLOWING</Text>
          </TouchableOpacity>
        </View>

        <Pressable 
          style={styles.vibesButton}
          onPress={handleSendVibes}
        >
          <Text style={styles.vibesText}>TAP HERE TO SEND</Text>
          <Text style={styles.vibesText}>GOOD VIBES</Text>
        </Pressable>

        <View style={styles.bottomBar} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    position: 'relative',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  birdImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 72,
    fontFamily: fonts.bold,
    color: '#007AFF',
    marginBottom: 20,
  },
  meetText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  followButton: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  followButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  vibesButton: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  vibesText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  bottomBar: {
    width: 40,
    height: 4,
    backgroundColor: '#000',
    borderRadius: 2,
    marginBottom: 10,
  },
}); 