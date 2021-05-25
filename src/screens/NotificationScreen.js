import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class NotificationScreen extends React.Component {

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
                                    <Button transparent onPress={() => navigation.goBack()}>
                                        <Image style={{ height: 25, width: 25 }} source={require('../../img/back-icon.png')} />
                                        <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>Notifications</Text>
                                    </Button>
                                </Left>
                                <Body style={{flex: 0}}>
                                </Body>
                                <Right style={{flex: 0}}>

                                </Right>
                            </Header>


                            <Content>
                                <View style={{marginLeft: 10, marginRight: 10}}>
                                    <View style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                                        <Image style={{ height: 35, width: 35, borderRadius: 50 }} source={require('../../img/user.png')} />
                                        <View style={{marginLeft: 10}}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Text style={{fontWeight: 'bold', fontSize: 10}}>johndoe</Text>
                                                <Text style={{fontSize: 12}}> has started followed you</Text>
                                            </View>
                                            <View>
                                                <Text style={{fontSize: 9, color: '#666666'}}>31/12/2021 12:30PM</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ borderWidth: 0.5, borderColor: '#EEEEEE', marginTop: 10, marginBottom: 10 }}></View>

                                    <View style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                                        <Image style={{ height: 35, width: 35, borderRadius: 50 }} source={require('../../img/user.png')} />
                                        <View style={{marginLeft: 10}}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Text style={{fontWeight: 'bold', fontSize: 10}}>johndoe</Text>
                                                <Text style={{fontSize: 12}}> has send you a new message</Text>
                                            </View>
                                            <View>
                                                <Text style={{fontSize: 9, color: '#666666'}}>31/12/2021 11:30PM</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ borderWidth: 0.5, borderColor: '#EEEEEE', marginTop: 10, marginBottom: 10 }}></View>

                                    <View style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                                        <Image style={{ height: 35, width: 35, borderRadius: 50 }} source={require('../../img/logo.png')} />
                                        <View style={{marginLeft: 10}}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Text style={{fontSize: 12}}>Someone has posted </Text>
                                                <Text style={{fontWeight: 'bold', fontSize: 12}}>15</Text>
                                                <Text style={{fontSize: 12}}> listing related to </Text>
                                                <Text style={{fontWeight: 'bold', fontSize: 12}}>iphone</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Text style={{fontSize: 12}}>in </Text>
                                                <Text style={{fontWeight: 'bold', fontSize: 12}}>Mont Kiara</Text>
                                                <Text style={{fontSize: 12}}> area</Text>
                                            </View>
                                            <View>
                                                <Text style={{fontSize: 9, color: '#666666'}}>31/12/2021 11:00PM</Text>
                                            </View>
                                        </View>
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

export default NotificationScreen;