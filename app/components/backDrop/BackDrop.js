import React from 'react';
import {Modal, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';
import ButtonCustom from '../buttonCustom/ButtonCustom';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator} from 'react-native-paper';

function BackDrop({open}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  return (
    <Modal visible={open} animationType="slide" transparent={true}>
      <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
        <View style={isDarkMode ? darkStyles.modalView : lightStyles.modalView}>
          <ActivityIndicator
            size={'large'}
            color={Constants.Styles.Color.PRIMARY}
          />
        </View>
      </View>
    </Modal>
  );
}

export default BackDrop;
