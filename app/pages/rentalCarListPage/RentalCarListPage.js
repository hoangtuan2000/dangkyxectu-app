import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import ButtonCustom from '../../components/buttonCustom/ButtonCustom';
import Constants from '../../constant/Constants';
import Strings from '../../constant/Strings';
import {darkStyles, lightStyles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalError from '../../components/modalError/ModalError';
import ModalSuccess from '../../components/modalSuccess/ModalSuccess';
import BackDrop from '../../components/backDrop/BackDrop';
import {RentalCarListServices} from '../../services/RentalCarListServices';
import NoDataView from '../../components/noDataView/NoDataView';
import {ActivityIndicator} from 'react-native-paper';
import RentalCarFilterModal from '../../components/rentalcarFilterModal/RentalCarFilterModal';
import helper from '../../common/helper';
import RoutesPath from '../../constant/RoutesPath';

const window = Dimensions.get('window');
function RentalCarListPage({navigation}) {

  const [dimensions, setDimensions] = React.useState(window);

  const isDarkMode = useSelector(state => state.themeMode.darkMode);
  const [modalError, setModalError] = React.useState({
    open: false,
    title: null,
    content: null,
  });
  const [modalSuccess, setModalSuccess] = React.useState(false);
  const [backDrop, setBackDrop] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const [dataInfo, setDataInfo] = React.useState({
    page: Constants.Common.PAGE,
    pageSize: Constants.Common.LIMIT_ENTRY,
    totalRows: 0,
    totalPages: 0,
  });

  const [totalDataFilter, setTotalDataFilter] = React.useState(null);
  const [dataFilter, setDataFilter] = React.useState({
    carType: [],
    carBrand: [],
    licensePlates: null,
    haveTrip: null,
  });

  const [rentalCarFilterModal, setRentalCarFilterModal] = React.useState(false);

  const [carList, setCarList] = React.useState([]);

  const getCarList = async (
    loadMoreData = false,
    page = dataInfo.page,
    pageSize = dataInfo.pageSize,
    carType,
    carBrand,
    licensePlates,
    haveTrip,
  ) => {
    await setBackDrop(true);
    let data = {
      page: page,
      limitEntry: pageSize,
      carType,
      carBrand,
      licensePlates,
      haveTrip,
    };
    const res = await RentalCarListServices.getCarList({...data});
    // axios success
    if (res.data) {
      if (res.data.status == Constants.ApiCode.OK) {
        setDataInfo({
          page: res.data.page,
          pageSize: res.data.limitEntry,
          totalRows: res.data.sizeQuerySnapshot,
          totalPages: Math.ceil(
            res.data.sizeQuerySnapshot / res.data.limitEntry,
          ),
        });
        if (loadMoreData) {
          setCarList([...carList, ...res.data.data]);
        } else {
          setCarList(res.data.data);
        }
      } else {
        setModalError({
          ...modalError,
          open: true,
          title: res.data.message,
        });
      }
    }
    // axios fail
    else {
      setModalError({
        ...modalError,
        open: true,
        title:
          (res.request &&
            `${Strings.Common.AN_ERROR_OCCURRED} (${res.request.status})`) ||
          Strings.Common.ERROR,
        content: res.name || null,
      });
    }
    await setBackDrop(false);
  };

  const onRefresh = async () => {
    await setRefreshing(true);
    let data = await handleFormatDataFilter();
    await getCarList(
      false,
      Constants.Common.PAGE,
      dataInfo.pageSize,
      data.carType,
      data.carBrand,
      data.licensePlates,
      data.haveTrip,
    );
    await setRefreshing(false);
  };

  const onLoadMore = async () => {
    if (dataInfo.page + 1 <= dataInfo.totalPages) {
      await setIsLoadingMore(true);
      let data = await handleFormatDataFilter();
      await getCarList(
        true,
        dataInfo.page + 1,
        dataInfo.pageSize,
        data.carType,
        data.carBrand,
        data.licensePlates,
        data.haveTrip,
      );
      await setIsLoadingMore(false);
    }
  };

  const handleFormatDataFilter = () => {
    //format data to send API
    let carType = [];
    let carBrand = [];
    if (helper.isArray(dataFilter.carType) && dataFilter.carType.length > 0) {
      carType = dataFilter.carType.map(item => {
        return item.id;
      });
    }
    if (helper.isArray(dataFilter.carBrand) && dataFilter.carBrand.length > 0) {
      carBrand = e.carBrand.map(item => {
        return item.id;
      });
    }

    return {
      carType,
      carBrand,
      licensePlates: dataFilter.licensePlates,
      haveTrip: dataFilter.haveTrip,
    };
  };

  const handleFilter = e => {
    //format data to send API
    let carType = [];
    let carBrand = [];
    if (helper.isArray(e.carType) && e.carType.length > 0) {
      carType = e.carType.map(item => {
        return item.id;
      });
    }
    if (helper.isArray(e.carBrand) && e.carBrand.length > 0) {
      carBrand = e.carBrand.map(item => {
        return item.id;
      });
    }

    getCarList(
      false,
      Constants.Common.PAGE,
      dataInfo.pageSize,
      carType,
      carBrand,
      e.licensePlates,
      e.haveTrip,
    );

    setDataFilter({
      carType: [...e.carType],
      carBrand: [...e.carBrand],
      licensePlates: e.licensePlates,
      haveTrip: e.haveTrip,
    });

    let total = carType.length + carBrand.length;
    if (e.licensePlates) total += 1;
    if (!helper.isNullOrEmpty(e.haveTrip)) total += 1;
    setTotalDataFilter(total > 0 ? total : null);
  };

  const handleRefreshDataFilter = () => {
    setDataFilter({
      carType: [],
      carBrand: [],
      licensePlates: null,
      haveTrip: null,
    });
  };

  const run = async () => {
    await getCarList();
    await setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  React.useEffect(() => {
    run();
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  return (
    <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
      {!isLoading && (
        <>
          {carList.length > 0 ? (
            <FlatList
              data={carList}
              keyExtractor={item => item.idCar}
              // REFRESH CONTROL
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              // LOAD MORE
              ListFooterComponent={() =>
                isLoadingMore ? (
                  <View style={{padding: 20}}>
                    <ActivityIndicator size="small" color="white" />
                  </View>
                ) : null
              }
              onEndReached={() => {
                onLoadMore();
              }}
              onEndReachedThreshold={0.05}
              renderItem={({item}) => {
                return (
                  <View
                    key={item.idCar}
                    style={
                      isDarkMode
                        ? darkStyles.cardContainer
                        : lightStyles.cardContainer
                    }>
                    <View>
                      <Image
                        source={{
                          uri: item.image,
                        }}
                        style={
                          isDarkMode
                            ? darkStyles.imageCar
                            : lightStyles.imageCar
                        }
                      />
                    </View>
                    <View style={{marginLeft: 10, flex: 1}}>
                      <Text
                        style={
                          isDarkMode
                            ? darkStyles.carSeatNumber
                            : lightStyles.carSeatNumber
                        }>
                        {`${item.nameCarType} ${item.seatNumber} Chỗ`}
                      </Text>
                      <Text
                        style={isDarkMode ? darkStyles.text : lightStyles.text}>
                        {Strings.RentalCarList.CAR_BRAND} {item.nameCarBrand}
                      </Text>
                      <Text
                        style={isDarkMode ? darkStyles.text : lightStyles.text}>
                        {Strings.RentalCarList.LICENSE_PLATES}{' '}
                        {item.licensePlates}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginBottom: 5,
                        }}>
                        <Text
                          style={
                            isDarkMode ? darkStyles.text : lightStyles.text
                          }>
                          {Strings.RentalCarList.VEHICLE_CONDITION}
                        </Text>
                        <View
                          style={{
                            backgroundColor: Constants.Styles.Color.SUCCESS,
                            paddingLeft: 5,
                            paddingRight: 5,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={[
                              isDarkMode ? darkStyles.text : lightStyles.text,
                              {color: 'white'},
                            ]}>
                            {item.nameCarStatus}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={
                            isDarkMode ? darkStyles.text : lightStyles.text
                          }>
                          {Strings.RentalCarList.SCHEDULE}
                        </Text>
                        <View
                          style={{
                            backgroundColor:
                              item.totalSchedule == 0
                                ? 'green'
                                : Constants.Styles.Color.WARNING,
                            paddingLeft: 5,
                            paddingRight: 5,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={[
                              isDarkMode ? darkStyles.text : lightStyles.text,
                              {color: 'white'},
                            ]}>
                            {item.totalSchedule}
                          </Text>
                        </View>
                      </View>

                      <ButtonCustom
                        onPress={() =>
                          navigation.navigate(
                            RoutesPath.Pages.SCHEDULE_REGISTRATION,
                            {idCar: item.idCar},
                          )
                        }
                        textButton={Strings.RentalCarList.CAR_REGISTRATION}
                        padding={8}
                      />
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <ScrollView
              style={{
                flexGrow: 1,
              }}
              // REFRESH CONTROL
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <View
                style={{
                  marginTop: (dimensions.height * 45) / 100,
                }}>
                <NoDataView />
              </View>
            </ScrollView>
          )}
        </>
      )}

      <TouchableOpacity
        onPress={() => setRentalCarFilterModal(!rentalCarFilterModal)}
        style={[
          isDarkMode ? darkStyles.filterButton : lightStyles.filterButton,
          // {position: 'absolute'},
        ]}>
        <MaterialIcons name="filter-outline" size={26} color={'white'} />
        {totalDataFilter && (
          <MaterialIcons
            name="information"
            size={20}
            color={'#f55656'}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          />
        )}
      </TouchableOpacity>

      <RentalCarFilterModal
        open={rentalCarFilterModal}
        handleClose={() => setRentalCarFilterModal(!rentalCarFilterModal)}
        onSubmit={e => handleFilter(e)}
        handleRefreshDataFilter={handleRefreshDataFilter}
        defaultCarType={dataFilter.carType}
        defaultCarBrand={dataFilter.carBrand}
        defaultLicensePlates={dataFilter.licensePlates}
        defaultHaveTrip={dataFilter.haveTrip}
      />

      <ModalSuccess
        open={modalSuccess}
        handleClose={() => setModalSuccess(false)}
      />

      <ModalError
        open={modalError.open}
        handleClose={() =>
          setModalError({
            ...modalError,
            open: false,
          })
        }
        title={modalError.title}
        content={modalError.content}
      />

      <BackDrop open={backDrop} />
    </View>
  );
}

export default RentalCarListPage;
