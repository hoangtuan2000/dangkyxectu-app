import Constants from './Constants';

const Strings = {
  App: {
    TITLE: 'Hệ Thống Đăng Ký Xe',
    DARKTHEME: 'Giao Diện Tối',
    LIGHTTHEME: 'Giao Diện Sáng',
  },

  Common: {
    SUCCESS: 'Thành Công',
    ERROR: 'Xảy ra Lỗi',
    LOGIN: 'Đăng Nhập',
    LOGOUT: 'Đăng Xuất',
    NO_DATA: 'Không Có Dữ Liệu',
    AN_ERROR_OCCURRED: 'Đã Xảy Ra Lỗi',
    IMAGE: 'Ảnh',
    CAR_TYPE: 'Loại Xe',
    LICENSE_PLATES: 'Biển Số',
    START_LOCATION: 'Vị Trí Bắt Đầu',
    END_LOCATION: 'Vị Trí Kết Thúc',
    START_DAY: 'Ngày Đi',
    END_DAY: 'Ngày Về',
    STATUS: 'Trạng Thái',
    UPDATE: 'Cập Nhật',
    CANCEL: 'Hủy',
    REVIEW: 'Đánh Giá',
    FULL_NAME: 'Họ Tên',
    DEPARTMENT: 'Thuộc Khoa',
    REASON: 'Lý Do',
    BRAND: 'Thương Hiệu',
    NUMBER_OF_TRIPS: 'Số Chuyến Đi',
    NUMBER_OF_FAILURES: 'Số Lần Hỏng Hóc',
    LICENSE: 'Giấy Phép',
    NUMBER_PHONE: 'Số Điện Thoại',
    CANCEL: 'Hủy',
    SEARCH: 'Tìm Kiếm',
    REFRESH: 'Làm Mới',
    REGISTER: 'Đăng Ký',
    CLOSE: 'Đóng',
    CHOOSE_DATE_PLEASE: '-- Vui Lòng Chọn Ngày --',
    TIME: 'Thời Gian',
    SUPPORT_PHONE: 'Số Điện Thoại Không Đúng Định Dạng',
    MAX_LENGTH: `Tối Đa ${Constants.Common.LENGTH_COMMON} Ký Tự`,
    DETAIL: 'Chi Tiết',
    CHOOSE_ADDRESS: 'Chọn Địa Chỉ',
    DO_YOU_WANT_TO_UPDATE: 'Bạn Có Muốn Cập Nhật?',
    UPDATE_CONFIRMATION: 'Xác Nhận Cập Nhật',
    DO_YOU_WANT_TO_RETURN_CAR: 'Bạn Có Muốn Trả Xe?',
    RETURN_CAR_CONFIRMATION: 'Xác Nhận Trả Xe',
    DO_YOU_WANT_TO_RECEIVE_CAR: 'Bạn Có Muốn Nhận Xe?',
    RECEIVE_CAR_CONFIRMATION: 'Xác Nhận Nhận Xe',
    DO_YOU_WANT_TO_CONFIRM_MOVING: "Bạn Có Muốn Xác Nhận Di Chuyển?",
    MOVING_CONFIRMATION: "Xác Nhận Di Chuyển",
    CONFIRMATION: 'Xác Nhận',
  },

  ModalConfirmationCancel: {
    DO_YOU_WANT_TO_CANCEL_SCHEDULE: 'Bạn Có Muốn Hủy Lịch Trình?',
    RESON_CANCEL_CONFIRMATION: 'Lý Do Hủy Lịch Trình: ',
    ENTER_REASON: '-- Nhập Lý Do --',
    PLEASE_CHOOSE_REASON: 'Vui Lòng Chọn Lý Do',
    PLEASE_ENTER_REASON: 'Vui Lòng Nhập Lý Do',
  },

  ModalChooseAddress: {
    ADDRESS: 'Địa Chỉ',
    ENTER_ADDRESS: '-- Nhập Địa Chỉ --',
    PROVINCE: 'Tỉnh/Thành Phố',
    CHOOSE_PROVINCE: '-- Chọn Tỉnh/Thành Phố --',
    DISTRICT: 'Quận/Huyện',
    CHOOSE_DISTRICT: '-- Chọn Quận/Huyện --',
    WARD: 'Xã/Phường',
    CHOOSE_WARD: '-- Chọn Xã/Phường --',
    ENTER_ADDRESS_PLEASE: 'Vui lòng nhập địa chỉ',
    CHOOSE_PROVINCE_PLEASE: 'Vui lòng chọn Tỉnh/Thành Phố',
    CHOOSE_DISTRICT_PLEASE: 'Vui lòng chọn Quận/Huyện',
    CHOOSE_WARD_PLEASE: 'Vui lòng chọn Xã/Phường',
  },

  Login: {
    LOGIN_CODE: 'Mã Số Đăng Nhập',
    ENTER_LOGIN_CODE: 'Nhập Mã Số',
    PASSWORD: 'Mật Khẩu',
    ENTER_PASSWORD: 'Nhập Mật Khẩu',
    ENTER_CODE_PLEASE: 'Vui Lòng Nhập Mã Số',
    ENTER_PASS_PLEASE: 'Vui Lòng Nhập Mật Khẩu',
  },

  RentalCarList: {
    LICENSE_PLATES: 'Biển Số: ',
    VEHICLE_CONDITION: 'Tình Trạng Xe: ',
    SCHEDULE: 'Lịch Trình: ',
    CAR_BRAND: 'Hãng Xe:',
    CAR_REGISTRATION: 'Đăng Ký Xe',
  },

  RentalCarFilterModal: {
    TITLE: 'Bộ Lọc Xe',
    HAVE_SCHEDULE: 'Có Lịch Trình',
    LICENSE_PLATES: 'Biển Số Xe',
    ENTER_LICENSE_PLATES: '-- Nhập Biển Số --',
    BRAND: 'Thương Hiệu',
    CHOOSE_BRAND: '-- Chọn Thương Hiệu --',
    CAR_TYPE: 'Loại Xe',
    CHOOSE_CAR_TYPE: '-- Chọn Loại Xe --',
  },

  ScheduleRegistration: {
    TITLE: 'Đăng Ký Lịch Trình',
    REASON: 'Mục Đích Sử Dụng Xe',
    ENTER_REASON: '-- Nhập Mục Đích Sử Dụng Xe --',
    START_LOCATION: 'Vị Trí Bắt Đầu',
    CHOOSE_START_LOCATION: '-- Chọn Địa Chỉ Bắt Đầu --',
    END_LOCATION: 'Vị Trí Kết Thúc',
    CHOOSE_END_LOCATION: '-- Chọn Địa Chỉ Kết Thúc --',
    NOTE: 'Ghi Chú',
    ENTER_NOTE: '-- Nhập Ghi Chú --',
    PHONE: 'Điện Thoại',
    ENTER_PHONE: '-- Nhập Điện Thoại --',
    SUPPORT_DATE: 'Vui lòng chọn ngày',
    SUPPORT_START_LOCATION: 'Vui lòng chọn vị trí bắt đầu',
    SUPPORT_END_LOCATION: 'Vui lòng chọn vị trí kết thúc',
    SUPPORT_REASON: 'Vui lòng nhập mục đích',
    SUPPORT_PHONE: 'Vui lòng nhập số điện thoại',
    LICENSE_PLATES: 'Biển Số Xe: ',
    STATUS: 'Tình Trạng: ',
    COLOR: 'Màu Sắc: ',
    BRAND: 'Thương Hiệu: ',
  },

  UpdateSchedulePendingPage: {
    TITLE: 'Cập Nhật Lịch Trình',
    REASON: 'Mục Đích Sử Dụng Xe',
    ENTER_REASON: '-- Nhập Mục Đích Sử Dụng Xe --',
    START_LOCATION: 'Vị Trí Bắt Đầu',
    CHOOSE_START_LOCATION: '-- Chọn Địa Chỉ Bắt Đầu --',
    END_LOCATION: 'Vị Trí Kết Thúc',
    CHOOSE_END_LOCATION: '-- Chọn Địa Chỉ Kết Thúc --',
    NOTE: 'Ghi Chú',
    ENTER_NOTE: '-- Nhập Ghi Chú --',
    PHONE: 'Điện Thoại',
    ENTER_PHONE: '-- Nhập Điện Thoại --',
    SUPPORT_DATE: 'Vui lòng chọn ngày',
    SUPPORT_START_LOCATION: 'Vui lòng chọn vị trí bắt đầu',
    SUPPORT_END_LOCATION: 'Vui lòng chọn vị trí kết thúc',
    SUPPORT_REASON: 'Vui lòng nhập mục đích',
    SUPPORT_PHONE: 'Vui lòng nhập số điện thoại',
    LICENSE_PLATES: 'Biển Số Xe: ',
    SCHEDULE_STATUS: 'Trạng Thái Lịch Trình: ',
    COLOR: 'Màu Sắc: ',
    BRAND: 'Thương Hiệu: ',
  },

  UpdateSchedulePage: {
    TITLE: 'Thông Tin Lịch Trình',
    LICENSE_PLATES: 'Biển Số Xe: ',
    SCHEDULE_STATUS: 'Trạng Thái Lịch Trình: ',
    COLOR: 'Màu Sắc: ',
    BRAND: 'Thương Hiệu: ',
    TIME: 'Thời Gian: ',
    START_LOCATION: 'Vị Trí Bắt Đầu: ',
    END_LOCATION: 'Vị Trí Kết Thúc: ',
    REASON: 'Mục Đích Sử Dụng Xe: ',
    NOTE: 'Ghi Chú: ',
    PHONE: 'Điện Thoại: ',
    ENTER_PHONE: '-- Nhập Điện Thoại --',
    ENTER_COMMENT: '-- Nhập Bình Luận --',
    REVIEW: 'Đánh Giá: ',
    SUPPORT_PHONE: 'Số điện thoại không đúng định dạng',
    SUPPORT_COMMENT: `Bao gồm ${Constants.Common.MAX_LENGTH_COMMENT} ký tự`,
    INFO_DRIVER: 'Thông Tin Tài Xế: ',
    FULL_NAME: 'Họ Tên: ',
    PHONE: 'Điện Thoại: ',
    EMAIL: 'Email: ',
  },

  ShowScheduleDriver: {
    TITLE: 'Thông Tin Lịch Trình',
    LICENSE_PLATES: 'Biển Số Xe: ',
    SCHEDULE_STATUS: 'Trạng Thái Lịch Trình: ',
    COLOR: 'Màu Sắc: ',
    BRAND: 'Thương Hiệu: ',
    TIME: 'Thời Gian: ',
    START_LOCATION: 'Vị Trí Bắt Đầu: ',
    END_LOCATION: 'Vị Trí Kết Thúc: ',
    REASON: 'Mục Đích Sử Dụng Xe: ',
    NOTE: 'Ghi Chú: ',
    PHONE: 'Điện Thoại: ',
    INFO_DRIVER: 'Thông Tin Tài Xế: ',
    INFO_USER: 'Thông Tin Người Đăng Ký: ',
    FULL_NAME: 'Họ Tên: ',
    PHONE: 'Điện Thoại: ',
    EMAIL: 'Email: ',
    RECEIVE_SCHEDULE: "Nhận Lịch Trình",
    MOVING_COMFIRMATION: "Xác Nhận Di Chuyển",
    COMPLETE_COMFIRMATION: "Xác Nhận Hoàn Thành",
  },

  RentedCarList: {
    SCHEDULE: 'Lịch Trình',
    TIME: 'Thời Gian: ',
    REASON: 'Lý Do:',
    CAR_TYPE: 'Loại Xe:',
    STATUS: 'Trạng Thái: ',
    REVIEW: 'Đánh Giá: ',
  },

  RentedCarFilterModal: {
    TITLE: 'Bộ Lọc Lịch Trình',
    SCHEDULE_CODE: 'Mã Lịch Trình',
    ENTER_SCHEDULE_CODE: '-- Nhập Mã --',
    STATUS: 'Trạng Thái',
    CHOOSE_STATUS: '-- Chọn Trạng Thái --',
    CAR_TYPE: 'Loại Xe',
    CHOOSE_CAR_TYPE: '-- Chọn Loại Xe --',
    ADDRESS: 'Địa Chỉ',
    CHOOSE_ADDRESS: '-- Chọn Địa Chỉ --',
  },

  DriverTripManagerFilterModal: {
    TITLE: 'Bộ Lọc Lịch Trình',
    SCHEDULE_CODE: 'Mã Lịch Trình',
    ENTER_SCHEDULE_CODE: '-- Nhập Mã --',
    STATUS: 'Trạng Thái',
    CHOOSE_STATUS: '-- Chọn Trạng Thái --',
    CAR_TYPE: 'Loại Xe',
    CHOOSE_CAR_TYPE: '-- Chọn Loại Xe --',
    ADDRESS: 'Địa Chỉ',
    CHOOSE_ADDRESS: '-- Chọn Địa Chỉ --',
  },

  ModalCarStatusConfirmation: {
    CAR_STATUS_BEFORE_DEPARTURE: 'Tình Trạng Xe Khi Xuất Phát',
    CAR_STATUS_AFTER_DEPARTURE: 'Tình Trạng Xe Sau Khi Xuất Phát',
    IS_CAR_BROKEN: 'Xe Bị Hư Hỏng',
    FRONT_OF_CAR: 'Đầu Xe',
    BACK_OF_CAR: 'Đuôi Xe',
    LEFT_CAR_BODY: 'Thân Xe Bên Trái',
    RIGHT_CAR_BODY: 'Thân Xe Bên Phải',
    CAR_FRONT_LIGHTS: 'Đèn Trước',
    CAR_BACK_LIGHTS: 'Đèn Sau',
    OTHER_CAR_PARTS: 'Bộ Phận Khác',
    CAR_CONTROL_CENTER: 'Trung Tâm Điều Khiển',
    RECEIVE_CAR: 'Nhận Xe',
    COMPLETE_SCHEDULE: 'Hoàn Thành Lịch Trình',
    PLEASE_CHOOSE_CAR_STATUS: 'Vui Lòng Chọn Tình Trạng Xe',
    PLEASE_CHOOSE_BROKEN_CAR_PARTS: 'Vui Lòng Chọn Bộ Phận Xe Bị Hỏng',
    ENTER_DESCRIPTION: 'Nhập Mô Tả',
  },
};

export default Strings;
