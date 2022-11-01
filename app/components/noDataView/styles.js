import {StyleSheet} from 'react-native';
import Constants from '../../constant/Constants';

const lightStyles = StyleSheet.create({
  textNoData: {
    fontSize: Constants.Styles.FontSize.LARGE,
    color: Constants.Styles.Color.DARK,
  },
});

const darkStyles = StyleSheet.create({
  textNoData: {
    fontSize: Constants.Styles.FontSize.LARGE,
    color: Constants.Styles.Color.WHITE,
  },
});

export {lightStyles, darkStyles};
