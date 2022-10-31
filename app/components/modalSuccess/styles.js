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
    backgroundColor: Constants.Styles.BackgroundColor.LIGHT,
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
    color: Constants.Styles.Color.SUCCESS,
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
    backgroundColor: Constants.Styles.BackgroundColor.DARK,
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
    color: Constants.Styles.Color.SUCCESS,
  },
});

export {lightStyles, darkStyles};
