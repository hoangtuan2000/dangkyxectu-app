import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-neat-date-picker';
import {useSelector} from 'react-redux';
import Constants from '../../constant/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DateRangePickerCustom = ({
  open,
  handleOpen,
  handleClose,
  disabledDays,
  placeholder,
  defaultStartDate,
  defaultEndDate,
  onSubmit = () => {},
}) => {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  const onCancelRange = () => {
    handleClose();
  };

  const onConfirmRange = output => {
    handleClose();
    onSubmit({
      startDate: output.startDate,
      endDate: output.endDate,
    });
  };

  return (
    <View style={{width: '100%', marginBottom: 10}}>
      <TouchableOpacity
        onPress={handleOpen}
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
          {defaultStartDate && defaultEndDate
            ? `${defaultStartDate} - ${defaultEndDate}`
            : placeholder && `${placeholder}`}
        </Text>

        <MaterialIcons
          name="calendar-month"
          size={26}
          color={
            isDarkMode
              ? Constants.Styles.Color.WHITE
              : Constants.Styles.Color.PRIMARY
          }
        />
      </TouchableOpacity>

      <DatePicker
        isVisible={open}
        mode={'range'}
        onCancel={onCancelRange}
        onConfirm={onConfirmRange}
        language={'vn'}
        disabledDays={disabledDays}
        colorOptions={{
          backgroundColor: isDarkMode
            ? Constants.Styles.BackgroundColor.DARK
            : Constants.Styles.BackgroundColor.LIGHT,
          headerColor: isDarkMode
            ? Constants.Styles.BackgroundColor.DARK
            : Constants.Styles.Color.PRIMARY,
          weekDaysColor: isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK,
          dateTextColor: isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK,
          confirmButtonColor: isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.PRIMARY,
        }}
      />
    </View>
  );
};

export default DateRangePickerCustom;
