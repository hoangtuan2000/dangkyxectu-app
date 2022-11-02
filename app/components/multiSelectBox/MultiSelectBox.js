import React from 'react';
import {Text, View} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import Strings from '../../constant/Strings';
import Constants from '../../constant/Constants';
import {useSelector} from 'react-redux';
import {lightStyles, darkStyles} from './styles';

function MultiSelectBox({
  data,
  label,
  inputPlaceholder,
  listEmptyText,
  fontSizeLabel,
  onMultiChange = () => {},
}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const [selectedTeams, setSelectedTeams] = React.useState([]);

  const onChange = item => {
    setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
    onMultiChange(xorBy(selectedTeams, [item], 'id'));
  };

  return (
    <View>
      <SelectBox
        label={label}
        inputPlaceholder={inputPlaceholder}
        listEmptyText={listEmptyText || Strings.Common.NO_DATA}
        options={data}
        selectedValues={selectedTeams}
        onMultiSelect={item => onChange(item)}
        onTapClose={item => onChange(item)}
        isMulti
        arrowIconColor={
          isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK
        }
        searchIconColor={
          isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK
        }
        toggleIconColor={
          isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK
        }
        labelStyle={{
          ...(isDarkMode ? darkStyles.label : lightStyles.label),
          fontSize: fontSizeLabel
            ? fontSizeLabel
            : Constants.Styles.FontSize.LARGE,
        }}
        containerStyle={{
          ...(isDarkMode ? darkStyles.container : lightStyles.container),
          paddingLeft: 10,
          paddingTop: 10,
          borderRadius: 5,
        }}
        inputFilterContainerStyle={{
          ...(isDarkMode ? darkStyles.container : lightStyles.container),
          paddingLeft: 10,
          color: isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK,
        }}
        optionContainerStyle={{
          ...(isDarkMode ? darkStyles.container : lightStyles.container),
          paddingLeft: 10,
        }}
        listEmptyLabelStyle={{
          ...(isDarkMode ? darkStyles.container : lightStyles.container),
          padding: 10,
          width: '100%',
          color: isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK,
        }}
        inputFilterStyle={{
          color: isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK,
          fontSize: 16,
        }}
        optionsLabelStyle={{
          color: isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK,
          fontSize: 16,
        }}
      />
    </View>
  );
}

export default MultiSelectBox;
