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
import {UpdateScheduleServices} from '../../../services/user/UpdateScheduleServices';
import StarRating from 'react-native-star-rating-widget';

function UpdateSchedulePage({route, navigation}) {
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
    title: Strings.Common.DO_YOU_WANT_TO_UPDATE,
    content: Strings.Common.UPDATE_CONFIRMATION,
    handleSubmit: () => {},
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
    const res = await UpdateScheduleServices.getSchedule({
      idSchedule: idSchedule,
    });
    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        setSchedule(res.data.data);
        setDataSendApi({
          ...dataSendApi,
          idReview: res.data.data[0].idReview,
          idSchedule: res.data.data[0].idSchedule,
          comment: res.data.data[0].commentReview,
          starNumber: res.data.data[0].starNumber,
          phoneUser: res.data.data[0].phoneUser,
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

  const handleSubmit = async () => {
    await setBackDrop(true);
    let res = {};
    if (
      schedule.length > 0 &&
      schedule[0].idScheduleStatus == Constants.ScheduleStatusCode.COMPLETE
    ) {
      res = await UpdateScheduleServices.createOrUpdateReview({
        idReview: dataSendApi.idReview,
        idSchedule: dataSendApi.idSchedule,
        comment: dataSendApi.comment,
        starNumber: dataSendApi.starNumber,
      });
    } else if (
      schedule.length > 0 &&
      (schedule[0].idScheduleStatus == Constants.ScheduleStatusCode.APPROVED ||
        schedule[0].idScheduleStatus == Constants.ScheduleStatusCode.RECEIVED)
    ) {
      res = await UpdateScheduleServices.updatePhoneNumberUserInSchedule({
        idSchedule: dataSendApi.idSchedule,
        phoneUser: dataSendApi.phoneUser,
      });
    }

    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        setModalSuccess(true);
        handleGetDataWithFilter();
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

  const onSubmit = () => {
    // call dialog confirm => submit
    setDialogConfirmation({
      ...dialogConfirmation,
      open: true,
      handleSubmit: () => {
        handleSubmit();
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
          {Strings.UpdateSchedulePage.TITLE} {idSchedule}
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
                  {Strings.UpdateSchedulePage.LICENSE_PLATES}{' '}
                  {item.licensePlates}
                </Text>

                {/* CAR COLOR */}
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.UpdateSchedulePage.COLOR} {item.carColor}
                </Text>

                {/* CAR BRAND */}
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.UpdateSchedulePage.BRAND} {item.carBrand}
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
                    {Strings.UpdateSchedulePage.SCHEDULE_STATUS}
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
                  {Strings.UpdateSchedulePage.TIME}
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
                  {Strings.UpdateSchedulePage.REASON} {item.reason}
                </Text>

                {/* NOTE */}
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.textContent
                      : lightStyles.textContent
                  }>
                  {Strings.UpdateSchedulePage.NOTE} {item.note}
                </Text>

                {/* PHONE */}
                {(item.idScheduleStatus ==
                  Constants.ScheduleStatusCode.APPROVED ||
                  item.idScheduleStatus ==
                    Constants.ScheduleStatusCode.RECEIVED) &&
                helper.isDateTimeStampGreaterThanOrEqualCurrentDate(
                  item.startDate,
                ) ? (
                  <>
                    {/* UPDATE PHONE */}
                    <View>
                      <Text
                        style={
                          isDarkMode
                            ? darkStyles.textContent
                            : lightStyles.textContent
                        }>
                        {Strings.UpdateSchedulePage.PHONE}
                      </Text>
                      <View style={{paddingHorizontal: 10}}>
                        {/* PHONE */}
                        <InputCustom
                          error={errorData.phoneUser}
                          helperText={Strings.UpdateSchedulePage.SUPPORT_PHONE}
                          icon={'phone-outline'}
                          onChangeText={e => handleChangePhone(e)}
                          placeholder={Strings.UpdateSchedulePage.ENTER_PHONE}
                          value={dataSendApi.phoneUser}
                        />
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    {/* PHONE */}
                    <Text
                      style={
                        isDarkMode
                          ? darkStyles.textContent
                          : lightStyles.textContent
                      }>
                      {Strings.UpdateSchedulePage.PHONE} {item.phoneUser}
                    </Text>
                  </>
                )}

                {/* RATING */}
                {item.idScheduleStatus ==
                  Constants.ScheduleStatusCode.COMPLETE && (
                  <>
                    {/* UPDATE REVIEW */}
                    <View>
                      <Text
                        style={
                          isDarkMode
                            ? darkStyles.textContent
                            : lightStyles.textContent
                        }>
                        {Strings.UpdateSchedulePage.REVIEW}
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <StarRating
                          rating={dataSendApi.starNumber}
                          onChange={e => handleChangeRating(e)}
                        />
                      </View>
                      <View style={{paddingHorizontal: 10}}>
                        {/* COMMENT */}
                        <InputCustom
                          multiLine={true}
                          error={errorData.comment}
                          helperText={
                            Strings.UpdateSchedulePage.SUPPORT_COMMENT
                          }
                          icon={'note-edit-outline'}
                          onChangeText={e => handleChangeComment(e)}
                          placeholder={Strings.UpdateSchedulePage.ENTER_COMMENT}
                          value={dataSendApi.comment}
                        />
                      </View>
                    </View>
                  </>
                )}

                {/* START LOCATION */}
                <View>
                  <Text
                    style={
                      isDarkMode
                        ? darkStyles.textContent
                        : lightStyles.textContent
                    }>
                    {Strings.UpdateSchedulePage.START_LOCATION}
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
                    {Strings.UpdateSchedulePage.END_LOCATION}
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
                    {Strings.UpdateSchedulePage.INFO_DRIVER}
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
                      {Strings.UpdateSchedulePage.FULL_NAME}{' '}
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
                      {Strings.UpdateSchedulePage.PHONE} {item.phoneDriver}
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
                      {Strings.UpdateSchedulePage.EMAIL} {item.emailDriver}
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
                {((item.idScheduleStatus ==
                  Constants.ScheduleStatusCode.APPROVED ||
                  item.idScheduleStatus ==
                    Constants.ScheduleStatusCode.RECEIVED) &&
                  helper.isDateTimeStampGreaterThanOrEqualCurrentDate(
                    item.startDate,
                  )) ||
                item.idScheduleStatus ==
                  Constants.ScheduleStatusCode.COMPLETE ? (
                  <>
                    <ButtonCustom
                      onPress={() => navigation.goBack()}
                      bgColor={Constants.Styles.Color.ERROR}
                      textButton={Strings.Common.CANCEL}
                    />
                    <ButtonCustom
                      onPress={onSubmit}
                      textButton={Strings.Common.UPDATE}
                    />
                  </>
                ) : (
                  <>
                    <ButtonCustom
                      onPress={() => navigation.goBack()}
                      bgColor={Constants.Styles.Color.ERROR}
                      textButton={Strings.Common.CLOSE}
                    />
                  </>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

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

export default UpdateSchedulePage;
