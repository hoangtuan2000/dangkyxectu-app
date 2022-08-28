import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  title: {
    color: Constants.styles.colorDark,
  },
  inputContainer: {
    backgroundColor: Constants.styles.colorLight,
  },
  suggestionsListContainer: {
    backgroundColor: Constants.styles.colorLight,
  },
  emptryResult: {
    color: Constants.styles.colorDark,
    alignSelf: 'center',
    padding: 10,
  },
});

const darkStyles = StyleSheet.create({
  title: {
    color: Constants.styles.colorLight,
  },
  inputContainer: {
    backgroundColor: Constants.styles.colorSecondary,
  },
  suggestionsListContainer: {
    backgroundColor: Constants.styles.colorSecondary,
  },
  emptryResult: {
    color: Constants.styles.colorWhite,
    alignSelf: 'center',
    padding: 10,
  },
});

export {lightStyles, darkStyles};
