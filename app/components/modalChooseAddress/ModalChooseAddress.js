import React from 'react';
import {Modal, ScrollView, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';
import ButtonCustom from '../buttonCustom/ButtonCustom';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import InputCustom from '../inputCustom/InputCustom';
import ModalError from '../modalError/ModalError';
import BackDrop from '../backDrop/BackDrop';
import {GlobalServices} from '../../services/GlobalServices';
import AutoCompleteDropdownCustom from '../autoCompleteDropdownCustom/AutoCompleteDropdownCustom';
import helper from '../../common/helper';

const ModalChooseAddress = React.forwardRef((props, ref) => {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  let {
    open,
    handleClose,
    title,
    onSubmit = () => {},
    defaultProvince,
    defaultAddress,
    defaultDistrict,
    defaultWard,
    notValidateAddress, // used to filter the address => no need check condition the address
  } = props;

  const provinceRef = React.useRef();
  const districtRef = React.useRef();
  const wardRef = React.useRef();

  const [modalError, setModalError] = React.useState({
    open: false,
    title: null,
    content: null,
  });
  const [backDrop, setBackDrop] = React.useState(false);

  const [errorData, setErrorData] = React.useState({
    address: false,
    province: false,
    district: false,
    ward: false,
    helperAddress: null,
  });

  const [selectedAddress, setSelectedAddress] = React.useState({
    address: defaultAddress ? defaultAddress : notValidateAddress ? '' : null,
    province: defaultProvince ? defaultProvince : null,
    district: defaultDistrict ? defaultDistrict : null,
    ward: defaultWard ? defaultWard : null,
  });

  const [provinceList, setProvinceList] = React.useState([]);
  const [districtList, setDistrictList] = React.useState([]);
  const [wardList, setWardList] = React.useState([]);

  const [showDistrict, setShowDistrict] = React.useState([]);
  const [showWard, setShowWard] = React.useState([]);

  const getCommon = async () => {
    const res = await GlobalServices.getCommon({
      group: 'ward, district, province',
    });
    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        setWardList(res.data.data.ward);
        setDistrictList(res.data.data.district);
        setProvinceList([
          ...res.data.data.province.map(item => {
            return {
              id: item.idProvince,
              title: item.name,
            };
          }),
        ]);

        return res.data.data;
      } else {
        setModalError({
          ...modalError,
          open: true,
          title: res.data.message,
          content: null,
        });
        return false;
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
      return false;
    }
  };

  const handleChangeAddress = e => {
    setSelectedAddress({
      ...selectedAddress,
      address: e,
    });
  };

  const handleChooseProvince = async value => {
    // // call clear value autocomplte district and ward
    districtRef.current.clear();
    wardRef.current.clear();

    if (value) {
      setSelectedAddress({
        ...selectedAddress,
        province: value,
        district: null,
        ward: null,
      });
      let districtOfProvince = await districtList.filter(item => {
        if (item.idProvince == value.id) {
          return item;
        }
      });
      // FORMAT
      districtOfProvince = await districtOfProvince.map(item => {
        return {
          id: item.idDistrict,
          title: item.name,
          idProvince: item.idProvince,
        };
      });
      setShowDistrict(districtOfProvince);
    } else {
      setSelectedAddress({
        ...selectedAddress,
        province: value,
        district: null,
        ward: null,
      });
      setShowDistrict([]);
    }
  };

  const handleChooseDistrict = async value => {
    // call clear value autocomplte ward
    wardRef.current.clear();
    if (value) {
      setSelectedAddress({
        ...selectedAddress,
        district: value,
        ward: null,
      });
      let wardOfDistrict = await wardList.filter(item => {
        if (item.idDistrict == value.id) {
          return item;
        }
      });
      // FORMAT
      wardOfDistrict = await wardOfDistrict.map(item => {
        return {
          id: item.idWard,
          title: item.name,
          idDistrict: item.idDistrict,
        };
      });
      setShowWard(wardOfDistrict);
    } else {
      setSelectedAddress({
        ...selectedAddress,
        district: value,
        ward: null,
      });
      setShowWard([]);
    }
  };

  const handleChooseWard = value => {
    setSelectedAddress({
      ...selectedAddress,
      ward: value,
    });
  };

  const handleValidateDate = () => {
    if (notValidateAddress) {
      if (
        helper.isNullOrEmpty(selectedAddress.province) ||
        helper.isNullOrEmpty(selectedAddress.district) ||
        helper.isNullOrEmpty(selectedAddress.ward)
      ) {
        setErrorData({
          province: helper.isNullOrEmpty(selectedAddress.province)
            ? true
            : false,
          district: helper.isNullOrEmpty(selectedAddress.district)
            ? true
            : false,
          ward: helper.isNullOrEmpty(selectedAddress.ward) ? true : false,
        });
        return false;
      } else if (
        selectedAddress.address &&
        !helper.isValidStringLength(
          selectedAddress.address,
          Constants.Common.LENGTH_COMMON,
        )
      ) {
        setErrorData({
          address: !helper.isValidStringLength(
            selectedAddress.address,
            Constants.Common.LENGTH_COMMON,
          )
            ? true
            : false,
          helperAddress: !helper.isValidStringLength(
            selectedAddress.address,
            Constants.Common.LENGTH_COMMON,
          )
            ? Strings.Common.MAX_LENGTH
            : null,
        });
        return false;
      } else {
        return true;
      }
    } else {
      if (
        helper.isNullOrEmpty(selectedAddress.address) ||
        helper.isNullOrEmpty(selectedAddress.province) ||
        helper.isNullOrEmpty(selectedAddress.district) ||
        helper.isNullOrEmpty(selectedAddress.ward)
      ) {
        setErrorData({
          address: helper.isNullOrEmpty(selectedAddress.address) ? true : false,
          helperAddress: helper.isNullOrEmpty(selectedAddress.address)
            ? Strings.ModalChooseAddress.ENTER_ADDRESS_PLEASE
            : null,
          province: helper.isNullOrEmpty(selectedAddress.province)
            ? true
            : false,
          district: helper.isNullOrEmpty(selectedAddress.district)
            ? true
            : false,
          ward: helper.isNullOrEmpty(selectedAddress.ward) ? true : false,
        });
        return false;
      } else if (
        !helper.isValidStringLength(
          selectedAddress.address,
          Constants.Common.LENGTH_COMMON,
        )
      ) {
        setErrorData({
          address: !helper.isValidStringLength(
            selectedAddress.address,
            Constants.Common.LENGTH_COMMON,
          )
            ? true
            : false,
          helperAddress: !helper.isValidStringLength(
            selectedAddress.address,
            Constants.Common.LENGTH_COMMON,
          )
            ? Strings.Common.MAX_LENGTH
            : null,
        });
        return false;
      } else {
        return true;
      }
    }
  };

  const handleSubmit = async () => {
    let resultValid = await handleValidateDate();
    if (resultValid) {
      onSubmit({
        address: helper.isNullOrEmpty(selectedAddress.address)
          ? ''
          : selectedAddress.address,
        province: selectedAddress.province,
        district: selectedAddress.district,
        ward: selectedAddress.ward,
      });
      handleClose();
    }
  };

  React.useImperativeHandle(ref, () => ({
    handleResetAddress() {
      // call clear value autocomplte province, district and ward
      provinceRef.current.clear();
      districtRef.current.clear();
      wardRef.current.clear();
      setSelectedAddress({
        address: defaultAddress
          ? defaultAddress
          : notValidateAddress
          ? ''
          : null,
        province: defaultProvince ? defaultProvince : null,
        district: defaultDistrict ? defaultDistrict : null,
        ward: defaultWard ? defaultWard : null,
      });
    },
  }));

  const run = async () => {
    await setBackDrop(true);
    if (
      (defaultAddress || (defaultProvince && defaultDistrict && defaultWard)) &&
      open
    ) {
      let result = await getCommon();
      if (defaultProvince) {
        let districtOfProvince = result.district.filter(item => {
          if (item.idProvince == defaultProvince.id) {
            return item;
          }
        });
        // FORMAT
        districtOfProvince = districtOfProvince.map(item => {
          return {
            id: item.idDistrict,
            title: item.name,
            idProvince: item.idProvince,
          };
        });
        setShowDistrict(districtOfProvince);
      }
      if (defaultDistrict) {
        let wardOfDistrict = result.ward.filter(item => {
          if (item.idDistrict == defaultDistrict.id) {
            return item;
          }
        });
        // FORMAT
        wardOfDistrict = wardOfDistrict.map(item => {
          return {
            id: item.idWard,
            title: item.name,
            idDistrict: item.idDistrict,
          };
        });
        setShowWard(wardOfDistrict);
      }

      setSelectedAddress({
        address: defaultAddress ? defaultAddress : null,
        province: defaultProvince ? defaultProvince : null,
        district: defaultDistrict ? defaultDistrict : null,
        ward: defaultWard ? defaultWard : null,
      });
      onSubmit({
        address: defaultAddress,
        province: defaultProvince,
        district: defaultDistrict,
        ward: defaultWard,
      });
    } else {
      (await open) && getCommon();
    }
    await setBackDrop(false);
  };

  React.useEffect(() => {
    run();
  }, [open, defaultAddress, defaultProvince, defaultDistrict, defaultWard]);

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
                {title}
              </Text>

              {/* LICENSE PLATES */}
              <InputCustom
                label={Strings.ModalChooseAddress.ADDRESS}
                styleLabel={{fontSize: Constants.Styles.FontSize.LARGE}}
                placeholder={Strings.ModalChooseAddress.ENTER_ADDRESS}
                style={{fontSize: 16}}
                onChangeText={e => handleChangeAddress(e)}
                value={selectedAddress.address}
                error={errorData.address}
                helperText={errorData.helperAddress}
              />

              {/* PROVINCE */}
              <AutoCompleteDropdownCustom
                data={provinceList}
                title={Strings.ModalChooseAddress.PROVINCE}
                placeholder={Strings.ModalChooseAddress.CHOOSE_PROVINCE}
                value={selectedAddress.province}
                onchange={e => handleChooseProvince(e)}
                error={errorData.province}
                helperText={Strings.ModalChooseAddress.CHOOSE_PROVINCE_PLEASE}
                ref={provinceRef}
              />

              {/* DISTRICT */}
              <AutoCompleteDropdownCustom
                data={showDistrict}
                title={Strings.ModalChooseAddress.DISTRICT}
                placeholder={Strings.ModalChooseAddress.CHOOSE_DISTRICT}
                value={selectedAddress.district}
                onchange={e => handleChooseDistrict(e)}
                error={errorData.district}
                helperText={Strings.ModalChooseAddress.CHOOSE_DISTRICT_PLEASE}
                ref={districtRef}
              />

              {/* WARD */}
              <AutoCompleteDropdownCustom
                data={showWard}
                title={Strings.ModalChooseAddress.WARD}
                placeholder={Strings.ModalChooseAddress.CHOOSE_WARD}
                value={selectedAddress.ward}
                onchange={e => handleChooseWard(e)}
                error={errorData.ward}
                helperText={Strings.ModalChooseAddress.CHOOSE_WARD_PLEASE}
                ref={wardRef}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <ButtonCustom
                  onPress={handleClose}
                  bgColor={Constants.Styles.Color.ERROR}
                  textButton={Strings.Common.CANCEL}
                />
                <ButtonCustom
                  onPress={handleSubmit}
                  textButton={Strings.Common.SEARCH}
                />
              </View>
            </View>
          </ScrollView>

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
});

export default ModalChooseAddress;
