import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { ResponsiveGrid } from 'react-native-flexible-grid';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

interface ExploreViewProps {
  onImagePress?: (image: string) => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const dummyImages = [
  { id: '1', imageUrl: 'https://picsum.photos/200/300?random=1', widthRatio: 1, heightRatio: 1 },
  { id: '2', imageUrl: 'https://picsum.photos/200/300?random=2', widthRatio: 1, heightRatio: 1 },
  { id: '3', imageUrl: 'https://picsum.photos/200/300?random=3', widthRatio: 1, heightRatio: 2 },
  { id: '4', imageUrl: 'https://picsum.photos/200/300?random=4', widthRatio: 1, heightRatio: 1 },
  { id: '5', imageUrl: 'https://picsum.photos/200/300?random=5', widthRatio: 1, heightRatio: 1 },
  { id: '6', imageUrl: 'https://picsum.photos/200/300?random=6', widthRatio: 1, heightRatio: 1 },
  { id: '7', imageUrl: 'https://picsum.photos/200/300?random=7', widthRatio: 1, heightRatio: 1 },
  { id: '8', imageUrl: 'https://picsum.photos/200/300?random=8', widthRatio: 1, heightRatio: 1 },
  { id: '9', imageUrl: 'https://picsum.photos/200/300?random=9', widthRatio: 1, heightRatio: 1 },
];

export const ExploreView: React.FC<ExploreViewProps> = ({ onImagePress }) => {
  const navigation = useNavigation<NavigationProp>();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        onImagePress?.(item.id);
        navigation.navigate('FriendsProfile');
      }}
      style={[styles.imageContainer, { aspectRatio: item.widthRatio / item.heightRatio }]}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.image} 
      />
      <View style={styles.profileIconContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/50/50' }}
          style={styles.profileIcon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ResponsiveGrid
        data={dummyImages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        maxItemsPerColumn={3}
        style={styles.grid}
        itemContainerStyle={styles.gridItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  grid: {
    padding: 10,
  },

  gridItem: {
    margin: 1,
  },

  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  profileIconContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
  },

  profileIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});