import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Styles.BackgroundColor.LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: 140,
    height: 140,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    alignSelf: 'center',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Styles.BackgroundColor.DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: 140,
    height: 140,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#dadde3',
    alignSelf: 'center',
  },
});

export {lightStyles, darkStyles};
