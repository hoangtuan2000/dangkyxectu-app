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
import ButtonCustom from '../../../components/buttonCustom/ButtonCustom';
import Constants from '../../../constant/Constants';
import Strings from '../../../constant/Strings';
import {darkStyles, lightStyles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalError from '../../../components/modalError/ModalError';
import ModalSuccess from '../../../components/modalSuccess/ModalSuccess';
import BackDrop from '../../../components/backDrop/BackDrop';
import NoDataView from '../../../components/noDataView/NoDataView';
import {ActivityIndicator} from 'react-native-paper';
import helper from '../../../common/helper';
import RoutesPath from '../../../constant/RoutesPath';
import {DriverTripManagerServices} from '../../../services/driver/DriverTripManagerServices';
import RentedCarFilterModal from '../../../components/user/rentedcarFilterModal/RentedCarFilterModal';
import ModalConfirmationCancel from '../../../components/modalConfirmationCancel/ModalConfirmationCancel';
import StarRating from 'react-native-star-rating-widget';
import DriverTripManagerFilterModal from '../../../components/driver/driverTripManagerFilterModal/DriverTripManagerFilterModal';

const window = Dimensions.get('window');

function DriverTripManagerPage({navigation}) {

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
  const [modalConfirmationCancel, setModalConfirmationCancel] = React.useState({
    open: false,
    idSchedule: null,
  });
  const [dataInfo, setDataInfo] = React.useState({
    page: Constants.Common.PAGE,
    pageSize: Constants.Common.LIMIT_ENTRY,
    totalRows: 0,
    totalPages: 0,
  });

  const [totalDataFilter, setTotalDataFilter] = React.useState(null);
  const [dataFilter, setDataFilter] = React.useState({
    status: [],
    carType: [],
    scheduleCode: null,
    startDate: null,
    endDate: null,
    address: null,
    ward: null,
    district: null,
    province: null,
  });

  const [rentalCarFilterModal, setRentalCarFilterModal] = React.useState(false);

  const [scheduleList, setScheduleList] = React.useState([]);

  const getDriverScheduleList = async (
    loadMoreData = false,
    page = dataInfo.page,
    pageSize = dataInfo.pageSize,
    status,
    carType,
    scheduleCode,
    address,
    idWard,
    startDate,
    endDate,
  ) => {
    await setBackDrop(true);
    const data = {
      page: page,
      limitEntry: pageSize,
      status,
      carType,
      scheduleCode,
      address,
      idWard,
      startDate,
      endDate,
    };
    const res = await DriverTripManagerServices.getDriverScheduleList({
      ...data,
    });
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
          setScheduleList([...scheduleList, ...res.data.data]);
        } else {
          setScheduleList(res.data.data);
        }
      } else {
        setModalError({
          ...modalError,
          open: true,
          title: res.data.message,
          content: null,
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
    await getDriverScheduleList(
      false,
      Constants.Common.PAGE,
      dataInfo.pageSize,
      data.status,
      data.carType,
      data.scheduleCode,
      data.address,
      data.idWard,
      data.startDate,
      data.endDate,
    );
    await setRefreshing(false);
  };

  const onLoadMore = async () => {
    if (dataInfo.page + 1 <= dataInfo.totalPages) {
      await setIsLoadingMore(true);
      let data = await handleFormatDataFilter();
      await getDriverScheduleList(
        true,
        dataInfo.page + 1,
        dataInfo.pageSize,
        data.status,
        data.carType,
        data.scheduleCode,
        data.address,
        data.idWard,
        data.startDate,
        data.endDate,
      );
      await setIsLoadingMore(false);
    }
  };

  const handleFormatDataFilter = () => {
    //format data to send API
    let status = [];
    let carType = [];
    if (helper.isArray(dataFilter.status) && dataFilter.status.length > 0) {
      status = dataFilter.status.map(item => {
        return item.id;
      });
    }
    if (helper.isArray(dataFilter.carType) && dataFilter.carType.length > 0) {
      carType = dataFilter.carType.map(item => {
        return item.id;
      });
    }
    return {
      status,
      carType,
      scheduleCode: dataFilter.scheduleCode,
      address: dataFilter.address,
      idWard: dataFilter.ward && dataFilter.ward.id,
      startDate: dataFilter.startDate,
      endDate: dataFilter.endDate,
    };
  };

  const handleFilter = e => {
    //format data to send API
    let carType = [];
    let status = [];
    if (helper.isArray(e.carType) && e.carType.length > 0) {
      carType = e.carType.map(item => {
        return item.id;
      });
    }
    if (helper.isArray(e.status) && e.status.length > 0) {
      status = e.status.map(item => {
        return item.id;
      });
    }
    getDriverScheduleList(
      false,
      Constants.Common.PAGE,
      dataInfo.pageSize,
      status,
      carType,
      e.scheduleCode,
      e.address,
      e.ward && e.ward.id,
      e.startDate,
      e.endDate,
    );
    setDataFilter({
      status: [...e.status],
      carType: [...e.carType],
      scheduleCode: e.scheduleCode,
      address: e.address,
      ward: e.ward,
      district: e.district,
      province: e.province,
      startDate: e.startDate,
      endDate: e.endDate,
    });
    // show total data to filter in UI => button filter
    let total = status.length + carType.length;
    if (e.scheduleCode) total += 1;
    if (e.ward || e.address) total += 1;
    if (e.startDate && e.endDate) total += 1;
    setTotalDataFilter(total > 0 ? total : null);
  };

  const handleRefreshDataFilter = () => {
    setDataFilter({
      status: [],
      carType: [],
      scheduleCode: null,
      startDate: null,
      endDate: null,
      address: null,
      ward: null,
      district: null,
      province: null,
    });
  };

  const handleGetDataWithFilter = async () => {
    let data = await handleFormatDataFilter();
    await getDriverScheduleList(
      false,
      Constants.Common.PAGE,
      Constants.Common.LIMIT_ENTRY,
      data.status,
      data.carType,
      data.scheduleCode,
      data.address,
      data.idWard,
      data.startDate,
      data.endDate,
    );
  };

  const run = async () => {
    await getDriverScheduleList();
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
          {scheduleList.length > 0 ? (
            <FlatList
              data={scheduleList}
              keyExtractor={item => item.idSchedule}
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
                let bgColor = null;
                let textColor = isDarkMode
                  ? Constants.Styles.Color.WHITE
                  : Constants.Styles.Color.DARK;
                const objScheduleStatus = Constants.ScheduleStatusCode;
                for (const property in objScheduleStatus) {
                  if (
                    item.idScheduleStatus == `${objScheduleStatus[property]}`
                  ) {
                    bgColor =
                      Constants.ColorOfScheduleStatus.Background[property];
                    textColor = Constants.ColorOfScheduleStatus.Text[property];
                    break;
                  }
                }
                return (
                  <View
                    key={item.idSchedule}
                    style={
                      isDarkMode
                        ? darkStyles.cardContainer
                        : lightStyles.cardContainer
                    }>
                    {/* IMAGE */}
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}>
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
                      {/* SCHEDULE CODE */}
                      <Text
                        style={
                          isDarkMode
                            ? darkStyles.carSeatNumber
                            : lightStyles.carSeatNumber
                        }>
                        {Strings.RentedCarList.SCHEDULE} {item.idSchedule}
                      </Text>

                      {/* TIME */}
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text
                          style={
                            isDarkMode ? darkStyles.text : lightStyles.text
                          }>
                          {Strings.RentedCarList.TIME}
                        </Text>
                        <Text
                          style={[
                            isDarkMode ? darkStyles.text : lightStyles.text,
                            {fontWeight: 'bold', fontSize: 15},
                          ]}>
                          {`${helper.formatDateStringFromTimeStamp(
                            item.startDate,
                          )}-${helper.formatDateStringFromTimeStamp(
                            item.endDate,
                          )}`}
                        </Text>
                      </View>

                      {/* CAR TYPE */}
                      <Text
                        style={isDarkMode ? darkStyles.text : lightStyles.text}>
                        {Strings.RentedCarList.CAR_TYPE}{' '}
                        {`${item.carType} ${item.seatNumber} Ch???`}
                      </Text>

                      {/* LICENSE PLATES */}
                      <Text
                        style={isDarkMode ? darkStyles.text : lightStyles.text}>
                        {Strings.RentalCarList.LICENSE_PLATES}{' '}
                        {item.licensePlates}
                      </Text>

                      {/* SCHEDULE STATUS */}
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
                          {Strings.RentedCarList.STATUS}
                        </Text>
                        <View
                          style={{
                            backgroundColor: bgColor,
                            paddingLeft: 5,
                            paddingRight: 5,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={[
                              isDarkMode ? darkStyles.text : lightStyles.text,
                              {color: textColor},
                            ]}>
                            {item.scheduleStatus}
                          </Text>
                        </View>
                      </View>

                      {/* SHOW SCHEDULE */}
                      {(item.idScheduleStatus ==
                        Constants.ScheduleStatusCode.APPROVED &&
                        helper.isDateTimeStampGreaterThanOrEqualCurrentDate(
                          item.startDate,
                        )) ||
                      item.idScheduleStatus ==
                        Constants.ScheduleStatusCode.RECEIVED ||
                      item.idScheduleStatus ==
                        Constants.ScheduleStatusCode.MOVING ? (
                        <ButtonCustom
                          onPress={() =>
                            navigation.navigate(
                              RoutesPath.Pages.SHOW_SCHEDULE_DRIVER,
                              {
                                idSchedule: item.idSchedule,
                                handleGetDataWithFilter: () =>
                                  handleGetDataWithFilter(),
                              },
                            )
                          }
                          textButton={Strings.Common.UPDATE}
                          padding={8}
                          iconPosition={'right'}
                          icon={
                            <MaterialIcons
                              name={'lead-pencil'}
                              size={26}
                              color={Constants.Styles.Color.WHITE}
                            />
                          }
                        />
                      ) : (
                        <ButtonCustom
                          onPress={() =>
                            navigation.navigate(
                              RoutesPath.Pages.SHOW_SCHEDULE_DRIVER,
                              {
                                idSchedule: item.idSchedule,
                                handleGetDataWithFilter: () =>
                                  handleGetDataWithFilter(),
                              },
                            )
                          }
                          textButton={Strings.Common.DETAIL}
                          padding={8}
                          iconPosition={'right'}
                          icon={
                            <MaterialIcons
                              name={'eye'}
                              size={26}
                              color={Constants.Styles.Color.WHITE}
                            />
                          }
                        />
                      )}
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

      <DriverTripManagerFilterModal
        open={rentalCarFilterModal}
        handleClose={() => setRentalCarFilterModal(!rentalCarFilterModal)}
        onSubmit={e => handleFilter(e)}
        handleRefreshDataFilter={handleRefreshDataFilter}
        defaultScheduleCode={dataFilter.scheduleCode}
        defaultCarType={dataFilter.carType}
        defaultStatus={dataFilter.status}
        defaultStartDate={dataFilter.startDate}
        defaultEndDate={dataFilter.endDate}
        defaultAddress={dataFilter.address}
        defaultWard={dataFilter.ward}
        defaultDistrict={dataFilter.district}
        defaultProvince={dataFilter.province}
      />

      <ModalConfirmationCancel
        open={modalConfirmationCancel.open}
        handleClose={() =>
          setModalConfirmationCancel({
            ...modalConfirmationCancel,
            open: false,
          })
        }
        idSchedule={modalConfirmationCancel.idSchedule}
        handleOpenModalSuccessOfParent={() => setModalSuccess(true)}
        handleGetDataWithFilter={() => handleGetDataWithFilter()}
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

export default DriverTripManagerPage;
