import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RoutesPath from '../../constant/RoutesPath';
import RentalCarListScreen from '../rentalCarListScreen/RentalCarListScreen';
import RentedCarScreen from '../rentedCarScreen/RentedCarScreen';
import AccountScreen from '../accountScreen/AccountScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Constants from '../../constant/Constants';
import {useSelector} from 'react-redux';
import {getDataUser} from '../../asyncStorage/AsyncStorage';

const Tab = createMaterialBottomTabNavigator();

function HomeScreen() {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const currentUser = useSelector(state => state.currentUser.user);
  // const [role, setRole] = React.useState();

  // const run = async () => {
  //   let storageUser = await getDataUser();
  //   setRole(storageUser.role);
  // };

  React.useLayoutEffect(() => {
    // run();
  }, [currentUser]);

  return (
    <Tab.Navigator
      activeColor={
        isDarkMode
          ? Constants.Styles.Color.LIGHT
          : Constants.Styles.Color.PRIMARY
      }
      inactiveColor={
        isDarkMode
          ? Constants.Styles.Color.DARK
          : Constants.Styles.Color.SECONDARY
      }
      barStyle={{
        backgroundColor: isDarkMode ? Constants.Styles.Color.SECONDARY : 'white',
      }}
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
      {currentUser.role == Constants.Role.USER && (
        <>
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
