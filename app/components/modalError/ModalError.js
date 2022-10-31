import React from 'react';
import {Modal, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';
import ButtonCustom from '../buttonCustom/ButtonCustom';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ModalError({open, handleClose, title, content}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  return (
    <Modal visible={open} animationType="slide" transparent={true} onRequestClose={handleClose}>
      <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
        <View style={isDarkMode ? darkStyles.modalView : lightStyles.modalView}>
          <Text style={isDarkMode ? darkStyles.title : lightStyles.title}>
            {title || Strings.Common.ERROR}
          </Text>
          <Text style={isDarkMode ? darkStyles.content : lightStyles.content}>
            {content || ''}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 20,
            }}>
            <ButtonCustom
              onPress={handleClose}
              bgColor={Constants.Styles.colorError}
              textButton={Strings.Common.CLOSE}
              padding={5}
              iconPosition={'right'}
              icon={
                <MaterialIcons
                  name="close-circle-outline"
                  size={25}
                  color={Constants.Styles.colorLight}
                />
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalError;
