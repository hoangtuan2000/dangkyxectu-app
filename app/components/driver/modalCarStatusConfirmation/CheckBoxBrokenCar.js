import React from 'react';
import {View, Dimensions, Image} from 'react-native';
import {useSelector} from 'react-redux';
import ButtonCustom from '../../buttonCustom/ButtonCustom';
import Constants from '../../../constant/Constants';
import InputCustom from '../../inputCustom/InputCustom';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Checkbox} from 'react-native-paper';

const window = Dimensions.get('window');

function CheckBoxBrokenCar({
  handleCheckBrokenCarParts,
  labelCheckBox,
  checked,
  errorComment,
  errorImage,
  handleChangeComment,
  placeholderComment,
  valueComment,
  imageReview,
  handleOpenCamera,
  handleOpenLibrary,
}) {

  const [dimensions, setDimensions] = React.useState({
    widthImage: window.width - (window.width * 12) / 100, //85%,
    heightImage: ((window.width - (window.width * 12) / 100) * 65) / 100,
  });
  const isDarkMode = useSelector(state => state.themeMode.darkMode);

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setDimensions({
        widthImage: window.width - (window.width * 12) / 100, //85%
        heightImage: ((window.width - (window.width * 12) / 100) * 65) / 100,
      });
    });
    return () => subscription?.remove();
  }, []);

  return (
    <View>
      <Checkbox.Item
        onPress={handleCheckBrokenCarParts}
        label={labelCheckBox}
        status={checked ? 'checked' : 'unchecked'}
        position={'leading'}
        style={{
          alignSelf: 'flex-start',
        }}
        labelStyle={{
          fontSize: Constants.Styles.FontSize.LARGE,
          color: isDarkMode
            ? Constants.Styles.Color.WHITE
            : Constants.Styles.Color.DARK,
          textAlign: 'left',
        }}
      />

      <View style={{alignSelf: 'center', display: checked ? 'flex' : 'none'}}>
        <InputCustom
          multiLine={true}
          numberOfLines={1}
          error={errorComment}
          icon={'note-edit-outline'}
          onChangeText={e => handleChangeComment(e)}
          placeholder={placeholderComment}
          value={valueComment}
        />

        <View
          style={{
            width: dimensions.widthImage,
            height: dimensions.heightImage,
            borderColor: errorImage
              ? isDarkMode
                ? Constants.Styles.Color.WARNING
                : Constants.Styles.Color.ERROR
              : 'gray',
            backgroundColor: isDarkMode
              ? Constants.Styles.Color.GRAY
              : Constants.Styles.Color.WHITE,
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {imageReview ? (
            <Image
              style={{
                width: dimensions.widthImage,
                height: dimensions.heightImage,
                borderRadius: 10,
                resizeMode: 'cover',
              }}
              source={{
                uri: imageReview,
              }}
            />
          ) : (
            <MaterialIcons
              name={'camera-plus'}
              size={(dimensions.widthImage * 20) / 100}
              color={
                errorImage
                  ? isDarkMode
                    ? Constants.Styles.Color.WARNING
                    : Constants.Styles.Color.ERROR
                  : Constants.Styles.Color.PRIMARY
              }
            />
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <ButtonCustom
            onPress={() => handleOpenCamera()}
            textButton={'Máy Ảnh'}
            widthButton={'45%'}
            padding={5}
            iconPosition={'right'}
            icon={
              <MaterialIcons
                name={'camera'}
                size={22}
                color={Constants.Styles.Color.WHITE}
              />
            }
          />
          <ButtonCustom
            onPress={() => handleOpenLibrary()}
            textButton={'Thư Viện'}
            widthButton={'45%'}
            padding={5}
            iconPosition={'right'}
            icon={
              <MaterialIcons
                name={'folder-image'}
                size={22}
                color={Constants.Styles.Color.WHITE}
              />
            }
          />
        </View>
      </View>
    </View>
  );
}

export default CheckBoxBrokenCar;
