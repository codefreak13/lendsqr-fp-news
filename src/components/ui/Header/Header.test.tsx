import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Header, {HeaderProps, HeaderButton} from './Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {
  HEADER_TEST_ID,
  LEFT_BUTTON_TEST_ID,
  MIDDLE_ICON_TEST_ID,
  RIGHT_BUTTON_TEST_ID,
} from '../../../utils/utils';

describe('Header Component', () => {
  const leftButton: HeaderButton = {
    child: <FontAwesome name="arrow-left" size={16} color="black" />,
    onclick: jest.fn(),
  };

  const rightButton: HeaderButton = {
    child: <FontAwesome name="arrow-right" size={16} color="black" />,
    onclick: jest.fn(),
  };

  const defaultProps: HeaderProps = {
    leftButton,
    rightButton,
    showBottomBorder: true,
    customHeaderStyles: {backgroundColor: 'blue'},
    title: 'Header Title',
  };

  it('renders correctly with left and right buttons', () => {
    const {getByTestId} = render(<Header {...defaultProps} />);

    expect(getByTestId(LEFT_BUTTON_TEST_ID)).toBeTruthy();
    expect(getByTestId(RIGHT_BUTTON_TEST_ID)).toBeTruthy();
  });

  it('handles left button click event', () => {
    const {getByTestId} = render(<Header {...defaultProps} />);

    expect(getByTestId(LEFT_BUTTON_TEST_ID)).toBeTruthy();
    fireEvent.press(getByTestId(LEFT_BUTTON_TEST_ID));
    expect(leftButton.onclick).toHaveBeenCalled();
  });

  it('handles right button click event', () => {
    const {getByTestId} = render(<Header {...defaultProps} />);

    expect(getByTestId(RIGHT_BUTTON_TEST_ID)).toBeTruthy();
    fireEvent.press(getByTestId(RIGHT_BUTTON_TEST_ID));
    expect(rightButton.onclick).toHaveBeenCalled();
  });

  it('applies custom styles', () => {
    const {getByTestId} = render(<Header {...defaultProps} />);

    const header = getByTestId(HEADER_TEST_ID);
    expect(header.props.style).toContain(defaultProps.customHeaderStyles);
  });

  it('renders custom middle icon correctly', () => {
    const customMiddleIcon = (
      <FontAwesome name="star" size={16} color="black" />
    );
    const props = {...defaultProps, customMiddleIcon};
    const {getByTestId} = render(<Header {...props} />);
    expect(getByTestId(MIDDLE_ICON_TEST_ID).props.children).toBe(
      'Header Title',
    );
  });
});
