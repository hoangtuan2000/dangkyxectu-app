import React from 'react';
import {Modal, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';
import ButtonCustom from '../buttonCustom/ButtonCustom';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function NoDataView() {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={isDarkMode ? darkStyles.textNoData : lightStyles.textNoData}>
        {Strings.Common.NO_DATA}
      </Text>
    </View>
  );
}

export default NoDataView;
