import React from 'react';
import {useAuth, useList} from '../../hooks';
import {COLORS, hp, wp} from '../../utils/utils';
import {View, StyleSheet} from 'react-native';
import {MediumText} from '../../components/texts';
import {ListView} from '../../components/list-views';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  INPUT_TEST_ID,
  FAVORITE_LIST_BUTTON_TEST_ID,
  SIGN_OUT_BUTTON_TEST_ID,
} from '../../utils/utils';
import {Header, Input, PickerSelect, Loader, Button} from '../../components/ui';
import {FAV_ICON, SIZE} from '../../types';

const statusData = [
  {label: 'All', value: 'All'},
  {label: 'Alive', value: 'Alive'},
  {label: 'Dead', value: 'Dead'},
];

const Home = () => {
  const {
    onChangeFormValue,
    toggleView,
    goToFavorites,
    addToFavorite,
    loadMoreState,
    renderedData,
    onChangeText,
    searchParam,
    onClearText,
    throwError,
    viewLabel,
    viewType,
    loadMore,
    onPress,
    loading,
    status,
  } = useList();
  const {signOut} = useAuth();

  return (
    <>
      {loading && renderedData.length === 0 ? (
        <Loader size={SIZE.large} />
      ) : (
        <View style={styles.mainStyle}>
          <Button
            title="Throw Error"
            onPress={throwError}
            customStyle={styles.runtimeError}
          />

          <Header
            title="CHARACTERS"
            customMiddleIcon
            rightButton={{
              child: (
                <Ionicons
                  size={35}
                  name={FAV_ICON.heartOutline}
                  color={COLORS.Black}
                  testID={FAVORITE_LIST_BUTTON_TEST_ID}
                  onPress={goToFavorites}
                />
              ),
            }}
            leftButton={{
              child: (
                <Ionicons
                  size={35}
                  name={FAV_ICON.logOut}
                  color={COLORS.Black}
                  testID={SIGN_OUT_BUTTON_TEST_ID}
                  onPress={signOut}
                />
              ),
            }}
          />
          <Input
            value={searchParam}
            placeholder="Search"
            onClear={onClearText}
            setValue={onChangeText}
            testID={INPUT_TEST_ID}
          />
          <View style={styles.filterBar}>
            <View style={[styles.utilityItem]}>
              <MediumText title="Filter " />
              <PickerSelect
                value={status}
                items={statusData}
                placeholder="Status"
                onValueChange={onChangeFormValue('status')}
              />
            </View>
            <View style={styles.utilityItem}>
              <MediumText title={`${viewLabel} View `} />
              <Ionicons
                size={20}
                name={viewType}
                color={COLORS.Black}
                onPress={toggleView}
              />
            </View>
          </View>
          <ListView
            onPress={onPress}
            data={renderedData}
            viewType={viewType}
            loadMore={loadMore}
            addToFavorite={addToFavorite}
          />
          {loadMoreState && <Loader loadingStyle={styles.loadingStyle} />}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    marginVertical: hp(20),
    alignItems: 'center',
    marginHorizontal: hp(15),
  },
  errorText: {
    alignSelf: 'center',
    marginVertical: hp(50),
    color: COLORS.Danger,
  },
  filterBar: {
    flexDirection: 'row',
    marginVertical: hp(10),
    justifyContent: 'space-between',
    width: '100%',
  },
  loadingStyle: {
    position: 'relative',
    bottom: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  utilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('25%'),
    justifyContent: 'flex-end',
  },
  loader: {
    marginTop: wp(350),
  },
  runtimeError: {
    alignSelf: 'flex-end',
    color: COLORS.Black,
  },
});

export default Home;
