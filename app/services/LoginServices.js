import { axiosInstanceNotAuth } from "../common/axiosConfig";
import Constants from "../constant/Constants";

const LoginServices = {
    Login: async (data) => {
        return await axiosInstanceNotAuth
            .post(Constants.ApiPath.Login.LOGIN, data)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },
};

export { LoginServices };
