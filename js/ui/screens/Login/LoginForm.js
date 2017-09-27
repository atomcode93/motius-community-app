import React, { Component } from 'react';
import { Text, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { usernameChanged, passwordChanged, login } from '../../../logic/login/actions'
import { Spinner, Input, Card, CardSection, Button } from '../../components'
import axios from 'axios'; // TODO: Careful with unused imports

class LoginForm extends Component {

  navigate(rounteName) { // TODO: Typo
    this.props.navigator.push({ name: rounteName });
  }
  // TODO: I don't think it is a good idea to put the input values inside redux. I would suggest to have them in the component state.
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Username"
            placeholder="Motius Username"
            returnKeyType="next"
            value={this.props.username}
            onChangeText={(text) => this.onUsernameChange(text)}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Motius Password"
            returnKeyType="go"
            value={this.props.password}
            onChangeText={(text) => this.onPasswordChange(text)}
          />
        </CardSection>
        <Text style={styles.errorText}>
          {this.props.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }

  // TODO: I am not much of a fan of using mapDispatchToProps, since it encourage code repetition, such as this functions
  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }

  onPasswordChange(text) {
      this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { username, password, succesful } = this.props;
    this.props.login({ username, password })
    if (succesful) {
      this.navigate('newsFeed');
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    )
  }

}

const styles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#c80032',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({ auth }) => {
  const { username, password, error, loading } = auth;
  return { username, password, error, loading };
}

export default connect(mapStateToProps, { usernameChanged, passwordChanged, login })(LoginForm);
