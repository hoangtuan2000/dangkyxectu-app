import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoutesPath from '../../constant/RoutesPath';
import RentedCarListPage from '../../pages/rentedCarListPage/RentedCarListPage';

const Stack = createNativeStackNavigator();

function RentedCarListScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RoutesPath.Pages.RENTED_CAR_LIST_PAGE}
        component={RentedCarListPage}
      />
    </Stack.Navigator>
  );
}

export default RentedCarListScreen;
