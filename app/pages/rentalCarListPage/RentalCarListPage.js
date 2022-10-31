import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';
import ButtonCustom from '../../components/buttonCustom/ButtonCustom';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import {darkStyles, lightStyles} from './RentalCarListPageStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CarFilterModal from '../../components/carFilterModal/CarFilterModal';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d725',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d726',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d727',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d728',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d729',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e297d72',
    title: 'Third Item',
  },
];

function RentalCarListPage() {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
      <FlatList
        data={DATA}
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={
                isDarkMode
                  ? darkStyles.cardContainer
                  : lightStyles.cardContainer
              }>
              <View>
                <Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5IjpmFd7DlEVpCidRbFGh5F6vxlYKqmdGIg&usqp=CAU',
                  }}
                  style={
                    isDarkMode ? darkStyles.imageCar : lightStyles.imageCar
                  }
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.carSeatNumber
                      : lightStyles.carSeatNumber
                  }>
                  Xe 32 Chỗ
                </Text>
                <Text style={isDarkMode ? darkStyles.text : lightStyles.text}>
                  {Strings.RentalCarList.CAR_BRAND} Huyndai
                </Text>
                <Text style={isDarkMode ? darkStyles.text : lightStyles.text}>
                  {Strings.RentalCarList.LICENSE_PLATES} 65A-12345
                </Text>
                <Text style={isDarkMode ? darkStyles.text : lightStyles.text}>
                  {Strings.RentalCarList.VEHICLE_CONDITION} Hoạt Động
                </Text>
                <Text style={isDarkMode ? darkStyles.text : lightStyles.text}>
                  {Strings.RentalCarList.SCHEDULE}
                  <Text
                    style={{
                      color: 'blue',
                      fontSize: Constants.Styles.fontSizeLarge,
                    }}>
                    3
                  </Text>
                </Text>
                <ButtonCustom
                  onPress={() => console.log('ok')}
                  textButton={'Đăng Ký Xe'}
                  widthButton={120}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={isDarkMode ? darkStyles.filterButton : lightStyles.filterButton}>
        <MaterialIcons name="filter-outline" size={26} color={'white'} />
      </TouchableOpacity>

      <CarFilterModal
        showModal={modalVisible}
        setShowModal={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
}

export default RentalCarListPage;
