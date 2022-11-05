import axiosInstance from '../../common/axiosConfig';
import Constants from '../../constant/Constants';
import {store} from '../../redux/store';

const RentedCarListServices = {
  getUserRegisteredScheduleList: async data => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.access_token;
    return await axiosInstance
      .post(
        Constants.ApiPath.RentedCarList.GET_USER_REGISTERED_SCHEDULE_LIST,
        data,
        {
          headers: {
            Authorization: `${accessToken} ${token}`,
          },
        },
      )
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  },
};

export {RentedCarListServices};
