import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import type { RootStackScreenProps } from '../../navigation/AppNavigator';
import { AuthHeader } from '../../components/AuthHeader';
import { fonts } from '../../utils/fonts';

type Props = RootStackScreenProps<'VerifyCode'>;

export const VerifyCodeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Focus input when screen mounts
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleCodeChange = (text: string) => {
    // Only allow numbers and limit to 6 digits
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 6);
    setCode(numericText);

    if (numericText.length === 6) {
      Keyboard.dismiss();
      handleVerify(numericText);
    }
  };

  const handleVerify = async (verificationCode: string) => {
    setIsVerifying(true);
    try {
      // TODO: Implement verification logic
      console.log('Verifying code:', verificationCode);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigation.navigate('ProfileSetup');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      // TODO: Implement resend logic here
      setTimer(60);
      setCanResend(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />
      <View style={styles.content}>
        <View style={styles.spacer} />
        <Text style={styles.title}>Enter one-time pin</Text>
        <Text style={styles.subtitle}>
          A pin has been sent to your phone number:{'\n'}
          {phoneNumber}
        </Text>

        <View style={styles.codeContainer}>
          <TextInput
            ref={inputRef}
            style={[styles.codeInput, isVerifying && styles.codeInputDisabled]}
            value={code}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="Enter code"
            editable={!isVerifying}
          />
        </View>

        <TouchableOpacity 
          onPress={handleResendCode}
          disabled={!canResend || isVerifying}
        >
          <Text style={[
            styles.resend, 
            (!canResend || isVerifying) && styles.resendDisabled
          ]}>
            Resend code {timer > 0 ? `(${timer}s)` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {isVerifying && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Verifying...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  spacer: {
    height: 100,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.7)',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: fonts.regular,
  },
  codeContainer: {
    width: '100%',
    marginBottom: 40,
    alignItems: 'center',
  },
  codeInput: {
    width: '80%',
    height: 55,
    backgroundColor: '#EFEFEF',
    color: '#000',
    borderRadius: 14,
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
    alignSelf: 'center',
    fontFamily: fonts.medium,
  },
  codeInputDisabled: {
    opacity: 0.7,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#2196F3',
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  resend: {
    color: '#2196F3',
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fonts.medium,
  },
  resendDisabled: {
    opacity: 0.5,
  },
});