import React from 'react';
import {Modal, Platform, View} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';
import ButtonCustom from '../buttonCustom/ButtonCustom';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import AutoCompleteDropdownCustom from '../autoCompleteDropdownCustom/AutoCompleteDropdownCustom';

const DATA = [
  {id: '1', title: 'Xe 4 Chổ'},
  {id: '2', title: 'Xe 7 Chổ'},
  {id: '3', title: 'Xe 16 Chổ'},
  {id: '4', title: 'Xe 32 Chổ'},
  {id: '5', title: 'Xe 35 Chổ'},
  {id: '6', title: 'Xe 35 Chổ'},
  {id: '7', title: 'Xe 35 Chổ'},
  {id: '8', title: 'Xe 35 Chổ'},
  {id: '9', title: 'Xe 35 Chổ'},
  {id: '10', title: 'Xe 35 Chổ'},
  {id: '11', title: 'Xe 35 Chổ'},
  {id: '12', title: 'Xe 35 Chổ'},
  {id: '13', title: 'Xe 35 Chổ'},
  {id: '14', title: 'Xe 37 Chổ'},
];

const DATA2 = [
  {id: '1', title: 'Không Có Lịch Trình'},
  {id: '2', title: 'Có Lịch Trình'},
];

function CarFilterModal({showModal, setShowModal}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [selectedItem2, setSelectedItem2] = React.useState(null);

  return (
    <Modal visible={showModal} animationType="slide" transparent={true}>
      <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
        <View style={isDarkMode ? darkStyles.modalView : lightStyles.modalView}>
          
          <AutoCompleteDropdownCustom
            data={DATA}
            title={'Tìm Kiếm Xe Theo Số Ghế'}
            setSelectedItem={setSelectedItem}
            zindex={10}
            placeholder={Strings.CarFilterModal.ENTER_NUMBER_SEAT}
          />

          <AutoCompleteDropdownCustom
            data={DATA2}
            title={'Sắp Xếp Xe Theo Lịch Trình'}
            setSelectedItem={setSelectedItem2}
            zindex={9}
            placeholder={Strings.CarFilterModal.ENTER_SCHEDULE}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              flexDirection: 'row',
            }}>
            <ButtonCustom
              onPress={() => setShowModal()}
              bgColor={Constants.styles.colorError}
              textButton={Strings.Common.CANCEL}
            />
            <ButtonCustom textButton={Strings.Common.SEARCH} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CarFilterModal;
