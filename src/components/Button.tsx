import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  hapticStyle?: 'light' | 'medium' | 'heavy' | 'countdown' | 'complete';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  hapticStyle = 'medium',
  disabled = false
}) => {
  const handlePress = async () => {
    if (disabled) return;
    
    try {
      switch (hapticStyle) {
        case 'countdown':
          // Countdown start pattern
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          setTimeout(async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }, 100);
          setTimeout(async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          }, 200);
          break;

        case 'complete':
          // Completion pattern
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          setTimeout(async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }, 150);
          setTimeout(async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          }, 300);
          break;

        case 'heavy':
          // Heavy double impact
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;

        case 'light':
          // Light triple tap
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;

        default:
          // Default intense feedback
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setTimeout(async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          }, 50);
      }
      onPress();
    } catch (error) {
      console.log('Haptics error:', error);
      onPress();
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        style,
        disabled && styles.disabled
      ]} 
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={[
        styles.text, 
        textStyle,
        disabled && styles.disabledText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 14,
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
}); 