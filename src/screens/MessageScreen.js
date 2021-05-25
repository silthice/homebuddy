import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import HTTP from '../api/http';
import CONSTS from '../config/constants';
import APIData from '../api/data';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class MessageScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount = async () => {
      
        const { navigation } = this.props;

          this.focusListener = navigation.addListener('focus', () => {
            APIData.currentScreen = 'MessageScreen';
        });
    }






             render() {

             const { navigation } = this.props;


                    return (
                            <Container style={{flex: 1, backgroundColor: 'white'}}>

                            <Header style={{height: 60, backgroundColor: 'white', elevation: 0, marginTop: 30}}>
                            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                                <Left style={{flex: 1}}>
                                    <Button transparent>
                                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Messages</Text>
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
                                    <TouchableOpacity onPress={() => navigation.navigate('MessageDetailScreen')}>
                                    <View style={{padding: 7, flexDirection: 'row', alignItems: 'center'}}>
                                        <Image style={{ height: 45, width: 45, borderRadius: 50 }} source={require('../../img/user.png')} />
                                        <View style={{marginLeft: 10}}>
                                            <Text style={{marginBottom: 5, fontSize: 12}}>johndoe</Text>
                                            <Text style={{fontWeight: 'bold', fontSize: 12}}>iPhone 11 Pro Black 256GB ...</Text>
                                            <Text style={{fontSize: 12}}>Morning. When can we meet...</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 10}}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <View style={{backgroundColor: '#FF3333', borderRadius: 50, height: 20, width: 20, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Text style={{color: 'white', fontSize: 11}}>1</Text>
                                                </View>
                                                <View style={{marginLeft: 5, marginBottom: 5}}>
                                                    <Text style={{fontSize: 9, color: '#666666'}}>31/12/2021 12:30PM</Text>
                                                </View>
                                            </View>
                                            <Image style={{ height: 45, width: 45, borderRadius: 10 }} source={require('../../img/product1.png')} />
                                        </View>
                                    </View>
                                    </TouchableOpacity>

                                    <View style={{ borderWidth: 0.5, borderColor: '#EEEEEE', marginTop: 10, marginBottom: 10 }}></View>

                                    <View style={{padding: 7, flexDirection: 'row', alignItems: 'center'}}>
                                        <Image style={{ height: 45, width: 45, borderRadius: 50 }} source={require('../../img/user.png')} />
                                        <View style={{marginLeft: 10}}>
                                            <Text style={{marginBottom: 5, fontSize: 12}}>marykay</Text>
                                            <Text style={{fontWeight: 'bold', fontSize: 12}}>Double Sofa with Checker ...</Text>
                                            <Text style={{fontSize: 12}}>How long u have been using...</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 10}}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <View style={{backgroundColor: null, borderRadius: 50, height: 20, width: 20, alignItems: 'center', justifyContent: 'center'}}>

                                                </View>
                                                <View style={{marginLeft: 5, marginBottom: 5}}>
                                                    <Text style={{fontSize: 9, color: '#666666'}}>08/08/2021 2:30AM</Text>
                                                </View>
                                            </View>
                                            <Image style={{ height: 45, width: 45, borderRadius: 10 }} source={require('../../img/product3.png')} />
                                        </View>
                                    </View>

                                    <View style={{ borderWidth: 0.5, borderColor: '#EEEEEE', marginTop: 10, marginBottom: 10 }}></View>

                                    <View style={{padding: 7, flexDirection: 'row', alignItems: 'center'}}>
                                        <Image style={{ height: 45, width: 45, borderRadius: 50 }} source={require('../../img/user.png')} />
                                        <View style={{marginLeft: 10}}>
                                            <Text style={{marginBottom: 5, fontSize: 12}}>oleole</Text>
                                            <Text style={{fontWeight: 'bold', fontSize: 12}}>Genuine Leather Dress Sh ...</Text>
                                            <Text style={{fontSize: 12}}>Still available?</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end', position: 'absolute', right: 10}}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <View style={{backgroundColor: null, borderRadius: 50, height: 20, width: 20, alignItems: 'center', justifyContent: 'center'}}>

                                                </View>
                                                <View style={{marginLeft: 5, marginBottom: 5}}>
                                                    <Text style={{fontSize: 9, color: '#666666'}}>01/01/2021 11:10AM</Text>
                                                </View>
                                            </View>
                                            <Image style={{ height: 45, width: 45, borderRadius: 10 }} source={require('../../img/product4.jpg')} />
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
                                    <Button vertical active style={{ backgroundColor: null }}>
                                        <Image style={{ height: 25, width: 25, marginBottom: 5 }} source={require('../../img/message-icon-on.png')} />
                                        <Text style={{ fontSize: 8, color: '#FF7A59', fontWeight: 'bold' }}>Messages</Text>
                                    </Button>
                                    <Button vertical onPress={() => navigation.navigate('AccountScreen')}>
                                        <Image style={{ height: 25, width: 25, marginBottom: 5 }} source={require('../../img/account-icon.png')} />
                                        <Text style={{ fontSize: 8 }}>My Account</Text>
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

export default MessageScreen;