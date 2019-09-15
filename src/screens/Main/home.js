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
 

  // Render any loading content that you like here
  render() {
    return (
      <View style={style.container}>

        <Text style={{fontSize:20,marginBottom:20}}>Home</Text>

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