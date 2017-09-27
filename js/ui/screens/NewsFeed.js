import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { Text, View, ListView, RefreshControl  } from 'react-native';
// TODO: You can create a '../components/index.js' file that collects all components under components/, so that you then can do import {Header, SlackCard, Spinner} from '../components'
import { Header } from '../components/Header';
import { SlackCard } from '../components/Slack/SlackCard';
import { Spinner } from '../components/Spinner';
import * as messageActions from '../../logic/message/actions'
import * as memberActions from '../../logic/member/actions'

// TODO: Try to be consistent with your import system. Either use import ... from ... or require(), but not both.
var GLOBAL = require('../../common/Globals.js');

class NewsFeed extends React.Component {

    state = {
      messages: [],
      members: [],
      dates: [],
      loading: false,
      refreshing: false
    };

    constructor() {
      super();
      this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    componentDidMount() {
      this.fetchData()
    }

    render() {
      const { newsFeedStyle } = styles
        return (
            <View style={newsFeedStyle}>
                <Header text={'News Feed'} />
                <ListView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh.bind(this)}
                    />
                  }
                  enableEmptySections
                  dataSource={this.getDataSource()}
                  renderRow={(message) => <SlackCard message={message} />}
                />
            </View>
        );
    }

    onRefresh() {
      this.setState({ refreshing: true });
      this.fetchData();
    }

    getDataSource() {
      var dataSource = this.ds.cloneWithRows(this.getMessages());
      return dataSource;
    }

    getMessages() {
      var membersIDArray = [];
      this.state.members.forEach(member => membersIDArray.push(member.id));
      return this.state.messages.filter(message =>
        membersIDArray.includes(message.user)
      );
    }

    getDates() {
      // TODO: You can refactor this as const dates = this.getMessages().map(message => this.fromUnixToDate(message.tx));
      var dates = [];
      this.getMessages().forEach(message => dates.push(this.fromUnixToDate(message.ts)));
      return new Set(dates);
    }

    getTimes() {
      // TODO: You can also use map here
      var times = [];
      this.getMessages().forEach(message => times.push(this.fromUnixToTime(message.ts)));
      return new Set(times);
    }

    fetchData() {
      let { dispatch } = this.props;
      let messageAction = messageActions.fetchMessages(GLOBAL.SLACK_HISTORY_CHANNEL);
      let memberAction = memberActions.fetchMembers(GLOBAL.SLACK_USERS_LIST);
      // TODO: Do never pass props to the state unless you need to modify them afterwards and you keep the data consistent with new updates (using componentWillReceiveProps).
      this.setState({
        messages: this.props.messages,
        members: this.props.members,
        refreshing: false
      });
      dispatch(messageAction);
      dispatch(memberAction);
    }

    fromUnixToDate(unixTs) {
      return moment.unix(unixTs).format('MMMM Do YYYY')
    }

    fromUnixToTime(unixTs) {
      return moment.unix(unixTs).format('hh:mm')
    }
};

const styles = {
  newsFeedStyle: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },

  headerTextStyle: {
    fontSize: 20,
    fontWeight: '500'
  }
};

function mapStateToProps({ messages, members }) {
  return { messages, members };
}

export default connect(mapStateToProps)(NewsFeed);
