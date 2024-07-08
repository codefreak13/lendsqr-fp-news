import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import FavoriteScreen from './FavoriteScreen';
import {useFavorite} from '../../hooks';
import {
  FAV_LIST_TEST_ID,
  LEFT_BUTTON_TEST_ID,
  LIST_ITEM_TEST_ID,
} from '../../utils/utils';
import {RootState} from '../../store';
import {renderWithProvider} from '../../utils/test.utils';

jest.mock('../../hooks/useFavorite', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    favoriteList: [
      {id: 1, name: 'Character 1'},
      {id: 2, name: 'Character 2'},
    ],
    goBack: jest.fn(),
    onPress: jest.fn(),
  }),
}));

describe('<FavoriteScreen />', () => {
  const mockFavoriteList = {
    favoriteList: [
      {
        id: '1',
        name: 'Rick',
        status: 'Sanchez',
        species: 'Human',
        gender: 'Male',
        origin: {
          name: 'Earth',
        },
        episode: [{name: 'episode'}],
        image: 'https://image.com',
      },
      {
        id: '2',
        name: 'Rick',
        status: 'Sanchez',
        species: 'Human',
        gender: 'Male',
        origin: {
          name: 'Earth',
        },
        episode: [{name: 'episode'}],
        image: 'https://image.com',
      },
    ],
    goBack: jest.fn(),
    onPress: jest.fn(),
  };

  const preloadedState: Partial<RootState> = {
    favorites: {
      favoriteListIds: [],
      favoriteList: [
        {
          id: '1',
          name: 'Rick',
          status: 'Sanchez',
          species: 'Human',
          gender: 'Male',
          origin: {
            name: 'Earth',
          },
          episode: [{name: 'episode'}],
          image: 'https://image.com',
        },
      ],
    },
  };

  beforeEach(() => {
    (useFavorite as jest.Mock).mockReturnValue(mockFavoriteList);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Header and FavoriteList with correct props', () => {
    const {getByText, getByTestId, getAllByTestId} = renderWithProvider(
      <FavoriteScreen />,
      {
        preloadedState,
      },
    );

    // Assert Header component rendering and title
    expect(getByText('FAVORITE CHARACTERS')).toBeTruthy();

    // Assert FavoriteList component rendering and props
    const favoriteItem = getAllByTestId(LIST_ITEM_TEST_ID)?.[0];
    const favoriteList = getByTestId(FAV_LIST_TEST_ID);
    expect(favoriteList).toBeTruthy();
    expect(favoriteList.props.data.length).toBe(2);

    // Simulate press on favorite item
    fireEvent.press(favoriteItem);
    expect(mockFavoriteList.onPress).toHaveBeenCalled();

    // Assert goBack function was called
    fireEvent.press(getByTestId(LEFT_BUTTON_TEST_ID));
    expect(mockFavoriteList.goBack).toHaveBeenCalled();
  });
});
