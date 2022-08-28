import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import {lightStyles, darkStyles} from './styles';

function AutoCompleteDropdownCustom({
  data,
  setSelectedItem,
  title,
  style,
  marginBottom,
  zIndex,
  fontSizeTitle,
}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  return (
    <View
      style={[
        style,
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
                : Constants.styles.fontSizeLarge,
            },
          ]}>
          {title}
        </Text>
      )}

      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        // initialValue={{id: '2'}}
        onSelectItem={setSelectedItem}
        dataSet={data}
        inputContainerStyle={
          isDarkMode ? darkStyles.inputContainer : lightStyles.inputContainer
        }
        textInputProps={isDarkMode ? darkStyles.input : lightStyles.input}
        suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
        ChevronIconComponent={
          <Feather
            name="chevron-down"
            size={20}
            color={
              isDarkMode
                ? Constants.styles.colorWhite
                : Constants.styles.colorDark
            }
          />
        }
        ClearIconComponent={
          <Feather
            name="x-circle"
            size={18}
            color={
              isDarkMode
                ? Constants.styles.colorWhite
                : Constants.styles.colorDark
            }
          />
        }
        suggestionsListContainerStyle={
          isDarkMode
            ? darkStyles.suggestionsListContainer
            : lightStyles.suggestionsListContainer
        }
        suggestionsListTextStyle={{
          color: isDarkMode
            ? Constants.styles.colorWhite
            : Constants.styles.colorDark,
        }}
        EmptyResultComponent={() => {
          return (
            <Text
              style={
                isDarkMode ? darkStyles.emptryResult : lightStyles.emptryResult
              }>
              {Strings.Common.NO_DATA}
            </Text>
          );
        }}
      />
    </View>
  );
}

export default AutoCompleteDropdownCustom;
