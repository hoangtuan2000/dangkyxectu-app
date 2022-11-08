import axiosInstance from '../../common/axiosConfig';
import Constants from '../../constant/Constants';
import {store} from '../../redux/store';

const ModalCarStatusConfirmationServices = {
  confirmReceivedOrCompleteOfSchedule: async data => {
    const token = store.getState().currentUser.user.token;
    const accessToken = store.getState().currentUser.user.access_token;
    return await axiosInstance
      .post(
        Constants.ApiPath.ModalCarStatusConfirmation
          .CONFIRM_RECEIVED_OR_COMPLETE_OF_SCHEDULE,
        data,
        {
          headers: {
            Authorization: `${accessToken} ${token}`,
            'Content-Type': 'multipart/form-data',
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

export {ModalCarStatusConfirmationServices};
