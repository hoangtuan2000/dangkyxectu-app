import axiosInstance from '../../common/axiosConfig';
import Constants from '../../constant/Constants';
import {store} from '../../redux/store';

const ShowScheduleDriverServices = {
  getSchedule: async data => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.access_token;
    return await axiosInstance
      .post(
        Constants.ApiPath.ShowScheduleDriver.GET_SCHEDULE,
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
  confirmMoving: async data => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.access_token;
    return await axiosInstance
      .post(
        Constants.ApiPath.ShowScheduleDriver.CONFIRM_MOVING,
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

export {ShowScheduleDriverServices};
