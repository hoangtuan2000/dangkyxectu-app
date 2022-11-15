import React from 'react';
import {Text, View} from 'react-native';
import {lightStyles, darkStyles} from './AccountPageStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonCustom from '../../components/buttonCustom/ButtonCustom';
import Strings from '../../constant/Strings';
import Constants from '../../constant/Constants';
import {useSelector, useDispatch} from 'react-redux';
import {changeThemeMode} from '../../redux/themeModeSlice/themeModeSlice';
import {
  removeDataUserStorage,
  setDarkModeStorage,
} from '../../asyncStorage/AsyncStorage';
import RoutesPath from '../../constant/RoutesPath';
import {deleteCurrentUser} from '../../redux/currentUserSlice/currentUserSlice';

function AccountPage({navigation}) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const currentUser = useSelector(state => state.currentUser.user);
  const [darkMode, setDarkMode] = React.useState(isDarkMode);

  const logout = () => {
    removeDataUserStorage();
    dispatch(deleteCurrentUser());
    navigation.navigate(RoutesPath.Screens.LOGIN_SCREEN);
  };

  return (
    <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
      <Text style={isDarkMode ? darkStyles.textHeader : lightStyles.textHeader}>
        {currentUser &&
          currentUser.hasOwnProperty('fullName') &&
          currentUser.fullName}
      </Text>
      <Text style={isDarkMode ? darkStyles.textHeader : lightStyles.textHeader}>
        {currentUser && currentUser.hasOwnProperty('code') && currentUser.code}
      </Text>
      <View style={{width: 160}}>
        <ButtonCustom
          onPress={() => {
            dispatch(changeThemeMode(!darkMode));
            setDarkModeStorage(!darkMode);
            setDarkMode(!darkMode);
          }}
          icon={
            isDarkMode ? (
              <MaterialIcons
                name={'white-balance-sunny'}
                color={'white'}
                size={20}
              />
            ) : (
              <MaterialIcons name={'weather-night'} color={'white'} size={20} />
            )
          }
          bgColor={!isDarkMode && Constants.Styles.Color.SECONDARY}
          iconPosition="left"
          textButton={
            isDarkMode ? Strings.App.LIGHTTHEME : Strings.App.DARKTHEME
          }
        />
        <ButtonCustom
          icon={<MaterialIcons name={'logout'} color={'white'} size={20} />}
          iconPosition="left"
          textButton={Strings.Common.LOGOUT}
          onPress={() => logout()}
          bgColor={Constants.Styles.Color.ERROR}
        />
      </View>
    </View>
  );
}

export default AccountPage;
