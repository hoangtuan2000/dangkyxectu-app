import React from 'react';
import {Modal, ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';
import ButtonCustom from '../buttonCustom/ButtonCustom';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import AutoCompleteDropdownCustom from '../autoCompleteDropdownCustom/AutoCompleteDropdownCustom';
import MultiSelectBox from '../multiSelectBox/MultiSelectBox';
import {RadioButton} from 'react-native-paper';
import RadioGroup from '../radioGroup/RadioGroup';

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

const K_OPTIONS = [
  {
    item: 'Juventus',
    id: 'JUVE',
  },
  {
    item: 'Real Madrid',
    id: 'RM',
  },
  {
    item: 'Barcelona',
    id: 'BR',
  },
  {
    item: 'PSG',
    id: 'PSG',
  },
  {
    item: 'FC Bayern Munich',
    id: 'FBM',
  },
  {
    item: 'Manchester United FC',
    id: 'MUN',
  },
  {
    item: 'Manchester City FC',
    id: 'MCI',
  },
  {
    item: 'Everton FC',
    id: 'EVE',
  },
  {
    item: 'Tottenham Hotspur FC',
    id: 'TOT',
  },
  {
    item: 'Chelsea FC',
    id: 'CHE',
  },
  {
    item: 'Liverpool FC',
    id: 'LIV',
  },
  {
    item: 'Arsenal FC',
    id: 'ARS',
  },

  {
    item: 'Leicester City FC',
    id: 'LEI',
  },
];

function RentalCarFilterModal({open, handleClose}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  const [selectedItem, setSelectedItem] = React.useState(null);
  const [selectedItem2, setSelectedItem2] = React.useState(null);
  const [selectedTeams, setSelectedTeams] = React.useState([]);
  const [value, setValue] = React.useState('first');

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

            {/* <View>
              <Text
                style={{
                  fontSize: Constants.Styles.FontSize.LARGE,
                  color: isDarkMode
                    ? Constants.Styles.Color.WHITE
                    : Constants.Styles.Color.DARK,
                }}>
                Có Lịch Trình
              </Text>
              <RadioButton.Group
                onValueChange={newValue => setValue(newValue)}
                value={value}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => setValue('first')}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 5,
                    }}>
                    <RadioButton value="first" />
                    <Text
                      style={{
                        fontSize: 17,
                        color: isDarkMode
                          ? Constants.Styles.Color.WHITE
                          : Constants.Styles.Color.DARK,
                      }}>
                      First
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setValue('second')}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 5,
                    }}>
                    <RadioButton value="second" />
                    <Text
                      style={{
                        fontSize: 17,
                        color: isDarkMode
                          ? Constants.Styles.Color.WHITE
                          : Constants.Styles.Color.DARK,
                      }}>
                      Second
                    </Text>
                  </TouchableOpacity>
                </View>
              </RadioButton.Group>
            </View> */}

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

            <MultiSelectBox
              data={K_OPTIONS}
              label="Sắp Xếp Xe Theo Lịch Trình"
              inputPlaceholder={'test placeholder'}
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
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default RentalCarFilterModal;
