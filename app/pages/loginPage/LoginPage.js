import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonCustom from '../../components/buttonCustom/ButtonCustom';
import InputCustom from '../../components/inputCustom/InputCustom';
import Constants from '../../constant/Constants';
import RoutesPath from '../../constant/RoutesPath';
import Strings from '../../constant/Strings';
import {lightStyles, darkStyles} from './styles';
import ModalError from '../../components/modalError/ModalError';
import ModalSuccess from '../../components/modalSuccess/ModalSuccess';
import BackDrop from '../../components/backDrop/BackDrop';
import helper from '../../common/helper';
import {LoginServices} from '../../services/LoginServices';
import {setDataUserStorage} from '../../asyncStorage/AsyncStorage';
import {changeCurrentUser} from '../../redux/currentUserSlice/currentUserSlice';
import {changeErrorAuthencation} from '../../redux/globalSlice/globalSlice';

function LoginPage({navigation}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const errorAuthencation = useSelector(
    state => state.global.errorAuthencation,
  );
  const dispatch = useDispatch();
  const [modalError, setModalError] = useState({
    open: false,
    title: null,
    content: null,
  });
  const [modalSuccess, setModalSuccess] = useState(false);
  const [backDrop, setBackDrop] = useState(false);

  const [showPassword, setShowPassword] = useState(true);

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
          await dispatch(changeErrorAuthencation(null));
          await setDataUserStorage(res.data.data);
          await dispatch(changeCurrentUser(res.data.data));
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

        {errorAuthencation && (
          <View
            style={isDarkMode ? darkStyles.viewError : lightStyles.viewError}>
            <Icon
              name="information-circle"
              size={22}
              color={'white'}
              style={{marginRight: 5}}
            />
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
              {errorAuthencation}
            </Text>
          </View>
        )}

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
            icon={showPassword ? 'eye-off' : 'eye'}
            onPressIcon={() => setShowPassword(show => !show)}
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
