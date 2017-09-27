import React, {Component} from 'react';
import { SlackUser } from '../Slack/SlackUser'
import { SlackMessage } from '../Slack/SlackMessage'
import { Card } from '../Card'
import moment from 'moment';
// TODO: This component could be refactored into a stateless component: https://medium.com/front-end-hacking/stateless-components-in-react-native-e9034f2e3701
export class SlackCard extends Component {

  // TODO: You do not need to define the constructor if you are not doing something in it
  constructor(props) {
    super();
  }

  render() {
    return this.createSlackCard(this.props.message)
  }

  createSlackCard(message) {
    return (
      <Card key={message.ts}>
        <SlackUser userID={message.user} time={this.fromUnixToTime(message.ts)} />
        <SlackMessage message={message} />
      </Card>
    );
  }

  // TODO: I have seen this function a few times already. Why not creating a 'utils.js' file that then is imported from every file that needs it?
  fromUnixToTime(unixTs) {
    return moment.unix(unixTs).format('hh:mm')
  }

};
