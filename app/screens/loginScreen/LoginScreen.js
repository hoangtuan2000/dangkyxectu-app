import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../../pages/loginPage/LoginPage';
import RoutesPath from '../../constant/RoutesPath';

const Stack = createNativeStackNavigator();

function LoginScreen() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={RoutesPath.Pages.LOGIN} component={LoginPage} />
        </Stack.Navigator>
    )
}

export default LoginScreen