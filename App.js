// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './app/screens/login/Login';
import RoutesPath from './app/constant/RoutesPath';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={RoutesPath.LOGIN} screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name={RoutesPath.LOGIN}
              component={Login}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
  );
}

export default App;