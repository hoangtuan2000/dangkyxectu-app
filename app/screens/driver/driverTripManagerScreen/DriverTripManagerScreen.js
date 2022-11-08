import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoutesPath from '../../../constant/RoutesPath';
import RentedCarListPage from '../../../pages/user/rentedCarListPage/RentedCarListPage';
import UpdateSchedulePendingPage from '../../../pages/user/updateSchedulePendingPage/UpdateSchedulePendingPage';
import UpdateSchedulePage from '../../../pages/user/updateSchedulePage/UpdateSchedulePage';
import DriverTripManagerPage from '../../../pages/driver/driverTripManagerPage/DriverTripManagerPage';
import ShowScheduleDriverPage from '../../../pages/driver/showScheduleDriverPage/ShowScheduleDriverPage';

const Stack = createNativeStackNavigator();

function DriverTripManagerScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RoutesPath.Pages.DRIVER_TRIP_MANAGER}
        component={DriverTripManagerPage}
      />
      <Stack.Screen
        name={RoutesPath.Pages.SHOW_SCHEDULE_DRIVER}
        component={ShowScheduleDriverPage}
      />
    </Stack.Navigator>
  );
}

export default DriverTripManagerScreen;
