import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import Swiper from 'react-native-swiper';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class WelcomeScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };



             render() {

             const { navigation } = this.props;


                    return (
                            <Container style={{flex: 1, backgroundColor: 'white'}}>

                            <Header style={{height: 60, backgroundColor: 'white', elevation: 0, marginTop: 30}}>
                            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                                <Left style={{flex: 1}}>
                                    <Button transparent onPress={() => navigation.replace('AccountScreen')}>
                                        <Image style={{ height: 25, width: 25 }} source={require('../../img/back-icon.png')} />
                                    </Button>
                                </Left>
                                <Body style={{flex: 0}}>
                                </Body>
                                <Right style={{flex: 0}}>

                                </Right>
                            </Header>


                            <Content>
                                    <Swiper style={styles.wrapper} dot={<View style={{ backgroundColor: '#f1f1f1', width: 10, height: 10, borderRadius: 50, marginLeft: 3, marginRight: 3, bottom: -10 }} />}
                                        activeDot={<View style={{ backgroundColor: '#FF7A59', width: 10, height: 10, borderRadius: 50, marginLeft: 3, marginRight: 3, bottom: -10}} />}
                                        autoplayTimeout={5.0} loop={true}>


                                                    <View style={styles.slide1}>
                                                        <Image style={{ width: screenWidth, height: 400, resizeMode: 'contain' }} source={require('../../img/illus1.png')} />
                                                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Sell and Share</Text>
                                                        <Text style={{fontSize: 12, marginTop: 5}}>Make money and donate to your neighbourhood</Text>
                                                    </View>
                                                    <View style={styles.slide1}>
                                                        <Image style={{ width: screenWidth, height: 400, resizeMode: 'contain' }} source={require('../../img/illus2.png')} />
                                                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Chat Instantly</Text>
                                                        <Text style={{fontSize: 12, marginTop: 5}}>Chat instantly to deal with others</Text>
                                                    </View>
                                                    <View style={styles.slide1}>
                                                        <Image style={{ width: screenWidth, height: 400, resizeMode: 'contain' }} source={require('../../img/illus3.png')} />
                                                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Join Community</Text>
                                                        <Text style={{fontSize: 12, marginTop: 5}}>Join the community and start sharing</Text>
                                                    </View>
                                    </Swiper>


                                    <View style={{alignSelf: 'center', marginTop: 150}}>
                                        <Button onPress={() => navigation.navigate('LoginScreen')} vertical style={{backgroundColor: '#FF7A59', height: 40, marginLeft: 20, marginRight: 20, borderRadius: 10, width: screenWidth * 0.9, justifyContent: 'center'}}>
                                            <Text style={{color: 'white', fontSize: 15}}>Login</Text>
                                        </Button>
                                        <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
                                            <Text style={{color: '#999999', fontSize: 12}}>new to HomeBuddy? </Text>
                                            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                                                <Text  style={{color: '#FF7A59', fontSize: 12, fontWeight: 'bold'}}>Sign Up</Text>
                                            </TouchableOpacity>
                                        </View>
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

export default WelcomeScreen;