import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: Constants.Styles.BackgroundColor.LIGHT,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    paddingTop: 20,
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: Constants.Styles.BackgroundColor.DARK,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    paddingTop: 20,
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export {lightStyles, darkStyles};
