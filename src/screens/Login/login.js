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
    TextInput
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class SplashScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ready: false,
            email: '',
            password: '',
            isEmailvalid: true,
            isPasswordvalid: true
        }

    }

    validateEmail(text) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(text)
    }

    login() {
        this.setState({
            loading: true,
            isEmailvalid: this.validateEmail(this.state.email) || this.email.shake(),
            isPasswordvalid: this.state.password.length > 0 || this.password.shake()
        }, () => {
            if (this.state.isEmailvalid && this.state.isPasswordvalid) {
                this.getLogin()
            }else{
                this.setState({loading:false});
            }
        })
    }

    getLogin() {
        firebase.firestore().collection('Users')
            .where('user_id', '==', this.state.email)
            .where('password', '==', this.state.password)
            .get()
            .then(async(response) => {
                this.setState({loading: false});
                if (response.size > 0) {
                    console.log(response.docs[0]);
                    var loginObject = {
                        id: response.docs[0].id,
                        object: response.docs[0].data()
                    }
                    await AsyncStorage.setItem('loginInfo',JSON.stringify(loginObject));
                    this.props.navigation.navigate('App');
                } else {
                    this.setState({ isEmailvalid: false, isPasswordvalid: 'false' });
                }
            }).catch(() => {
                this.setState({loading: false});
                this.setState({ isEmailvalid: false, isPasswordvalid: 'false' });
            });
    }

    // Render any loading content that you like here
    render() {
        return (
            <View style={style.container}>

                <Text style={{ fontSize: 30, marginBottom: 20 }}>Login</Text>

                <Input
                    ref={(input) => this.email = input}
                    onChangeText={(text) => { this.setState({ email: text }) }}
                    errorStyle={{ color: 'red', }}
                    errorMessage={this.state.isEmailvalid ? null : 'Enter valid email id'}
                    containerStyle={{ width: '100%', marginBottom: 10 }}
                    placeholder='Email'
                />

                <Input
                    ref={(input) => this.password = input}
                    onChangeText={(text) => { this.setState({ password: text }) }}
                    errorStyle={{ color: 'red', }}
                    errorMessage={this.state.isPasswordvalid ? null : 'Enter valid password'}
                    containerStyle={{ width: '100%', marginBottom: 20 }}
                    secureTextEntry={true}
                    placeholder='Password'
                />

                <Button
                    title="Login"
                    loading={this.state.loading}
                    onPress={() => { this.login() }}
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

        );
    }
}

var style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
});