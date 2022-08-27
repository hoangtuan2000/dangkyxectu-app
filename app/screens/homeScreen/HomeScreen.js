import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RoutesPath from '../../constant/RoutesPath';
import RentalCarListScreen from '../rentalCarListScreen/RentalCarListScreen';
import RentedCarScreen from '../rentedCarScreen/RentedCarScreen';
import AccountScreen from '../accountScreen/AccountScreen';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === RoutesPath.Screens.RENTAL_CAR_LIST_SCREEN) {
            iconName = focused ? 'car' : 'car';
          } else if (route.name === RoutesPath.Screens.RENTED_CAR_SCREEN) {
            iconName = focused ? 'view-list' : 'view-list';
          } else if (route.name === RoutesPath.Screens.ACCOUNT_SCREEN) {
            iconName = focused ? 'account' : 'account';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0095ff',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name={RoutesPath.Screens.RENTAL_CAR_LIST_SCREEN}
        component={RentalCarListScreen}
        options={{title: 'Danh Sách Xe'}}
      />
      <Tab.Screen
        name={RoutesPath.Screens.RENTED_CAR_SCREEN}
        component={RentedCarScreen}
        options={{title: 'Xe Đã Thuê'}}
      />
      <Tab.Screen
        name={RoutesPath.Screens.ACCOUNT_SCREEN}
        component={AccountScreen}
        options={{title: 'Tài Khoản'}}
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;
