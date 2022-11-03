import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoutesPath from '../../constant/RoutesPath';
import RentalCarListPage from '../../pages/rentalCarListPage/RentalCarListPage';
import ScheduleRegistration from '../../pages/scheduleRegistration/ScheduleRegistration';

const Stack = createNativeStackNavigator();

function RentalCarListScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RoutesPath.Pages.RENTAL_CAR_LIST_PAGE}
        component={RentalCarListPage}
      />
      <Stack.Screen
        name={RoutesPath.Pages.SCHEDULE_REGISTRATION}
        component={ScheduleRegistration}
      />
    </Stack.Navigator>
  );
}

export default RentalCarListScreen;
