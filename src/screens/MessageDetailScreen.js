import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import RBSheet from "react-native-raw-bottom-sheet";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class MessageDetailScreen extends React.Component {

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
                                        <Image style={{ height: 25, width: 25, marginLeft: 5 }} source={require('../../img/user.png')} />
                                        <View style={{marginLeft: 10}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 12}}>johndoe</Text>
                                            <Text style={{fontSize: 10, color: '#00CC66'}}>Online</Text>
                                        </View>
                                    </Button>
                                </Left>
                                <Body style={{flex: 0}}>
                                </Body>
                                <Right style={{flex: 0}}>

                                </Right>
                            </Header>

                            <View style={{padding: 10}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image style={{ height: 45, width: 45, borderRadius: 10, marginRight: 10 }} source={require('../../img/product1.png')} />
                                    <View>
                                        <Text style={{width: screenWidth * 0.9}}>iPhone 11 Pro Black 256GB Full Set under Warranty</Text>
                                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>RM 5,299.00</Text>
                                    </View>
                                </View>

                                <View style={{marginTop: 10}}>
                                    <Button onPress={() => this.RBSheet.open()} vertical style={{backgroundColor: '#FF7A59', borderRadius: 10, height: 30, padding: 5, width: 80, justifyContent: 'center'}}>
                                        <Text style={{ fontSize: 11, color: 'white', color: 'white', fontWeight: 'bold' }}>Make Deal</Text>
                                    </Button>
                                </View>
                            </View>

                            <Content>
                                <View style={{marginLeft: 10, marginRight: 10}}>
                                    <View style={{marginTop: screenHeight * 0.75}}>
                                        <View>
                                            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                                                <Image style={{ height: 25, width: 25, marginLeft: 5, marginRight: 10 }} source={require('../../img/user.png')} />
                                                    <View style={{backgroundColor: '#E6E6E6', borderRadius: 10, padding: 10}}>
                                                        <Text>Yes</Text>
                                                    </View>
                                            </View>
                                            <Text style={{fontSize: 8, paddingLeft: 40, paddingTop: 5}}>01/01/2021 00:00:00</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                            <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                                                <View style={{backgroundColor: '#FF7A59', borderRadius: 10, padding: 10}}>
                                                    <Text style={{color: 'white'}}>Is this available?</Text>
                                                </View>
                                                <Text style={{fontSize: 8, paddingTop: 5}}>01/01/2021 00:00:00</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <RBSheet
                                  ref={ref => {
                                    this.RBSheet = ref;
                                  }}
                                        height={250}
                                        openDuration={250}
                                        customStyles={{
                                        container: {
                                            padding: 20
                                        }
                                        }}
                                    >

                                  <Content>

                                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                          <Image style={{ height: 15, width: 15, marginRight: 5 }} source={require('../../img/user.png')} />
                                          <Text style={{fontSize: 9, fontWeight: 'bold'}}>johndoe</Text>
                                          <Text style={{fontSize: 9}}> is selling </Text>
                                          <Text style={{fontSize: 9, fontWeight: 'bold'}}>iPhone 11 Pro Black 256GB Full Set under Warranty</Text>
                                          <Text style={{fontSize: 9}}> for </Text>
                                          <Text style={{fontSize: 9, fontWeight: 'bold'}}>RM 5,299</Text>
                                      </View>

                                      <View style={{borderBottomWidth: 1, borderColor: '#f1f1f1', marginTop: 10, marginBottom: 10}} />

                                      <View style={{alignSelf: 'center'}}>
                                          <Text style={{color: 'gray', fontSize: 15}}>{"You're making a deal for this item:"}</Text>
                                          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 25, marginTop: 5}}>RM 5,299.00</Text>
                                      </View>

                                  </Content>

                                  <Footer  style={{backgroundColor: null}}>
                                    <FooterTab style={{backgroundColor: null}}>
                                        <Button vertical style={{backgroundColor: '#FF7A59', borderRadius: 10, height: 45, padding: 5, width: 80}}>
                                            <Text style={{ fontSize: 12, color: 'white', color: 'white', fontWeight: 'bold' }}>Send Deal Request</Text>
                                        </Button>
                                    </FooterTab>
                                  </Footer>

                                </RBSheet>


                            </Content>

                            <Footer style={{ height: 60, borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: null }}>
                                <FooterTab style={{ backgroundColor: 'white', alignItems: 'center' }}>
                                    <Button vertical>
                                        <Image style={{ height: 25, width: 25, marginLeft: -10}} source={require('../../img/attach.png')} />
                                    </Button>
                                    <Item style={{borderBottomWidth: 0, height: 40, backgroundColor: '#F5F5F5', borderRadius: 10, width: screenWidth * 0.6, marginLeft: -10}}>
                                        <Input placeholder="Type your message here" style={{ fontSize: 12, height: 40, marginLeft: 10}} placeholderTextColor="#CCCCCC"/>
                                    </Item>
                                    <Button vertical style={{backgroundColor: '#FF7A59', borderRadius: 10, height: 40, marginLeft: 10, marginRight: 10}}>
                                        <Text style={{ fontSize: 12, color: 'white' }}>Send</Text>
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

export default MessageDetailScreen;