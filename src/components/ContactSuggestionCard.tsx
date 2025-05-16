import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Button } from './Button';
import { fonts } from '../utils/fonts';

export type ContactSuggestion = {
  id: string;
  name: string;
  avatar: string;
  mutualFriends?: number;
  isVerified?: boolean;
};

type Props = {
  suggestion: ContactSuggestion;
  onRequest: () => void;
  onDismiss: () => void;
};

export const ContactSuggestionCard: React.FC<Props> = ({
  suggestion,
  onRequest,
  onDismiss,
}) => {
  const [isRequested, setIsRequested] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleRequest = () => {
    setIsRequested(!isRequested); // Toggle the requested state
    onRequest();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={{ uri: suggestion.avatar }} style={styles.avatar} />
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{suggestion.name}</Text>
            {suggestion.isVerified && (
              <Image 
                source={require('../assets/icons/Badge.png')}
                style={styles.verifiedBadge}
              />
            )}
          </View>
          {suggestion.mutualFriends && (
            <Text style={styles.mutualFriends}>
              {suggestion.mutualFriends} mutual friends
            </Text>
          )}
        </View>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.requestButton}
          onPress={handleRequest}
        >
          <Text style={styles.requestButtonText}>
            {isRequested ? 'Requested' : 'Request'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.dismissButton}
          onPress={handleDismiss}
        >
          <Text style={styles.dismissButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 14,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: '#000',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
  },
  mutualFriends: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: 'rgba(0, 0, 0, 0.4)',
    marginTop: 1,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requestButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 28,
    justifyContent: 'center',
  },
  requestButtonText: {
    color: '#007AFF',
    fontSize: 13,
    fontFamily: fonts.medium,
  },
  dismissButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissButtonText: {
    fontSize: 18,
    color: '#000',
    fontFamily: fonts.medium,
  },
});