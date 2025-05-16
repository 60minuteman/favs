import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import type { RootStackScreenProps } from '../../navigation/AppNavigator';
import { AuthHeader } from '../../components/AuthHeader';
import { Button } from '../../components/Button';
import { ContactSuggestionCard, type ContactSuggestion } from '../../components/ContactSuggestionCard';
import { fonts } from '../../utils/fonts';

type Props = RootStackScreenProps<'Contact'>;

export const ContactScreen: React.FC<Props> = ({ navigation }) => {
  const [suggestions] = useState<ContactSuggestion[]>([
    {
      id: '1',
      name: 'Johnny',
      avatar: 'https://i.pravatar.cc/100?img=1',
      isVerified: true,
      mutualFriends: 5,
    },
    {
      id: '2',
      name: 'Biance',
      avatar: 'https://i.pravatar.cc/100?img=2',
      isVerified: true,
      mutualFriends: 3,
    },
    {
      id: '3',
      name: 'Johnny',
      avatar: 'https://i.pravatar.cc/100?img=3',
      isVerified: true,
      mutualFriends: 2,
    },
  ]);

  const handleAddAll = () => {
    navigation.navigate('Home');
  };

  const handleRequest = (id: string) => {
    // TODO: Implement request logic
    console.log('Request friend:', id);
  };

  const handleDismiss = (id: string) => {
    // TODO: Implement dismiss logic
    console.log('Dismiss suggestion:', id);
  };

  const renderSuggestion = ({ item }: { item: ContactSuggestion }) => (
    <ContactSuggestionCard
      suggestion={item}
      onRequest={() => handleRequest(item.id)}
      onDismiss={() => handleDismiss(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />
      <View style={styles.content}>
        <Text style={styles.title}>Add friends</Text>
        <Text style={styles.subtitle}>Suggestions</Text>

        <FlatList
          data={suggestions}
          renderItem={renderSuggestion}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        <Button
          title="Add all and continue"
          onPress={handleAddAll}
          style={styles.addAllButton}
          textStyle={styles.addAllButtonText}
          hapticStyle="medium"
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
  },
  title: {
    fontSize: 40,
    fontFamily: fonts.bold,
    color: '#000',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  addAllButton: {
    backgroundColor: '#007AFF',
    borderRadius: 14,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  addAllButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
}); 