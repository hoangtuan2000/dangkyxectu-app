const Constants = {
  Styles: {
    Color: {
      PRIMARY: '#0cb1f2',
      WHITE: 'white',
      LIGHT: '#ededed',
      DARK: 'black',
      SECONDARY: 'gray',
      ERROR: '#f71919',
      SUCCESS: 'green',
      WARNING: 'orange'
    },

    BackgroundColor: {
      DARK: '#2b2b2a',
      LIGHT: 'white',
    },

    FontSize: {
      SMALL: 10,
      DEFAULT: 14,
      LARGE: 18,
    },
  },

  Api: {
    BASE_URL: 'http://192.168.1.142:3001/api',
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

  Common: {
    PAGE: 1,
    LIMIT_ENTRY: 10,
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
    Login: {
      LOGIN: '/global/login',
    },
    RentalCarList: {
      GET_CAR_LIST: "/global/getCarList",
    }
  },
};

export default Constants;
