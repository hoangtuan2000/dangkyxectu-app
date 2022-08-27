import React, {useState} from 'react';
import {
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonCustom from '../../components/buttonCustom/ButtonCustom';
import InputCustom from '../../components/inputCustom/InputCustom';
import Constants from '../../constant/Constants';
import RoutesPath from '../../constant/RoutesPath';
import Strings from '../../constant/Strings';
import {lightStyles, darkStyles} from './LoginPageStyles';

function LoginPage({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    navigation.navigate(RoutesPath.Screens.HOME_SCREEN);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={isDarkMode ? darkStyles.container : lightStyles.container}>
      <View style={{width: 300}}>
        <View style={{marginBottom: 20}}>
          <Image
            source={require('../../asset/logoCTU.png')}
            style={isDarkMode ? darkStyles.imageLogo : lightStyles.imageLogo}
          />
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={isDarkMode ? darkStyles.title : lightStyles.title}>
            {Strings.App.TITLE}
          </Text>
        </View>

        <View >
          <InputCustom
            label={Strings.Login.LOGIN_CODE}
            placeholder={Strings.Login.ENTER_LOGIN_CODE}
          />
        </View>

        <View style={{marginBottom: 25}}>
          <InputCustom
            iconPosition={'right'}
            label={Strings.Login.PASSWORD}
            icon={
              <TouchableOpacity onPress={() => setShowPassword(show => !show)}>
                {showPassword ? (
                  <Icon
                    name="eye"
                    size={25}
                    color={isDarkMode ? Constants.styles.colorLight : Constants.styles.colorPrimary}
                  />
                ) : (
                  <Icon
                    name="eye-off"
                    size={25}
                    color={isDarkMode ? Constants.styles.colorLight : Constants.styles.colorPrimary}
                  />
                )}
              </TouchableOpacity>
            }
            placeholder={Strings.Login.ENTER_PASSWORD}
            secureTextEntry={showPassword}
          />
        </View>

        <View>
          <ButtonCustom
            onPress={handleLogin}
            textButton={Strings.App.LOGIN}
            textWeight="bold"
            textSize={17}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginPage;
