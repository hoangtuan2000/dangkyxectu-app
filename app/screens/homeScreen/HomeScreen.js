import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RoutesPath from '../../constant/RoutesPath';
import RentalCarListScreen from '../rentalCarListScreen/RentalCarListScreen';
import AccountScreen from '../accountScreen/AccountScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Constants from '../../constant/Constants';
import {useSelector} from 'react-redux';
import {getDataUser} from '../../asyncStorage/AsyncStorage';
import RentedCarListScreen from '../user/rentedCarListScreen/RentedCarListScreen';

const Tab = createMaterialBottomTabNavigator();

function HomeScreen() {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const currentUser = useSelector(state => state.currentUser.user);

  React.useLayoutEffect(() => {}, [currentUser]);

  return (
    <Tab.Navigator
      activeColor={
        isDarkMode
          ? Constants.Styles.Color.LIGHT
          : Constants.Styles.Color.PRIMARY
      }
      initialRouteName={
        currentUser.role == Constants.Role.USER
          ? RoutesPath.Screens.RENTAL_CAR_LIST_SCREEN
          : RoutesPath.Screens.ACCOUNT_SCREEN
      }
      inactiveColor={
        isDarkMode
          ? Constants.Styles.Color.DARK
          : Constants.Styles.Color.SECONDARY
      }
      barStyle={{
        backgroundColor: isDarkMode
          ? Constants.Styles.Color.SECONDARY
          : 'white',
      }}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === RoutesPath.Screens.RENTAL_CAR_LIST_SCREEN) {
            iconName = focused ? 'car' : 'car';
          } else if (route.name === RoutesPath.Screens.RENTED_CAR_LIST_SCREEN) {
            iconName = focused ? 'view-list' : 'view-list';
          } else if (route.name === RoutesPath.Screens.ACCOUNT_SCREEN) {
            iconName = focused ? 'account' : 'account';
          }

          return <MaterialIcons name={iconName} size={26} color={color} />;
        },
      })}>
      {currentUser.role == Constants.Role.USER && (
        <>
          <Tab.Screen
            name={RoutesPath.Screens.RENTAL_CAR_LIST_SCREEN}
            component={RentalCarListScreen}
            options={{title: 'Danh Sách Xe'}}
          />
          <Tab.Screen
            name={RoutesPath.Screens.RENTED_CAR_LIST_SCREEN}
            component={RentedCarListScreen}
            options={{title: 'Xe Đã Thuê'}}
          />
        </>
      )}
      <Tab.Screen
        name={RoutesPath.Screens.ACCOUNT_SCREEN}
        component={AccountScreen}
        options={{title: 'Tài Khoản'}}
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;
