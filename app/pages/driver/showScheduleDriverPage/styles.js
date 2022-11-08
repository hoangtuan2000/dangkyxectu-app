import {StyleSheet} from 'react-native';
import Constants from '../../../constant/Constants';
import {Dimensions} from 'react-native';

const win = Dimensions.get('window');
const widthImage = win.width - (win.width * 5) / 100; //95%
const heightImage = (widthImage * 65) / 100;

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Styles.BackgroundColor.LIGHT,
    // paddingTop: 5,
    // paddingBottom: 5,
  },
  title: {
    fontSize: Constants.Styles.FontSize.LARGE,
    alignSelf: 'center',
    marginTop: 5,
    color: Constants.Styles.Color.PRIMARY,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageCar: {
    width: widthImage,
    height: heightImage,
    resizeMode: 'cover',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  textCarType: {
    fontSize: Constants.Styles.FontSize.TOO_BIG,
    fontWeight: 'bold',
    color: Constants.Styles.Color.DARK
  },
  textContent: {
    flex: 1,
    marginBottom: 3,
    fontSize: 16,
    color: Constants.Styles.Color.DARK,
  },
  textStatus: {
    marginBottom: 3,
    fontSize: 16,
    color: Constants.Styles.Color.DARK,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Styles.BackgroundColor.DARK,
    // paddingTop: 5,
    // paddingBottom: 5,
  },
  title: {
    fontSize: Constants.Styles.FontSize.LARGE,
    alignSelf: 'center',
    marginTop: 5,
    color: Constants.Styles.Color.PRIMARY,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageCar: {
    width: widthImage,
    height: heightImage,
    resizeMode: 'cover',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  textCarType: {
    fontSize: Constants.Styles.FontSize.TOO_BIG,
    fontWeight: 'bold',
    color: Constants.Styles.Color.WHITE
  },
  textContent: {
    flex: 1,
    marginBottom: 3,
    fontSize: 16,
    color: Constants.Styles.Color.WHITE,
  },
  textStatus: {
    marginBottom: 3,
    fontSize: 16,
    color: Constants.Styles.Color.WHITE,
  },
});

export {lightStyles, darkStyles};
