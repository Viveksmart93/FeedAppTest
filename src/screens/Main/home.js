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
  FlatList,
} from 'react-native';
import { Avatar, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { addUserInfo, getFeeds } from '../../actions/action';

import firebase from 'react-native-firebase';

var unsubscribeUserInfo = null;
var unsubscribeFeeds = null;
class Home extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      ready: false,
    }

  }

  async componentWillMount() {
    var loginInfo = JSON.parse(await AsyncStorage.getItem('loginInfo'));

    this.getUserInfo(loginInfo);
    this.getFeeds();

  }

componentWillUnmount(){
  unsubscribeFeeds();
}

  getUserInfo(loginInfo) {
    unsubscribeUserInfo = firebase.firestore().collection('Users').doc(loginInfo.id)
      .onSnapshot((documenSnapshot) => {
        if (documenSnapshot) {
          this.props.addUser(documenSnapshot.data());
        }
      }, (error) => {
        console.log(error);
      })
  }

  getFeeds() {
    unsubscribeFeeds = firebase.firestore().collection('Feeds').onSnapshot((querySnapshot) => {
      console.log(querySnapshot);
      var feeds = [];
        if (querySnapshot) {
          querySnapshot.forEach((documenSnapshot)=>{
            console.log(documenSnapshot);
            feeds.push(documenSnapshot.data());
          })
        }
        this.props.getAllFeeds(feeds);
      }, (error) => {
        console.log(error);
      })
  }

  renderFeed = ({ item }) => (
    <Card>
      <View style={{ flexDirection: 'row' }}>
        <Avatar
          rounded
          size="large"
          source={item.user_image ? { uri: item.user_image } : require('../../assets/profile.png')}
        />
        <View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'center' }}>
          <Text style={{ fontSize: 20 }}>{item.user_name}</Text>
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
        </View>
      </View>
      <Avatar containerStyle={{ width: '100%', marginTop:10 }} size="xlarge" source={{uri: item.image}} />
      <View style={{flexDirection:'row',paddingTop:10, alignItems:'center'}}>
        <Icon name="md-heart-empty" type="ionicon" />
        <Text style={{marginRight:20, marginLeft:5}}>{item.likes}</Text>
        <Icon name="comment" type="evilicon" />
        <Text style={{marginRight:20, marginLeft:5}}>{item.comments}</Text>
      </View>
    </Card>
  );

  // Render any loading content that you like here
  render() {
    return (
      <View style={style.container}>

        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props.feeds}
            renderItem={this.renderFeed}
          />
        </View>

        {this.state.isLoading ?
          <View style={{
            flex: 1, elevation: 2, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center', position: 'absolute', width: '100%', height: '100%'
          }}>
            <ActivityIndicator color={Color.white} size='large' />
            <Text style={{ color: Color.white, marginTop: 10 }}>{"Please Wait...!"}</Text>
          </View>
          : null}

      </View>

    );
  }
}

var style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
});

const mapStateToProps = state => {
  return {
    userInfo: state.UserInfo.userInfo,
    feeds: state.UserInfo.feeds
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: (user) => {
      dispatch(addUserInfo(user))
    },
    getAllFeeds: (feeds) => {
      dispatch(getFeeds(feeds))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)