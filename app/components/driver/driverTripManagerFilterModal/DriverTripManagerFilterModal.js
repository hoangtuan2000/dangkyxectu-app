import React from 'react';
import {Modal, ScrollView, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';
import ButtonCustom from '../../buttonCustom/ButtonCustom';
import Constants from '../../../constant/Constants';
import Strings from '../../../constant/Strings';
import MultiSelectBox from '../../multiSelectBox/MultiSelectBox';
import InputCustom from '../../inputCustom/InputCustom';
import ModalError from '../../modalError/ModalError';
import BackDrop from '../../backDrop/BackDrop';
import {GlobalServices} from '../../../services/GlobalServices';
import DateRangePickerCustom from '../../dateRangePickerCustom/DateRangePickerCustom';
import ModalChooseAddress from '../../modalChooseAddress/ModalChooseAddress';
import ButtonAddress from '../../buttonAddress/ButtonAddress';

function DriverTripManagerFilterModal({
  open,
  handleClose,
  onSubmit = () => {},
  handleRefreshDataFilter,
  defaultScheduleCode,
  defaultCarType,
  defaultStatus,
  defaultStartDate,
  defaultEndDate,
  defaultAddress,
  defaultWard,
  defaultDistrict,
  defaultProvince,
}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  const addressRef = React.useRef();

  const [modalError, setModalError] = React.useState({
    open: false,
    title: null,
    content: null,
  });
  const [backDrop, setBackDrop] = React.useState(false);

  const [modalDateRange, setModalDateRange] = React.useState(false);

  const [dataSendApi, setDataSendApi] = React.useState({
    status: defaultStatus ? [...defaultStatus] : [],
    carType: defaultCarType ? [...defaultCarType] : [],
    scheduleCode: defaultScheduleCode || null,
    startDate: defaultStartDate || null,
    endDate: defaultEndDate || null,
    address: defaultAddress || null,
    ward: defaultWard || null,
    district: defaultDistrict || null,
    province: defaultProvince || null,
  });

  const [showAddress, setShowAddress] = React.useState();
  const [modalAddress, setModalAddress] = React.useState(false);

  const [carTypeList, setCarTypeList] = React.useState([]);
  const [scheduleStatusList, setScheduleStatusList] = React.useState([]);

  const getCommon = async () => {
    const res = await GlobalServices.getCommon({
      group: 'car_type, schedule_status',
    });
    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        setCarTypeList(
          res.data.data.car_type.map(val => {
            return {
              item: `${val.name} ${val.seatNumber} Chỗ`,
              id: val.idCarType,
            };
          }),
        );
        setScheduleStatusList(
          res.data.data.schedule_status.map(val => {
            return {
              item: val.name,
              id: val.idScheduleStatus,
            };
          }),
        );
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

  const handleChangeScheduleCode = e => {
    setDataSendApi({
      ...dataSendApi,
      scheduleCode: e,
    });
  };

  const handleSelectStatus = e => {
    setDataSendApi({
      ...dataSendApi,
      status: e,
    });
  };

  const handleSelectCarType = e => {
    setDataSendApi({
      ...dataSendApi,
      carType: e,
    });
  };

  const handleChangeDate = dates => {
    setDataSendApi({
      ...dataSendApi,
      startDate: Math.floor(new Date(dates.startDate).getTime()),
      endDate: Math.floor(new Date(dates.endDate).getTime()),
    });
  };

  const handleShowAddress = e => {
    const address = `${e.address} - ${e.ward.title} - ${e.district.title} - ${e.province.title}`;
    setShowAddress(address);
    setDataSendApi({
      ...dataSendApi,
      address: e.address,
      ward: e.ward,
      district: e.district,
      province: e.province,
    });
  };

  const handleRefreshFilter = () => {
    let data = {
      status: [],
      carType: [],
      scheduleCode: null,
      startDate: null,
      endDate: null,
      address: null,
      ward: null,
      district: null,
      province: null,
    };
    onSubmit(data);
    setDataSendApi(data);
    handleRefreshDataFilter();
    setShowAddress();
    handleClose();

    //call function of child component: modalShowAdderss
    //=> reset value in modal choosse end address
    addressRef.current.handleResetAddress;
  };

  const handleSubmit = () => {
    onSubmit(dataSendApi);
    handleClose();
  };

  const run = async () => {
    await setBackDrop(true);
    (await open) && getCommon();
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
                  fontSize: 20,
                  marginBottom: 10,
                  color: Constants.Styles.Color.PRIMARY,
                  fontWeight: 'bold',
                }}>
                {Strings.DriverTripManagerFilterModal.TITLE}
              </Text>

              {/* SCHEDULE_CODE */}
              <InputCustom
                label={Strings.DriverTripManagerFilterModal.SCHEDULE_CODE}
                styleLabel={{fontSize: Constants.Styles.FontSize.LARGE}}
                placeholder={
                  Strings.DriverTripManagerFilterModal.ENTER_SCHEDULE_CODE
                }
                style={{fontSize: 16}}
                onChangeText={e => handleChangeScheduleCode(e)}
                value={dataSendApi.scheduleCode}
              />

              {/* STATUS */}
              <MultiSelectBox
                data={scheduleStatusList}
                label={Strings.DriverTripManagerFilterModal.STATUS}
                inputPlaceholder={
                  Strings.DriverTripManagerFilterModal.CHOOSE_STATUS
                }
                onMultiChange={value => handleSelectStatus(value)}
                value={dataSendApi.status}
              />

              {/* CAR TYPE */}
              <MultiSelectBox
                data={carTypeList}
                label={Strings.DriverTripManagerFilterModal.CAR_TYPE}
                inputPlaceholder={
                  Strings.DriverTripManagerFilterModal.CHOOSE_CAR_TYPE
                }
                onMultiChange={value => handleSelectCarType(value)}
                value={dataSendApi.carType}
              />

              {/* CHOOSE DATE */}
              <DateRangePickerCustom
                label={Strings.Common.TIME}
                defaultStartDate={dataSendApi.startDate}
                defaultEndDate={dataSendApi.endDate}
                handleClose={() => setModalDateRange(false)}
                handleOpen={() => setModalDateRange(true)}
                open={modalDateRange}
                onSubmit={e => handleChangeDate(e)}
              />

              {/* CHOOSE START LOCATION */}
              <ButtonAddress
                onPress={() => setModalAddress(true)}
                label={Strings.DriverTripManagerFilterModal.ADDRESS}
                address={showAddress}
                placeholder={
                  Strings.DriverTripManagerFilterModal.CHOOSE_ADDRESS
                }
              />

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
                />
                <ButtonCustom
                  onPress={handleRefreshFilter}
                  textButton={Strings.Common.REFRESH}
                  bgColor={Constants.Styles.Color.WARNING}
                />
                <ButtonCustom
                  onPress={handleSubmit}
                  textButton={Strings.Common.SEARCH}
                />
              </View>
            </View>
          </ScrollView>

          {/* MODAL START LOCATION */}
          <ModalChooseAddress
            ref={addressRef}
            title={Strings.Common.CHOOSE_ADDRESS}
            open={modalAddress}
            handleClose={() => setModalAddress(false)}
            onSubmit={e => handleShowAddress(e)}
            // defaultAddress={defaultAddress}
            // defaultProvince={defaultProvince}
            // defaultDistrict={defaultDistrict}
            // defaultWard={defaultWard}
            defaultAddress={dataSendApi.address}
            defaultProvince={dataSendApi.province}
            defaultDistrict={dataSendApi.district}
            defaultWard={dataSendApi.ward}
            notValidateAddress={true}
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

export default DriverTripManagerFilterModal;
