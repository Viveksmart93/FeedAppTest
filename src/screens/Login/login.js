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
    TextInput,
    Button
} from 'react-native';

export default class SplashScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ready: false,
        }

    }

    // Render any loading content that you like here
    render() {
        return (
            <View style={style.container}>

                <Text style={{ fontSize: 30, marginBottom: 20 }}>Login</Text>

                <TextInput style={{ width: '100%', borderWidth: 1, borderColor: '#000', marginBottom:10 }} placeholder='Email' />

                <TextInput style={{ width: '100%', borderWidth: 1, borderColor: '#000', marginBottom:20 }} placeholder='Password' />

                <Button title="Login" />

            </View>

        );
    }
}

var style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:20
    }
});