import {StyleSheet} from 'react-native';
import Constants from '../../../constant/Constants';

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Styles.BackgroundColor.LIGHT,
    paddingTop: 5,
    paddingBottom: 5,
  },
  cardContainer: {
    backgroundColor: Constants.Styles.Color.LIGHT,
    margin: 5,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
  },
  carSeatNumber: {
    fontSize: Constants.Styles.FontSize.LARGE,
    color: Constants.Styles.Color.DARK,
    fontWeight: '400',
  },
  text: {
    // fontWeight: 'bold',
    fontSize: Constants.Styles.FontSize.DEFAULT,
    color: Constants.Styles.Color.SECONDARY,
  },
  imageCar: {
    width: 90,
    height: 90,
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
    backgroundColor: Constants.Styles.BackgroundColor.DARK,
    paddingTop: 5,
    paddingBottom: 5,
  },
  cardContainer: {
    backgroundColor: Constants.Styles.Color.SECONDARY,
    margin: 5,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
  },
  carSeatNumber: {
    fontSize: Constants.Styles.FontSize.LARGE,
    color: Constants.Styles.Color.WHITE,
    fontWeight: '400',
  },
  text: {
    // fontWeight: 'bold',
    fontSize: Constants.Styles.FontSize.DEFAULT,
    color: Constants.Styles.Color.WHITE,
  },
  imageCar: {
    width: 90,
    height: 90,
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
