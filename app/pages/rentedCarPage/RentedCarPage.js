import React from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';
import Constants from '../../constant/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const RentedCarPage = () => {
  const isDarkMode = useSelector(state => state.themeMode.darkMode)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        // onPress={handleOpen}
        style={{
          backgroundColor: isDarkMode
            ? Constants.Styles.Color.SECONDARY
            : Constants.Styles.Color.WHITE,
          borderColor: isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.SECONDARY,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: isDarkMode
              ? Constants.Styles.Color.WHITE
              : Constants.Styles.Color.DARK,
            fontSize: 17,
          }}>
          {/* {defaultStartDate && defaultEndDate
            ? `${defaultStartDate} - ${defaultEndDate}`
            : placeholder && `${placeholder}`} */}
        </Text>

        <MaterialIcons
          name="map-marker"
          size={26}
          color={
            isDarkMode
              ? Constants.Styles.Color.WHITE
              : Constants.Styles.Color.PRIMARY
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default RentedCarPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
