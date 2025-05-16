import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { RootStackScreenProps } from '../navigation/AppNavigator';
import { TabBar } from '../components/TabBar';
import { Orbit } from '../components/Orbit';
import { fonts } from '../utils/fonts';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

type Props = RootStackScreenProps<'Home'>;

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

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
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
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="photo-library" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.scanButton}>
            <Text style={styles.scanButtonText}>SCAN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
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
    color: '#007AFF',
    marginBottom: 10,
  },
  statsText: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: '#000',
    marginBottom: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30,
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
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: fonts.semiBold,
  },
});