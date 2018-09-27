import React from 'react';
import { StyleSheet, Text, ScrollView, View, ActivityIndicator, RefreshControl } from 'react-native';
import moment from 'moment';

import PullRequest from './PullRequest';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: null,
      pullRequests: [],
      pullRequestsWIP: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this.updatePullRequests()
  }

  updatePullRequests() {
    this.setState({isLoading: true});
    fetch('https://reviewrot.appspot.com/')
      .then((response) => response.json())
      .then((responseJson) => this.handlePullRequestsUpdate(responseJson));
  }

  handlePullRequestsUpdate(pullRequestsData) {
    const pullRequests = []
    const pullRequestsWIP = [];
    let total = 0;

    for (const pullRequest of pullRequestsData) {
      if (pullRequest.title.toUpperCase().startsWith('WIP:')) {
        pullRequestsWIP.push(pullRequest);
      } else {
        pullRequests.push(pullRequest);
      }

      total += pullRequest.time;
    }

    const age = moment.unix(total / pullRequestsData.length).fromNow(true);
    this.setState({
      age: age,
      pullRequests: pullRequests,
      pullRequestsWIP: pullRequestsWIP,
      isLoading: false
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Open Pull Requests</Text>
          <ActivityIndicator/>
        </View>
      )
    }

    const pullRequests = this.state.pullRequests.map((pullRequest, index) => {
      return (
        <PullRequest key={index.toString()} {...pullRequest} />
      )
    });

    const pullRequestsWIP = this.state.pullRequestsWIP.map((pullRequest, index) => {
      return (
        <PullRequest key={index.toString()} {...pullRequest} />
      )
    });

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={this.state.isLoading} onRefresh={this.updatePullRequests.bind(this)}/>
          }>
        <Text style={styles.title}>Open Pull Requests</Text>
        <Text style={styles.subtitle}>Average age:&nbsp;&nbsp;
          <View style={[styles.bold, styles.badge]}>
            <Text style={styles.badgeText}>{this.state.age}</Text>
          </View>
        </Text>
        { pullRequests }

        <Text style={[styles.title, styles.titleWIP]}>WIP Pull Requests</Text>
        { pullRequestsWIP }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 30,
    backgroundColor: '#fcfcfc'
  },
  title: {
    marginLeft: 15,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 20 
  },
  titleWIP: {
    marginTop: 50,
    marginBottom: 20
  },
  badge: {
    backgroundColor: '#777',
    borderRadius: 5,
    paddingHorizontal: 10
  },
  badgeText: {
    color: 'white',
  }
});
