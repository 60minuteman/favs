import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, Animated, TouchableOpacity, Easing } from 'react-native';
import { fonts } from '../utils/fonts';

const { width } = Dimensions.get('window');
const ORBIT_RADIUS = width * 0.35; // Reduced from 0.35
const ITEM_SIZE = 60; // Reduced from 50
const CENTER_IMAGE_SIZE = 100; // Reduced from 100

type OrbitItem = {
  id: number;
  image: any;
  name?: string;
};

type Props = {
  centerImage: any;
  items: OrbitItem[];
  onItemPress?: (item: OrbitItem) => void;
  rotationEnabled?: boolean;
};

export const Orbit: React.FC<Props> = ({ 
  centerImage, 
  items, 
  onItemPress,
  rotationEnabled = true 
}) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [positions, setPositions] = useState<Array<{x: number, y: number}>>([]);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (rotationEnabled) {
      const interval = setInterval(() => {
        setAngle(prev => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [rotationEnabled]);

  useEffect(() => {
    const newPositions = items.map((_, index) => {
      const itemAngle = ((index * 2 * Math.PI) / items.length) + (angle * Math.PI / 180);
      return {
        x: ORBIT_RADIUS + ORBIT_RADIUS * Math.cos(itemAngle) - ITEM_SIZE / 2,
        y: ORBIT_RADIUS + ORBIT_RADIUS * Math.sin(itemAngle) - ITEM_SIZE / 2
      };
    });
    setPositions(newPositions);
  }, [angle, items.length]);

  const handleItemPress = (item: OrbitItem, index: number) => {
    setSelectedItem(index);
    if (onItemPress) {
      onItemPress(item);
    }
  };

  return (
    <View style={styles.container}>
      {/* Orbit circle */}
      <View style={styles.orbitCircle} />

      {/* Center profile image */}
      <View style={styles.centerImageContainer}>
        <Image source={centerImage} style={styles.centerImage} />
      </View>

      {/* Orbit items */}
      <View style={styles.orbitItemsContainer}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleItemPress(item, index)}
            style={[
              styles.orbitItem,
              {
                left: positions[index]?.x || 0,
                top: positions[index]?.y || 0
              },
              selectedItem === index && styles.selectedItem
            ]}
          >
            <Image source={item.image} style={styles.itemImage} />
            {item.name && (
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ORBIT_RADIUS * 2,
    height: ORBIT_RADIUS * 2,
    alignSelf: 'center',
    position: 'relative',
  },
  orbitCircle: {
    position: 'absolute',
    width: ORBIT_RADIUS * 2,
    height: ORBIT_RADIUS * 2,
    borderRadius: ORBIT_RADIUS,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderStyle: 'dashed',
  },
  centerImageContainer: {
    position: 'absolute',
    left: ORBIT_RADIUS - CENTER_IMAGE_SIZE / 2,
    top: ORBIT_RADIUS - CENTER_IMAGE_SIZE / 2,
    width: CENTER_IMAGE_SIZE,
    height: CENTER_IMAGE_SIZE,
    borderRadius: CENTER_IMAGE_SIZE / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'white',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  centerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  orbitItemsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  orbitItem: {
    position: 'absolute',
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedItem: {
    transform: [{scale: 1.1}],
    borderColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: ITEM_SIZE / 2,
    resizeMode: 'cover',
  },
  nameContainer: {
    position: 'absolute',
    bottom: -25,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 4,
    borderRadius: 4,
    width: 'auto',
  },
  nameText: {
    color: 'white',
    fontSize: 10,
    fontFamily: fonts.regular,
  },
});