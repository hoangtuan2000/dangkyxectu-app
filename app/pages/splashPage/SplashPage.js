import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {useSelector} from 'react-redux';
import RoutesPath from '../../constant/RoutesPath';
import BackDrop from '../../components/backDrop/BackDrop';
import {lightStyles, darkStyles} from './styles';
import helper from '../../common/helper';
import {getDataUser} from '../../asyncStorage/AsyncStorage';
import Strings from '../../constant/Strings';

function SplashPage({navigation}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const [backDrop, setBackDrop] = useState(false);

  const run = async () => {
    await setBackDrop(true);
    // let currentUser = await getDataUser();
    // if (currentUser) {
    //   !helper.isNullOrEmpty(currentUser.token) &&
    //     !helper.isNullOrEmpty(currentUser.access_token) &&
    //     navigation.navigate(RoutesPath.Screens.HOME_SCREEN);
    // } else {
    //   navigation.navigate(RoutesPath.Screens.LOGIN_SCREEN);
    // }
    // await setTimeout(() => {
    //   setBackDrop(false);
    // }, 1000);
  };

  useEffect(() => {
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
