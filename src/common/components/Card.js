import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Card = props => {
  const { containerStyle } = styles;
  return <View style={containerStyle}>{props.children}</View>;
};
Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    flex: 1,
  },
};

export { Card }; // eslint-disable-line import/prefer-default-export
