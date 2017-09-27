import React from 'react';
import { StyleSheet, Text, View, Navigator, AsyncStorage } from 'react-native'; // TODO: Try to keep your imports in alphabetical order, otherwise it becomes a mess when the project grows.
import { StackNavigator } from 'react-navigation';
// TODO: Try to be consistent with imports/exports. Either use default or named imports for the components under ./ui/screens, but not both
import NewsFeed from './ui/screens/NewsFeed';
import { Login } from './ui/screens/Login/Login';
import { Introduction } from './ui/screens/Introduction/Introduction.js';
import { Registration } from './ui/screens/Registration/Registration.js';
import { Landing } from './ui/screens/Landing/Landing.js';
export default class Routes extends React.Component {

    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
    }

    state = {
      routeName: null
    };

    componentDidMount() {
        // TODO: Later you should move this flag to the persistent redux store
      AsyncStorage.getItem('loggedin', (err, result) => {
        if (result) {
          this.setState({ routeName: 'newsFeed' });
        } else {
          this.setState({ routeName: 'introduction' });
        }
      });
    }

    renderScene(route, navigator) {
      const Component = ROUTES[route.name];
      return <Component route={this.props.route} navigator={navigator} />;
    }

    render() {
        if(this.state.routeName == null){
          return null;
        }

        return (
            <Navigator
                style={styles.container}
                initialRoute={{ name: this.state.routeName }}
                renderScene={this.renderScene}
                configureScene={() => Navigator.SceneConfigs.FloatFromRight}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const ROUTES = {
    login: Login,
    newsFeed: NewsFeed,
    registration: Registration,
    introduction: Introduction,
    landing: Landing
};
