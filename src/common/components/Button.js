import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Button = ({ onPress, children }) => {
  const { containerStyle, buttonStyle, textStyle } = styles;
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={textStyle}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};
Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
const styles = {
  containerStyle: {
    flex: 1,
  },
  textStyle: {
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

export { Button }; // eslint-disable-line import/prefer-default-export
