import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: 'black',
  },
  textError: {
    fontSize: 15,
    color: Constants.Styles.Color.ERROR,
    fontWeight: 'bold'
  },
});

const darkStyles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: 'white',
  },
  textError: {
    fontSize: 15,
    color: Constants.Styles.Color.WARNING,
    fontWeight: 'bold'
  },
});

export {lightStyles, darkStyles};
