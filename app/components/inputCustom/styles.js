import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: 'black',
  },

  wrapper: {
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginTop: 5,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  inputContainer: {
    paddingVertical: 5,
  },

  textInput: {
    flex: 1,
    width: '100%',
    color: Constants.Styles.Color.DARK,
  },

  error: {
    color: Constants.Styles.Color.ERROR,
    paddingTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const darkStyles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: 'white',
  },

  wrapper: {
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginTop: 5,
    borderRadius: 8,
    backgroundColor: 'gray',
  },

  inputContainer: {
    paddingVertical: 5,
  },

  textInput: {
    flex: 1,
    width: '100%',
    color: Constants.Styles.Color.WHITE,
  },

  error: {
    color: Constants.Styles.Color.ERROR,
    paddingTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export {lightStyles, darkStyles};
