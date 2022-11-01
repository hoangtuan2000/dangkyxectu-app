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
