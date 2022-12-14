import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Styles.BackgroundColor.LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10
  }
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Styles.BackgroundColor.DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10
  }
});

export {lightStyles, darkStyles};
