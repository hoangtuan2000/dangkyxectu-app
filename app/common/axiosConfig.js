import axios from 'axios';
import {getDataUser} from '../asyncStorage/AsyncStorage';
import jwt_decode from "jwt-decode";
import { store } from "../redux/store";
import { deleteCurrentUser } from "../redux/currentUserSlice/currentUserSlice";
import Constants from '../constant/Constants';
import RoutesPath from '../constant/RoutesPath';
// import { changeErrorAuthencationToken } from "../redux/globalReduxSlice";
import Strings from '../constant/Strings';
import { CommonActions } from '@react-navigation/native';

const axiosInstanceNotAuth = axios.create({
  baseURL: Constants.Api.BASE_URL,
  timeout: 100000,
});

const axiosInstance = axios.create({
  baseURL: Constants.Api.BASE_URL,
  timeout: 100000,
});

const Authentication = async () => {
  console.log('call Authentication Axios');
  const currentUser = await getDataUser();
  const token = await currentUser.token;
  const accessToken = await currentUser.access_token;
  return await axios
    .post(
      Constants.Api.BASE_URL + '/global/authentication',
      {},
      {
        headers: {
          Authorization: `${accessToken} ${token}`,
        },
      },
    )
    .then(res => {
      if (res.data) {
        if (res.data.status == Constants.ApiCode.OK) {
          return true;
        } else {
          //   store.dispatch(
          //       changeErrorAuthencationToken(res.data.message)
          //   );
            store.dispatch(deleteCurrentUser());
          //   window.location = RoutesPath.LOGIN;
          // navigation.navigate(RoutesPath.Screens.SPLASH_SCREEN);
          navigation.dispatch(
            CommonActions.navigate({
              name: 'home',
              params: {
                user: 'jane',
              },
            })
          );
          return false;
        }
      }
      // axios fail
      else {
          store.dispatch(deleteCurrentUser());
        //   store.dispatch(
        //       changeErrorAuthencationToken(Strings.Common.ERROR)
        //   );
        //   window.location = RoutesPath.LOGIN;
        // navigation.navigate(RoutesPath.Screens.SPLASH_SCREEN);
        return false;
      }
    })
    .catch(err => {
        store.dispatch(deleteCurrentUser());
      //   store.dispatch(changeErrorAuthencationToken(Strings.Common.ERROR));
      //   window.location = RoutesPath.LOGIN;
      // navigation.navigate(RoutesPath.Screens.SPLASH_SCREEN);
      return false;
    });
};

axiosInstance.interceptors.request.use(
  async function (config) {
    console.log('call interceptors axiosInstance');
    const currentUser = await getDataUser();
    const token = await currentUser.token;
    let decoded = jwt_decode(token);
    // console.log("date", new Date(decoded.exp));
    // console.log("date2", new Date());
    // console.log("date3", new Date() >= new Date(decoded.exp));
    // If the token expires, then send
    if (new Date() >= new Date(decoded.exp)) {
      // console.log("call auth");
      const resultAuthentication = await Authentication();
      return resultAuthentication ? config : false;
    }
    // token has not expired
    else {
      // console.log("call not auth");
      return config;
    }
  },
  function (error) {
    return Promise.reject(error);
  },
);

export {axiosInstanceNotAuth};
export default axiosInstance;
