import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-neat-date-picker';
import {useSelector} from 'react-redux';
import Constants from '../../constant/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Strings from '../../constant/Strings';
import helper from '../../common/helper';
import {lightStyles, darkStyles} from './styles';
import moment from 'moment';
import 'moment/locale/vi'; // without this line it didn't work

moment().locale('vi');

const DateRangePickerCustom = ({
  open,
  handleOpen,
  handleClose,
  label,
  styleLabel,
  disabledDays,
  minDate,
  placeholder,
  defaultStartDate,
  defaultEndDate,
  error,
  helperText,
  styleHelperText,
  onSubmit = () => {},
}) => {
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  placeholder = placeholder || Strings.Common.CHOOSE_DATE_PLEASE;
  defaultStartDate = defaultStartDate && new Date(defaultStartDate);
  defaultEndDate = defaultEndDate && new Date(defaultEndDate);

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
    <View style={{width: '100%', marginTop: 10}}>
      {label && (
        <Text
          style={[
            isDarkMode ? darkStyles.label : lightStyles.label,
            styleLabel,
          ]}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={handleOpen}
        style={{
          backgroundColor: isDarkMode
            ? Constants.Styles.Color.SECONDARY
            : Constants.Styles.Color.WHITE,
          borderColor: error
            ? isDarkMode
              ? Constants.Styles.Color.WARNING
              : Constants.Styles.Color.ERROR
            : isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.SECONDARY,
          borderWidth: 1,
          padding: 7,
          borderRadius: 8,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 3,
        }}>
        {defaultStartDate && defaultEndDate && (
          <Text
            style={{
              color: isDarkMode
                ? Constants.Styles.Color.WHITE
                : Constants.Styles.Color.DARK,
              fontSize: 17,
            }}>
            {`${moment(defaultStartDate).format('L')} - ${moment(
              defaultEndDate,
            ).format('L')}`}
          </Text>
        )}

        {!defaultStartDate && !defaultEndDate && (
          <Text
            style={{
              color: error
                ? isDarkMode
                  ? Constants.Styles.Color.WARNING
                  : Constants.Styles.Color.ERROR
                : isDarkMode
                ? Constants.Styles.Color.WHITE
                : Constants.Styles.Color.SECONDARY,
              fontSize: 17,
            }}>
            {placeholder}
          </Text>
        )}

        <MaterialIcons
          name="calendar-month"
          size={26}
          color={
            error
              ? isDarkMode
                ? Constants.Styles.Color.WARNING
                : Constants.Styles.Color.ERROR
              : isDarkMode
              ? Constants.Styles.Color.WHITE
              : Constants.Styles.Color.PRIMARY
          }
        />
      </TouchableOpacity>

      {helperText && error && (
        <Text
          style={[
            isDarkMode ? darkStyles.textError : lightStyles.textError,
            styleHelperText,
          ]}>
          {helperText}
        </Text>
      )}

      <DatePicker
        isVisible={open}
        mode={'range'}
        onCancel={onCancelRange}
        onConfirm={onConfirmRange}
        language={'vn'}
        disabledDays={disabledDays}
        minDate={minDate}
        startDate={defaultStartDate}
        endDate={defaultEndDate}
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
