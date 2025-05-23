import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { fonts } from '../utils/fonts';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Leaderboard'>;

type TabType = 'THIS WEEK' | 'ALL-TIME';

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  score: number;
  avatar: string;
  isCurrentUser?: boolean;
}

const dummyData: LeaderboardUser[] = [
  { id: '1', rank: 1, name: 'Reem Omar', score: 499, avatar: 'https://picsum.photos/200/200?1' },
  { id: '2', rank: 2, name: 'Ahmed Sami', score: 410, avatar: 'https://picsum.photos/200/200?2' },
  { id: '3', rank: 3, name: 'Suad Ah.', score: 360, avatar: 'https://picsum.photos/200/200?3' },
  { id: '4', rank: 4, name: 'Fatima Ali', score: 340, avatar: 'https://picsum.photos/200/200?7' },
  { id: '5', rank: 5, name: 'Hassan K.', score: 320, avatar: 'https://picsum.photos/200/200?8' },
  { id: '6', rank: 6, name: 'Layla M.', score: 310, avatar: 'https://picsum.photos/200/200?9' },
  { id: '7', rank: 7, name: 'Omar S.', score: 300, avatar: 'https://picsum.photos/200/200?10' },
  { id: '8', rank: 8, name: 'Noor A.', score: 290, avatar: 'https://picsum.photos/200/200?11' },
  { id: '9', rank: 9, name: 'Zain R.', score: 280, avatar: 'https://picsum.photos/200/200?12' },
  { id: '10', rank: 10, name: 'Maya K.', score: 270, avatar: 'https://picsum.photos/200/200?13' },
  { id: '23', rank: 23, name: 'You', score: 222, avatar: 'https://picsum.photos/200/200?5', isCurrentUser: true },
];

export const LeaderboardScreen = ({ navigation }: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>('THIS WEEK');
  const [data] = useState<LeaderboardUser[]>(dummyData);

  const currentUser = data.find(user => user.isCurrentUser);

  const handleClose = () => {
    navigation.goBack();
  };

  const renderTopThree = () => (
    <View style={styles.topThreeContainer}>
      {data.slice(0, 3).map((user, index) => (
        <Pressable 
          key={user.id}
          style={styles.topUserContainer}
          onPress={() => navigation.navigate('FriendsProfile')}
        >
          <Image source={{ uri: user.avatar }} style={styles.topAvatar} />
          <Text style={styles.topName}>{user.name}</Text>
          <Text style={styles.topScore}>{user.score}</Text>
        </Pressable>
      ))}
    </View>
  );

  const renderUserRow = (user: LeaderboardUser) => (
    <Pressable
      key={user.id}
      style={[styles.userRow, user.isCurrentUser && styles.currentUserRow]}
      onPress={() => navigation.navigate('FriendsProfile')}
    >
      <Text style={[styles.rankText, user.isCurrentUser && styles.currentUserText]}>
        {user.rank}
      </Text>
      
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      
      <Text style={[styles.nameText, user.isCurrentUser && styles.currentUserText]}>
        {user.name}
      </Text>
      
      <Text style={[styles.scoreText, user.isCurrentUser && styles.currentUserText]}>
        {user.score}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Your position: #{currentUser?.rank}</Text>
      </View>

      {renderTopThree()}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {data.slice(3, 10).map(renderUserRow)}
        {currentUser && currentUser.rank > 10 && renderUserRow(currentUser)}
      </ScrollView>

      <TouchableOpacity style={styles.seeMoreContainer}>
        <Text style={styles.seeMoreText}>See more</Text>
      </TouchableOpacity>
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
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
  },
  progressContainer: {
    backgroundColor: '#FFF9E7',
    padding: 12,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
  },
  progressText: {
    textAlign: 'center',
    color: '#8B7E57',
    fontFamily: fonts.medium,
  },
  topThreeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingVertical: 30,
    marginBottom: 20,
  },
  topUserContainer: {
    alignItems: 'center',
    flex: 1,
  },
  topAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  topName: {
    marginTop: 8,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  topScore: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: '#FFD700',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
  },
  currentUserRow: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  rankText: {
    width: 30,
    fontFamily: fonts.medium,
    fontSize: 14,
    marginRight: 12,
  },
  nameText: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  scoreText: {
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  currentUserText: {
    color: '#FFFFFF',
  },
  seeMoreContainer: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  seeMoreText: {
    color: '#2196F3',
    fontFamily: fonts.medium,
    fontSize: 14,
  }
}); 