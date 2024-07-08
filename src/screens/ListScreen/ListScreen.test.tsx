// Home.test.tsx
import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import Home from './ListScreen';
import {useAuth, useList} from '../../hooks';
import {
  FAVORITE_LIST_BUTTON_TEST_ID,
  INPUT_TEST_ID,
  SIGN_OUT_BUTTON_TEST_ID,
  LIST_ITEM_TEST_ID,
} from '../../utils/utils';
import {renderWithProvider} from '../../utils/test.utils';
import {RootState} from '../../store';
import {PersistPartial} from 'redux-persist/es/persistReducer';

jest.mock('../../hooks/useAuth');
jest.mock('../../hooks/useList');

const mockUseAuth = useAuth as jest.Mock;
const mockUseList = useList as jest.Mock;

describe('Home Component', () => {
  const mockListData = {
    onChangeFormValue: jest.fn(),
    toggleView: jest.fn(),
    goToFavorites: jest.fn(),
    addToFavorite: jest.fn(),
    loadMoreState: false,
    renderedData: [
      {
        id: '1',
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: {
          name: 'Earth',
        },
        episode: [
          {
            name: 'Power',
          },
        ],
        image: 'https://image.com',
      },
      {
        id: '2',
        name: 'Mary Newman',
        status: 'Alive',
        species: 'Female',
        gender: 'Male',
        origin: {
          name: 'Mars',
        },
        episode: [
          {
            name: 'Real',
          },
        ],
        image: 'https://image.com',
      },
    ],
    onChangeText: jest.fn(),
    searchParam: '',
    onClearText: jest.fn(),
    throwError: jest.fn(),
    viewLabel: 'List',
    viewType: 'list-outline',
    loadMore: jest.fn(),
    onPress: jest.fn(),
    loading: false,
    status: 'All',
  };

  const mockAuthData = {
    signOut: jest.fn(),
  };

  const preloadedState: Partial<RootState & PersistPartial> = {
    characters: {
      info: {
        count: 1,
        pages: 10,
        next: '2',
        prev: '1',
      },
      data: [
        {
          id: '1',
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          gender: 'Male',
          origin: {
            name: 'Earth',
          },
          episode: [
            {
              name: 'Power',
            },
          ],
          image: 'https://image.com',
        },
        {
          id: '2',
          name: 'Mary Newman',
          status: 'Alive',
          species: 'Female',
          gender: 'Male',
          origin: {
            name: 'Mars',
          },
          episode: [
            {
              name: 'Real',
            },
          ],
          image: 'https://image.com',
        },
      ],
      loading: false,
    },
  };

  beforeEach(() => {
    mockUseAuth.mockReturnValue(mockAuthData);
    mockUseList.mockReturnValue(mockListData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText, getByTestId} = renderWithProvider(<Home />, {
      preloadedState,
    });

    // Assert Header component rendering and title
    expect(getByText('CHARACTERS')).toBeTruthy();

    // Assert that the search input is rendered
    expect(getByTestId(INPUT_TEST_ID)).toBeTruthy();

    // Assert that the filter and view toggle are rendered
    expect(getByText('Filter ')).toBeTruthy();
    expect(getByText('List View ')).toBeTruthy();

    // Assert that the favorite button is rendered
    const favoriteButton = getByTestId(FAVORITE_LIST_BUTTON_TEST_ID);
    expect(favoriteButton).toBeTruthy();

    // Assert that the logout button is rendered
    const logoutButton = getByTestId(SIGN_OUT_BUTTON_TEST_ID);
    expect(logoutButton).toBeTruthy();
  });

  it('calls goToFavorites when favorite button is pressed', () => {
    const {getByTestId} = renderWithProvider(<Home />, {
      preloadedState,
    });

    const favoriteButton = getByTestId(FAVORITE_LIST_BUTTON_TEST_ID);
    fireEvent.press(favoriteButton);

    expect(mockListData.goToFavorites).toHaveBeenCalled();
  });

  it('calls signOut when logout button is pressed', () => {
    const {getByTestId} = renderWithProvider(<Home />, {
      preloadedState,
    });

    const logoutButton = getByTestId(SIGN_OUT_BUTTON_TEST_ID);
    fireEvent.press(logoutButton);

    expect(mockAuthData.signOut).toHaveBeenCalled();
  });

  it('calls onPress when a list item is pressed', () => {
    const {getAllByTestId} = renderWithProvider(<Home />, {
      preloadedState,
    });

    const listItem = getAllByTestId(LIST_ITEM_TEST_ID)[0];
    fireEvent.press(listItem);

    expect(mockListData.onPress).toHaveBeenCalled();
  });

  it('calls onChangeText when search input is changed', () => {
    const {getByTestId} = renderWithProvider(<Home />, {
      preloadedState,
    });

    const searchInput = getByTestId(INPUT_TEST_ID);
    fireEvent.changeText(searchInput, 'Rick');

    expect(mockListData.onChangeText).toHaveBeenCalledWith('Rick');
  });
});
