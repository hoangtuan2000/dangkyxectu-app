import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoutesPath from '../../constant/RoutesPath';
import AccountPage from '../../pages/accountPage/AccountPage';

const Stack = createNativeStackNavigator();

function AccountScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RoutesPath.Pages.ACCOUNT_PAGE}
        component={AccountPage}
      />
    </Stack.Navigator>
  );
}

export default AccountScreen;
