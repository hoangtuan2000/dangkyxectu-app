import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Constants.styles.backgroundLight,
  },
  modalView: {
    padding: 10,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Constants.styles.backgroundDark,
  },
  modalView: {
    padding: 10,
  },
});

export {lightStyles, darkStyles};
