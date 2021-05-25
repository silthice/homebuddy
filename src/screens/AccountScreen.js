import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Alert, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import APIData from '../api/data';
import HTTP from '../api/http';
import CONSTS from '../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class AccountScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };

    constructor(props) {
        super(props);

        this.state = {
            modalVisibleDropDownMenu: false,
            username: '',
            userprofileimg: '',
            mlm_id: '',
        }
    }

    componentDidMount = async () => {
       
        const { navigation } = this.props;

            this.initUserAccount();

         this.focusListener = navigation.addListener('focus', () => {
           this.initUserAccount();
        });

    }

    initUserAccount = async () => {

        const a = await AsyncStorage.getItem('isLogin');

        if(a != null){

            await this.getUserAccount();
        }
    }

    getUserAccount = async () => {
        //May change & get from API data js file
        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;
        let result = await new HTTP().post(CONSTS.clone_URL + 'myProfileJs', {mlm_id, session_no});

        if (result.status){
            this.setState({ mlm_id: result.user.mlm_id, userprofileimg: result.user.profile_pic, 
                            username: result.user.username})
        }
        //console.log('APIDATA : ', APIData);
        console.log('Account Src getUserAccount: ', result.status);
    }

    profileScreen(nav){
        if(!this.state.mlm_id == null || !this.state.mlm_id == '') 
        {
            nav.navigate('ProfileScreen');
            console.log('Account Src mlm_id is Exist : Success Pass');
        }
        else{
            console.log('Account Src mlm_id is Not Exist : Failed');
        }
    }

    LogoutUser = async (nav) => {

        Alert.alert(
            'Logout',
            'Do you really want to logout?',
            [
                { text: 'OK', onPress: () => this.LogutUserFunction(nav)},
                { text: 'Cancel'}
            ],
            { cancelable: false }
        );  

    }

    LogutUserFunction = async (nav) =>{

        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;

        let result = await new HTTP().post(CONSTS.clone_URL + 'logoutJs', {mlm_id, session_no})

        if(result.status){
            await AsyncStorage.clear();
            APIData.isLogin = 0;
    
            nav.replace('AccountScreen')
        }

        console.log('Account Screen LogutUserFunction', result.status)
    }

    render() {

    const { navigation } = this.props;


        return (
                <Container style={{flex: 1, backgroundColor: 'white'}}>

                <Header style={{height: 60, backgroundColor: 'white', elevation: 0, marginTop: 30}}>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                    <Left style={{flex: 1}}>
                        <Button transparent>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>My Account</Text>
                        </Button>
                    </Left>
                    <Body style={{flex: 1}}>
                    </Body>
                    <Right style={{flex: 1}}>
                        <Button transparent onPress={() => navigation.navigate('NotificationScreen')}>
                            <Image style={{ height: 25, width: 25}} source={require('../../img/notification-icon-on.png')} />
                        </Button>
                    </Right>
                </Header>


                <Content>
                    <View style={{marginLeft: 10, marginRight: 10}}>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{marginRight: 10}}>
                                {
                                    this.state.userprofileimg == ''?
                                    <Image style={{ height: 60, width: 60, borderRadius: 50}} source ={require('../../img/user.png')}/>
                                    :
                                    <Image style={{ height: 60, width: 60, borderRadius: 50}} source ={{uri: this.state.userprofileimg}}/>
                                }
                                
                            </View>
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>{this.state.username}</Text>
                                    {
                                        APIData.isLogin == 1? 
                                        <View style={{backgroundColor: '#65CAC4', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5, padding: 3, paddingLeft: 5, paddingRight: 5, marginLeft: 5}}>
                                            <Image style={{ height: 12, width: 12, marginRight: 3 }} source={require('../../img/diamond-shape.png')} />
                                            <Text style={{color: 'white', fontSize: 10}}>Champ</Text>
                                        </View>
                                        :
                                        null
                                    
                                    }
                                </View>
                                <View>
                                    {
                                        APIData.isLogin == 1?
                                        
                                        <Text style={{color: '#808080', fontSize: 12}}>{APIData.locationTitle}</Text>
                                        :
                                        null
                                    }
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => APIData.isLogin == 0? navigation.navigate('WelcomeScreen') : this.LogoutUser(navigation)} style={{position: 'absolute', right: 100}}>
                                <View style={{borderRadius: 5, borderWidth: 1, borderColor: '#E6E6E6', padding: 8}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 12}}>{APIData.isLogin == 0? 'Login' : 'Logout'}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.profileScreen(navigation)} style={{position: 'absolute', right: 10}}>
                            <View style={{borderRadius: 5, borderWidth: 1, borderColor: '#E6E6E6', padding: 8}}>
                                <Text style={{fontWeight: 'bold', fontSize: 12}}>View Profile</Text>
                            </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{borderBottomWidth: 1, borderColor: '#F5F5F5', marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 20}}/>

                        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('MySalesScreen')} style={{flex: 0.33}}>
                            <View style={{alignItems: 'center'}}>
                                <Image style={{ height: 65, width: 65}} source={require('../../img/mysales.png')} />
                                <Text style={{fontSize: 12}}>My Sales</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('MyPurchasesScreen')} style={{ flex: 0.33}}>
                            <View style={{alignItems: 'center'}}>
                                <Image style={{ height: 65, width: 65}} source={require('../../img/mypurchases.png')} />
                                <Text style={{fontSize: 12}}>My Purchases</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('MyFavouritesScreen')} style={{flex: 0.33}}>
                            <View style={{alignItems: 'center'}}>
                                <Image style={{ height: 65, width: 65}} source={require('../../img/myfavourites.png')} />
                                <Text style={{fontSize: 12}}>My Favourites</Text>
                            </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{borderBottomWidth: 1, borderColor: '#F5F5F5', marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 20}}/>

                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('NearbySettingScreen')}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <Image style={{ height: 25, width: 25, marginRight: 10}} source={require('../../img/nearby.png')} />
                                <Text style={{fontSize: 12}}>Nearby Settings</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('PersonalityMeterScreen')}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <Image style={{ height: 25, width: 25, marginRight: 10}} source={require('../../img/personality.png')} />
                                <Text style={{fontSize: 12}}>Personality Meter</Text>
                            </View>
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <Image style={{ height: 25, width: 25, marginRight: 10}} source={require('../../img/badges.png')} />
                                <Text style={{fontSize: 12}}>Badges</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <Image style={{ height: 25, width: 25, marginRight: 10}} source={require('../../img/following.png')} />
                                <Text style={{fontSize: 12}}>Following</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image style={{ height: 25, width: 25, marginRight: 10}} source={require('../../img/keywords.png')} />
                                <Text style={{fontSize: 12}}>Keywords</Text>
                            </View>
                        </View>

                        <View style={{borderBottomWidth: 1, borderColor: '#F5F5F5', marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 20}}/>

                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <Image style={{ height: 25, width: 25, marginRight: 10}} source={require('../../img/setttings.png')} />
                                <Text style={{fontSize: 12}}>Settings</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <Image style={{ height: 25, width: 25, marginRight: 10}} source={require('../../img/share.png')} />
                                <Text style={{fontSize: 12}}>Share Our App</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <Image style={{ height: 25, width: 25, marginRight: 10}} source={require('../../img/invite.png')} />
                                <Text style={{fontSize: 12}}>Invite Friends</Text>
                            </View>
                        </View>

                    </View>


                </Content>





                <Footer style={{ height: 60, borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: null }}>
                    <FooterTab style={{ backgroundColor: 'white' }}>
                        <Button vertical onPress={() => navigation.navigate('HomeScreen')}>
                            <Image style={{ height: 28, width: 28, marginBottom: 5 }} source={require('../../img/home-icon.png')} />
                                <Text style={{ fontSize: 8 }}>Discover</Text>
                        </Button>
                        <Button vertical onPress={() => navigation.navigate('CategoryScreen')}>
                            <Image style={{ height: 25, width: 25, marginBottom: 5 }} source={require('../../img/category-icon.png')} />
                                <Text style={{ fontSize: 8 }}>Category</Text>
                        </Button>
                        <Button vertical onPress={() => navigation.navigate('PostScreen')} style={{marginBottom: 10}}>
                            <Image style={{ height: 50, width: 50, marginBottom: 5 }} source={require('../../img/post-icon.png')} />
                            <Text style={{ fontSize: 8 }}>Post</Text>
                        </Button>
                        <Button vertical onPress={() => navigation.navigate('MessageScreen')}>
                            <Image style={{ height: 25, width: 25, marginBottom: 5 }} source={require('../../img/message-icon.png')} />
                            <Text style={{ fontSize: 8 }}>Messages</Text>
                        </Button>
                        <Button vertical active style={{ backgroundColor: null }}>
                            <Image style={{ height: 25, width: 25, marginBottom: 5 }} source={require('../../img/account-icon-on.png')} />
                            <Text style={{ fontSize: 8, color: '#FF7A59', fontWeight: 'bold' }}>My Account</Text>
                        </Button>
                    </FooterTab>
                </Footer>





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
  height: 180,
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

export default AccountScreen;