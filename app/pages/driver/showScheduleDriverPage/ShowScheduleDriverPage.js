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
import InputCustom from '../../../components/inputCustom/InputCustom';
import ButtonCustom from '../../../components/buttonCustom/ButtonCustom';
import helper from '../../../common/helper';
import ModalSuccess from '../../../components/modalSuccess/ModalSuccess';
import ModalError from '../../../components/modalError/ModalError';
import BackDrop from '../../../components/backDrop/BackDrop';
import Constants from '../../../constant/Constants';
import ModalConfirmation from '../../../components/modalConfirmation/ModalConfirmation';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ShowScheduleDriverServices} from '../../../services/driver/ShowScheduleDriverServices';
import StarRating from 'react-native-star-rating-widget';
import ModalCarStatusConfirmation from '../../../components/driver/modalCarStatusConfirmation/ModalCarStatusConfirmation';

function ShowScheduleDriverPage({route, navigation}) {
  const {idSchedule, handleGetDataWithFilter} = route.params;
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  const [modalError, setModalError] = React.useState({
    open: false,
    title: null,
    content: null,
  });
  const [modalSuccess, setModalSuccess] = React.useState(false);
  const [backDrop, setBackDrop] = React.useState(false);
  const [dialogConfirmation, setDialogConfirmation] = React.useState({
    open: false,
    title: Strings.Common.DO_YOU_WANT_TO_CONFIRM_MOVING,
    content: Strings.Common.MOVING_CONFIRMATION,
    handleSubmit: () => {},
  });

  const [modalCarStatusConfirmation, setModalCarStatusConfirmation] =
    React.useState({
      open: false,
      idSchedule: null,
      idScheduleStatus: null,
    });

  const [schedule, setSchedule] = React.useState([]);

  const [errorData, setErrorData] = React.useState({
    comment: false,
    starNumber: false,
    phoneUser: false,
  });

  const [dataSendApi, setDataSendApi] = React.useState({
    idSchedule: idSchedule,
    idReview: null,
    comment: null,
    starNumber: null,
    phoneUser: null,
  });

  const getSchedule = async () => {
    const res = await ShowScheduleDriverServices.getSchedule({
      idSchedule: idSchedule,
    });
    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        setSchedule(res.data.data);
        setModalCarStatusConfirmation({
          ...modalCarStatusConfirmation,
          open: false,
          idSchedule: res.data.data[0].idSchedule,
          idScheduleStatus: res.data.data[0].idScheduleStatus,
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

  const handleOpenDialogCarStatusConfirmation = () => {
    setModalCarStatusConfirmation({
      ...modalCarStatusConfirmation,
      open: true,
    });
  };

  const handleChangePhone = e => {
    setDataSendApi({
      ...dataSendApi,
      phoneUser: e,
    });
    if (helper.isValidPhoneNumber(e)) {
      setErrorData({...errorData, phoneUser: false});
    } else {
      setErrorData({...errorData, phoneUser: true});
    }
  };

  const handleChangeRating = val => {
    if (helper.isValidStarNumber(val)) {
      setDataSendApi({
        ...dataSendApi,
        starNumber: val,
      });
    }
  };

  const handleChangeComment = e => {
    setDataSendApi({
      ...dataSendApi,
      comment: e,
    });
    if (helper.isValidStringLength(e, Constants.Common.MAX_LENGTH_COMMENT)) {
      setErrorData({...errorData, comment: false});
    } else {
      setErrorData({...errorData, comment: true});
    }
  };

  const confirmMoving = async () => {
    await setBackDrop(true);
    const res = await ShowScheduleDriverServices.confirmMoving({
      idSchedule: idSchedule,
    });
    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        handleGetDataWithFilter();
        getSchedule();
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
    await setTimeout(() => {
      setBackDrop(false);
    }, 1000);
  };

  const handleConfirmMoving = async () => {
    setDialogConfirmation({
      ...dialogConfirmation,
      open: true,
      handleSubmit: () => {
        confirmMoving();
      },
    });
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
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={isDarkMode ? darkStyles.container : lightStyles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        style={{flexGrow: 1, marginBottom: 20}}>
        {/* TITLE */}
        <Text style={isDarkMode ? darkStyles.title : lightStyles.title}>
          {Strings.ShowScheduleDriver.TITLE} {idSchedule}
        </Text>

        {schedule.map(item => {
          let bgColor = null;
          let textColor = isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK;
          const objScheduleStatus = Constants.ScheduleStatusCode;
          for (const property in objScheduleStatus) {
            if (item.idScheduleStatus == `${objScheduleStatus[property]}`) {
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
                {/* CAR TYPE */}
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textCarType
                      : lightStyles.textCarType
                  }>{`${item.carType} ${item.seatNumber} Chỗ`}</Text>

                {/* LICENSE PLATES */}
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.ShowScheduleDriver.LICENSE_PLATES}{' '}
                  {item.licensePlates}
                </Text>

                {/* CAR COLOR */}
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.ShowScheduleDriver.COLOR} {item.carColor}
                </Text>

                {/* CAR BRAND */}
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.ShowScheduleDriver.BRAND} {item.carBrand}
                </Text>

                {/* SCHEDULE STATUS */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={
                      isDarkMode
                        ? darkStyles.textStatus
                        : lightStyles.textStatus
                    }>
                    {Strings.ShowScheduleDriver.SCHEDULE_STATUS}
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

                {/* DATE */}
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.ShowScheduleDriver.TIME}
                  <Text style={{fontWeight: 'bold'}}>
                    {`${helper.formatDateStringFromTimeStamp(
                      item.startDate,
                    )} - ${helper.formatDateStringFromTimeStamp(item.endDate)}`}
                  </Text>
                </Text>

                {/* REASON */}
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.ShowScheduleDriver.REASON} {item.reason}
                </Text>

                {/* NOTE */}
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.ShowScheduleDriver.NOTE} {item.note}
                </Text>

                {/* INFO_USER */}
                <View>
                  <Text
                    style={
                      isDarkMode
                        ? darkStyles.textContent
                        : lightStyles.textContent
                    }>
                    {Strings.ShowScheduleDriver.INFO_USER}
                  </Text>
                  {/* FULL NAME */}
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name={'account'}
                      size={26}
                      color={
                        isDarkMode
                          ? Constants.Styles.Color.WHITE
                          : Constants.Styles.Color.PRIMARY
                      }
                    />
                    <Text
                      style={
                        isDarkMode
                          ? darkStyles.textContent
                          : lightStyles.textContent
                      }>
                      {Strings.ShowScheduleDriver.FULL_NAME}{' '}
                      {item.fullNameUser &&
                        item.codeUser &&
                        `${item.fullNameUser} - ${item.codeUser}`}
                    </Text>
                  </View>
                  {/* PHONE USER */}
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name={'phone'}
                      size={26}
                      color={
                        isDarkMode
                          ? Constants.Styles.Color.WHITE
                          : Constants.Styles.Color.PRIMARY
                      }
                    />
                    <Text
                      style={
                        isDarkMode
                          ? darkStyles.textContent
                          : lightStyles.textContent
                      }>
                      {Strings.ShowScheduleDriver.PHONE} {item.phoneUser}
                    </Text>
                  </View>
                  {/* EMAIL USER */}
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name={'email'}
                      size={26}
                      color={
                        isDarkMode
                          ? Constants.Styles.Color.WHITE
                          : Constants.Styles.Color.PRIMARY
                      }
                    />
                    <Text
                      style={
                        isDarkMode
                          ? darkStyles.textContent
                          : lightStyles.textContent
                      }>
                      {Strings.ShowScheduleDriver.EMAIL} {item.emailUser}
                    </Text>
                  </View>
                </View>

                {/* START LOCATION */}
                <View>
                  <Text
                    style={
                      isDarkMode
                        ? darkStyles.textContent
                        : lightStyles.textContent
                    }>
                    {Strings.ShowScheduleDriver.START_LOCATION}
                  </Text>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name={'map-marker'}
                      size={26}
                      color={
                        isDarkMode
                          ? Constants.Styles.Color.WHITE
                          : Constants.Styles.Color.PRIMARY
                      }
                    />
                    <Text
                      style={
                        isDarkMode
                          ? darkStyles.textContent
                          : lightStyles.textContent
                      }>
                      {`${item.startLocation} - ${item.wardStart} - ${item.districtStart} - ${item.provinceStart}`}
                    </Text>
                  </View>
                </View>

                {/* END LOCATION */}
                <View>
                  <Text
                    style={
                      isDarkMode
                        ? darkStyles.textContent
                        : lightStyles.textContent
                    }>
                    {Strings.ShowScheduleDriver.END_LOCATION}
                  </Text>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name={'map-marker'}
                      size={26}
                      color={
                        isDarkMode
                          ? Constants.Styles.Color.WHITE
                          : Constants.Styles.Color.PRIMARY
                      }
                    />
                    <Text
                      style={
                        isDarkMode
                          ? darkStyles.textContent
                          : lightStyles.textContent
                      }>
                      {`${item.endLocation} - ${item.wardEnd} - ${item.districtEnd} - ${item.provinceEnd}`}
                    </Text>
                  </View>
                </View>

                {/* INFO DRIVER */}
                <View>
                  <Text
                    style={
                      isDarkMode
                        ? darkStyles.textContent
                        : lightStyles.textContent
                    }>
                    {Strings.ShowScheduleDriver.INFO_DRIVER}
                  </Text>
                  {/* FULL NAME */}
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name={'account'}
                      size={26}
                      color={
                        isDarkMode
                          ? Constants.Styles.Color.WHITE
                          : Constants.Styles.Color.PRIMARY
                      }
                    />
                    <Text
                      style={
                        isDarkMode
                          ? darkStyles.textContent
                          : lightStyles.textContent
                      }>
                      {Strings.ShowScheduleDriver.FULL_NAME}{' '}
                      {item.fullNameDriver &&
                        item.codeDriver &&
                        `${item.fullNameDriver} - ${item.codeDriver}`}
                    </Text>
                  </View>
                  {/* PHONE DRIVER */}
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name={'phone'}
                      size={26}
                      color={
                        isDarkMode
                          ? Constants.Styles.Color.WHITE
                          : Constants.Styles.Color.PRIMARY
                      }
                    />
                    <Text
                      style={
                        isDarkMode
                          ? darkStyles.textContent
                          : lightStyles.textContent
                      }>
                      {Strings.ShowScheduleDriver.PHONE} {item.phoneDriver}
                    </Text>
                  </View>
                  {/* EMAIL DRIVER */}
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name={'email'}
                      size={26}
                      color={
                        isDarkMode
                          ? Constants.Styles.Color.WHITE
                          : Constants.Styles.Color.PRIMARY
                      }
                    />
                    <Text
                      style={
                        isDarkMode
                          ? darkStyles.textContent
                          : lightStyles.textContent
                      }>
                      {Strings.ShowScheduleDriver.EMAIL} {item.emailDriver}
                    </Text>
                  </View>
                </View>
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
                  textButton={Strings.Common.CLOSE}
                  iconPosition={'right'}
                  icon={
                    <MaterialIcons
                      name="close-circle-outline"
                      size={20}
                      color={Constants.Styles.Color.WHITE}
                    />
                  }
                />

                {/* RECEIVE_SCHEDULE BUTTON */}
                {helper.isDateTimeStampGreaterThanOrEqualCurrentDate(
                  item.startDate,
                ) &&
                  item.idScheduleStatus ==
                    Constants.ScheduleStatusCode.APPROVED && (
                    <ButtonCustom
                      onPress={handleOpenDialogCarStatusConfirmation}
                      bgColor={
                        Constants.ColorOfScheduleStatus.Background.RECEIVED
                      }
                      textButton={Strings.ShowScheduleDriver.RECEIVE_SCHEDULE}
                      iconPosition={'right'}
                      icon={
                        <MaterialIcons
                          name="check-circle"
                          size={20}
                          color={Constants.Styles.Color.WHITE}
                        />
                      }
                    />
                  )}

                {/* MOVING_COMFIRMATION BUTTON */}
                {item.idScheduleStatus ==
                  Constants.ScheduleStatusCode.RECEIVED && (
                  <ButtonCustom
                    onPress={handleConfirmMoving}
                    bgColor={Constants.ColorOfScheduleStatus.Background.MOVING}
                    textButton={Strings.ShowScheduleDriver.MOVING_COMFIRMATION}
                    iconPosition={'right'}
                    icon={
                      <MaterialIcons
                        name="check-circle"
                        size={20}
                        color={Constants.Styles.Color.WHITE}
                      />
                    }
                  />
                )}

                {/* COMPLETE_COMFIRMATION BUTTON */}
                {item.idScheduleStatus ==
                  Constants.ScheduleStatusCode.MOVING && (
                  <ButtonCustom
                    onPress={handleOpenDialogCarStatusConfirmation}
                    bgColor={
                      Constants.ColorOfScheduleStatus.Background.COMPLETE
                    }
                    textButton={
                      Strings.ShowScheduleDriver.COMPLETE_COMFIRMATION
                    }
                    iconPosition={'right'}
                    icon={
                      <MaterialIcons
                        name="check-circle"
                        size={20}
                        color={Constants.Styles.Color.WHITE}
                      />
                    }
                  />
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <ModalCarStatusConfirmation
        open={modalCarStatusConfirmation.open}
        handleClose={() =>
          setModalCarStatusConfirmation({
            ...modalCarStatusConfirmation,
            open: false,
          })
        }
        idSchedule={modalCarStatusConfirmation.idSchedule}
        idScheduleStatus={modalCarStatusConfirmation.idScheduleStatus}
        handleExecuteFunctionParent={() => {
          getSchedule();
          handleGetDataWithFilter();
          setModalSuccess(true)
        }}
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

export default ShowScheduleDriverPage;
