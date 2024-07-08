import React from 'react';
import {render} from '@testing-library/react-native';
import LoadingIcon from './Loader';
import {COLORS, LOADER_TEST_ID} from '../../../utils/utils';
import {SIZE} from '../../../types';

describe('LoadingIcon Component', () => {
  const defaultProps = {
    color: COLORS.Black,
    size: SIZE.small,
    loadingStyle: {},
  };

  it('renders correctly with default props', () => {
    const {getByTestId} = render(<LoadingIcon {...defaultProps} />);
    const loader = getByTestId(LOADER_TEST_ID);
    expect(loader).toBeTruthy();
  });

  it('renders correctly with custom color', () => {
    const customColor = 'red';
    const {getByTestId} = render(<LoadingIcon color={customColor} />);
    const loader = getByTestId(LOADER_TEST_ID);
    expect(loader.props.color).toBe(customColor);
  });

  it('renders correctly with custom size', () => {
    const customSize = SIZE.large;
    const {getByTestId} = render(<LoadingIcon size={customSize} />);
    const loader = getByTestId(LOADER_TEST_ID);
    expect(loader.props.size).toBe(customSize);
  });

  it('applies default color when no color is provided', () => {
    const {getByTestId} = render(<LoadingIcon />);
    const loader = getByTestId(LOADER_TEST_ID);
    expect(loader.props.color).toBe(COLORS.Black);
  });

  it('applies default size when no size is provided', () => {
    const {getByTestId} = render(<LoadingIcon />);
    const loader = getByTestId(LOADER_TEST_ID);
    expect(loader.props.size).toBe('small');
  });
});
