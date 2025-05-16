import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

interface CircleProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Circle: React.FC<CircleProps> = ({ children, style }) => {
  return (
    <View style={[styles.circle, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#fff',
  },
}); 