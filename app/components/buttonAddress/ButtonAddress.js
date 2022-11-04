import React from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';
import Constants from '../../constant/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';

const ButtonAddress = ({
  address,
  placeholder,
  label,
  styleLabel,
  onPress,
  error,
  helperText,
  styleHelperText
}) => {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  const [widthParent, setWidthParent] = React.useState('90%');

  const handleOnPress = () => {
    onPress();
  };

  return (
    <View style={{width: '100%', marginTop: 10}}>
      {label && (
        <Text
          style={[
            isDarkMode ? darkStyles.label : lightStyles.label,
            styleLabel,
          ]}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={handleOnPress}
        onLayout={event => {
          var {x, y, width, height} = event.nativeEvent.layout;
          setWidthParent(width - 60);
        }}
        style={{
          backgroundColor: isDarkMode
            ? Constants.Styles.Color.SECONDARY
            : Constants.Styles.Color.WHITE,
          borderColor: error
            ? isDarkMode
              ? Constants.Styles.Color.WARNING
              : Constants.Styles.Color.ERROR
            : isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.SECONDARY,
          borderWidth: 1,
          padding: 7,
          borderRadius: 8,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 3,
        }}>
        <View style={{width: widthParent}}>
          {address && (
            <Text
              style={{
                color: isDarkMode
                  ? Constants.Styles.Color.WHITE
                  : Constants.Styles.Color.DARK,
                fontSize: 17,
              }}>
              {address}
            </Text>
          )}

          {!address && (
            <Text
              style={{
                color: error
                  ? isDarkMode
                    ? Constants.Styles.Color.WARNING
                    : Constants.Styles.Color.ERROR
                  : isDarkMode
                  ? Constants.Styles.Color.WHITE
                  : Constants.Styles.Color.SECONDARY,
                fontSize: 17,
              }}>
              {placeholder}
            </Text>
          )}
        </View>

        <MaterialIcons
          name="map-marker"
          size={26}
          color={
            error
              ? isDarkMode
                ? Constants.Styles.Color.WARNING
                : Constants.Styles.Color.ERROR
              : isDarkMode
              ? Constants.Styles.Color.WHITE
              : Constants.Styles.Color.PRIMARY
          }
        />
      </TouchableOpacity>

      {helperText && error && (
        <Text
          style={[
            isDarkMode ? darkStyles.textError : lightStyles.textError,
            styleHelperText,
          ]}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

export default ButtonAddress;
