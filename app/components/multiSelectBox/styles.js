import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  label: {
    color: Constants.Styles.Color.DARK,
  },
  container: {
    backgroundColor: Constants.Styles.Color.LIGHT,
  },
});

const darkStyles = StyleSheet.create({
  label: {
    color: Constants.Styles.Color.LIGHT,
  },
  container: {
    backgroundColor: Constants.Styles.Color.SECONDARY,
  },
});

export {lightStyles, darkStyles};
