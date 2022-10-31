import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonCustom from '../../components/buttonCustom/ButtonCustom';
import InputCustom from '../../components/inputCustom/InputCustom';
import Constants from '../../constant/Constants';
import RoutesPath from '../../constant/RoutesPath';
import Strings from '../../constant/Strings';
import {lightStyles, darkStyles} from './LoginPageStyles';
import ModalError from '../../components/modalError/ModalError';
import ModalSuccess from '../../components/modalSuccess/ModalSuccess';
import BackDrop from '../../components/backDrop/BackDrop';
import helper from '../../common/helper';
import {LoginServices} from '../../services/LoginServices';
import {getDataUser, storeDataUser} from '../../asyncStorage/AsyncStorage';

function LoginPage({navigation}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  const [modalError, setModalError] = useState({
    open: false,
    title: null,
    content: null,
  });
  const [modalSuccess, setModalSuccess] = useState(false);
  const [backDrop, setBackDrop] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [dataSendApi, setDataSendApi] = useState({
    code: null,
    password: null,
  });
  const [errorData, setErrorData] = useState({
    code: null,
    password: null,
  });

  const handleChangeCode = e => {
    setDataSendApi({
      ...dataSendApi,
      code: e,
    });
  };

  const handleChangePass = e => {
    setDataSendApi({
      ...dataSendApi,
      password: e,
    });
  };

  const handleCheckData = () => {
    if (
      helper.isNullOrEmpty(dataSendApi.code) ||
      helper.isNullOrEmpty(dataSendApi.password)
    ) {
      setErrorData({
        ...errorData,
        code: helper.isNullOrEmpty(dataSendApi.code)
          ? Strings.Login.ENTER_CODE_PLEASE
          : null,
        password: helper.isNullOrEmpty(dataSendApi.password)
          ? Strings.Login.ENTER_PASS_PLEASE
          : null,
      });
      return false;
    } else {
      return true;
    }
  };

  const handleLogin = async () => {
    let resultCheck = await handleCheckData();
    if (resultCheck) {
      await setBackDrop(true);
      const res = await LoginServices.Login({...dataSendApi});
      // axios success
      if (res.data) {
        // login success
        if (res.data.status == Constants.ApiCode.OK) {
          // await dispatch(changeErrorAuthencationToken(null));
          storeDataUser(res.data.data);
          navigation.navigate(RoutesPath.Screens.HOME_SCREEN);
        } else {
          setModalError({
            ...modalError,
            open: true,
            title: res.data.message,
            content: null,
          });
        }
      }
      // axios fail
      else {
        setModalError({
          ...modalError,
          open: true,
          title:
            (res.request &&
              `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`) ||
            Strings.Common.ERROR,
          content: res.name || null,
        });
      }
      await setBackDrop(false);
    }
  };

  const run = async () => {
    await setBackDrop(true);
    let currentUser = await getDataUser();
    if(currentUser){
      !helper.isNullOrEmpty(currentUser.token) &&
      !helper.isNullOrEmpty(currentUser.access_token) &&
      navigation.navigate(RoutesPath.Screens.HOME_SCREEN);
    }
    await setTimeout(() => {
      setBackDrop(false);
    }, 1000);
  };

  useEffect(() => {
    run();
  }, []);

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

        <View>
          <InputCustom
            label={Strings.Login.LOGIN_CODE}
            placeholder={Strings.Login.ENTER_LOGIN_CODE}
            onChangeText={e => handleChangeCode(e)}
            value={dataSendApi.code}
            error={errorData.code}
          />
        </View>

        <View style={{marginBottom: 25}}>
          <InputCustom
            onChangeText={e => handleChangePass(e)}
            value={dataSendApi.password}
            error={errorData.password}
            iconPosition={'right'}
            label={Strings.Login.PASSWORD}
            placeholder={Strings.Login.ENTER_PASSWORD}
            secureTextEntry={showPassword}
            icon={
              <TouchableOpacity onPress={() => setShowPassword(show => !show)}>
                {showPassword ? (
                  <Icon
                    name="eye-off"
                    size={25}
                    color={
                      isDarkMode
                        ? Constants.Styles.Color.LIGHT
                        : Constants.Styles.Color.PRIMARY
                    }
                  />
                ) : (
                  <Icon
                    name="eye"
                    size={25}
                    color={
                      isDarkMode
                        ? Constants.Styles.Color.LIGHT
                        : Constants.Styles.Color.PRIMARY
                    }
                  />
                )}
              </TouchableOpacity>
            }
          />
        </View>

        <View>
          <ButtonCustom
            onPress={handleLogin}
            textButton={Strings.Common.LOGIN}
            textWeight="bold"
            textSize={17}
          />
        </View>
      </View>

      <ModalSuccess
        open={modalSuccess}
        handleClose={() => setModalSuccess(false)}
      />

      <ModalError
        open={modalError.open}
        handleClose={() =>
          setModalError({
            ...modalError,
            open: false,
          })
        }
        title={modalError.title}
        content={modalError.content}
      />

      <BackDrop open={backDrop} />
    </KeyboardAvoidingView>
  );
}

export default LoginPage;
