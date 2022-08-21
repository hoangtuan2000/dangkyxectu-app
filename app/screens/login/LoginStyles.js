import {StyleSheet} from 'react-native';

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: 130,
    height: 130,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#16b6f5',
    padding: 10,
    width: 300,
    borderRadius: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    width: 130,
    height: 130,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#dadde3',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#16b6f5',
    padding: 10,
    width: 300,
    borderRadius: 10,
  },
  textButton: {
    color: '#dadde3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textFail: {
    color: 'red',
  },
});

export {lightStyles, darkStyles};
