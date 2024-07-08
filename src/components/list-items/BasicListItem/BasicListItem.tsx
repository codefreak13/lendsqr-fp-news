import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {hp, COLORS} from '../../../utils/utils';
import {ListText} from '../../texts';
import {
  DELETE_ICON_TEST_ID,
  FAV_ICON_TEST_ID,
  LIST_ITEM_TEST_ID,
} from '../../../utils/utils';
import {FAV_ICON} from '../../../types';

type Props = {
  id?: string;
  name: string;
  image: string;
  status: string;
  origin: string;
  gender?: string;
  species: string;
  episode: string;
  onPress?: () => void;
  lastEpisode?: string;
  mainStyle?: ViewStyle;
  numOfEpisodes?: number;
  customStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  contentStyle?: TextStyle;
  favoriteListIds?: string[];
  addToFavorite?: () => void;
  utilityIconStyle?: TextStyle;
  deleteFromFavorite?: () => void;
};

const BasicListItem = (props: Props) => {
  const {
    id,
    name,
    image,
    status,
    origin,
    gender,
    species,
    onPress,
    episode,
    mainStyle,
    imageStyle,
    customStyle,
    lastEpisode,
    favoriteListIds,
    contentStyle,
    numOfEpisodes,
    addToFavorite,
    utilityIconStyle,
    deleteFromFavorite,
  } = props;

  const favIcon = favoriteListIds?.includes(id!)
    ? FAV_ICON.heart
    : FAV_ICON.heartOutline;
  const favColor = favoriteListIds?.includes(id!)
    ? COLORS.Danger
    : COLORS.Black;
  return (
    <Pressable
      testID={LIST_ITEM_TEST_ID}
      onPress={() => onPress?.()}
      style={[styles.mainStyle, customStyle]}>
      <View style={styles.containerStyle}>
        <ListText
          title="Name"
          content={name}
          testID="itemName"
          mainStyle={mainStyle}
          contentStyle={contentStyle}
        />
        <ListText
          title="Status"
          content={status}
          contentStyle={contentStyle}
          mainStyle={mainStyle}
        />
        <ListText
          title="Species"
          content={species}
          contentStyle={contentStyle}
          mainStyle={mainStyle}
        />
        {!!gender && (
          <ListText
            title="Gender"
            content={gender}
            contentStyle={contentStyle}
            mainStyle={mainStyle}
          />
        )}
        <ListText
          title="Origin"
          content={origin}
          contentStyle={contentStyle}
          mainStyle={mainStyle}
        />
        <ListText
          title={`${!!lastEpisode ? 'First ' : ''}Episode`}
          content={episode}
          contentStyle={contentStyle}
          mainStyle={mainStyle}
        />
        {!!lastEpisode && (
          <ListText
            title="Last Episode"
            content={lastEpisode}
            contentStyle={contentStyle}
            mainStyle={mainStyle}
          />
        )}
        {!!numOfEpisodes && (
          <ListText
            title="Number of Episodes"
            content={numOfEpisodes}
            contentStyle={contentStyle}
            mainStyle={mainStyle}
          />
        )}
      </View>
      <FastImage
        style={[styles.imageStyle, imageStyle]}
        source={{uri: image}}
        resizeMode={FastImage.resizeMode.cover}
      />
      {addToFavorite && (
        <Ionicons
          testID={FAV_ICON_TEST_ID}
          name={favIcon}
          size={20}
          color={favColor}
          style={[styles.utilityIconStyle, utilityIconStyle]}
          onPress={addToFavorite}
        />
      )}
      {deleteFromFavorite && (
        <Ionicons
          name="trash"
          testID={DELETE_ICON_TEST_ID}
          size={20}
          color={COLORS.Danger}
          style={styles.utilityIconStyle}
          onPress={deleteFromFavorite}
        />
      )}
    </Pressable>
  );
};

export default BasicListItem;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    marginVertical: hp(5),
    flexDirection: 'row',
    backgroundColor: COLORS.White,
    padding: hp(7),
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowOffset: {
          width: hp(5),
          height: hp(2),
        },
        shadowColor: COLORS.DarkGrey,
        shadowOpacity: hp(0.5),
        zIndex: 999,
        margin: hp(1),
      },
    }),
  },
  containerStyle: {
    flex: 1,
  },
  imageStyle: {
    width: hp(100),
    height: hp(100),
    borderRadius: hp(50),
    marginVertical: hp(15),
  },
  utilityIconStyle: {
    position: 'relative',
    right: 5,
    top: 5,
  },
});
