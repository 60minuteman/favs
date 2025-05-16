import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import type { RootStackScreenProps } from '../../navigation/AppNavigator';
import { AuthHeader } from '../../components/AuthHeader';
import { fonts } from '../../utils/fonts';

type Props = RootStackScreenProps<'Permission'>;

export const PermissionScreen: React.FC<Props> = ({ navigation }) => {
  const handleDontAllow = () => {
    // TODO: Handle don't allow case
    navigation.navigate('Contact');
  };

  const handleAllow = () => {
    // TODO: Implement contacts permission request
    navigation.navigate('Contact');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />
      <View style={styles.content}>
        <Text style={styles.title}>Find your{'\n'}friends</Text>

        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/images/friends-illustration.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContentContainer}>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              "Aurascope" would like to access your contacts
            </Text>
            <Text style={styles.subMessage}>
              This helps find your friends on Favs. Contacts are not being stored and only used for matching purposes.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={handleDontAllow}
              style={styles.dontAllowButton}
            >
              <Text style={styles.dontAllowButtonText}>Don't Allow</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAllow}
              style={styles.allowButton}
            >
              <Text style={styles.allowButtonText}>Allow</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontFamily: fonts.bold,
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: 200,
  },
  illustration: {
    width: 200,
    height: 200,
  },
  textContentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subMessage: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  dontAllowButton: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
  },
  dontAllowButtonText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: '#007AFF',
  },
  allowButton: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#007AFF',
  },
  allowButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
}); 