import axiosInstance from '../common/axiosConfig';
import Constants from '../constant/Constants';
import {store} from '../redux/store';

const RentalCarListServices = {
  getCarList: async (data) => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.access_token;
    return await axiosInstance
      .post(Constants.ApiPath.RentalCarList.GET_CAR_LIST, data, {
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
  getScheduledDateForCar: async (data) => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.access_token;
    return await axiosInstance
      .post(Constants.ApiPath.RentalCarList.GET_SCHEDULE_DATE_FOR_CAR, data, {
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
  createSchedule: async (data) => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.access_token;
    return await axiosInstance
      .post(Constants.ApiPath.RentalCarList.CREATE_SCHEDULE, data, {
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

export {RentalCarListServices};
