import React from 'react';
import {
  Text,
  View,
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import RoutesPath from '../../constant/RoutesPath';
import Strings from '../../constant/Strings';
import {darkStyles, lightStyles} from './styles';
import DateRangePickerCustom from '../../components/dateRangePickerCustom/DateRangePickerCustom';
import InputCustom from '../../components/inputCustom/InputCustom';
import ModalChooseAddress from '../../components/modalChooseAddress/ModalChooseAddress';
import ButtonCustom from '../../components/buttonCustom/ButtonCustom';
import ButtonAddress from '../../components/buttonAddress/ButtonAddress';
import {RentalCarListServices} from '../../services/RentalCarListServices';
import helper from '../../common/helper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalSuccess from '../../components/modalSuccess/ModalSuccess';
import ModalError from '../../components/modalError/ModalError';
import BackDrop from '../../components/backDrop/BackDrop';
import Constants from '../../constant/Constants';

const defaultStartAddress = {
  address: 'Khu II Đại Học Cần Thơ',
  province: {
    id: '92',
    title: 'Thành phố Cần Thơ',
  },
  district: {
    id: '916',
    idProvince: '92',
    title: 'Quận Ninh Kiều',
  },
  ward: {
    idDistrict: '916',
    id: '31149',
    title: 'Phường An Khánh',
  },
};

function ScheduleRegistration({route, navigation}) {
  const {idCar} = route.params;
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const currentUser = useSelector(state => state.currentUser.user);

  const startAddressRef = React.useRef();
  const endAddressRef = React.useRef();

  const [modalError, setModalError] = React.useState({
    open: false,
    title: null,
    content: null,
  });
  const [modalSuccess, setModalSuccess] = React.useState(false);
  const [backDrop, setBackDrop] = React.useState(false);

  const [modalDateRange, setModalDateRange] = React.useState(false);
  const [modalStartAddress, setModalStartAddress] = React.useState(false);
  const [modalEndAddress, setModalEndAddress] = React.useState(false);
  const [showStartAddress, setShowStartAddress] = React.useState();
  const [showEndAddress, setShowEndAddress] = React.useState();
  const [disableDateSchedule, setDisableDateSchedule] = React.useState([]);
  const [car, setCar] = React.useState([]);

  const [errorData, setErrorData] = React.useState({
    idCar: false,
    date: false,
    startLocation: false,
    endLocation: false,
    reason: false,
    note: false,
    phone: false,
    idWardStartLocation: false,
    idWardEndLocation: false,
    helperPhone: null,
    helperStartLocation: null,
    helperEndLocation: null,
    helperReason: null,
    helperNote: null,
  });

  const [dataSendApi, setDataSendApi] = React.useState({
    idCar: idCar,
    startDate: null,
    endDate: null,
    startLocation: defaultStartAddress.address,
    endLocation: null,
    reason: null,
    note: null,
    phone: currentUser.phone || null,
    idWardStartLocation: defaultStartAddress.ward.idWard,
    idWardEndLocation: null,
  });

  const getCar = async idCar => {
    const res = await RentalCarListServices.getCar({
      idCar: idCar,
    });

    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        setCar([...res.data.data]);
      } else {
        setModalError({
          ...modalError,
          open: true,
          title: res.data.message,
          content: null,
        });
      }
    }
    // axios fail
    else {
      setModalError({
        ...modalError,
        open: true,
        title:
          (res.request &&
            `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`) ||
          Strings.Common.ERROR,
        content: res.name || null,
      });
    }
  };

  const getScheduledDateForCar = async idCar => {
    const res = await RentalCarListServices.getScheduledDateForCar({
      idCar: idCar,
    });
    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        let result = res.data.data;
        if (result.length > 0) {
          // handle put the dates already in the schedule into the array useState DisableDateSchedule
          let dateRange = [];
          for (let i = 0; i < result.length; i++) {
            let startDate = new Date(result[i].startDate * 1000);
            let endDate = new Date(result[i].endDate * 1000);
            if (
              new Date(startDate.toDateString()) >=
                new Date(new Date().toDateString()) ||
              new Date(endDate.toDateString()) >=
                new Date(new Date().toDateString())
            ) {
              for (
                let dateTemp = new Date(startDate.toDateString());
                dateTemp <= new Date(endDate.toDateString());

              ) {
                dateRange.push(new Date(dateTemp.toDateString()));
                dateTemp = new Date(dateTemp.setDate(dateTemp.getDate() + 1));
              }
            }
          }
          setDisableDateSchedule([...dateRange]);
        }
      } else {
        setModalError({
          ...modalError,
          open: true,
          title: res.data.message,
        });
      }
    }
    // axios fail
    else {
      setModalError({
        ...modalError,
        open: true,
        title:
          (res.request &&
            `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`) ||
          Strings.Common.ERROR,
        content: res.name || null,
      });
    }
  };

  const handleChangeDate = dates => {
    setDataSendApi({
      ...dataSendApi,
      startDate: Math.floor(new Date(dates.startDate).getTime()),
      endDate: Math.floor(new Date(dates.endDate).getTime()),
    });
  };

  const handleChangeReason = e => {
    setDataSendApi({
      ...dataSendApi,
      reason: e,
    });
  };

  const handleChangeNote = e => {
    setDataSendApi({
      ...dataSendApi,
      note: e,
    });
  };

  const handleChangePhone = e => {
    setDataSendApi({
      ...dataSendApi,
      phone: e,
    });
  };

  const handleShowStartAddress = e => {
    const address = `${e.address} - ${e.ward.title} - ${e.district.title} - ${e.province.title}`;
    setShowStartAddress(address);
    setDataSendApi({
      ...dataSendApi,
      startLocation: e.address,
      idWardStartLocation: e.ward.id,
    });
  };

  const handleShowEndAddress = e => {
    const address = `${e.address} - ${e.ward.title} - ${e.district.title} - ${e.province.title}`;
    setShowEndAddress(address);
    setDataSendApi({
      ...dataSendApi,
      endLocation: e.address,
      idWardEndLocation: e.ward.id,
    });
  };

  const handleValidateData = () => {
    const len = Constants.Common.LENGTH_COMMON;
    if (
      helper.isNullOrEmpty(dataSendApi.idCar) ||
      helper.isNullOrEmpty(dataSendApi.startDate) ||
      helper.isNullOrEmpty(dataSendApi.endDate) ||
      helper.isNullOrEmpty(dataSendApi.startLocation) ||
      helper.isNullOrEmpty(dataSendApi.endLocation) ||
      helper.isNullOrEmpty(dataSendApi.idWardStartLocation) ||
      helper.isNullOrEmpty(dataSendApi.idWardEndLocation) ||
      helper.isNullOrEmpty(dataSendApi.reason) ||
      helper.isNullOrEmpty(dataSendApi.phone)
    ) {
      console.log();
      setErrorData({
        ...errorData,
        idCar: helper.isNullOrEmpty(dataSendApi.idCar) && true,
        date:
          (helper.isNullOrEmpty(dataSendApi.startDate) ||
            helper.isNullOrEmpty(dataSendApi.endDate)) &&
          true,
        startLocation: helper.isNullOrEmpty(dataSendApi.startLocation) && true,
        helperStartLocation:
          helper.isNullOrEmpty(dataSendApi.startLocation) &&
          Strings.ScheduleRegistration.SUPPORT_START_LOCATION,
        endLocation: helper.isNullOrEmpty(dataSendApi.endLocation) && true,
        helperEndLocation:
          helper.isNullOrEmpty(dataSendApi.endLocation) &&
          Strings.ScheduleRegistration.SUPPORT_END_LOCATION,
        reason: helper.isNullOrEmpty(dataSendApi.reason) && true,
        helperReason:
          helper.isNullOrEmpty(dataSendApi.reason) &&
          Strings.ScheduleRegistration.SUPPORT_REASON,
        idWardStartLocation:
          helper.isNullOrEmpty(dataSendApi.idWardStartLocation) && true,
        helperStartLocation:
          helper.isNullOrEmpty(dataSendApi.idWardStartLocation) &&
          Strings.ScheduleRegistration.SUPPORT_START_LOCATION,
        idWardEndLocation:
          helper.isNullOrEmpty(dataSendApi.idWardEndLocation) && true,
        helperEndLocation:
          helper.isNullOrEmpty(dataSendApi.idWardEndLocation) &&
          Strings.ScheduleRegistration.SUPPORT_END_LOCATION,
        phone: helper.isNullOrEmpty(dataSendApi.phone) && true,
        helperPhone:
          helper.isNullOrEmpty(dataSendApi.phone) &&
          Strings.ScheduleRegistration.SUPPORT_PHONE,
      });
      return false;
    } else if (!helper.isValidPhoneNumber(dataSendApi.phone)) {
      setErrorData({
        ...errorData,
        phone: true,
        helperPhone: Strings.Common.SUPPORT_PHONE,
      });
      return false;
    } else if (
      (dataSendApi.startLocation &&
        !helper.isValidStringLength(dataSendApi.startLocation, len)) ||
      (dataSendApi.endLocation &&
        !helper.isValidStringLength(dataSendApi.endLocation, len)) ||
      (dataSendApi.reason &&
        !helper.isValidStringLength(dataSendApi.reason, len)) ||
      (dataSendApi.note && !helper.isValidStringLength(dataSendApi.note, len))
    ) {
      setErrorData({
        ...errorData,
        startLocation:
          dataSendApi.startLocation &&
          !helper.isValidStringLength(dataSendApi.startLocation, len) &&
          true,
        helperStartLocation:
          dataSendApi.startLocation &&
          !helper.isValidStringLength(dataSendApi.startLocation, len) &&
          Strings.Common.MAX_LENGTH,
        endLocation:
          dataSendApi.endLocation &&
          !helper.isValidStringLength(dataSendApi.endLocation, len) &&
          true,
        helperEndLocation:
          dataSendApi.endLocation &&
          !helper.isValidStringLength(dataSendApi.endLocation, len) &&
          Strings.Common.MAX_LENGTH,
        reason:
          dataSendApi.reason &&
          !helper.isValidStringLength(dataSendApi.reason, len) &&
          true,
        helperReason:
          dataSendApi.reason &&
          !helper.isValidStringLength(dataSendApi.reason, len) &&
          Strings.Common.MAX_LENGTH,
        note:
          dataSendApi.note &&
          !helper.isValidStringLength(dataSendApi.note, len) &&
          true,
        helperNote:
          dataSendApi.note &&
          !helper.isValidStringLength(dataSendApi.note, len) &&
          Strings.Common.MAX_LENGTH,
      });
      return false;
    } else {
      return true;
    }
  };

  const handleResetInput = () => {
    setErrorData({
      idCar: false,
      date: false,
      startLocation: false,
      endLocation: false,
      reason: false,
      note: false,
      phone: false,
      idWardStartLocation: false,
      idWardEndLocation: false,
      helperPhone: null,
      helperStartLocation: null,
      helperEndLocation: null,
      helperReason: null,
      helperNote: null,
    });
    setShowEndAddress();
    setDataSendApi({
      idCar: idCar,
      startDate: null,
      endDate: null,
      startLocation: defaultStartAddress.address,
      endLocation: null,
      reason: null,
      note: null,
      phone: currentUser.phone || null,
      idWardStartLocation: defaultStartAddress.ward.idWard,
      idWardEndLocation: null,
    });
  };

  const handleSubmit = async () => {
    const checkData = await handleValidateData();
    if (checkData) {
      await setBackDrop(true);
      const res = await RentalCarListServices.createSchedule(dataSendApi);
      // axios success
      if (res.data) {
        if (res.data.status == Constants.ApiCode.OK) {
          handleResetInput();
          //call function of child component: modalShowEndAdderss
          //=> reset value in modal choosse end address
          endAddressRef.current.handleResetAddress();
          setModalSuccess(true);
        } else {
          setModalError({
            ...modalError,
            open: true,
            title: res.data.message,
            content: null,
          });
        }
      }
      // axios fail
      else {
        setModalError({
          ...modalError,
          open: true,
          title:
            (res.request &&
              `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`) ||
            Strings.Common.ERROR,
          content: res.name || null,
        });
      }
      await setBackDrop(false);
    }
  };

  const run = async () => {
    await setBackDrop(true);
    await getCar(idCar);
    await getScheduledDateForCar(idCar);
    await setTimeout(() => {
      setBackDrop(false);
    }, 1000);
  };

  React.useEffect(() => {
    run();
  }, [idCar]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={isDarkMode ? darkStyles.container : lightStyles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        style={{flexGrow: 1, marginBottom: 20}}>
        {/* TITLE */}
        <Text style={isDarkMode ? darkStyles.title : lightStyles.title}>
          {Strings.ScheduleRegistration.TITLE}
        </Text>

        {car.map(item => {
          let bgColor = null;
          let textColor = isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK;
          const objCarStatus = Constants.CarStatusCode;
          for (const property in objCarStatus) {
            if (item.idCarStatus == `${objCarStatus[property]}`) {
              bgColor = Constants.ColorOfCarStatus.Background[property];
              textColor =
                Constants.ColorOfCarStatus.TextHaveBackground[property];
              break;
            }
          }
          return (
            <View key={item.idCar}>
              <Image
                source={{
                  uri: item.image,
                }}
                style={isDarkMode ? darkStyles.imageCar : lightStyles.imageCar}
              />
              <View style={{marginLeft: 10, marginRight: 10}}>
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textCarType
                      : lightStyles.textCarType
                  }>{`${item.nameCarType} ${item.seatNumber} Chổ`}</Text>

                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.ScheduleRegistration.LICENSE_PLATES}{' '}
                  {item.licensePlates}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={
                      isDarkMode
                        ? darkStyles.textContent
                        : lightStyles.textContent
                    }>
                    {Strings.ScheduleRegistration.STATUS}
                  </Text>
                  <View
                    style={{
                      backgroundColor: bgColor,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: textColor}}>{item.nameCarStatus}</Text>
                  </View>
                </View>

                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.ScheduleRegistration.COLOR} {item.nameCarColor}
                </Text>

                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.ScheduleRegistration.BRAND} {item.nameCarBrand}
                </Text>
              </View>
            </View>
          );
        })}

        <View style={{paddingHorizontal: 10}}>
          {/* CHOOSE DATE */}
          <DateRangePickerCustom
            label={Strings.Common.TIME}
            minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
            defaultStartDate={dataSendApi.startDate}
            defaultEndDate={dataSendApi.endDate}
            disabledDays={disableDateSchedule}
            handleClose={() => setModalDateRange(false)}
            handleOpen={() => setModalDateRange(true)}
            open={modalDateRange}
            onSubmit={e => handleChangeDate(e)}
            error={errorData.date}
            helperText={Strings.ScheduleRegistration.SUPPORT_DATE}
          />

          {/* CHOOSE START LOCATION */}
          <ButtonAddress
            onPress={() => setModalStartAddress(true)}
            label={Strings.ScheduleRegistration.START_LOCATION}
            address={showStartAddress}
            placeholder={Strings.ScheduleRegistration.CHOOSE_START_LOCATION}
            error={errorData.startLocation}
            helperText={errorData.helperStartLocation}
          />

          {/* CHOOSE END LOCATION */}
          <ButtonAddress
            onPress={() => setModalEndAddress(true)}
            label={Strings.ScheduleRegistration.END_LOCATION}
            address={showEndAddress}
            placeholder={Strings.ScheduleRegistration.CHOOSE_END_LOCATION}
            error={errorData.endLocation}
            helperText={errorData.helperEndLocation}
          />

          {/* REASON */}
          <InputCustom
            icon={'note-edit'}
            label={Strings.ScheduleRegistration.REASON}
            onChangeText={e => handleChangeReason(e)}
            placeholder={Strings.ScheduleRegistration.ENTER_REASON}
            value={dataSendApi.reason}
            error={errorData.reason}
            helperText={errorData.helperReason}
          />

          {/* NOTE */}
          <InputCustom
            icon={'note-outline'}
            label={Strings.ScheduleRegistration.NOTE}
            onChangeText={e => handleChangeNote(e)}
            placeholder={Strings.ScheduleRegistration.ENTER_NOTE}
            value={dataSendApi.note}
            error={errorData.note}
            helperText={errorData.helperNote}
          />

          {/* PHONE */}
          <InputCustom
            error={errorData.phone}
            helperText={errorData.helperPhone}
            icon={'phone-outline'}
            label={Strings.ScheduleRegistration.PHONE}
            onChangeText={e => handleChangePhone(e)}
            placeholder={Strings.ScheduleRegistration.ENTER_PHONE}
            value={dataSendApi.phone}
          />
        </View>

        {/* MODAL START LOCATION */}
        <ModalChooseAddress
          ref={startAddressRef}
          title={Strings.ScheduleRegistration.START_LOCATION}
          open={modalStartAddress}
          handleClose={() => setModalStartAddress(false)}
          onSubmit={e => handleShowStartAddress(e)}
          defaultAddress={defaultStartAddress.address}
          defaultProvince={defaultStartAddress.province}
          defaultDistrict={defaultStartAddress.district}
          defaultWard={defaultStartAddress.ward}
        />

        {/* MODAL END LOCATION */}
        <ModalChooseAddress
          ref={endAddressRef}
          title={Strings.ScheduleRegistration.END_LOCATION}
          open={modalEndAddress}
          handleClose={() => setModalEndAddress(false)}
          onSubmit={e => handleShowEndAddress(e)}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <ButtonCustom
            onPress={() => navigation.goBack()}
            bgColor={Constants.Styles.Color.ERROR}
            textButton={Strings.Common.CANCEL}
          />
          <ButtonCustom
            onPress={handleSubmit}
            textButton={Strings.Common.REGISTER}
          />
        </View>
      </ScrollView>

      <ModalSuccess
        open={modalSuccess}
        handleClose={() => setModalSuccess(false)}
      />

      <ModalError
        open={modalError.open}
        handleClose={() =>
          setModalError({
            ...modalError,
            open: false,
          })
        }
        title={modalError.title}
        content={modalError.content}
      />

      <BackDrop open={backDrop} />
    </KeyboardAvoidingView>
  );
}

export default ScheduleRegistration;
