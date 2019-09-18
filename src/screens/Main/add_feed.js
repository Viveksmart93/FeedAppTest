import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Image,
  StyleSheet,
  View,
  TextInput,
  Text,
  ImageBackground,
  Platform,
  Alert,
  Linking,
  TouchableOpacity
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { addUserInfo } from '../../actions/action';

class AddFeed extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      image: '',
      title: '',
      isLoading: false
    }

  }

  selectImage = () => {
    ImagePicker.openPicker({}).then(image => {
      console.log(image);
      this.setState({ image: { uri: image.path } })
    });
  }

  addFeed(){
    this.setState({isLoading:true});
    firebase.storage().ref(this.state.image.uri.substring(this.state.image.uri.lastIndexOf('/')))
    .putFile(this.state.image.uri)
    .then((response)=>{
      console.log(response)
      this.addOtherFeed(response.downloadURL);
    })
    .catch((error)=>{
      console.log(error);
      this.setState({isLoading:false});
    })
  }

  addOtherFeed(image_path){
    var data = {
      image: image_path,
      title: this.state.title,
      user_image: this.props.userInfo.image,
      user_name: this.props.userInfo.name,
      likes: 0,
      comments: 0
    }
    firebase.firestore().collection('Feeds').add(data)
    .then((reference)=>{
      this.setState({isLoading:false});
      console.log(reference)
      this.props.navigation.goBack();
    })
    .catch((error)=>{
      console.log(error);
      this.setState({isLoading:false});
    })
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={style.container}>

        <TouchableOpacity onPress={() => { this.selectImage() }}>
          <Avatar containerStyle={{ width: '100%' }} size="xlarge" source={this.state.image} title="select Image" />
        </TouchableOpacity>

        <View style={{ width: '100%', aspectRatio: 3 / 1, borderWidth: 1, borderColor: '#000', marginTop: 20 }}>
          <TextInput multiline placeholder="Title" onChangeText={(text)=>{this.setState({title:text})}} />
        </View>

        <View style={{flex:1, justifyContent:'flex-end'}}>
          <Button title="Submit" onPress={()=>{
            if(this.state.image && this.state.image.uri){
              this.addFeed()
            }
            }}/>
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
    padding: 20
  }
});

const mapStateToProps = state => {
  return {
    userInfo: state.UserInfo.userInfo
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     addUser: (user) => {
//       dispatch(addUserInfo(user))
//     }
//   }
// }

export default connect(mapStateToProps)(AddFeed)