import React from 'react';
import {Text, View, useColorScheme, TouchableOpacity} from 'react-native';
import {lightStyles, darkStyles} from './AccountPageStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonCustom from '../../components/buttonCustom/ButtonCustom';

function AccountPage() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
      <Text>B1809315</Text>
      <ButtonCustom
        icon={<MaterialIcons name={'home'} color={'white'} size={20} />}
        iconPosition='left'
        textButton={"đăng xuất"}
        onPress={(e) => console.log(e.target)}
      />
    </View>
  );
}

export default AccountPage;
