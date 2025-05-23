import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { fonts } from '../utils/fonts';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Orbit } from '../components/Orbit';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'FriendsProfile'>;

export const FriendsProfileScreen = ({ navigation }: Props) => {
  const handleClose = () => {
    navigation.goBack();
  };

  const orbitItems = [
    { id: 1, image: { uri: 'https://picsum.photos/200/300?random=1' }, score: 7 },
    { id: 2, image: { uri: 'https://picsum.photos/200/300?random=2' }, score: 10 },
    { id: 3, image: { uri: 'https://picsum.photos/200/300?random=3' }, score: 8 },
    { id: 4, image: { uri: 'https://picsum.photos/200/300?random=4' }, score: 6 },
    { id: 5, image: { uri: 'https://picsum.photos/200/300?random=5' }, score: 9 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>KAIA</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.orbitContainer}>
          <Orbit
            centerImage={{ uri: 'https://picsum.photos/200/200' }}
            items={orbitItems}
          />
        </View>

        <Text style={styles.scoreText}>18,034</Text>
        <Text style={styles.statsText}>today: 2,300 | scans: 23</Text>

        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>FOLLOWING</Text>
        </TouchableOpacity>

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
  },
  orbitContainer: {
    width: width,
    height: width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  scoreText: {
    fontSize: 72,
    fontFamily: fonts.bold,
    color: '#007AFF',
    marginTop: 20,
  },
  statsText: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: '#000',
    marginTop: 10,
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  followButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  bottomBar: {
    width: 40,
    height: 4,
    backgroundColor: '#000',
    borderRadius: 2,
    position: 'absolute',
    bottom: 10,
  },
});