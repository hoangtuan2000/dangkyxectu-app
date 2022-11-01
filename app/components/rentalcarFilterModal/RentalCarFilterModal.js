import React from 'react';
import {Modal, Platform, ScrollView, View} from 'react-native';
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

function RentalCarFilterModal({open, handleClose}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [selectedItem2, setSelectedItem2] = React.useState(null);

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}>
      <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
        <View style={isDarkMode ? darkStyles.modalView : lightStyles.modalView}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <AutoCompleteDropdownCustom
              data={DATA}
              title={'Tìm Kiếm Xe Theo Số Ghế'}
              setSelectedItem={setSelectedItem}
              zindex={10}
              placeholder={Strings.RentalCarFilterModal.ENTER_NUMBER_SEAT}
            />

            <AutoCompleteDropdownCustom
              data={DATA2}
              title={'Sắp Xếp Xe Theo Lịch Trình'}
              setSelectedItem={setSelectedItem2}
              zindex={9}
              placeholder={Strings.RentalCarFilterModal.ENTER_SCHEDULE}
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
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default RentalCarFilterModal;
