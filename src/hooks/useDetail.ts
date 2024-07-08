import {useRoute, useNavigation} from '@react-navigation/native';
import {
  DetailScreenNavigationProp,
  DetailScreenRouteProp,
} from '../navigation/types';
import {ALIGN_TYPE, FLEX_TYPE} from '../types';
import {hp} from '../utils/utils';

const useDetail = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const {
    params: {episode, gender, image, name, origin, species, status},
  } = route;

  const originName = origin?.name?.split(' ')[0];
  const firstEpisode = episode[0]?.name;
  const numOfEpisodes = episode?.length;
  const lastEpisode = episode[numOfEpisodes - 1]?.name;

  const goBack = () => navigation.goBack();

  const customStyle = {
    flexDirection: FLEX_TYPE.row,
    alignItems: ALIGN_TYPE.center,
  };

  const imageStyle = {
    width: hp(200),
    height: hp(200),
    borderRadius: hp(150),
  };

  return {
    numOfEpisodes,
    firstEpisode,
    lastEpisode,
    customStyle,
    originName,
    imageStyle,
    species,
    gender,
    status,
    goBack,
    image,
    name,
  };
};

export default useDetail;
