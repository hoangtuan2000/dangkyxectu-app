import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  label: {
    color: Constants.Styles.Color.DARK,
  },
  container: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Constants.Styles.Color.SECONDARY,
    backgroundColor: Constants.Styles.Color.WHITE,
  },
  viewContainer: {
    borderWidth: 1,
    borderColor: Constants.Styles.Color.SECONDARY,
    backgroundColor: Constants.Styles.Color.WHITE,
  },
});

const darkStyles = StyleSheet.create({
  label: {
    color: Constants.Styles.Color.LIGHT,
  },
  container: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Constants.Styles.Color.WHITE,
    backgroundColor: Constants.Styles.Color.SECONDARY,
  },
  viewContainer: {
    borderWidth: 1,
    borderColor: Constants.Styles.Color.WHITE,
    backgroundColor: Constants.Styles.Color.SECONDARY,
  },
});

export {lightStyles, darkStyles};
