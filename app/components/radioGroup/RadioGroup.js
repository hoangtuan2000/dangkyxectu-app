import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Constants from '../../constant/Constants';
import {RadioButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import helper from '../../common/helper';

function RadioGroup({title, items, onCheck = () => {}, value, showClear = true, flexDirection, alignItems}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  const handleCheck = val => {
    onCheck(val);
  };

  return (
    <View>
      <Text
        style={{
          fontSize: Constants.Styles.FontSize.LARGE,
          color: isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK,
        }}>
        {title}
      </Text>
      <RadioButton.Group
        onValueChange={newValue => handleCheck(newValue)}
        value={value}>
        <View
          style={{
            flexDirection: flexDirection ? flexDirection : 'row',
            alignItems: alignItems ? alignItems : 'center',
          }}>
          {items.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleCheck(item.value)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                <RadioButton value={item.value} />
                <Text
                  style={{
                    fontSize: 17,
                    color: isDarkMode
                      ? Constants.Styles.Color.WHITE
                      : Constants.Styles.Color.DARK,
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}

          {!helper.isNullOrEmpty(value) && showClear && (
            <TouchableOpacity onPress={() => handleCheck(null)}>
              <MaterialIcons name="close-circle" size={26} color={'red'} />
            </TouchableOpacity>
          )}
        </View>
      </RadioButton.Group>
    </View>
  );
}

export default RadioGroup;
