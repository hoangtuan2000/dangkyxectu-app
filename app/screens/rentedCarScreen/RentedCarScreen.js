import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoutesPath from '../../constant/RoutesPath';
import RentedCarPage from '../../pages/rentedCarPage/RentedCarPage';

const Stack = createNativeStackNavigator();

function RentedCarScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RoutesPath.Pages.RENTED_CAR_PAGE}
        component={RentedCarPage}
      />
    </Stack.Navigator>
  );
}

export default RentedCarScreen;
