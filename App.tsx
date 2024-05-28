
import { StyleSheet, Text, View } from 'react-native';

import OnBoarding from './screens/OnBoarding';
import UserContext from './contexts/UserContext';
import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorGuide } from './styles/styleGuide';
import Profile from './screens/Profile';
import Menu from './screens/Menu';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { readUser } from './persistence/userStorage';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState(null);
  const Stack = createNativeStackNavigator();
  const [isUserLoading, setUserLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadUserData();
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'Karla-Regular': require('./assets/Karla-Regular.ttf'),
        'MarkaziText-Regular': require('./assets/MarkaziText-Regular.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts', error);
    }
  };

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
    if (!isUserLoading && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isUserLoading, fontsLoaded]);

  if (isUserLoading || !fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onReady}>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: colorGuide.headerTitle.color,
            headerStyle: {
              backgroundColor: colorGuide.headerTitle.background,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            gestureEnabled: true,
            headerShown: true,
          }}
        >
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
