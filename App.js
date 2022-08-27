import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RoutesPath from './app/constant/RoutesPath';
import HomeScreen from './app/screens/homeScreen/HomeScreen';
import LoginScreen from './app/screens/loginScreen/LoginScreen';
import { store } from './app/redux/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={RoutesPath.Screens.LOGIN_SCREEN}
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              name={RoutesPath.Screens.LOGIN_SCREEN}
              component={LoginScreen}
            />
            <Stack.Screen
              name={RoutesPath.Screens.HOME_SCREEN}
              component={HomeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
