import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { LogBox, StatusBar } from 'react-native';
import DailyStakeCalculator from './screens/DailyStackCalculator';
import LongTermCalculator from './screens/LongTermCalculator';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Delay for 2 seconds (2000 milliseconds) before hiding the splash screen
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    LogBox.ignoreAllLogs();
    // Clear the timeout if the component unmounts before the delay completes
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="DailyStack" component={DailyStakeCalculator} options={{ headerShown: false }} />
        <Stack.Screen name="LongTermCalculator" component={LongTermCalculator} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

