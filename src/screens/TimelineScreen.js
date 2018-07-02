import React, { Component } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RkCard, RkText } from 'react-native-ui-kitten';
import { StyleSheet } from 'react-native-stylesheet-merge';
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

  renderItem({ item }) {
    const { navigate } = this.props.navigation;
    const {
      cardStyle,
      imgContainerStyle,
      imgStyle,
      cardContentStyle,
      textStyle,
    } = styles;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigate('Detail', { item });
        }}
      >
        <RkCard style={cardStyle}>
          <Image
            rkCardImg
            imgContainerStyle={imgContainerStyle}
            source={{ uri: item.thumbUrl }}
            resizeMode="cover"
            style={imgStyle}
          />
          <View rkCardImgOverlay rkCardContent style={cardContentStyle}>
            <RkText style={textStyle}>{item.message}</RkText>
            <RkText style={textStyle}>{item.title}</RkText>
          </View>
        </RkCard>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    if (this.props.loading && this.props.paintings.length === 0) {
      return (
        <View style={styles.loadingContainerStyle}>
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
          style={styles.flatListStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainerStyle: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
  },
  flatListStyle: {
    backgroundColor: 'gray',
  },
  cardStyle: {
    margin: 0,
    padding: 0,
    backgroundColor: 'black',
  },
  imgContainerStyle: {
    backgroundColor: 'black',
  },
  imgStyle: {
    width: Dimensions.get('window').width,
    marginBottom: 0,
    padding: 0,
  },
  cardContentStyle: {
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  textStyle: {
    color: 'white',
    textAlign: 'right',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

Timeline.propTypes = {
  fetchPaintings: PropTypes.func.isRequired,
  fetchNextPaintings: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  lastVisible: PropTypes.object, // eslint-disable-line
  paintings: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumbUrl: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
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
