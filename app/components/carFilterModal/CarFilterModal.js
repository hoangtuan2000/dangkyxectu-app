import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';

function CarFilterModal({showModal, setShowModal}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  return (
    <Modal
      visible={showModal}
      animationType="slide"
      presentationStyle="fullScreen">
      <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
        <View style={isDarkMode ? darkStyles.modalView : lightStyles.modalView}>
          <Pressable onPress={() => setShowModal()}>
            <Text>fgdf</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default CarFilterModal;
