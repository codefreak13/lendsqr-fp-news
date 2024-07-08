import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Character} from '../types';
import {APP_ROUTE, FavoriteScreenNavigationProp} from '../navigation/types';
import {RootState} from '../store';

const useFavorite = () => {
  const {favoriteList} = useSelector((state: RootState) => state.favorites);
  const navigation = useNavigation<FavoriteScreenNavigationProp>();

  const goBack = () => navigation.goBack();

  const onPress = (item: Character) => {
    navigation.navigate(APP_ROUTE.DETAIL, item);
  };

  return {
    onPress,
    goBack,
    favoriteList,
  };
};

export default useFavorite;
