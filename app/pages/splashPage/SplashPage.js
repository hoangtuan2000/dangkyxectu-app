import React from 'react';
import {View, Image, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RoutesPath from '../../constant/RoutesPath';
import BackDrop from '../../components/backDrop/BackDrop';
import {lightStyles, darkStyles} from './styles';
import helper from '../../common/helper';
import {getDataUser} from '../../asyncStorage/AsyncStorage';
import Strings from '../../constant/Strings';
import {changeCurrentUser, deleteCurrentUser} from '../../redux/currentUserSlice/currentUserSlice';

function SplashPage({navigation}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const dispatch = useDispatch();
  const [backDrop, setBackDrop] = React.useState(false);

  const run = async () => {
    await setBackDrop(true);
    let currentUser = await getDataUser();
    if (currentUser) {
      if (
        !helper.isNullOrEmpty(currentUser.token) &&
        !helper.isNullOrEmpty(currentUser.access_token)
      ) {
        await setBackDrop(false);
        dispatch(changeCurrentUser(currentUser));
        navigation.navigate(RoutesPath.Screens.HOME_SCREEN);
      }
    } else {
      await setBackDrop(false);
      dispatch(deleteCurrentUser())
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
      <BackDrop open={backDrop} />
    </View>
  );
}

export default SplashPage;
