import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    // flex: 1,
    backgroundColor: Constants.styles.backgroundLight,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    paddingTop: 20,
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Constants.styles.colorSuccess,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    // flex: 1,
    backgroundColor: Constants.styles.backgroundDark,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    paddingTop: 20,
    alignSelf: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Constants.styles.colorSuccess,
  },
});

export {lightStyles, darkStyles};
