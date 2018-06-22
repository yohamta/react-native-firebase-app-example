import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const CardSection = props => {
  const { containerStyle } = styles;
  return <View style={[containerStyle, props.style]}>{props.children}</View>;
};
CardSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
CardSection.defaultProps = {
  style: {},
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
};

export { CardSection }; // eslint-disable-line import/prefer-default-export
