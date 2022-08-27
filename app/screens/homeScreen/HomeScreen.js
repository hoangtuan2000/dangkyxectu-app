import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RoutesPath from '../../constant/RoutesPath';
import RentalCarListScreen from '../rentalCarListScreen/RentalCarListScreen';
import RentedCarScreen from '../rentedCarScreen/RentedCarScreen';
import AccountScreen from '../accountScreen/AccountScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Constants from '../../constant/Constants';
import {useSelector} from 'react-redux'

const Tab = createMaterialBottomTabNavigator();

function HomeScreen() {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  return (
    <Tab.Navigator
      activeColor={isDarkMode ? Constants.styles.colorLight : Constants.styles.colorPrimary}
      inactiveColor={isDarkMode ? Constants.styles.colorDark : Constants.styles.colorSecondary}
      barStyle={{backgroundColor: isDarkMode ? Constants.styles.colorSecondary : 'white'}}
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

          return <MaterialIcons name={iconName} size={26} color={color} />;
        },
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
