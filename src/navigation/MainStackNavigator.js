import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SplashScreen from '../screens/SplashScreen'
import HomeScreen from '../screens/HomeScreen'
import CategoryScreen from '../screens/CategoryScreen'
import MessageScreen from '../screens/MessageScreen'
import AccountScreen from '../screens/AccountScreen'
import PostScreen from '../screens/PostScreen'
import SearchScreen from '../screens/SearchScreen'
import SearchResultScreen from '../screens/SearchResultScreen'
import ProductScreen from '../screens/ProductScreen'
import ProductScreenImg from '../screens/ProductScreenImg'
import SubCategoryScreen from '../screens/SubCategoryScreen'
import NotificationScreen from '../screens/NotificationScreen'
import MessageDetailScreen from '../screens/MessageDetailScreen'
import MySalesScreen from '../screens/MySalesScreen'
import MyPurchasesScreen from '../screens/MyPurchasesScreen'
import MyFavouritesScreen from '../screens/MyFavouritesScreen'
import EditPostNextScreen from '../screens/EditPostNextScreen'
import PostNextScreen from '../screens/PostNextScreen'
import NearbySettingScreen from '../screens/NearbySettingScreen'
import PersonalityMeterScreen from '../screens/PersonalityMeterScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SellerProfileScreen from '../screens/SellerProfileScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator()

const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

function MainStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name='SplashScreen'
                    component={SplashScreen}
                    options={{ title: 'SplashScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                    options={{ title: 'HomeScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='CategoryScreen'
                    component={CategoryScreen}
                    options={{ title: 'CategoryScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='MessageScreen'
                    component={MessageScreen}
                    options={{ title: 'MessageScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='AccountScreen'
                    component={AccountScreen}
                    options={{ title: 'AccountScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='PostScreen'
                    component={PostScreen}
                    options={{ title: 'PostScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='SearchScreen'
                    component={SearchScreen}
                    options={{ title: 'SearchScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='SearchResultScreen'
                    component={SearchResultScreen}
                    options={{ title: 'SearchResultScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='ProductScreen'
                    component={ProductScreen}
                    options={{ title: 'ProductScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='ProductScreenImg'
                    component={ProductScreenImg}
                    options={{ title: 'ProductScreenImg', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='SubCategoryScreen'
                    component={SubCategoryScreen}
                    options={{ title: 'SubCategoryScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='NotificationScreen'
                    component={NotificationScreen}
                    options={{ title: 'NotificationScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='MessageDetailScreen'
                    component={MessageDetailScreen}
                    options={{ title: 'MessageDetailScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='MySalesScreen'
                    component={MySalesScreen}
                    options={{ title: 'MySalesScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='MyPurchasesScreen'
                    component={MyPurchasesScreen}
                    options={{ title: 'MyPurchasesScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='MyFavouritesScreen'
                    component={MyFavouritesScreen}
                    options={{ title: 'MyFavouritesScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='PostNextScreen'
                    component={PostNextScreen}
                    options={{ title: 'PostNextScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                  <Stack.Screen
                    name='EditPostNextScreen'
                    component={EditPostNextScreen}
                    options={{ title: 'EditPostNextScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='NearbySettingScreen'
                    component={NearbySettingScreen}
                    options={{ title: 'NearbySettingScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='PersonalityMeterScreen'
                    component={PersonalityMeterScreen}
                    options={{ title: 'PersonalityMeterScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='ProfileScreen'
                    component={ProfileScreen}
                    options={{ title: 'ProfileScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='SellerProfileScreen'
                    component={SellerProfileScreen}
                    options={{ title: 'SellerProfileScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='WelcomeScreen'
                    component={WelcomeScreen}
                    options={{ title: 'WelcomeScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='LoginScreen'
                    component={LoginScreen}
                    options={{ title: 'LoginScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
                <Stack.Screen
                    name='SignUpScreen'
                    component={SignUpScreen}
                    options={{ title: 'SignUpScreen', cardStyleInterpolator: forFade, animationEnabled: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStackNavigator
