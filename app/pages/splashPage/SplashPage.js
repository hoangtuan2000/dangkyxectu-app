import React from 'react';
import {View, Image, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RoutesPath from '../../constant/RoutesPath';
import {lightStyles, darkStyles} from './styles';
import helper from '../../common/helper';
import {
  getDarkModeStorage,
  getDataUserStorage,
} from '../../asyncStorage/AsyncStorage';
import Strings from '../../constant/Strings';
import {
  changeCurrentUser,
  deleteCurrentUser,
} from '../../redux/currentUserSlice/currentUserSlice';
import {changeThemeMode} from '../../redux/themeModeSlice/themeModeSlice';
import {ActivityIndicator} from 'react-native-paper';
import Constants from '../../constant/Constants';

function SplashPage({navigation}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const dispatch = useDispatch();

  const run = async () => {
    let darkMode = await getDarkModeStorage();
    dispatch(changeThemeMode(helper.convertStringBooleanToBoolean(darkMode)));

    let currentUser = await getDataUserStorage();
    if (currentUser) {
      if (
        !helper.isNullOrEmpty(currentUser.token) &&
        !helper.isNullOrEmpty(currentUser.access_token)
      ) {
        dispatch(changeCurrentUser(currentUser));
        navigation.navigate(RoutesPath.Screens.HOME_SCREEN);
      }
    } else {
      dispatch(deleteCurrentUser());
      navigation.navigate(RoutesPath.Screens.LOGIN_SCREEN);
    }
  };

  React.useEffect(() => {
    run();
  }, []);

  return (
    <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
      <Image
        source={require('../../asset/logoCTU.png')}
        style={isDarkMode ? darkStyles.imageLogo : lightStyles.imageLogo}
      />
      <Text style={isDarkMode ? darkStyles.title : lightStyles.title}>
        {Strings.App.TITLE}
      </Text>
      <ActivityIndicator
        size={'large'}
        color={Constants.Styles.Color.PRIMARY}
      />
    </View>
  );
}

export default SplashPage;
