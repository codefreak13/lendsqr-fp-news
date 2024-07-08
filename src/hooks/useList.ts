import {useState, useCallback, useMemo, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {debounce} from 'lodash';
import {Character, VIEW_TYPE} from '../types';
import {APP_ROUTE, ListScreenNavigationProp} from '../navigation/types';
import {capitalizeFirstLetter} from '../utils/utils';
import {AppDispatch, RootState} from '../store';
import {fetchCharacters} from '../store/slices/characterSlice';
import {toggleViewType} from '../store/slices/viewTypeSlice';
import {addFavoriteItem} from '../store/slices/favoriteSlice';
import useFirebaseAnalytics from './useFirebaseAnalytics';

const useList = () => {
  const analytics = useFirebaseAnalytics();
  //navigation instance for list screen
  const navigation = useNavigation<ListScreenNavigationProp>();
  const dispatch: AppDispatch = useDispatch();
  const {data, loading} = useSelector((state: RootState) => state.characters);
  const {viewType} = useSelector((state: RootState) => state.viewType);
  const [page, setPage] = useState(1);
  //container for search param
  const [searchParam, setSearchParam] = useState<string>('');
  //container for data rendered on the screen
  const [renderedData, setRenderedData] = useState<Character[]>([]);
  //picker values
  const [form, setForm] = useState({
    status: 'All',
  });
  const {status} = form;
  //handles pagination and endless scrolling
  const loadMore = () => {
    if (searchParam) {
      return;
    }
    setPage(prev => prev + 1);
  };

  //function that specifies the state of the pagination load more
  const loadMoreState = useMemo(() => {
    if (loading) {
      return true;
    } else {
      return false;
    }
  }, [loading]);

  //function that takes in the filter options from the filter bar and filters
  const filterDataWithParams = () => {
    const selectedData = data?.filter?.((item: Character) => {
      if (status === 'All') {
        return item.name;
      }
      if (status) {
        return status === item?.status;
      }
      return item.name;
    });
    return selectedData || [];
  };

  const throwError = () => {
    throw new Error('This is a runtime error');
  };

  //memoized function that gets data from a single source and searches for pattern match
  const searchMatchingPatterns = useCallback(
    (searchText: string) => {
      const matcher = new RegExp(searchText, 'ig');
      const selectedData = filterDataWithParams()?.filter((item: Character) => {
        const {name} = item;
        return matcher.test(name);
      });
      setRenderedData(selectedData ?? []);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, searchParam, data],
  );

  //delays data entry for a period and memoizes the search function
  const debouncedSave = debounce(
    (nextValue: string) => searchMatchingPatterns(nextValue),
    1000,
  );

  //handles data entry to searchbar and also calls the search function
  const onChangeText = (searchText: string) => {
    setSearchParam(searchText);
    debouncedSave(searchText);
  };

  //handles the data inputted to the multiple picker selects
  const onChangeFormValue = (field: string) => (value: string) => {
    setForm(prevState => ({...prevState, [field]: value}));
    analytics.trackFilterType(value);
  };

  //function that adds an item to favorite screen
  const addToFavorite = (favoriteItem: Character) => {
    analytics.trackAddFavoriteItem(favoriteItem);
    dispatch(addFavoriteItem(favoriteItem));
  };

  //function that navigates to favorite screen
  const goToFavorites = () => {
    analytics.trackFavoriteScreenPress();
    navigation.navigate(APP_ROUTE.FAVORITE);
  };

  //clears the search text
  const onClearText = () => {
    setSearchParam('');
  };

  //function for navigating to details screen
  const onPress = (item: Character) => {
    analytics.trackItemDetailPress(item);
    navigation.navigate(APP_ROUTE.DETAIL, item);
  };

  const toggleView = () => {
    dispatch(toggleViewType());
    analytics.trackViewType(
      viewType === VIEW_TYPE.grid ? VIEW_TYPE.list : VIEW_TYPE.grid,
    );
  };

  //conditionally render view style title
  const viewLabel =
    viewType === VIEW_TYPE.grid
      ? capitalizeFirstLetter(VIEW_TYPE.grid)
      : capitalizeFirstLetter(VIEW_TYPE.list);

  useEffect(() => {
    dispatch(fetchCharacters(page));
  }, [dispatch, page]);

  //calls the memoized function to search the data when the filter options are selected
  useEffect(() => {
    searchMatchingPatterns(searchParam);
  }, [searchMatchingPatterns, searchParam]);

  //renders the data from the API when the app renders for the first time
  useEffect(() => {
    if (renderedData.length === 0) {
      setRenderedData(data ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    onChangeFormValue,
    loadMoreState,
    goToFavorites,
    addToFavorite,
    renderedData,
    onChangeText,
    searchParam,
    onClearText,
    toggleView,
    throwError,
    viewLabel,
    loadMore,
    viewType,
    onPress,
    loading,
    status,
  };
};

export default useList;
