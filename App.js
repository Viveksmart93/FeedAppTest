/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Splash from './src/screens/Splash/splash';
import Login from './src/screens/Login/login';
import Home from './src/screens/Main/home';
import AddFeed from './src/screens/Main/add_feed';
import Profile from './src/screens/Main/profile';

console.disableYellowBox = true;

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: () => ({
      header: null
    })
  }
})

const AppStack = createBottomTabNavigator({
  Home:{
    screen: Home
  },
  Add: {
    screen: AddFeed
  },
  Profile: {
    screen: Profile
  }
})

const AppSwitch = createSwitchNavigator({
  Splash: Splash,
  App: AppStack,
  Auth: AuthStack
})

const AppNavigator = createAppContainer(AppSwitch);

export default AppNavigator;
