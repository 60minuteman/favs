import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../utils/fonts';

interface CameraHeaderProps {
  streakCount: number;
  onSettingsPress?: () => void;
}

export const CameraHeader: React.FC<CameraHeaderProps> = ({ 
  streakCount, 
  onSettingsPress 
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image 
          source={require('../assets/icons/logo.png')}
          style={styles.logoIcon}
        />
        <Text style={styles.headerText}>Aurascope</Text>
      </View>
      <View style={styles.headerRight}>
        <View style={styles.streakContainer}>
          <Image 
            source={require('../assets/icons/Fire.png')} 
            style={styles.fireIcon}
          />
          <Text style={styles.streakCount}>{streakCount}</Text>
        </View>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={onSettingsPress}
        >
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 20,
    height: 24,
    marginRight: 8,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  fireIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  streakCount: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  settingsButton: {
    padding: 8,
  },
}); 