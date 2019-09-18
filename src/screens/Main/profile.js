import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Image,
  StyleSheet,
  DatePickerAndroid,
  View,
  Text,
  ImageBackground,
  Platform,
  Alert,
  Linking,
  TextInput,
  ScrollView
} from 'react-native';
import { Avatar, Icon, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { addUserInfo } from '../../actions/action';
import firebase from 'react-native-firebase';

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      profile_image: null,
      name: this.props.userInfo.name,
      about: this.props.userInfo.about,
      email: this.props.userInfo.user_id,
      mobile: this.props.userInfo.mobile,
      dob: this.props.userInfo.dob,
      loginInfo: '',
      isLoading: false
    }

  }

  async componentWillMount() {
    var loginInfo = JSON.parse(await AsyncStorage.getItem('loginInfo'));
    this.setState({ loginInfo });
  }

  selectImage = () => {
    ImagePicker.openPicker({
      cropping: true
    }).then(image => {
      console.log(image);
      this.setState({ profile_image: { uri: image.path } })
    });
  }

  updateProfile(download_url) {

    var data;

    if (download_url) {
      data = {
        name: this.state.name,
        About: this.state.about,
        email: this.state.email,
        dob: this.state.dob,
        image: download_url
      }
    } else {
      data = {
        name: this.state.name,
        About: this.state.about,
        email: this.state.email,
        dob: this.state.dob
      }
    }

    firebase.firestore().collection('Users').doc(this.state.loginInfo.id)
      .set(data, { merge: true })
      .then((response) => {
        this.setState({ isLoading: false });
        console.log(response);
        this.props.navigation.goBack();
      }).catch((error) => {
        this.setState({ isLoading: false });
        console.log(error);
      })
  }

  updateData() {
    this.setState({ isLoading: true });
    if (this.state.profile_image) {
      firebase.storage().ref(this.state.profile_image.uri.substring(this.state.profile_image.uri.lastIndexOf('/')))
        .putFile(this.state.profile_image.uri)
        .then((response) => {
          console.log(response)
          this.updateProfile(response.downloadURL);
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoading: false });
        })
    } else {
      this.updateProfile();
    }
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={style.container}>

        {/* <ScrollView style={{flex:1}} contentContainerStyle={{ width: '100%' }}> */}
          <Avatar size="large" rounded showEditButton source={this.props.userInfo.image ? { uri: this.props.userInfo.image } : this.state.profile_image} onPress={() => { this.selectImage() }} />
          <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 20 }}>Profile</Text>

          <View style={{ width: '100%' }}>
            <TextInput value={this.state.name} style={style.input} onChangeText={(text) => { this.setState({ name: text }) }} />

            <TextInput value={this.state.about} style={style.input} onChangeText={(text) => { this.setState({ about: text }) }} />

            <TextInput editable={false} value={this.state.email} style={style.input} />

            <TextInput value={this.state.mobile} style={style.input} onChangeText={(text) => { this.setState({ mobile: text }) }} />

            <View style={[style.input, { width: '100%', flexDirection: 'row', padding: 5, alignItems: 'center' }]}>
              <Text style={{ flex: 1 }}>{this.state.dob}</Text>
              <Icon name="date-range" onPress={async () => {
                try {
                  const { action, year, month, day } = await DatePickerAndroid.open({
                    // Use `new Date()` for current date.
                    // May 25 2020. Month 0 is January.
                    date: new Date(),
                  });
                  if (action !== DatePickerAndroid.dismissedAction) {
                    // Selected year, month (0-11), day
                    this.setState({ dob: `${day}/${month + 1}/${year}` });
                  }
                } catch ({ code, message }) {
                  console.warn('Cannot open date picker', message);
                }
              }} />
            </View>

            <Button
              title="Update"
              loading={this.state.isLoading}
              onPress={() => { this.updateData() }}
              buttonStyle={{
                height: 50,
                width: 280,
                borderRadius: 50,
                marginLeft: 40,
                marginRight: 50,
                marginTop: 30,
                elevation: 3,
              }} />

          </View>
        {/* </ScrollView> */}

      </View>

    );
  }
}

var style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10
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

export default connect(mapStateToProps)(Profile)