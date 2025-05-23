import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Notification: undefined;
  Home: undefined;
  Camera: undefined;
  Preview: { imageUri: string };
  GradientTest: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 