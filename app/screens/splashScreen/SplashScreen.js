import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoutesPath from '../../constant/RoutesPath';
import SplashPage from '../../pages/splashPage/SplashPage';

const Stack = createNativeStackNavigator();

function SplashScreen() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={RoutesPath.Pages.SPLASH_PAGE} component={SplashPage} />
        </Stack.Navigator>
    )
}

export default SplashScreen