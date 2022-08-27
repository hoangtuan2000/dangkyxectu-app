import {StyleSheet} from 'react-native';

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: 140,
    height: 140,
    alignSelf: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center'
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: 140,
    height: 140,
    alignSelf: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#dadde3',
    alignSelf: 'center'
  },
});

export {lightStyles, darkStyles};
