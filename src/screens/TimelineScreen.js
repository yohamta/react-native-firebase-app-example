import React, { Component } from 'react';
import { View, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RkCard, RkText } from 'react-native-ui-kitten';
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
    <RkCard style={{ margin: 0, padding: 0, backgroundColor: 'black' }}>
      <Image
        rkCardImg
        imgContainerStyle={{ backgroundColor: 'black' }}
        source={{ uri: item.thumb_url }}
        style={{ height: 400, marginBottom: 0, padding: 0 }}
      />
      <View
        rkCardImgOverlay
        rkCardContent
        style={{
          height: 400,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          margin: 0,
          padding: 0,
        }}
      >
        <RkText
          style={{
            color: 'white',
            textAlign: 'right',
            textShadowColor: 'black',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 2,
          }}
        >
          {item.message}
        </RkText>
        <RkText
          style={{
            color: 'white',
            textAlign: 'right',
            textShadowColor: 'black',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 2,
          }}
        >
          {item.title}
        </RkText>
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
          style={{ backgroundColor: 'gray' }}
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
