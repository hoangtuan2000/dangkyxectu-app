import React from 'react';
import {Modal, ScrollView, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';
import ButtonCustom from '../buttonCustom/ButtonCustom';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import MultiSelectBox from '../multiSelectBox/MultiSelectBox';
import RadioGroup from '../radioGroup/RadioGroup';
import InputCustom from '../inputCustom/InputCustom';
import ModalError from '../modalError/ModalError';
import BackDrop from '../backDrop/BackDrop';
import {GlobalServices} from '../../services/GlobalServices';
import AutoCompleteDropdownCustom from '../autoCompleteDropdownCustom/AutoCompleteDropdownCustom';

const ModalChooseAddress = React.forwardRef((props, ref) => {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const {
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

  const districtRef = React.useRef();
  const wardRef = React.useRef();

  const [modalError, setModalError] = React.useState({
    open: false,
    title: null,
    content: null,
  });
  const [backDrop, setBackDrop] = React.useState(false);

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

  const handleChooseProvince = async value => {
    // call clear value autocomplte district and ward
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

  React.useImperativeHandle(ref, () => ({
    handleResetAddress() {
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
                {title}
              </Text>

              {/* LICENSE PLATES */}
              <InputCustom
                label={Strings.ModalChooseAddress.ADDRESS}
                styleLabel={{fontSize: Constants.Styles.FontSize.LARGE}}
                placeholder={Strings.ModalChooseAddress.ENTER_ADDRESS}
                style={{fontSize: 16}}
                // onChangeText={e => handleChangeLicensePlates(e)}
                // value={dataSendApi.licensePlates}
              />

              {/* PROVINCE */}
              <AutoCompleteDropdownCustom
                data={provinceList}
                title={Strings.ModalChooseAddress.PROVINCE}
                placeholder={Strings.ModalChooseAddress.CHOOSE_PROVINCE}
                value={selectedAddress.province}
                onchange={e => handleChooseProvince(e)}
              />

              {/* DISTRICT */}
              <AutoCompleteDropdownCustom
                data={showDistrict}
                title={Strings.ModalChooseAddress.DISTRICT}
                placeholder={Strings.ModalChooseAddress.CHOOSE_DISTRICT}
                value={selectedAddress.district}
                onchange={e => handleChooseDistrict(e)}
                ref={districtRef}
              />

              {/* WARD */}
              <AutoCompleteDropdownCustom
                data={showWard}
                title={Strings.ModalChooseAddress.WARD}
                placeholder={Strings.ModalChooseAddress.CHOOSE_WARD}
                value={selectedAddress.ward}
                onchange={e => handleChooseWard(e)}
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
                  // onPress={handleRefreshFilter}
                  textButton={Strings.Common.REFRESH}
                  bgColor={Constants.Styles.Color.WARNING}
                />
                <ButtonCustom
                  // onPress={handleSubmit}
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
