import React from 'react';
import {Text, View, Button, Image} from 'react-native';
import {useSelector} from 'react-redux';
import RoutesPath from '../../constant/RoutesPath';
import Strings from '../../constant/Strings';
import {darkStyles, lightStyles} from './styles';
import DateRangePickerCustom from '../../components/dateRangePickerCustom/DateRangePickerCustom';
import InputCustom from '../../components/inputCustom/InputCustom';
import ModalChooseAddress from '../../components/modalChooseAddress/ModalChooseAddress';

function ScheduleRegistration({route, navigation}) {
  const {idCar} = route.params;
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  const modalRef = React.useRef()

  console.log('idCar', idCar);

  return (
    <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
      {/* TITLE */}
      <Text style={isDarkMode ? darkStyles.title : lightStyles.title}>
        {Strings.ScheduleRegistration.TITLE}
      </Text>

      {/* IMAGE */}
      <Image
        source={{
          uri: `https://firebasestorage.googleapis.com/v0/b/hethongdangkyxectu-ff0cb.appspot.com/o/imagesCar%2Fhonda_xe_ban_tai_4_cho.jfif?alt=media&token=faa22305-7ea3-4c2b-a5ff-13763bc1da78`,
        }}
        style={isDarkMode ? darkStyles.imageCar : lightStyles.imageCar}
      />

      <View style={{marginLeft: 10, marginRight: 10}}>
        {/* CAR TYPE */}
        <Text>XE CON 4 CHỔ</Text>

        {/* LICENSE PLATES */}
        <Text>BIỂN SỐ XE: 65A-123456</Text>

        {/* CAR STATUS */}
        <Text>TÌNH TRẠNG: HOẠT ĐỘNG</Text>

        {/* CAR COLOR */}
        <Text>MÀU SẮC: HOẠT ĐỘNG</Text>

        {/* CAR BRAND */}
        <Text>THƯƠNG HIỆU: HOẠT ĐỘNG</Text>
      </View>

      <View style={{padding: 10}}>
        <DateRangePickerCustom />
        <InputCustom />
      </View>

      <Button title='button test' onPress={() =>  modalRef.current.handleResetAddress()} />

      <ModalChooseAddress open={true} title={'Điểm Đến'} ref={modalRef}  />
    </View>
  );
}

export default ScheduleRegistration;
