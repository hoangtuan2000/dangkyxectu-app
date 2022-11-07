import React from 'react';
import {Modal, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';
import ButtonCustom from '../buttonCustom/ButtonCustom';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioGroup from '../radioGroup/RadioGroup';
import BackDrop from '../backDrop/BackDrop';
import ModalError from '../modalError/ModalError';
import helper from '../../common/helper';
import Collapsible from 'react-native-collapsible';
import InputCustom from '../inputCustom/InputCustom';
import {RentedCarListServices} from '../../services/user/RentedCarListServices';

function ModalConfirmationCancel({
  open,
  handleClose,
  idSchedule,
  handleOpenModalSuccessOfParent,
  handleGetDataWithFilter,
}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const [modalError, setModalError] = React.useState({
    open: false,
    title: null,
    content: null,
  });
  const [backDrop, setBackDrop] = React.useState(false);

  const [dataSendApi, setDataSendApi] = React.useState({
    reason: null,
    reasonOther: null,
  });
  const [errorData, setErrorData] = React.useState({
    reason: false,
    reasonOther: false,
    textHelperReason: null,
    textHelperReasonOther: null,
  });

  const handleChangeIsCarBroken = e => {
    setDataSendApi({
      ...dataSendApi,
      reason: e,
    });
    helper.convertStringBooleanToBoolean(e) == false &&
      setErrorData({
        ...errorData,
        reason: false,
      });
  };

  const handleReasonOther = e => {
    setDataSendApi({
      ...dataSendApi,
      reasonOther: e,
    });

    helper.isValidStringBetweenMinMaxLength(
      e,
      Constants.Common.CHARACTERS_MIN_LENGTH_REASON_CANCEL_SCHEDULE,
      Constants.Common.CHARACTERS_MAX_LENGTH_REASON_CANCEL_SCHEDULE,
    )
      ? setErrorData({
          ...errorData,
          reasonOther: false,
          textHelperReasonOther: null,
        })
      : setErrorData({
          ...errorData,
          reasonOther: true,
          textHelperReasonOther: `Từ ${Constants.Common.CHARACTERS_MIN_LENGTH_REASON_CANCEL_SCHEDULE} - ${Constants.Common.CHARACTERS_MAX_LENGTH_REASON_CANCEL_SCHEDULE} Ký Tự`,
        });
  };

  const validateData = () => {
    if (dataSendApi.reason == false) {
      if (dataSendApi.reasonOther) {
        if (
          helper.isValidStringBetweenMinMaxLength(
            dataSendApi.reasonOther,
            Constants.Common.CHARACTERS_MIN_LENGTH_REASON_CANCEL_SCHEDULE,
            Constants.Common.CHARACTERS_MAX_LENGTH_REASON_CANCEL_SCHEDULE,
          )
        ) {
          return true;
        } else {
          setErrorData({
            ...errorData,
            reasonOther: true,
            textHelperReasonOther: `Từ ${Constants.Common.CHARACTERS_MIN_LENGTH_REASON_CANCEL_SCHEDULE} - ${Constants.Common.CHARACTERS_MAX_LENGTH_REASON_CANCEL_SCHEDULE} Ký Tự`,
          });
          return false;
        }
      } else {
        setErrorData({
          ...errorData,
          reasonOther: true,
          textHelperReasonOther:
            Strings.ModalConfirmationCancel.PLEASE_ENTER_REASON,
        });
        return false;
      }
    } else if (
      !helper.isNullOrEmpty(dataSendApi.reason) &&
      dataSendApi.reason != false
    ) {
      return true;
    } else {
      setErrorData({
        ...errorData,
        reason: true,
        textHelperReason: Strings.ModalConfirmationCancel.PLEASE_CHOOSE_REASON,
      });
      return false;
    }
  };

  const handleRefesh = () => {
    setDataSendApi({
      reason: null,
      reasonOther: null,
    });
    setErrorData({
      reason: false,
      reasonOther: false,
      textHelperReason: null,
      textHelperReasonOther: null,
    });
  };

  const handleCancelSchedule = async () => {
    await setBackDrop(true);
    let data = {};
    // if (helper.isNullOrEmpty(dataSendApi.reason)) {
    data = {
      idSchedule: idSchedule,
      reasonCancel:
        dataSendApi.reason == false
          ? dataSendApi.reasonOther
          : dataSendApi.reason,
    };
    // }
    const res = await RentedCarListServices.cancelSchedule({
      ...data,
    });
    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        await handleRefesh();
        await handleGetDataWithFilter();
        await handleOpenModalSuccessOfParent();
        await setTimeout(() => {
          setBackDrop(false);
        }, 1000);
        await handleClose();
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

  const handleConfirm = () => {
    const check = validateData();
    if (check) {
      handleCancelSchedule();
    }
  };

  React.useEffect(() => {
    handleRefesh();
  }, [open, idSchedule]);

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}>
      <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
        <View style={isDarkMode ? darkStyles.modalView : lightStyles.modalView}>
          <Text style={isDarkMode ? darkStyles.title : lightStyles.title}>
            {Strings.ModalConfirmationCancel.DO_YOU_WANT_TO_CANCEL_SCHEDULE}
          </Text>

          <RadioGroup
            title={Strings.ModalConfirmationCancel.RESON_CANCEL_CONFIRMATION}
            onCheck={e => handleChangeIsCarBroken(e)}
            value={dataSendApi.reason}
            showClear={false}
            flexDirection={'column'}
            alignItems={'flex-start'}
            items={[
              {
                value: 'Sai Thông Tin Lịch Trình',
                label: 'Sai Thông Tin Lịch Trình',
              },
              {
                value: 'Cuộc Hẹn Bị Hủy',
                label: 'Cuộc Hẹn Bị Hủy',
              },
              {
                value: false,
                label: 'Khác',
              },
            ]}
          />

          <Collapsible collapsed={dataSendApi.reason == false ? false : true}>
            <InputCustom
              // label={Strings.ModalConfirmationCancel.LICENSE_PLATES}
              styleLabel={{fontSize: Constants.Styles.FontSize.LARGE}}
              placeholder={Strings.ModalConfirmationCancel.ENTER_REASON}
              style={{fontSize: 16}}
              onChangeText={e => handleReasonOther(e)}
              value={dataSendApi.reasonOther}
              multiLine={true}
              error={errorData.reasonOther}
              helperText={errorData.textHelperReasonOther}
            />
          </Collapsible>

          {errorData.reason && (
            <Text
              style={{
                fontSize: Constants.Styles.FontSize.DEFAULT,
                color: isDarkMode
                  ? Constants.Styles.Color.WARNING
                  : Constants.Styles.Color.ERROR,
              }}>
              {errorData.textHelperReason}
            </Text>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 20,
            }}>
            <ButtonCustom
              onPress={handleClose}
              bgColor={Constants.Styles.Color.SECONDARY}
              textButton={Strings.Common.CANCEL}
              padding={5}
              iconPosition={'right'}
              icon={
                <MaterialIcons
                  name="close-circle-outline"
                  size={25}
                  color={Constants.Styles.Color.LIGHT}
                />
              }
            />
            <ButtonCustom
              onPress={handleConfirm}
              bgColor={Constants.Styles.Color.ERROR}
              textButton={Strings.Common.CONFIRMATION}
              padding={5}
              iconPosition={'right'}
              icon={
                <MaterialIcons
                  name="check-circle"
                  size={25}
                  color={Constants.Styles.Color.LIGHT}
                />
              }
            />
          </View>
        </View>
      </View>

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
    </Modal>
  );
}

export default ModalConfirmationCancel;
