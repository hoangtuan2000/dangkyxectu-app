import moment from "moment/moment"
import 'moment/locale/vi'  // without this line it didn't work

moment().locale('vi')

const helper = {
    isNullOrEmpty: (value) => {
        return value === undefined || value === null || value === "";
    },

    isValidStringLength: (value, len) => {
        if ((typeof value == "string" || typeof value == "number") && len) {
            value = value.toString();
            if (value.length <= len) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    isValidStringBetweenMinMaxLength: (value, minLen, maxLen) => {
        if (
            (typeof value == "string" || typeof value == "number") &&
            minLen &&
            maxLen
        ) {
            value = value.toString();
            if (value.length >= minLen && value.length <= maxLen) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    isValidPhoneNumber: (phoneNumber) => {
        const regExp = new RegExp(/^([0]{1})([1-9]{1})([0-9]{8})$/);
        return regExp.test(phoneNumber);
    },

    isValidEmail: (email) => {
        const regExp = new RegExp(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        );
        return regExp.test(email);
    },

    formatDateStringFromTimeStamp: (timeStamp) => {
        timeStamp = parseInt(timeStamp)
        return moment(timeStamp * 1000).format('L');
    },

    formatDateTimeStringFromTimeStamp: (timeStamp) => {
        timeStamp = parseInt(timeStamp);
        let date = moment(timeStamp * 1000).format('L');
        let time = moment(timeStamp * 1000).format('LTS');
        return timeStamp ? `${date} ${time}` : false;
    },

    isValidStarNumber: (value) => {
        return parseFloat(value) > 0 && parseFloat(value) <= 5.0 ? true : false;
    },

    formatStarNumber: (value) => {
        return parseFloat(value) > 0 && parseFloat(value) <= 5.0
            ? parseFloat(value).toFixed(1)
            : null;
    },

    isArray: (value) => {
        return Array.isArray(value);
    },

    isArrayEmpty: (value) => {
        if (Array.isArray(value)) {
            return value.length <= 0 ? true : false;
        } else {
            return false;
        }
    },

    isDateTimeStampGreaterThanCurrentDate: (timeStamp) => {
        return (
            new Date(new Date(timeStamp * 1000).toDateString()) >
            new Date(new Date().toDateString())
        );
    },

    isDateTimeStampGreaterThanOrEqualCurrentDate: (timeStamp) => {
        return (
            new Date(new Date(timeStamp * 1000).toDateString()) >=
            new Date(new Date().toDateString())
        );
    },

    convertStringBooleanToBoolean: (stringBoolean) => {
        return stringBoolean.toString() == "true";
    },
};

export default helper;
