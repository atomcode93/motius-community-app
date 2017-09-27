import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Navigator } from 'react-native';
import LoginForm  from './LoginForm.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export class Login extends React.Component {

  static navigationOptions = {
      title: 'Login'
  }

  render() {
    return(
      <View style = {styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator = {false}>
          <View style = {styles.logoContainer}>
            <Image
              style = {styles.logo}
              source = {
                require('../../assets/motius.png') // TODO: Ask me how you can manage resources more effectively than by always referencing the path.
            }
            />
            <Text style = {styles.title}>
              Motius
            </Text>
          </View>
          <View>
            <LoginForm navigator={this.props.navigator}/>
          </View>
        </KeyboardAwareScrollView>
      </View>

    )
  }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  logoContainer: {
    flex: 1,
    height: height / 2, // TODO: Width and height can change on runtime (for instance, when the device is rotated). Always query Dimensions.get and set the style in the render function. Also, I think in this case you should not pass an explicit height value, but rather just use flex to set the height.
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    width: 120, // TODO: Try not to use fixed size values for images. It's a bit tricky to use flex, but it can (and should) be done.
    height: 120
  },

  title: {
    color: '#00485e',
    fontSize: 30,
    marginTop: 10,
    textAlign: 'center',
  },

  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
