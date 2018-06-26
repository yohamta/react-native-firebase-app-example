import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTimeline } from '../actions';

class Timeline extends Component {
  componentWillMount() {
    this.props.fetchTimeline();
  }

  render() {
    return (
      <View>
        <Text>Hello world</Text>
      </View>
    );
  }
}

Timeline.propTypes = {
  fetchTimeline: PropTypes.func.isRequired,
};

export default connect(
  null,
  { fetchTimeline }
)(Timeline);
