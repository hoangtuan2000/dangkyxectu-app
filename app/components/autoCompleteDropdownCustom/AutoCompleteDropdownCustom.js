import React from 'react';
import {Dimensions, Platform, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import {lightStyles, darkStyles} from './styles';

// function AutoCompleteDropdownCustom({
//   data,
//   value,
//   onchange = () => {},
//   title,
//   style,
//   marginBottom,
//   fontSizeTitle,
//   placeholder,
//   zindex,
// }) {

const AutoCompleteDropdownCustom = React.forwardRef((props, ref) => {
  const {
    data,
    value,
    onchange = () => {},
    title,
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
        inputContainerStyle={
          isDarkMode ? darkStyles.inputContainer : lightStyles.inputContainer
        }
        textInputProps={{
          placeholder: placeholder && placeholder,
          placeholderTextColor: isDarkMode
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
              isDarkMode
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
    </View>
  );
});

export default AutoCompleteDropdownCustom;
