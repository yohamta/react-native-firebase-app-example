import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RkCard } from 'react-native-ui-kitten';
import { fetchPaintings } from '../actions';
import { Spinner } from '../common/components';

class Timeline extends Component {
  componentWillMount() {
    this.props.fetchPaintings();
  }

  renderItem({ item }) {
    return (
      <RkCard style={{ marginBottom: 10 }}>
        <View rkCardHeader>
          <Text>{item.title}</Text>
        </View>
        <Image rkCardImg source={{ uri: item.thumb_url }} />
        <View rkCardFooter>
          <Text>{item.message}</Text>
        </View>
      </RkCard>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList data={this.props.paintings} renderItem={this.renderItem} />
      </View>
    );
  }
}

Timeline.propTypes = {
  fetchPaintings: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  console.log(state);
  return {
    paintings: state.paintings.paintings
  };
};

export default connect(
  mapStateToProps,
  { fetchPaintings }
)(Timeline);
