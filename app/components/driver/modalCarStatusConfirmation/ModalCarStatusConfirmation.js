import React from 'react';
import {
  Modal,
  ScrollView,
  View,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';
import ButtonCustom from '../../buttonCustom/ButtonCustom';
import Constants from '../../../constant/Constants';
import Strings from '../../../constant/Strings';
import ModalError from '../../modalError/ModalError';
import BackDrop from '../../backDrop/BackDrop';
import {ModalCarStatusConfirmationServices} from '../../../services/driver/ModalCarStatusConfirmationServices';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioGroup from '../../radioGroup/RadioGroup';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CheckBoxBrokenCar from './CheckBoxBrokenCar';
import ModalConfirmation from '../../modalConfirmation/ModalConfirmation';

const nameCarParts = {
  FRONT_OF_CAR: 'frontOfCar',
  BACK_OF_CAR: 'backOfCar',
  CAR_FRONT_LIGHTS: 'carFrontLights',
  CAR_BACK_LIGHTS: 'carBackLights',
  LEFT_CAR_BODY: 'leftCarBody',
  RIGHT_CAR_BODY: 'rightCarBody',
  CAR_CONTROL_CENTER: 'carControlCenter',
  OTHER_CAR_PARTS: 'otherCarParts',
};

const interfaceBrokenCarParts = {
  idCarParts: null,
  image: null,
  comment: '',
};

const interfaceErrorData = {
  image: false,
  comment: false,
};

const options = {
  saveToPhotos: false,
  mediaType: 'photo',
};

function ModalCarStatusConfirmation({
  open,
  handleClose,
  idSchedule,
  idScheduleStatus,
  handleExecuteFunctionParent,
}) {

  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  const [modalError, setModalError] = React.useState({
    open: false,
    title: null,
    content: null,
  });
  const [backDrop, setBackDrop] = React.useState(false);

  const [dialogConfirmation, setDialogConfirmation] = React.useState({
    open: false,
    title: Strings.Common.DO_YOU_WANT_TO_UPDATE,
    content: Strings.Common.UPDATE_CONFIRMATION,
    handleSubmit: () => {},
  });

  const [formatContentDialog, setFormatContentDialog] = React.useState({
    title: '',
    nameButtonSubmit: '',
    colorButtonSubmit: '',
  });

  const [check, setCheck] = React.useState({
    frontOfCar: false,
    backOfCar: false,
    carFrontLights: false,
    carBackLights: false,
    leftCarBody: false,
    rightCarBody: false,
    carControlCenter: false,
    otherCarParts: false,
  });

  const [imageReview, setImageReview] = React.useState({
    frontOfCar: null,
    backOfCar: null,
    carFrontLights: null,
    carBackLights: null,
    leftCarBody: null,
    rightCarBody: null,
    carControlCenter: null,
    otherCarParts: null,
  });

  const [dataSendApi, setDataSendApi] = React.useState({
    isCarBroken: false,
    brokenCarParts: {
      frontOfCar: {...interfaceBrokenCarParts},
      backOfCar: {...interfaceBrokenCarParts},
      carFrontLights: {...interfaceBrokenCarParts},
      carBackLights: {...interfaceBrokenCarParts},
      leftCarBody: {...interfaceBrokenCarParts},
      rightCarBody: {...interfaceBrokenCarParts},
      carControlCenter: {...interfaceBrokenCarParts},
      otherCarParts: {...interfaceBrokenCarParts},
    },
  });

  const [errorData, setErrorData] = React.useState({
    isCarBroken: false,
    errorAllCarParts: false,
    frontOfCar: {...interfaceErrorData},
    backOfCar: {...interfaceErrorData},
    carFrontLights: {...interfaceErrorData},
    carBackLights: {...interfaceErrorData},
    leftCarBody: {...interfaceErrorData},
    rightCarBody: {...interfaceErrorData},
    carControlCenter: {...interfaceErrorData},
    otherCarParts: {...interfaceErrorData},
  });

  const handleCheckBrokenCarParts = (isCheck, value, nameCarParts) => {
    let data = dataSendApi.brokenCarParts;
    let dataCheck = check;
    if (isCheck === true) {
      data[`${nameCarParts}`] = {
        ...data[`${nameCarParts}`],
        idCarParts: value,
      };
      dataCheck[`${nameCarParts}`] = true;
    } else {
      data[`${nameCarParts}`] = {
        ...data[`${nameCarParts}`],
        idCarParts: null,
      };
      dataCheck[`${nameCarParts}`] = false;
    }
    setDataSendApi({
      ...dataSendApi,
      brokenCarParts: {...data},
    });
    setCheck(dataCheck);
  };

  const handleChangeComment = (value, nameCarParts) => {
    let data = dataSendApi.brokenCarParts;
    data[`${nameCarParts}`] = {
      ...data[`${nameCarParts}`],
      comment: value,
    };
    setDataSendApi({
      ...dataSendApi,
      brokenCarParts: {...data},
    });
  };

  const handleOpenCamera = async nameCarParts => {
    const result = await launchCamera(options);
    if (result.assets) {
      let imageReviewData = await imageReview;
      imageReviewData[`${nameCarParts}`] = await result.assets[0].uri;
      setImageReview({...imageReviewData});

      let data = dataSendApi.brokenCarParts;
      data[`${nameCarParts}`] = {
        ...data[`${nameCarParts}`],
        image: result.assets[0],
      };
      setDataSendApi({
        ...dataSendApi,
        brokenCarParts: {...data},
      });
    }
  };

  const handleOpenLibrary = async nameCarParts => {
    const result = await launchImageLibrary(options);
    if (result.assets) {
      let imageReviewData = await imageReview;
      imageReviewData[`${nameCarParts}`] = await result.assets[0].uri;
      setImageReview({...imageReviewData});

      let data = dataSendApi.brokenCarParts;
      data[`${nameCarParts}`] = {
        ...data[`${nameCarParts}`],
        image: result.assets[0],
      };
      setDataSendApi({
        ...dataSendApi,
        brokenCarParts: {...data},
      });
    }
  };

  const handleChangeIsCarBroken = e => {
    setDataSendApi({
      ...dataSendApi,
      isCarBroken: e,
    });
  };

  const handleRefreshData = () => {
    setCheck({
      frontOfCar: false,
      backOfCar: false,
      carFrontLights: false,
      carBackLights: false,
      leftCarBody: false,
      rightCarBody: false,
      carControlCenter: false,
      otherCarParts: false,
    });

    setImageReview({
      frontOfCar: null,
      backOfCar: null,
      carFrontLights: null,
      carBackLights: null,
      leftCarBody: null,
      rightCarBody: null,
      carControlCenter: null,
      otherCarParts: null,
    });

    setDataSendApi({
      isCarBroken: false,
      brokenCarParts: {
        frontOfCar: {...interfaceBrokenCarParts},
        backOfCar: {...interfaceBrokenCarParts},
        carFrontLights: {...interfaceBrokenCarParts},
        carBackLights: {...interfaceBrokenCarParts},
        leftCarBody: {...interfaceBrokenCarParts},
        rightCarBody: {...interfaceBrokenCarParts},
        carControlCenter: {...interfaceBrokenCarParts},
        otherCarParts: {...interfaceBrokenCarParts},
      },
    });

    setErrorData({
      isCarBroken: false,
      errorAllCarParts: false,
      frontOfCar: {...interfaceErrorData},
      backOfCar: {...interfaceErrorData},
      carFrontLights: {...interfaceErrorData},
      carBackLights: {...interfaceErrorData},
      leftCarBody: {...interfaceErrorData},
      rightCarBody: {...interfaceErrorData},
      carControlCenter: {...interfaceErrorData},
      otherCarParts: {...interfaceErrorData},
    });
  };

  const confirmReceivedOrCompleteOfSchedule = async () => {
    await setBackDrop(true);
    let formData = new FormData();
    formData.append('idSchedule', idSchedule);
    formData.append('isCarBroken', dataSendApi.isCarBroken);

    for (const property in dataSendApi.brokenCarParts) {
      if (dataSendApi.brokenCarParts[property].idCarParts) {
        formData.append(
          'arrayIdCarParts[]',
          dataSendApi.brokenCarParts[property].idCarParts,
        );
        if (dataSendApi.brokenCarParts[property].image) {
          formData.append('multipleImages', {
            uri: dataSendApi.brokenCarParts[property].image.uri,
            type: dataSendApi.brokenCarParts[property].image.type,
            name: dataSendApi.brokenCarParts[property].image.fileName,
          });
        }
        if (dataSendApi.brokenCarParts[property].comment) {
          formData.append(
            'arrayComment[]',
            dataSendApi.brokenCarParts[property].comment,
          );
        }
      }
    }

    const res =
      await ModalCarStatusConfirmationServices.confirmReceivedOrCompleteOfSchedule(
        formData,
      );
    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        handleExecuteFunctionParent();
        handleRefreshData();
        handleClose();
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

  const handleValidateData = () => {
    if (dataSendApi.isCarBroken == true) {
      const arrNameCarParts = [
        nameCarParts.FRONT_OF_CAR,
        nameCarParts.BACK_OF_CAR,
        nameCarParts.CAR_FRONT_LIGHTS,
        nameCarParts.CAR_BACK_LIGHTS,
        nameCarParts.LEFT_CAR_BODY,
        nameCarParts.RIGHT_CAR_BODY,
        nameCarParts.CAR_CONTROL_CENTER,
        nameCarParts.OTHER_CAR_PARTS,
      ];

      let error = errorData;
      let numberBrokenCarParts = 0;
      let numberError = 0;
      // CHECK EMPTY IMAGE OR COMMENT
      arrNameCarParts.map(item => {
        if (dataSendApi.brokenCarParts[`${item}`].idCarParts) {
          numberBrokenCarParts += 1;
          if (!dataSendApi.brokenCarParts[`${item}`].image) {
            error[`${item}`].image = true;
            numberError += 1;
          } else {
            error[`${item}`].image = false;
          }

          if (!dataSendApi.brokenCarParts[`${item}`].comment) {
            error[`${item}`].comment = true;
            numberError += 1;
          } else {
            error[`${item}`].comment = false;
          }
        }
      });

      // NOT CHECK CAR PARTS
      if (numberBrokenCarParts <= 0) {
        error.errorAllCarParts = true;
        numberError += 1;
      } else {
        error.errorAllCarParts = false;
      }

      setErrorData({
        ...error,
      });

      return numberError > 0 ? false : true;
    } else if (dataSendApi.isCarBroken == false) {
      setErrorData({
        ...errorData,
        isCarBroken: false,
      });
      return true;
    } else {
      setErrorData({
        ...errorData,
        isCarBroken: true,
      });
      return false;
    }
  };

  const onSubmit = async () => {
    const resultValidate = await handleValidateData();
    if (resultValidate) {
      setDialogConfirmation({
        ...dialogConfirmation,
        open: true,
        handleSubmit: () => {
          confirmReceivedOrCompleteOfSchedule();
        },
      });
    }
  };

  const run = async () => {
    await setBackDrop(true);
    if (idScheduleStatus == Constants.ScheduleStatusCode.APPROVED) {
      setFormatContentDialog({
        title: `${Strings.ModalCarStatusConfirmation.CAR_STATUS_BEFORE_DEPARTURE} (Số: ${idSchedule})`,
        nameButtonSubmit: Strings.ModalCarStatusConfirmation.RECEIVE_CAR,
        colorButtonSubmit: Constants.ColorOfScheduleStatus.Background.RECEIVED,
      });
      setDialogConfirmation({
        ...dialogConfirmation,
        title: Strings.Common.DO_YOU_WANT_TO_RECEIVE_CAR,
        content: Strings.Common.RECEIVE_CAR_CONFIRMATION,
      });
    } else if (idScheduleStatus == Constants.ScheduleStatusCode.MOVING) {
      setFormatContentDialog({
        title: `${Strings.ModalCarStatusConfirmation.CAR_STATUS_AFTER_DEPARTURE} (Số: ${idSchedule})`,
        nameButtonSubmit: Strings.ModalCarStatusConfirmation.COMPLETE_SCHEDULE,
        colorButtonSubmit: Constants.ColorOfScheduleStatus.Background.COMPLETE,
      });
      setDialogConfirmation({
        ...dialogConfirmation,
        title: Strings.Common.DO_YOU_WANT_TO_RETURN_CAR,
        content: Strings.Common.RETURN_CAR_CONFIRMATION,
      });
    }
    await setBackDrop(false);
  };

  React.useEffect(() => {
    run();
  }, [open]);

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}>
      <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
        <View style={isDarkMode ? darkStyles.modalView : lightStyles.modalView}>
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: Constants.Styles.FontSize.LARGE,
                  marginBottom: 10,
                  color: Constants.Styles.Color.PRIMARY,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {formatContentDialog.title}
              </Text>

              <RadioGroup
                title={Strings.ModalCarStatusConfirmation.IS_CAR_BROKEN}
                showClear={false}
                onCheck={e => handleChangeIsCarBroken(e)}
                value={dataSendApi.isCarBroken}
                items={[
                  {
                    value: false,
                    label: 'Không',
                  },
                  {
                    value: true,
                    label: 'Có',
                  },
                ]}
              />

              <View
                style={{display: dataSendApi.isCarBroken ? 'flex' : 'none'}}>
                {/* FRONT_OF_CAR */}
                <CheckBoxBrokenCar
                  handleCheckBrokenCarParts={() =>
                    handleCheckBrokenCarParts(
                      !check.frontOfCar,
                      Constants.CarPartsCode.FRONT_OF_CAR,
                      nameCarParts.FRONT_OF_CAR,
                    )
                  }
                  labelCheckBox={
                    Strings.ModalCarStatusConfirmation.FRONT_OF_CAR
                  }
                  checked={check.frontOfCar}
                  errorComment={errorData.frontOfCar.comment}
                  errorImage={errorData.frontOfCar.image}
                  handleChangeComment={e =>
                    handleChangeComment(e, nameCarParts.FRONT_OF_CAR)
                  }
                  placeholderComment={
                    Strings.ModalCarStatusConfirmation.ENTER_DESCRIPTION
                  }
                  valueComment={dataSendApi.brokenCarParts.frontOfCar.comment}
                  imageReview={imageReview.frontOfCar}
                  handleOpenCamera={() =>
                    handleOpenCamera(nameCarParts.FRONT_OF_CAR)
                  }
                  handleOpenLibrary={() =>
                    handleOpenLibrary(nameCarParts.FRONT_OF_CAR)
                  }
                />

                {/* BACK_OF_CAR */}
                <CheckBoxBrokenCar
                  handleCheckBrokenCarParts={() =>
                    handleCheckBrokenCarParts(
                      !check.backOfCar,
                      Constants.CarPartsCode.BACK_OF_CAR,
                      nameCarParts.BACK_OF_CAR,
                    )
                  }
                  labelCheckBox={Strings.ModalCarStatusConfirmation.BACK_OF_CAR}
                  checked={check.backOfCar}
                  errorComment={errorData.backOfCar.comment}
                  errorImage={errorData.backOfCar.image}
                  handleChangeComment={e =>
                    handleChangeComment(e, nameCarParts.BACK_OF_CAR)
                  }
                  placeholderComment={
                    Strings.ModalCarStatusConfirmation.ENTER_DESCRIPTION
                  }
                  valueComment={dataSendApi.brokenCarParts.backOfCar.comment}
                  imageReview={imageReview.backOfCar}
                  handleOpenCamera={() =>
                    handleOpenCamera(nameCarParts.BACK_OF_CAR)
                  }
                  handleOpenLibrary={() =>
                    handleOpenLibrary(nameCarParts.BACK_OF_CAR)
                  }
                />

                {/* LEFT_CAR_BODY */}
                <CheckBoxBrokenCar
                  handleCheckBrokenCarParts={() =>
                    handleCheckBrokenCarParts(
                      !check.leftCarBody,
                      Constants.CarPartsCode.LEFT_CAR_BODY,
                      nameCarParts.LEFT_CAR_BODY,
                    )
                  }
                  labelCheckBox={
                    Strings.ModalCarStatusConfirmation.LEFT_CAR_BODY
                  }
                  checked={check.leftCarBody}
                  errorComment={errorData.leftCarBody.comment}
                  errorImage={errorData.leftCarBody.image}
                  handleChangeComment={e =>
                    handleChangeComment(e, nameCarParts.LEFT_CAR_BODY)
                  }
                  placeholderComment={
                    Strings.ModalCarStatusConfirmation.ENTER_DESCRIPTION
                  }
                  valueComment={dataSendApi.brokenCarParts.leftCarBody.comment}
                  imageReview={imageReview.leftCarBody}
                  handleOpenCamera={() =>
                    handleOpenCamera(nameCarParts.LEFT_CAR_BODY)
                  }
                  handleOpenLibrary={() =>
                    handleOpenLibrary(nameCarParts.LEFT_CAR_BODY)
                  }
                />

                {/* RIGHT_CAR_BODY */}
                <CheckBoxBrokenCar
                  handleCheckBrokenCarParts={() =>
                    handleCheckBrokenCarParts(
                      !check.rightCarBody,
                      Constants.CarPartsCode.RIGHT_CAR_BODY,
                      nameCarParts.RIGHT_CAR_BODY,
                    )
                  }
                  labelCheckBox={
                    Strings.ModalCarStatusConfirmation.RIGHT_CAR_BODY
                  }
                  checked={check.rightCarBody}
                  errorComment={errorData.rightCarBody.comment}
                  errorImage={errorData.rightCarBody.image}
                  handleChangeComment={e =>
                    handleChangeComment(e, nameCarParts.RIGHT_CAR_BODY)
                  }
                  placeholderComment={
                    Strings.ModalCarStatusConfirmation.ENTER_DESCRIPTION
                  }
                  valueComment={dataSendApi.brokenCarParts.rightCarBody.comment}
                  imageReview={imageReview.rightCarBody}
                  handleOpenCamera={() =>
                    handleOpenCamera(nameCarParts.RIGHT_CAR_BODY)
                  }
                  handleOpenLibrary={() =>
                    handleOpenLibrary(nameCarParts.RIGHT_CAR_BODY)
                  }
                />

                {/* CAR_FRONT_LIGHTS */}
                <CheckBoxBrokenCar
                  handleCheckBrokenCarParts={() =>
                    handleCheckBrokenCarParts(
                      !check.carFrontLights,
                      Constants.CarPartsCode.CAR_FRONT_LIGHTS,
                      nameCarParts.CAR_FRONT_LIGHTS,
                    )
                  }
                  labelCheckBox={
                    Strings.ModalCarStatusConfirmation.CAR_FRONT_LIGHTS
                  }
                  checked={check.carFrontLights}
                  errorComment={errorData.carFrontLights.comment}
                  errorImage={errorData.carFrontLights.image}
                  handleChangeComment={e =>
                    handleChangeComment(e, nameCarParts.CAR_FRONT_LIGHTS)
                  }
                  placeholderComment={
                    Strings.ModalCarStatusConfirmation.ENTER_DESCRIPTION
                  }
                  valueComment={
                    dataSendApi.brokenCarParts.carFrontLights.comment
                  }
                  imageReview={imageReview.carFrontLights}
                  handleOpenCamera={() =>
                    handleOpenCamera(nameCarParts.CAR_FRONT_LIGHTS)
                  }
                  handleOpenLibrary={() =>
                    handleOpenLibrary(nameCarParts.CAR_FRONT_LIGHTS)
                  }
                />

                {/* CAR_BACK_LIGHTS */}
                <CheckBoxBrokenCar
                  handleCheckBrokenCarParts={() =>
                    handleCheckBrokenCarParts(
                      !check.carBackLights,
                      Constants.CarPartsCode.CAR_BACK_LIGHTS,
                      nameCarParts.CAR_BACK_LIGHTS,
                    )
                  }
                  labelCheckBox={
                    Strings.ModalCarStatusConfirmation.CAR_BACK_LIGHTS
                  }
                  checked={check.carBackLights}
                  errorComment={errorData.carBackLights.comment}
                  errorImage={errorData.carBackLights.image}
                  handleChangeComment={e =>
                    handleChangeComment(e, nameCarParts.CAR_BACK_LIGHTS)
                  }
                  placeholderComment={
                    Strings.ModalCarStatusConfirmation.ENTER_DESCRIPTION
                  }
                  valueComment={
                    dataSendApi.brokenCarParts.carBackLights.comment
                  }
                  imageReview={imageReview.carBackLights}
                  handleOpenCamera={() =>
                    handleOpenCamera(nameCarParts.CAR_BACK_LIGHTS)
                  }
                  handleOpenLibrary={() =>
                    handleOpenLibrary(nameCarParts.CAR_BACK_LIGHTS)
                  }
                />

                {/* CAR_CONTROL_CENTER */}
                <CheckBoxBrokenCar
                  handleCheckBrokenCarParts={() =>
                    handleCheckBrokenCarParts(
                      !check.carControlCenter,
                      Constants.CarPartsCode.CAR_CONTROL_CENTER,
                      nameCarParts.CAR_CONTROL_CENTER,
                    )
                  }
                  labelCheckBox={
                    Strings.ModalCarStatusConfirmation.CAR_CONTROL_CENTER
                  }
                  checked={check.carControlCenter}
                  errorComment={errorData.carControlCenter.comment}
                  errorImage={errorData.carControlCenter.image}
                  handleChangeComment={e =>
                    handleChangeComment(e, nameCarParts.CAR_CONTROL_CENTER)
                  }
                  placeholderComment={
                    Strings.ModalCarStatusConfirmation.ENTER_DESCRIPTION
                  }
                  valueComment={
                    dataSendApi.brokenCarParts.carControlCenter.comment
                  }
                  imageReview={imageReview.carControlCenter}
                  handleOpenCamera={() =>
                    handleOpenCamera(nameCarParts.CAR_CONTROL_CENTER)
                  }
                  handleOpenLibrary={() =>
                    handleOpenLibrary(nameCarParts.CAR_CONTROL_CENTER)
                  }
                />

                {/* OTHER_CAR_PARTS */}
                <CheckBoxBrokenCar
                  handleCheckBrokenCarParts={() =>
                    handleCheckBrokenCarParts(
                      !check.otherCarParts,
                      Constants.CarPartsCode.OTHER_CAR_PARTS,
                      nameCarParts.OTHER_CAR_PARTS,
                    )
                  }
                  labelCheckBox={
                    Strings.ModalCarStatusConfirmation.OTHER_CAR_PARTS
                  }
                  checked={check.otherCarParts}
                  errorComment={errorData.otherCarParts.comment}
                  errorImage={errorData.otherCarParts.image}
                  handleChangeComment={e =>
                    handleChangeComment(e, nameCarParts.OTHER_CAR_PARTS)
                  }
                  placeholderComment={
                    Strings.ModalCarStatusConfirmation.ENTER_DESCRIPTION
                  }
                  valueComment={
                    dataSendApi.brokenCarParts.otherCarParts.comment
                  }
                  imageReview={imageReview.otherCarParts}
                  handleOpenCamera={() =>
                    handleOpenCamera(nameCarParts.OTHER_CAR_PARTS)
                  }
                  handleOpenLibrary={() =>
                    handleOpenLibrary(nameCarParts.OTHER_CAR_PARTS)
                  }
                />
              </View>

              <View>
                {errorData.isCarBroken && (
                  <Text
                    style={{
                      fontSize: Constants.Styles.FontSize.DEFAULT,
                      color: isDarkMode
                        ? Constants.Styles.Color.WARNING
                        : Constants.Styles.Color.ERROR,
                    }}>
                    {
                      Strings.ModalCarStatusConfirmation
                        .PLEASE_CHOOSE_CAR_STATUS
                    }
                  </Text>
                )}
                {errorData.errorAllCarParts && (
                  <Text
                    style={{
                      fontSize: Constants.Styles.FontSize.DEFAULT,
                      color: isDarkMode
                        ? Constants.Styles.Color.WARNING
                        : Constants.Styles.Color.ERROR,
                    }}>
                    {
                      Strings.ModalCarStatusConfirmation
                        .PLEASE_CHOOSE_BROKEN_CAR_PARTS
                    }
                  </Text>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  marginTop: 10,
                }}>
                <ButtonCustom
                  onPress={handleClose}
                  bgColor={Constants.Styles.Color.ERROR}
                  textButton={Strings.Common.CANCEL}
                  iconPosition={'right'}
                  icon={
                    <MaterialIcons
                      name="close-circle-outline"
                      size={20}
                      color={Constants.Styles.Color.WHITE}
                    />
                  }
                />
                <ButtonCustom
                  onPress={onSubmit}
                  textButton={formatContentDialog.nameButtonSubmit}
                  bgColor={formatContentDialog.colorButtonSubmit}
                  iconPosition={'right'}
                  icon={
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      color={Constants.Styles.Color.WHITE}
                    />
                  }
                />
              </View>
            </View>
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
        </View>
      </View>
    </Modal>
  );
}

export default ModalCarStatusConfirmation;
