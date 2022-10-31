import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  title: {
    color: Constants.Styles.Color.DARK,
  },
  inputContainer: {
    backgroundColor: Constants.Styles.Color.LIGHT,
  },
  suggestionsListContainer: {
    backgroundColor: Constants.Styles.Color.LIGHT,
  },
  emptryResult: {
    color: Constants.Styles.Color.DARK,
    alignSelf: 'center',
    padding: 10,
  },
});

const darkStyles = StyleSheet.create({
  title: {
    color: Constants.Styles.Color.LIGHT,
  },
  inputContainer: {
    backgroundColor: Constants.Styles.Color.SECONDARY,
  },
  suggestionsListContainer: {
    backgroundColor: Constants.Styles.Color.SECONDARY,
  },
  emptryResult: {
    color: Constants.Styles.Color.WHITE,
    alignSelf: 'center',
    padding: 10,
  },
});

export {lightStyles, darkStyles};
