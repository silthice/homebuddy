/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  YellowBox
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'
import MainStackNavigator from './src/navigation/MainStackNavigator'

import 'react-native-gesture-handler';


YellowBox.ignoreWarnings(['ViewPageAndroid']);
console.disableYellowBox = true;

export default function App() {
   <View>
   <StatusBar translucent backgroundColor="white" barStyle="light-content" />
   </View>
   SplashScreen.hide();

  return <MainStackNavigator />
}