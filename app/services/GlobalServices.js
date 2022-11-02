import axiosInstance from '../common/axiosConfig';
import Constants from '../constant/Constants';
import {store} from '../redux/store';

const GlobalServices = {
  getCommon: async data => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.access_token;
    return await axiosInstance
      .post(Constants.ApiPath.Common.GET_COMMON, data, {
        headers: {
          Authorization: `${accessToken} ${token}`,
        },
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  },
};

export {GlobalServices};
