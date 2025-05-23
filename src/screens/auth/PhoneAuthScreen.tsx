import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Button } from '../../components/Button';
import type { RootStackScreenProps } from '../../navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../utils/fonts';

type Props = RootStackScreenProps<'PhoneAuth'>;

export const PhoneAuthScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode] = useState('+1'); // Removed setCountryCode since we only allow US

  const handleContinue = () => {
    navigation.navigate('VerifyCode', { phoneNumber: countryCode + phoneNumber });
  };

  const handlePhoneNumberChange = (text: string) => {
    // Only allow numbers
    const numbersOnly = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numbersOnly);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.content}>
            <Image 
              source={require('../../assets/icons/aura-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.bottomContent}>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <View style={styles.phoneInputContainer}>
                  <View style={styles.countryCodeContainer}>
                    <Text style={styles.flag}>🇺🇸</Text>
                    <Text style={styles.countryCode}>+1</Text>
                  </View>
                  <TextInput
                    style={styles.phoneInput}
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    placeholder="Enter phone number here"
                    placeholderTextColor="rgba(0, 0, 0, 0.3)"
                    keyboardType="numeric"
                    maxLength={10}
                  />
                </View>
                <TouchableOpacity 
                  onPress={handleContinue}
                  style={[styles.continueButton, phoneNumber.length < 10 && styles.disabledButton]}
                  disabled={phoneNumber.length < 10}
                >
                  <Ionicons name="chevron-forward" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.terms}>
              By continuing, you agree{'\n'} to our <Text style={styles.link}>Terms of Use</Text>
              and have read and agreed to our 
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
  bottomContent: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 40, // 40px from bottom
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 200, // Changed from 40 to 200
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  phoneInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E3E3E3',
    borderRadius: 14,
    overflow: 'hidden',
    height: 56,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 10,
    width: 80,
  },
  flag: {
    fontSize: 16,
    marginRight: 4,
    fontFamily: fonts.regular,
  },
  countryCode: {
    color: '#000',
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  phoneInput: {
    flex: 1,
    padding: 15,
    color: '#000',
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  continueButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  disabledButton: {
    opacity: 0.5,
  },
  terms: {
    color: 'rgba(0, 0, 0, 0.7)',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  link: {
    color: '#007AFF',
    fontFamily: fonts.bold,
  },
});