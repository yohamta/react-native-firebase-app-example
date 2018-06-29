import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RkCard, RkModalImg } from 'react-native-ui-kitten';
import { fetchPaintings, fetchNextPaintings } from '../actions';
import { Spinner } from '../common/components';

class Timeline extends Component {
  componentWillMount() {
    this.props.fetchPaintings();
  }

  onRefresh = () => {
    this.props.fetchPaintings();
  };

  onEndReached = () => {
    if (!this.props.loading && this.props.lastVisible) {
      this.props.fetchNextPaintings(this.props.lastVisible);
    }
  };

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <RkCard style={{ marginBottom: 10 }}>
      <View rkCardHeader>
        <Text>{item.title}</Text>
      </View>
      <RkModalImg
        imgContainerStyle={{ backgroundColor: 'black' }}
        rkCardImg
        source={{ uri: item.thumb_url }}
      />j
      <View rkCardFooter>
        <Text>{item.message}</Text>
      </View>
    </RkCard>
  );

  render() {
    if (this.props.loading && this.props.paintings.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Spinner />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.paintings}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={this.keyExtractor}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          onRefresh={this.onRefresh}
          refreshing={this.props.loading}
        />
      </View>
    );
  }
}

Timeline.propTypes = {
  fetchPaintings: PropTypes.func.isRequired,
  fetchNextPaintings: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  lastVisible: PropTypes.object, // eslint-disable-line
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
  lastVisible: state.paintings.lastVisible,
  loading: state.paintings.loading,
});

export default connect(
  mapStateToProps,
  { fetchPaintings, fetchNextPaintings }
)(Timeline);
