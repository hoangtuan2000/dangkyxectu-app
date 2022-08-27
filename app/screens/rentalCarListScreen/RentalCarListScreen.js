import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoutesPath from '../../constant/RoutesPath';
import RentalCarListPage from '../../pages/rentalCarListPage/RentalCarListPage';

const Stack = createNativeStackNavigator();

function RentalCarListScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RoutesPath.Pages.RENTAL_CAR_LIST_PAGE}
        component={RentalCarListPage}
      />
    </Stack.Navigator>
  );
}

export default RentalCarListScreen;
