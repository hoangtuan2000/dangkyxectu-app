import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.styles.backgroundLight,
    paddingTop: 5,
    paddingBottom: 5,
  },
  cardContainer: {
    backgroundColor: Constants.styles.colorLight,
    margin: 5,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
  },
  carSeatNumber: {
    fontSize: Constants.styles.fontSizeLarge,
    color: Constants.styles.colorDark,
    fontWeight: '400',
  },
  text: {
    fontSize: Constants.styles.fontSizeDefault,
    color: Constants.styles.colorSecondary,
  },
  imageCar: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  filterButton: {
    backgroundColor: 'green',
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.styles.backgroundDark,
    paddingTop: 5,
    paddingBottom: 5,
  },
  cardContainer: {
    backgroundColor: Constants.styles.colorSecondary,
    margin: 5,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
  },
  carSeatNumber: {
    fontSize: Constants.styles.fontSizeLarge,
    color: Constants.styles.colorWhite,
    fontWeight: '400',
  },
  text: {
    fontSize: Constants.styles.fontSizeDefault,
    color: Constants.styles.colorWhite,
  },
  imageCar: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  filterButton: {
    backgroundColor: 'green',
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {lightStyles, darkStyles};
