import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  title: {
    color: Constants.Styles.Color.DARK,
  },
  inputContainer: {
    backgroundColor: Constants.Styles.Color.WHITE,
  },
  suggestionsListContainer: {
    backgroundColor: Constants.Styles.Color.WHITE,
  },
  emptryResult: {
    color: Constants.Styles.Color.DARK,
    alignSelf: 'center',
    padding: 10,
  },
  textError: {
    fontSize: 15,
    color: Constants.Styles.Color.ERROR,
    fontWeight: 'bold'
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
  textError: {
    fontSize: 15,
    color: Constants.Styles.Color.WARNING,
    fontWeight: 'bold'
  },
});

export {lightStyles, darkStyles};
