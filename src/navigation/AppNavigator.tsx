import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PhoneAuthScreen } from '../screens/auth/PhoneAuthScreen';
import { VerifyCodeScreen } from '../screens/auth/VerifyCodeScreen';
import { ProfileSetupScreen } from '../screens/auth/ProfileSetupScreen';
import { ProfilePictureScreen } from '../screens/auth/ProfilePictureScreen';
import { PermissionScreen } from '../screens/auth/PermissionScreen';
import { ContactScreen } from '../screens/auth/ContactScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { CameraScreen } from '../screens/CameraScreen';
import HomeScreen from '../screens/HomeScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { ResultScreen } from '../screens/ResultScreen';
import { FriendsProfileScreen } from '../screens/FriendsProfileScreen';
import { LeaderboardScreen } from '../screens/LeaderboardScreen';

export type RootStackParamList = {
  Splash: undefined;
  PhoneAuth: undefined;
  VerifyCode: {
    phoneNumber: string;
  };
  ProfileSetup: undefined;
  ProfilePicture: {
    firstName: string;
    lastName: string;
    birthday: string;
  };
  Permission: undefined;
  Contact: undefined;
  Home: undefined;
  Notification: undefined;
  Camera: undefined;
  Result: undefined;
  FriendsProfile: undefined;
  Leaderboard: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
      <Stack.Screen name="Permission" component={PermissionScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="FriendsProfile" component={FriendsProfileScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Stack.Navigator>
  );
}; 