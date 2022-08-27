import React from 'react';
import {Text, TouchableOpacity, useColorScheme, View} from 'react-native';
import Constants from '../../constant/Constants';

function ButtonCustom({
  onPress,
  iconPosition,
  icon,
  textButton,
  stylesText,
  stylesButton,
  bgColor,
  padding,
  margin,
  borderRadius,
  textColor,
  textSize,
  textWeight,
  widthButton,
}) {
  const isDarkMode = useColorScheme() === 'dark';

  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        stylesButton,
        {
          width: widthButton && widthButton,
          backgroundColor: bgColor ? bgColor : Constants.styles.colorPrimary,
          padding: padding ? padding : 10,
          margin: margin ? margin : 5,
          borderRadius: borderRadius ? borderRadius : 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: getFlexDirection(),
        },
      ]}>
      <View style={{paddingLeft: 5, paddingRight: 5}}>{icon && icon}</View>
      <Text
        style={[
          stylesText,
          {
            color: textColor ? textColor : Constants.styles.colorLight,
            fontSize: textSize ? textSize : 16,
            fontWeight: textWeight ? textWeight : 'normal',
          },
        ]}>
        {textButton}
      </Text>
    </TouchableOpacity>
  );
}

export default ButtonCustom;
