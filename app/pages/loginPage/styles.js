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
  viewError: {
    backgroundColor: Constants.Styles.Color.ERROR,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
  viewError: {
    backgroundColor: Constants.Styles.Color.ERROR,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export {lightStyles, darkStyles};
