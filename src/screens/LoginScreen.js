import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import Swiper from 'react-native-swiper';
import HTTP from '../api/http';
import CONSTS from '../config/constants';
import GetLocation from 'react-native-get-location';
import APIData from '../api/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class LoginScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };

    constructor(props){
       super(props);
       this.state = {

          usrOrEmail: 'giaps',
          pwd: '123456789@',
          //usrOrEmail: 'zed',
          //pwd: '123456789@',

       };
    }

    componentDidMount = async () => {

      const { navigation } = this.props;

      this.focusListener = navigation.addListener('focus', () => {
          
      });

  }


  loginUser = async(nav) =>{

      let login_id = this.state.usrOrEmail;
      let pwd = this.state.pwd;

      let result = await new HTTP().post(CONSTS.clone_URL + 'loginJs', { login_id , pwd});

      if(result.status){
        console.log('Login Scr Login User :', result.status)

        APIData.mlm_id = result.mlm_id;
        APIData.session_no = result.session_no;

        await this.getUserProfile(nav);

      }else{
        console.log('Login Scr Login User :', result.status, result.errors)
        Alert.alert('Account', result.errors)
      }

  }


  getUserProfile = async(nav) =>{

      let mlm_id = APIData.mlm_id;
      let session_no = APIData.session_no;

      let result = await new HTTP().post(CONSTS.clone_URL + 'myProfileJs', {mlm_id, session_no});

      if (result.status){
        //console.log('Login Src getUserAccount: ', result.user);

        await this.setAsyncStorage(result.user.contact_no, result.user.email, result.user.id, 
                                   result.user.profile_pic, result.user.username, result.user.referral_id,
                                   result.user.status, result.user.type, result.user.verify, result.user.user_location_title);

        nav.navigate('AccountScreen')
      }
  }

  setAsyncStorage = async (contact_no, email, id, profile_pic, username, referral_id, status, type, verify, locationTitle) => {

    console.log(APIData.mlm_id, APIData.session_no)

    await AsyncStorage.clear();

      APIData.isLogin = 1;
      APIData.id = id;
      APIData.username = username;
      APIData.profile_pic = profile_pic;
      APIData.email = email;
      APIData.referral_id = referral_id;
      APIData.status = status;
      APIData.type = type;
      APIData.verify = verify;
      APIData.contact_no = contact_no;
      APIData.locationTitle = locationTitle;

      if(contact_no != null){
        await AsyncStorage.setItem('contact_no', contact_no)
      }
      await AsyncStorage.setItem('isLogin', '1')
      await AsyncStorage.setItem('mlm_id', APIData.mlm_id)
      await AsyncStorage.setItem('session_no', APIData.session_no)
      await AsyncStorage.setItem('email', email)
      await AsyncStorage.setItem('id', id.toString())
      await AsyncStorage.setItem('profile_pic', profile_pic)
      await AsyncStorage.setItem('username', username)
      await AsyncStorage.setItem('referral_id', referral_id.toString())
      await AsyncStorage.setItem('status', status.toString())
      await AsyncStorage.setItem('type', type.toString())
      await AsyncStorage.setItem('verify', verify.toString())
      await AsyncStorage.setItem('locationTitle', locationTitle)
  }


    render() {

    const { navigation } = this.props;


          return (
                  <Container style={{flex: 1, backgroundColor: 'white'}}>

                  <Header style={{height: 60, backgroundColor: 'white', elevation: 0, marginTop: 30}}>
                  <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                      <Left style={{flex: 1}}>
                          <Button transparent onPress={() => navigation.goBack()}>
                              <Image style={{ height: 25, width: 25 }} source={require('../../img/back-icon.png')} />
                              <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>Login</Text>
                          </Button>
                      </Left>
                      <Body style={{flex: 0}}>
                      </Body>
                      <Right style={{flex: 0}}>

                      </Right>
                  </Header>


                  <Content>
                      <View style={{alignSelf: 'center', marginTop: 30}}>
                          <Image style={{ height: 200, width: 200, borderRadius: 20 }} source={require('../../img/logo-word.png')} />
                      </View>


                      <View style={{alignSelf: 'center', marginTop: 50}}>


                          <Item style={{borderBottomWidth: 0, height: 50, backgroundColor: '#F5F5F5', borderRadius: 5, width: screenWidth * 0.8, marginBottom: 10}}>
                            <Input placeholder='Username / Email' style={{fontSize: 12}} placeholderTextColor="#CCCCCC" onChangeText={(uoe) =>{ this.setState({usrOrEmail: uoe})}}/>
                          </Item>

                          <Item style={{borderBottomWidth: 0, height: 50, backgroundColor: '#F5F5F5', borderRadius: 5, width: screenWidth * 0.8}}>
                            <Input placeholder='Password' style={{fontSize: 12}} placeholderTextColor="#CCCCCC" secureTextEntry={true} onChangeText={(pss) =>{ this.setState({pwd: pss})}}/>
                          </Item>

                          <Button  onPress ={() => this.loginUser(navigation)} style={{backgroundColor: '#FF7A59', width: screenWidth * 0.8, justifyContent: 'center', borderRadius: 5, marginTop: 40, marginLeft: 2}}>
                              <Text style={{color: 'white'}}>LOGIN</Text>
                          </Button>

                          <TouchableOpacity>
                            <Text style={{color: '#FF7A59', fontWeight: 'bold', textAlign: 'center', marginTop: 30}}>Forgot Password?</Text>
                          </TouchableOpacity>

                      </View>

                  </Content>

            </Container>
          );
      }

}






const styles = StyleSheet.create({

  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
  height: 500,
  justifyContent: 'center',
  alignItems: 'center',
  },
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoginScreen;