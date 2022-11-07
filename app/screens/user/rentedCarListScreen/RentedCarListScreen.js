import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoutesPath from '../../../constant/RoutesPath';
import RentedCarListPage from '../../../pages/user/rentedCarListPage/RentedCarListPage';
import UpdateSchedulePendingPage from '../../../pages/user/updateSchedulePendingPage/UpdateSchedulePendingPage';
import UpdateSchedulePage from '../../../pages/user/updateSchedulePage/UpdateSchedulePage';

const Stack = createNativeStackNavigator();

function RentedCarListScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RoutesPath.Pages.RENTED_CAR_LIST}
        component={RentedCarListPage}
      />
      <Stack.Screen
        name={RoutesPath.Pages.UPDATE_SCHEDULE_PENDING}
        component={UpdateSchedulePendingPage}
      />
      <Stack.Screen
        name={RoutesPath.Pages.UPDATE_SCHEDULE}
        component={UpdateSchedulePage}
      />
    </Stack.Navigator>
  );
}

export default RentedCarListScreen;
