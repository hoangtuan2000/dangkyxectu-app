import axiosInstance from '../../common/axiosConfig';
import Constants from '../../constant/Constants';
import {store} from '../../redux/store';

const UpdateScheduleServices = {
  getSchedule: async data => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.access_token;
    return await axiosInstance
      .post(
        Constants.ApiPath.UpdateSchedule.GET_SCHEDULE,
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
  createOrUpdateReview: async data => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.access_token;
    return await axiosInstance
      .post(
        Constants.ApiPath.UpdateSchedule.CREATE_OR_UPDATE_REVIEW,
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
  updatePhoneNumberUserInSchedule: async data => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.access_token;
    return await axiosInstance
      .post(
        Constants.ApiPath.UpdateSchedule.UPDATE_PHONE_NUMBER_USER_SCHEDULE,
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

export {UpdateScheduleServices};
