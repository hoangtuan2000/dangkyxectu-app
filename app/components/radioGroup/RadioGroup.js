import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Constants from '../../constant/Constants';
import {RadioButton} from 'react-native-paper';
import {useSelector} from 'react-redux';

function RadioGroup({title, items, checkDefault, onCheck = () => {}}) {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const [value, setValue] = React.useState(
    items.length > 0 && checkDefault >= 0 && checkDefault <= items.length - 1
      ? items[checkDefault].value
      : null,
  );

  const handleCheck = val => {
    setValue(val);
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
            flexDirection: 'row',
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
                  marginRight: 5,
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
        </View>
      </RadioButton.Group>
    </View>
  );
}

export default RadioGroup;
