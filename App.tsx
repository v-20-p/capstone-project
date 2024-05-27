import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnBoarding from './screens/OnBoarding';
import UserContext from './contexts/UserContext';
import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorGuide } from './styles/styleGuide';
import Profile from './screens/Profile';
import Menu from './screens/Menu';
import * as SplashScreen from 'expo-splash-screen';
import { readUser } from './persistence/userStorage';
export default function App() {
  const [user, setUser] = useState(null);
  const Stack = createNativeStackNavigator();
  SplashScreen.preventAutoHideAsync();
  const [isUserLoading, setUserLoading] = useState(true);
  useEffect(() => {
    loadUserData();
  }, []);

  const isLoading = isUserLoading ;
  const loadUserData = async () => {
    try {
      const savedUser = await readUser();

      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.error('Error loading user', error);
    } finally {
      setUserLoading(false);
    }
  };
  

  const onReady = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer onReady={onReady}>
    <UserContext.Provider value={{ user, setUser }}>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colorGuide.headerTitle.color,
          headerStyle: { backgroundColor: colorGuide.headerTitle.background },
        }}>
        {!user ? (
          <Stack.Screen
            name="onboarding"
            options={{ title: 'Little Lemon' }}
            component={OnBoarding}
          />
        ) : (
          <>
            <Stack.Screen name="menu" options={{ title: 'Menu' }} component={Menu} />
            <Stack.Screen
              name="profile"
              options={{ title: 'Profile' }}
              component={Profile}
            />
          </>
        )}
      </Stack.Navigator>
    </UserContext.Provider>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
function useFonts(arg0: { 'Karla-Regular': any; 'MarkaziText-Regular': any; }): [any, any] {
  throw new Error('Function not implemented.');
}

function setUserLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

