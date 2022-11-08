import axiosInstance from '../../common/axiosConfig';
import Constants from '../../constant/Constants';
import {store} from '../../redux/store';

const DriverTripManagerServices = {
  getDriverScheduleList: async data => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.access_token;
    return await axiosInstance
      .post(
        Constants.ApiPath.DriverTripManager.GET_DRIVER_SCHEDULE_LIST,
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

export {DriverTripManagerServices};
