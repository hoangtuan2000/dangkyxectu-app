import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RoutesPath from './app/constant/RoutesPath';
import HomeScreen from './app/screens/homeScreen/HomeScreen';
import LoginScreen from './app/screens/loginScreen/LoginScreen';
import {store} from './app/redux/store';
import {Provider} from 'react-redux';
import SplashScreen from './app/screens/splashScreen/SplashScreen';
import {getDataUser} from './app/asyncStorage/AsyncStorage';
import {useNavigation} from '@react-navigation/native';
import {AxiosInterceptorsSetup} from './app/common/axiosConfig';

// HIDE WANRING SCROLL NESTED
// import {LogBox} from 'react-native';
// LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

function App() {
  const AxiosInterceptorNavigate = () => {
    let navigate = useNavigation();
    AxiosInterceptorsSetup(navigate);
    return <></>;
  };
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AxiosInterceptorNavigate />
          <Stack.Navigator
            initialRouteName={RoutesPath.Screens.SPLASH_SCREEN}
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              name={RoutesPath.Screens.SPLASH_SCREEN}
              component={SplashScreen}
            />
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
