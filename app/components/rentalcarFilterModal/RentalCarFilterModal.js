import React from 'react';
import {
  Modal,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';
import ButtonCustom from '../buttonCustom/ButtonCustom';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import AutoCompleteDropdownCustom from '../autoCompleteDropdownCustom/AutoCompleteDropdownCustom';
import MultiSelectBox from '../multiSelectBox/MultiSelectBox';
import {RadioButton} from 'react-native-paper';
import RadioGroup from '../radioGroup/RadioGroup';
import InputCustom from '../inputCustom/InputCustom';
import ModalError from '../modalError/ModalError';
import BackDrop from '../backDrop/BackDrop';
import {GlobalServices} from '../../services/GlobalServices';

function RentalCarFilterModal({open, handleClose}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const [modalError, setModalError] = React.useState({
    open: false,
    title: null,
    content: null,
  });
  const [backDrop, setBackDrop] = React.useState(false);

  const [dataSendApi, setDataSendApi] = React.useState({
    // carType: defaultCarType ? [...defaultCarType] : [],
    // carBrand: defaultCarBrand ? [...defaultCarBrand] : [],
    // licensePlates: defaultLicensePlates || null,
    // haveTrip: defaultHaveTrip || null,
  });

  const [carTypeList, setCarTypeList] = React.useState([]);
  const [carBrandList, setCarBrandList] = React.useState([]);

  const [selectedItem, setSelectedItem] = React.useState(null);
  const [selectedItem2, setSelectedItem2] = React.useState(null);
  const [selectedTeams, setSelectedTeams] = React.useState([]);
  const [value, setValue] = React.useState('first');

  const getCommon = async () => {
    const res = await GlobalServices.getCommon({
      group: 'car_type, car_brand',
    });
    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        setCarTypeList(
          res.data.data.car_type.map(val => {
            return {
              item: `${val.name} ${val.seatNumber} Chổ`,
              id: val.idCarType,
            };
          }),
        );
        setCarBrandList(
          res.data.data.car_brand.map(val => {
            return {
              item: val.name,
              id: val.idCarBrand,
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
                {Strings.RentalCarFilterModal.TITLE}
              </Text>

              <RadioGroup
                title={Strings.RentalCarFilterModal.HAVE_SCHEDULE}
                checkDefault={1}
                onCheck={e => console.log('e', e)}
                items={[
                  {
                    value: true,
                    label: 'Có',
                  },
                  {
                    value: false,
                    label: 'Không',
                  },
                ]}
              />

              <InputCustom
                label={Strings.RentalCarFilterModal.LICENSE_PLATES}
                styleLabel={{fontSize: Constants.Styles.FontSize.LARGE}}
                placeholder={Strings.RentalCarFilterModal.ENTER_LICENSE_PLATES}
                style={{fontSize: 16}}
                // onChangeText={e => handleChangeCode(e)}
                // value={dataSendApi.code}
              />

              <MultiSelectBox
                data={carBrandList}
                label={Strings.RentalCarFilterModal.BRAND}
                inputPlaceholder={Strings.RentalCarFilterModal.CHOOSE_BRAND}
                onMultiChange={value =>
                  console.log('RentalCarFilterModal', value)
                }
              />

              <MultiSelectBox
                data={carTypeList}
                label={Strings.RentalCarFilterModal.CAR_TYPE}
                inputPlaceholder={Strings.RentalCarFilterModal.CHOOSE_CAR_TYPE}
                onMultiChange={value =>
                  console.log('RentalCarFilterModal', value)
                }
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
                <ButtonCustom textButton={Strings.Common.SEARCH} />
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
}

export default RentalCarFilterModal;
