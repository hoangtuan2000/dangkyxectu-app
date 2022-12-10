const Constants = {
  Styles: {
    Color: {
      PRIMARY: '#0cb1f2',
      WHITE: '#ffffff',
      LIGHT: '#ededed',
      DARK: '#000000',
      SECONDARY: 'gray',
      ERROR: '#f71919',
      SUCCESS: 'green',
      WARNING: 'orange',
      GRAY: 'gray',
    },

    BackgroundColor: {
      DARK: '#2b2b2a',
      LIGHT: '#ffffff',
      LIGHT_GRAY: '#d4d4d4',
    },

    FontSize: {
      SMALL: 10,
      DEFAULT: 14,
      LARGE: 18,
      TOO_BIG: 20,
    },
  },

  Api: {
    BASE_URL: 'http://192.168.146.124:3001/api',
  },

  ApiCode: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    REQUEST_TIMEOUT: 408,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },

  Role: {
    // ALL: "all",
    ADMIN: 'admin',
    USER: 'user',
    DRIVER: 'driver',
    ADMIN_USER: 'admin user',
  },

  DateFormat: {
    ddMMyyyy: 'dd/MM/yyyy',
  },

  Common: {
    PAGE: 1,
    LIMIT_ENTRY: 10,
    LENGTH_COMMON: 250,
    MAX_LENGTH_COMMENT: 500,
    CHARACTERS_MIN_LENGTH_LICENSE_PLATES: 7,
    CHARACTERS_MAX_LENGTH_LICENSE_PLATES: 10,
    CHARACTERS_MIN_LENGTH_REASON_CANCEL_SCHEDULE: 5,
    CHARACTERS_MAX_LENGTH_REASON_CANCEL_SCHEDULE: 250,
    MIN_LENGTH_FULL_NAME: 5,
    MAX_LENGTH_FULL_NAME: 30,
    MIN_LENGTH_CODE: 8,
    MAX_LENGTH_CODE: 8,
    MIN_LENGTH_PASSWORD: 5,
    MAX_LENGTH_PASSWORD: 15,
  },

  ApiPath: {
    Common: {
      GET_COMMON: '/global/getCommon',
    },
    Login: {
      LOGIN: '/global/login',
    },
    RentalCarList: {
      GET_CAR_LIST: '/global/getCarList',
      GET_SCHEDULE_DATE_FOR_CAR: '/global/getScheduledDateForCar',
      CREATE_SCHEDULE: '/global/createSchedule',
      GET_CAR: '/global/getCar',
    },
    RentedCarList: {
      GET_USER_REGISTERED_SCHEDULE_LIST: '/user/getUserRegisteredScheduleList',
      CANCEL_SCHEDULE: '/user/cancelSchedule',
    },
    DriverTripManager: {
      GET_DRIVER_SCHEDULE_LIST: '/driver/getDriverScheduleList',
    },
    UpdateSchedulePending: {
      GET_SCHEDULE: '/global/getSchedule',
      GET_SCHEDULE_DATE_FOR_CAR: '/global/getScheduledDateForCar',
      UPDATE_SCHEDULE_PENDING: '/user/updateSchedulePending',
    },
    UpdateSchedule: {
      GET_SCHEDULE: '/global/getSchedule',
      CREATE_OR_UPDATE_REVIEW: '/user/createOrUpdateReview',
      UPDATE_PHONE_NUMBER_USER_SCHEDULE:
        '/user/updatePhoneNumberUserInSchedule',
    },
    ShowScheduleDriver: {
      GET_SCHEDULE: '/global/getSchedule',
      CONFIRM_MOVING: '/driver/confirmMoving',
    },
    ModalCarStatusConfirmation: {
      CONFIRM_RECEIVED_OR_COMPLETE_OF_SCHEDULE:
        '/driver/confirmReceivedOrCompleteOfSchedule',
    },
  },

  CarStatus: {
    WORK: 'Hoạt Động',
    STOP_WORKING: 'Ngừng Hoạt Động',
    MAINTENANCE: 'Bảo Trì',
  },
  CarStatusCode: {
    WORK: 1,
    STOP_WORKING: 2,
    MAINTENANCE: 3,
  },

  ColorOfCarStatus: {
    Text: {
      WORK: 'green',
      STOP_WORKING: 'red',
      MAINTENANCE: 'orange',
    },
    TextHaveBackground: {
      WORK: 'white',
      STOP_WORKING: 'white',
      MAINTENANCE: 'white',
    },
    Background: {
      WORK: 'green',
      STOP_WORKING: 'red',
      MAINTENANCE: 'orange',
    },
  },

  ScheduleStatus: {
    PENDING: 'Chờ Duyệt',
    APPROVED: 'Đã Duyệt',
    COMPLETE: 'Hoàn Thành',
    CANCELLED: 'Đã Hủy',
    REFUSE: 'Từ Chối',
    RECEIVED: 'Đã Nhận',
    MOVING: 'Đang Di Chuyển',
  },
  ScheduleStatusCode: {
    PENDING: 1,
    APPROVED: 2,
    COMPLETE: 3,
    CANCELLED: 4,
    REFUSE: 5,
    RECEIVED: 6,
    MOVING: 7,
  },

  ColorOfScheduleStatus: {
    TextNoBackground: {
      PENDING: '#d400ff',
      APPROVED: 'green',
      COMPLETE: 'Blue',
      CANCELLED: 'gray',
      REFUSE: 'red',
      RECEIVED: '#03a882',
      MOVING: '#ab8e00',
    },
    Text: {
      PENDING: 'black',
      APPROVED: 'white',
      COMPLETE: 'white',
      CANCELLED: 'white',
      REFUSE: 'white',
      RECEIVED: 'white',
      MOVING: 'white',
    },
    Background: {
      PENDING: '#ffcffb',
      APPROVED: 'green',
      COMPLETE: 'blue',
      CANCELLED: 'gray',
      REFUSE: 'red',
      RECEIVED: '#03a882',
      MOVING: '#ab8e00',
    },
  },

  CarPartsCode: {
    FRONT_OF_CAR: 1,
    BACK_OF_CAR: 2,
    LEFT_CAR_BODY: 3,
    RIGHT_CAR_BODY: 4,
    CAR_FRONT_LIGHTS: 5,
    CAR_BACK_LIGHTS: 6,
    OTHER_CAR_PARTS: 7,
    CAR_CONTROL_CENTER: 8,
  },
};

export default Constants;
