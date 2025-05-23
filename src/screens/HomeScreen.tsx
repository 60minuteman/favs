import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { TabBar } from '../components/TabBar';
import { Orbit } from '../components/Orbit';
import { ExploreView } from '../components/ExploreView';
import { fonts } from '../utils/fonts';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const tabs = [
  { key: 'home', title: 'Home' },
  { key: 'explore', title: 'Explore' },
];

const orbitItems = [
  { id: 1, image: require('../assets/images/profile-placeholder.png'), score: 7 },
  { id: 2, image: require('../assets/images/profile-placeholder.png'), score: 10 },
  { id: 3, image: require('../assets/images/profile-placeholder.png'), score: 8 },
  { id: 4, image: require('../assets/images/profile-placeholder.png'), score: 6 },
  { id: 5, image: require('../assets/images/profile-placeholder.png'), score: 9 },
  { id: 6, image: require('../assets/images/profile-placeholder.png') },
];

const HomeScreen = ({ navigation }: Props) => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const handleScanPress = () => {
    navigation.navigate('Camera');
  };

  const handleSearchPress = () => {
    navigation.navigate('Result');
  };

  const handleImagePress = (imageId: string) => {
    // Handle image press in explore view
    console.log('Image pressed:', imageId);
  };

  const handleLeaderboardPress = () => {
    navigation.navigate('Leaderboard');
  };

  const renderContent = () => {
    if (activeTab === 'explore') {
      return <ExploreView onImagePress={handleImagePress} />;
    }

    return (
      <>
        <Text style={styles.title}>AURASCOPE</Text>

        <View style={styles.orbitContainer}>
          <View style={styles.orbitWrapper}>
            <Orbit
              centerImage={require('../assets/images/profile-placeholder.png')}
              items={orbitItems}
            />
          </View>
        </View>

        <View style={styles.scanningContainer}>
          <Text style={styles.scanningText}>START SCANNING</Text>
          <Text style={styles.statsText}>today: 0 | scans: 0</Text>
          <Text style={styles.statsText}>following 0 | follower 0</Text>
          <TouchableOpacity onPress={handleLeaderboardPress}>
            <Text style={styles.leaderboardText}>View Leaderboard</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/bg.png')}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <TabBar 
          tabs={tabs}
          onTabChange={handleTabChange}
        />
        
        {renderContent()}

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Image 
              source={require('../assets/icons/gallery.png')} 
              style={[styles.controlIcon, {tintColor: '#000'}]} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
            <Text style={styles.scanButtonText}>SCAN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleSearchPress}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingTop: 44,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.bold,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  orbitContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  orbitWrapper: {
    transform: [{scale: 0.8}], // Reduces the size of the orbit by 20%
  },
  scanningContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 100,
  },
  scanningText: {
    fontSize: 32,
    fontFamily: fonts.bold,
    color: '#2196F3',
    marginBottom: 10,
  },
  statsText: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: '#000',
    marginBottom: 5,
  },
  leaderboardText: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: '#007AFF',
    marginTop: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingBottom: 50,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: fonts.semiBold,
  },
  controlIcon: {
    width: 32,
    height: 32,
  },
});

export default HomeScreen;