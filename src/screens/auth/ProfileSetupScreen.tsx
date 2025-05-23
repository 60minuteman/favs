import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import type { RootStackScreenProps } from '../../navigation/AppNavigator';
import { AuthHeader } from '../../components/AuthHeader';
import { Button } from '../../components/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { fonts } from '../../utils/fonts';

type Props = RootStackScreenProps<'ProfileSetup'>;

export const ProfileSetupScreen: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleNext = () => {
    navigation.navigate('ProfilePicture', {
      firstName,
      lastName,
      birthday,
    });
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setBirthday(format(date, 'MM/dd/yyyy'));
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Your details</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.label}>First Name:</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First name"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            <View style={styles.separator} />

            <View style={styles.inputRow}>
              <Text style={styles.label}>Last Name:</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last name"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            <View style={styles.separator} />

            <View style={styles.inputRow}>
              <Text style={styles.label}>Birthday</Text>
              <TouchableOpacity 
                style={styles.dateInput}
                onPress={showDatePicker}
              >
                <Text style={[styles.dateText, !birthday && styles.placeholderText]}>
                  {birthday || 'MM/DD/YYYY'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
          />

          <Button
            title="Next"
            onPress={handleNext}
            disabled={!firstName || !lastName || !birthday}
            style={{
              ...styles.nextButton,
              ...((!firstName || !lastName || !birthday) ? styles.nextButtonDisabled : {})
            }}
            textStyle={styles.nextButtonText}
            hapticStyle="complete"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.bold,
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#000',
    width: 120,
    fontFamily: fonts.medium,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
    fontFamily: fonts.regular,
  },
  dateInput: {
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.regular,
  },
  placeholderText: {
    color: '#999',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    borderRadius: 14,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
});