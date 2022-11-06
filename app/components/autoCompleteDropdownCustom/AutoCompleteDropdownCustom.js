import React from 'react';
import {Dimensions, Platform, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import {lightStyles, darkStyles} from './styles';
import {useFocusEffect} from '@react-navigation/native';

const AutoCompleteDropdownCustom = React.forwardRef((props, ref) => {
  const {
    data,
    value,
    onchange = () => {},
    title,
    error,
    helperText,
    style,
    marginBottom,
    fontSizeTitle,
    placeholder,
    zindex,
  } = props;

  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  return (
    <View
      style={[
        style,
        Platform.select({ios: {zIndex: zindex}}),
        {
          marginBottom: marginBottom ? marginBottom : 10,
        },
      ]}>
      {title && (
        <Text
          style={[
            isDarkMode ? darkStyles.title : lightStyles.title,
            {
              fontSize: fontSizeTitle
                ? fontSizeTitle
                : Constants.Styles.FontSize.LARGE,
            },
          ]}>
          {title}
        </Text>
      )}

      <AutocompleteDropdown
        ref={ref} // use call clear value,
        clearOnFocus={false}
        closeOnBlur={false}
        onSelectItem={val => onchange(val)}
        initialValue={value || ''}
        dataSet={data}
        inputContainerStyle={[
          isDarkMode ? darkStyles.inputContainer : lightStyles.inputContainer,
          {
            borderWidth: 1,
            borderColor: error
              ? isDarkMode
                ? Constants.Styles.Color.WARNING
                : Constants.Styles.Color.ERROR
              : isDarkMode
              ? Constants.Styles.Color.WHITE
              : Constants.Styles.Color.SECONDARY,
          },
        ]}
        textInputProps={{
          placeholder: placeholder && placeholder,
          placeholderTextColor: error
            ? isDarkMode
              ? Constants.Styles.Color.WARNING
              : Constants.Styles.Color.ERROR
            : isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.SECONDARY,
          style: {
            color: isDarkMode
              ? Constants.Styles.Color.WHITE
              : Constants.Styles.Color.DARK,
          },
        }}
        suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
        ChevronIconComponent={
          <Feather
            name="chevron-down"
            size={24}
            color={
              error
                ? isDarkMode
                  ? Constants.Styles.Color.WARNING
                  : Constants.Styles.Color.ERROR
                : isDarkMode
                ? Constants.Styles.Color.WHITE
                : Constants.Styles.Color.DARK
            }
          />
        }
        ClearIconComponent={
          <Feather
            name="x-circle"
            size={22}
            color={
              isDarkMode
                ? Constants.Styles.Color.WHITE
                : Constants.Styles.Color.ERROR
            }
          />
        }
        suggestionsListContainerStyle={{
          ...(isDarkMode
            ? darkStyles.suggestionsListContainer
            : lightStyles.suggestionsListContainer),
          elevation: zindex,
          borderWidth: 1,
          borderColor: isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.SECONDARY,
        }}
        suggestionsListTextStyle={{
          color: isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK,
        }}
        EmptyResultComponent={
          <Text
            style={
              isDarkMode ? darkStyles.emptryResult : lightStyles.emptryResult
            }>
            {Strings.Common.NO_DATA}
          </Text>
        }
      />

      {helperText && error && (
        <Text
          style={[isDarkMode ? darkStyles.textError : lightStyles.textError]}>
          {helperText}
        </Text>
      )}
    </View>
  );
});

export default AutoCompleteDropdownCustom;
