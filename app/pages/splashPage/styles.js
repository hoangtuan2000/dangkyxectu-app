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
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    marginTop: 10,
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 25,
    color: Constants.Styles.Color.DARK,
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
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    marginTop: 10,
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 25,
    color: Constants.Styles.Color.WHITE,
    alignSelf: 'center',
  },
});

export {lightStyles, darkStyles};
