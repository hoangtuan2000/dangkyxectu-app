import React from 'react';
import {Modal, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';
import ButtonCustom from '../buttonCustom/ButtonCustom';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ModalConfirmation({
  open,
  handleClose,
  title,
  textButton,
  content,
  handleSubmit,
}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  const handleConfirm = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}>
      <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
        <View style={isDarkMode ? darkStyles.modalView : lightStyles.modalView}>
          <Text style={isDarkMode ? darkStyles.title : lightStyles.title}>
            {title}
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
              bgColor={Constants.Styles.Color.SECONDARY}
              textButton={Strings.Common.CANCEL}
              padding={5}
              iconPosition={'right'}
              icon={
                <MaterialIcons
                  name="close-circle-outline"
                  size={25}
                  color={Constants.Styles.Color.LIGHT}
                />
              }
            />
            <ButtonCustom
              onPress={handleConfirm}
              bgColor={Constants.Styles.Color.WARNING}
              textButton={textButton || Strings.Common.UPDATE}
              padding={5}
              iconPosition={'right'}
              icon={
                <MaterialIcons
                  name="check-circle"
                  size={25}
                  color={Constants.Styles.Color.LIGHT}
                />
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalConfirmation;
