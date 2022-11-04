import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Constants from '../../constant/Constants';
import {lightStyles, darkStyles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function InputCustom({
  onChangeText,
  iconPosition,
  icon,
  style,
  value,
  placeholder,
  label,
  error,
  helperText,
  width,
  styleLabel,
  onPressIcon,
  ...props
}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const [focused, setFocused] = React.useState(false);

  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    } else {
      return 'row-reverse';
    }
  };

  const getBorderColor = () => {
    if (error) {
      return isDarkMode
        ? Constants.Styles.Color.WARNING
        : Constants.Styles.Color.ERROR;
    }

    if (focused) {
      return isDarkMode ? 'white' : '#8ac8ff';
    } else {
      return isDarkMode ? '#f0ebeb' : 'gray';
    }
  };
  return (
    <View
      style={[
        isDarkMode ? darkStyles.inputContainer : lightStyles.inputContainer,
        {width: width && width},
      ]}>
      {label && (
        <Text
          style={[
            isDarkMode ? darkStyles.label : lightStyles.label,
            styleLabel,
          ]}>
          {label}
        </Text>
      )}

      <View
        style={[
          isDarkMode ? darkStyles.wrapper : lightStyles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {borderColor: getBorderColor(), flexDirection: getFlexDirection()},
        ]}>
        <View>
          {icon && (
            <TouchableOpacity onPress={onPressIcon && onPressIcon}>
              <MaterialIcons
                name={icon}
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
          )}
        </View>

        <TextInput
          style={[
            isDarkMode ? darkStyles.textInput : lightStyles.textInput,
            style,
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={
            error
              ? isDarkMode
                ? Constants.Styles.Color.WARNING
                : Constants.Styles.Color.ERROR
              : isDarkMode
              ? Constants.Styles.Color.LIGHT
              : Constants.Styles.Color.SECONDARY
          }
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>

      {error && helperText && (
        <Text style={isDarkMode ? darkStyles.error : lightStyles.error}>
          {helperText}
        </Text>
      )}
    </View>
  );
}

export default InputCustom;
