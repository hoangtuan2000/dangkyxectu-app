import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import Constants from '../../constant/Constants';
import {lightStyles, darkStyles} from './styles';

function InputCustom({
  onChangeText,
  iconPosition,
  icon,
  style,
  value,
  placeholder,
  label,
  error,
  width,
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
    }
  };

  const getBorderColor = () => {
    if (error) {
      return 'red';
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
        <Text style={isDarkMode ? darkStyles.label : lightStyles.label}>
          {label}
        </Text>
      )}

      <View
        style={[
          isDarkMode ? darkStyles.wrapper : lightStyles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {borderColor: getBorderColor(), flexDirection: getFlexDirection()},
        ]}>
        <View>{icon && icon}</View>

        <TextInput
          style={[
            isDarkMode ? darkStyles.textInput : lightStyles.textInput,
            style,
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={isDarkMode ? Constants.Styles.colorLight : Constants.Styles.colorSecondary}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>

      {error && (
        <Text style={isDarkMode ? darkStyles.error : lightStyles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

export default InputCustom;
