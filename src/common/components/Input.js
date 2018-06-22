import React from 'react';
import { TextInput, View, Text } from 'react-native';
import PropTypes from 'prop-types';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
  style,
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        style={[inputStyle, style]}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholder={placeholder}
      />
    </View>
  );
};
Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  multiline: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // eslint-disable-line react/forbid-prop-types
};
Input.defaultProps = {
  secureTextEntry: false,
  multiline: false,
  style: {},
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  containerStyle: {
    display: 'flex',
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export { Input }; // eslint-disable-line import/prefer-default-export
