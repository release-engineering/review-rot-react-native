import React from 'react';
import { Text, Linking, TouchableHighlight, Image, View, StyleSheet } from 'react-native';

export default class PullRequest extends React.Component {
  style = {
    marginBottom: 10,
    fontSize: 20
  }

  handleTitlePress(event) {
    Linking.openURL(this.props.url);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.image}} style={styles.image} />
        <View style={styles.textContainer}>
          <TouchableHighlight>
            <Text numberOfLines={1} style={styles.title}
                onPress={this.handleTitlePress.bind(this)}>
              {this.props.title}
            </Text>
          </TouchableHighlight>
          <Text style={styles.bold}>@{this.props.user}</Text>
          <Text numberOfLines={1}>
            Submitted {this.props.relative_time} ago
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#d6d7da'
  },
  image: {
    borderRadius: 40,
    marginLeft: 15,
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: 20
  },
  bold: {
    fontWeight: 'bold'
  }
});
