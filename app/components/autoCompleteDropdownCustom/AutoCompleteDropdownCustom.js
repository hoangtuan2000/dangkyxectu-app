import React from 'react';
import {Text, View} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';

function AutoCompleteDropdownCustom({
  data,
  setSelectedItem,
  title,
  style,
  marginBottom,
}) {
  return (
    <View
      style={[
        style,
        {
          marginBottom: marginBottom ? marginBottom : 10,
        },
      ]}>
      {title && (
        <Text style={{fontSize: Constants.styles.fontSizeLarge}}>{title}</Text>
      )}

      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        emptyResultText={Strings.Common.NO_DATA}
        // initialValue={{id: '2'}}
        onSelectItem={setSelectedItem}
        dataSet={data}
      />
    </View>
  );
}

export default AutoCompleteDropdownCustom;
