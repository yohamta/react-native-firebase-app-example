import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RkCard } from 'react-native-ui-kitten';
import { fetchPaintings } from '../actions';

class Timeline extends Component {
  componentWillMount() {
    this.props.fetchPaintings();
  }

  onEndReached = () => {
    return 1;
  };

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.paintings}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

Timeline.propTypes = {
  fetchPaintings: PropTypes.func.isRequired,
  paintings: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumb_url: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = state => ({
  paintings: state.paintings.paintings,
});

export default connect(
  mapStateToProps,
  { fetchPaintings }
)(Timeline);
