import React from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Strings from '../../../constant/Strings';
import {darkStyles, lightStyles} from './styles';
import DateRangePickerCustom from '../../../components/dateRangePickerCustom/DateRangePickerCustom';
import InputCustom from '../../../components/inputCustom/InputCustom';
import ModalChooseAddress from '../../../components/modalChooseAddress/ModalChooseAddress';
import ButtonCustom from '../../../components/buttonCustom/ButtonCustom';
import ButtonAddress from '../../../components/buttonAddress/ButtonAddress';
import {RentalCarListServices} from '../../../services/RentalCarListServices';
import helper from '../../../common/helper';
import ModalSuccess from '../../../components/modalSuccess/ModalSuccess';
import ModalError from '../../../components/modalError/ModalError';
import BackDrop from '../../../components/backDrop/BackDrop';
import Constants from '../../../constant/Constants';
import {UpdateSchedulePendingServices} from '../../../services/user/UpdateSchedulePendingServices';
import ModalConfirmation from '../../../components/modalConfirmation/ModalConfirmation';

function UpdateSchedulePendingPage({route, navigation}) {
  const {idSchedule, handleGetDataWithFilter} = route.params;
  const idCar = 1;
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
  const [dialogConfirmation, setDialogConfirmation] = React.useState({
    open: false,
    title: Strings.Common.DO_YOU_WANT_TO_UPDATE,
    content: Strings.Common.UPDATE_CONFIRMATION,
    handleSubmit: () => {},
  });

  const [modalDateRange, setModalDateRange] = React.useState(false);
  const [modalStartAddress, setModalStartAddress] = React.useState(false);
  const [modalEndAddress, setModalEndAddress] = React.useState(false);
  const [showStartAddress, setShowStartAddress] = React.useState();
  const [showEndAddress, setShowEndAddress] = React.useState();
  const [disableDateSchedule, setDisableDateSchedule] = React.useState([]);

  const [defaultAddress, setDefaultAddress] = React.useState({
    startAddress: {
      address: null,
      province: null,
      district: null,
      ward: null,
    },
    endAddress: {
      address: null,
      province: null,
      district: null,
      ward: null,
    },
  });

  const [schedule, setSchedule] = React.useState([]);

  const [errorData, setErrorData] = React.useState({
    idCar: false,
    date: false,
    startLocation: false,
    endLocation: false,
    reason: false,
    note: false,
    phoneUser: false,
    idWardStartLocation: false,
    idWardEndLocation: false,
    helperPhone: null,
    helperStartLocation: null,
    helperEndLocation: null,
    helperReason: null,
    helperNote: null,
  });

  const [dataSendApi, setDataSendApi] = React.useState({
    idSchedule: idSchedule,
    idCar: idCar,
    startDate: null,
    endDate: null,
    startLocation: null,
    endLocation: null,
    reason: null,
    note: null,
    phoneUser: null,
    idWardStartLocation: null,
    idWardEndLocation: null,
  });

  const getScheduledDateForCar = async idCar => {
    const res = await UpdateSchedulePendingServices.getScheduledDateForCar({
      idCar: idCar,
      notSchedule: idSchedule,
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

  const getSchedule = async () => {
    const res = await UpdateSchedulePendingServices.getSchedule({
      idSchedule: idSchedule,
    });
    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        let result = res.data.data;
        setSchedule(result);
        getScheduledDateForCar(result[0].idCar);

        setDataSendApi({
          ...dataSendApi,
          idCar: result[0].idCar,
          startDate: result[0].startDate * 1000,
          endDate: result[0].endDate * 1000,
          startLocation: result[0].startLocation,
          endLocation: result[0].endLocation,
          reason: result[0].reason,
          note: result[0].note,
          phoneUser: result[0].phoneUser,
          idWardStartLocation: result[0].idWardStart,
          idWardEndLocation: result[0].idWardEnd,
        });

        setDefaultAddress({
          ...defaultAddress,
          startAddress: {
            address: result[0].startLocation,
            province: {
              id: result[0].idProvinceStart,
              title: result[0].provinceStart,
            },
            district: {
              id: result[0].idDistrictStart,
              idProvince: result[0].idProvinceDistrictStart,
              title: result[0].districtStart,
            },
            ward: {
              idDistrict: result[0].idDistrictWardStart,
              id: result[0].idWardStart,
              title: result[0].wardStart,
            },
          },
          endAddress: {
            address: result[0].endLocation,
            province: {
              id: result[0].idProvinceEnd,
              title: result[0].provinceEnd,
            },
            district: {
              id: result[0].idDistrictEnd,
              idProvince: result[0].idProvinceDistrictEnd,
              title: result[0].districtEnd,
            },
            ward: {
              idDistrict: result[0].idDistrictWardEnd,
              id: result[0].idWardEnd,
              title: result[0].wardEnd,
            },
          },
        });
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

  const updateSchedulePending = async () => {
    await setBackDrop(true);
    const res = await UpdateSchedulePendingServices.updateSchedulePending(
      dataSendApi,
    );
    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        setModalSuccess(true);
        handleGetDataWithFilter()
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
      phoneUser: e,
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
      helper.isNullOrEmpty(dataSendApi.phoneUser)
    ) {
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
          Strings.UpdateSchedulePendingPage.SUPPORT_START_LOCATION,
        endLocation: helper.isNullOrEmpty(dataSendApi.endLocation) && true,
        helperEndLocation:
          helper.isNullOrEmpty(dataSendApi.endLocation) &&
          Strings.UpdateSchedulePendingPage.SUPPORT_END_LOCATION,
        reason: helper.isNullOrEmpty(dataSendApi.reason) && true,
        helperReason:
          helper.isNullOrEmpty(dataSendApi.reason) &&
          Strings.UpdateSchedulePendingPage.SUPPORT_REASON,
        idWardStartLocation:
          helper.isNullOrEmpty(dataSendApi.idWardStartLocation) && true,
        helperStartLocation:
          helper.isNullOrEmpty(dataSendApi.idWardStartLocation) &&
          Strings.UpdateSchedulePendingPage.SUPPORT_START_LOCATION,
        idWardEndLocation:
          helper.isNullOrEmpty(dataSendApi.idWardEndLocation) && true,
        helperEndLocation:
          helper.isNullOrEmpty(dataSendApi.idWardEndLocation) &&
          Strings.UpdateSchedulePendingPage.SUPPORT_END_LOCATION,
        phoneUser: helper.isNullOrEmpty(dataSendApi.phoneUser) && true,
        helperPhone:
          helper.isNullOrEmpty(dataSendApi.phoneUser) &&
          Strings.UpdateSchedulePendingPage.SUPPORT_PHONE,
      });
      return false;
    } else if (!helper.isValidPhoneNumber(dataSendApi.phoneUser)) {
      setErrorData({
        ...errorData,
        phoneUser: true,
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
      setErrorData({
        idCar: false,
        date: false,
        startLocation: false,
        endLocation: false,
        reason: false,
        note: false,
        phoneUser: false,
        idWardStartLocation: false,
        idWardEndLocation: false,
        helperPhone: null,
        helperStartLocation: null,
        helperEndLocation: null,
        helperReason: null,
        helperNote: null,
      });
      return true;
    }
  };

  const handleSubmit = async () => {
    const checkData = await handleValidateData();
    if (checkData) {
      setDialogConfirmation({
        ...dialogConfirmation,
        open: true,
        handleSubmit: () => {
          updateSchedulePending();
        },
      });
    }
  };

  const run = async () => {
    await setBackDrop(true);
    await getSchedule();
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
          {Strings.UpdateSchedulePendingPage.TITLE} {idSchedule}
        </Text>

        {schedule.map(item => {
          let bgColor = null;
          let textColor = isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK;
          const objScheduleStatus = Constants.ScheduleStatusCode;
          for (const property in objScheduleStatus) {
            if (item.idCarStatus == `${objScheduleStatus[property]}`) {
              bgColor = Constants.ColorOfScheduleStatus.Background[property];
              textColor = Constants.ColorOfScheduleStatus.Text[property];
              break;
            }
          }
          return (
            <View key={item.idSchedule}>
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
                  }>{`${item.carType} ${item.seatNumber} Chổ`}</Text>

                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.UpdateSchedulePendingPage.LICENSE_PLATES}{' '}
                  {item.licensePlates}
                </Text>

                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.UpdateSchedulePendingPage.COLOR} {item.carColor}
                </Text>

                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.UpdateSchedulePendingPage.BRAND} {item.carBrand}
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
                    {Strings.UpdateSchedulePendingPage.SCHEDULE_STATUS}
                  </Text>
                  <View
                    style={{
                      backgroundColor: bgColor,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: textColor}}>
                      {item.scheduleStatus}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{paddingHorizontal: 10}}>
                {/* CHOOSE DATE */}
                <DateRangePickerCustom
                  label={Strings.Common.TIME}
                  minDate={
                    new Date(new Date().setDate(new Date().getDate() - 1))
                  }
                  defaultStartDate={dataSendApi.startDate}
                  defaultEndDate={dataSendApi.endDate}
                  disabledDays={disableDateSchedule}
                  handleClose={() => setModalDateRange(false)}
                  handleOpen={() => setModalDateRange(true)}
                  open={modalDateRange}
                  onSubmit={e => handleChangeDate(e)}
                  error={errorData.date}
                  helperText={Strings.UpdateSchedulePendingPage.SUPPORT_DATE}
                />

                {/* CHOOSE START LOCATION */}
                <ButtonAddress
                  onPress={() => setModalStartAddress(true)}
                  label={Strings.UpdateSchedulePendingPage.START_LOCATION}
                  address={showStartAddress}
                  placeholder={
                    Strings.UpdateSchedulePendingPage.CHOOSE_START_LOCATION
                  }
                  error={errorData.startLocation}
                  helperText={errorData.helperStartLocation}
                />

                {/* CHOOSE END LOCATION */}
                <ButtonAddress
                  onPress={() => setModalEndAddress(true)}
                  label={Strings.UpdateSchedulePendingPage.END_LOCATION}
                  address={showEndAddress}
                  placeholder={
                    Strings.UpdateSchedulePendingPage.CHOOSE_END_LOCATION
                  }
                  error={errorData.endLocation}
                  helperText={errorData.helperEndLocation}
                />

                {/* REASON */}
                <InputCustom
                  icon={'note-edit'}
                  label={Strings.UpdateSchedulePendingPage.REASON}
                  onChangeText={e => handleChangeReason(e)}
                  placeholder={Strings.UpdateSchedulePendingPage.ENTER_REASON}
                  value={dataSendApi.reason}
                  error={errorData.reason}
                  helperText={errorData.helperReason}
                />

                {/* NOTE */}
                <InputCustom
                  icon={'note-outline'}
                  label={Strings.UpdateSchedulePendingPage.NOTE}
                  onChangeText={e => handleChangeNote(e)}
                  placeholder={Strings.UpdateSchedulePendingPage.ENTER_NOTE}
                  value={dataSendApi.note}
                  error={errorData.note}
                  helperText={errorData.helperNote}
                />

                {/* PHONE */}
                <InputCustom
                  error={errorData.phoneUser}
                  helperText={errorData.helperPhone}
                  icon={'phone-outline'}
                  label={Strings.UpdateSchedulePendingPage.PHONE}
                  onChangeText={e => handleChangePhone(e)}
                  placeholder={Strings.UpdateSchedulePendingPage.ENTER_PHONE}
                  value={dataSendApi.phoneUser}
                />
              </View>

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
                  textButton={Strings.Common.UPDATE}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* MODAL START LOCATION */}
      <ModalChooseAddress
        ref={startAddressRef}
        title={Strings.UpdateSchedulePendingPage.START_LOCATION}
        open={modalStartAddress}
        handleClose={() => setModalStartAddress(false)}
        onSubmit={e => handleShowStartAddress(e)}
        defaultAddress={
          defaultAddress.startAddress.address &&
          defaultAddress.startAddress.address
        }
        defaultProvince={
          defaultAddress.startAddress.province &&
          defaultAddress.startAddress.province
        }
        defaultDistrict={
          defaultAddress.startAddress.district &&
          defaultAddress.startAddress.district
        }
        defaultWard={
          defaultAddress.startAddress.ward && defaultAddress.startAddress.ward
        }
      />

      {/* MODAL END LOCATION */}
      <ModalChooseAddress
        ref={endAddressRef}
        title={Strings.UpdateSchedulePendingPage.END_LOCATION}
        open={modalEndAddress}
        handleClose={() => setModalEndAddress(false)}
        onSubmit={e => handleShowEndAddress(e)}
        defaultAddress={
          defaultAddress.endAddress.address && defaultAddress.endAddress.address
        }
        defaultProvince={
          defaultAddress.endAddress.province &&
          defaultAddress.endAddress.province
        }
        defaultDistrict={
          defaultAddress.endAddress.district &&
          defaultAddress.endAddress.district
        }
        defaultWard={
          defaultAddress.endAddress.ward && defaultAddress.endAddress.ward
        }
      />

      <ModalConfirmation
        open={dialogConfirmation.open}
        handleClose={() =>
          setDialogConfirmation({
            ...dialogConfirmation,
            open: false,
          })
        }
        content={dialogConfirmation.content}
        title={dialogConfirmation.title}
        handleSubmit={dialogConfirmation.handleSubmit}
      />

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

export default UpdateSchedulePendingPage;
