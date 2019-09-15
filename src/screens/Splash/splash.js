import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Platform,
  Alert,
  Linking,
} from 'react-native';

export default class SplashScreen extends React.Component {

  constructor(props){
    super(props)
    this.state={
      ready: false,
    }

  }
 

  async componentWillMount() {
    setTimeout(() =>  this._bootstrapAsync(), 2000);
  }

  componentDidUpdate(){
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const loginInfo = JSON.parse(await AsyncStorage.getItem('loginInfo'));
    console.log('loginInfo', loginInfo);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(loginInfo ? 'Auth' : 'App');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={style.container}>

        <Text style={{fontSize:20,marginBottom:20}}>Feed App</Text>

        <ActivityIndicator />

      </View>

    );
  }
}

var style = StyleSheet.create({
  container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});