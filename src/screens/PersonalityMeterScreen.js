import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import Pie from 'react-native-pie';
import LinearGradient from 'react-native-linear-gradient';
import APIData from '../api/data';
import HTTP from '../api/http';
import CONSTS from '../config/constants';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class PersonalityMeterScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };

    constructor(props) {
      super(props);

      this.state = {
          manners: '',
          negotiation: '',
          response: '',
          punctuality: '',
          overallPersonality: '',
      }
  }


    componentDidMount = async () => {

      const { navigation } = this.props;
      this.initUserPersonality();
  }

  initUserPersonality = async () => {
      await this.getUserPersonality();
      await this.calOverallPersonality();
  }

  getUserPersonality = async () => {

      let mlm_id = APIData.mlm_id;
      let session_no = APIData.session_no;

      let result = await new HTTP().post(CONSTS.clone_URL + 'getPersonalityJs', {mlm_id, session_no});

      if (result.status){
          this.setState({ manners: result.personality.manners, negotiation: result.personality.negotiation, 
                          response: result.personality.response, punctuality: result.personality.punctuality});
      }

      console.log('Personality Meter Src getUserPersonality: ', result.status);
  }

  calOverallPersonality(){

    let manners = this.state.manners;
    let negotiation = this.state.negotiation;
    let response = this.state.response;
    let punctuality = this.state.punctuality;
    let overallPersonality = 0;

    if(manners == null || manners == ''){
      manners = 0;
    }
    if(negotiation == null || negotiation == ''){
      negotiation = 0;
    }
    if(response == null || response == ''){
      response = 0;
    }
    if(punctuality == null || punctuality == ''){
      punctuality = 0;
    }
    if(manners != null && negotiation != null && response != null && punctuality != null){
     
      overallPersonality = (((manners + negotiation + response + punctuality) / 400) * 100);

      var overallPerInt = parseInt(overallPersonality);

      this.setState({overallPersonality: overallPerInt});
    }

    console.log('total personality in Personality Meter Src::: ', this.state.overallPersonality);

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
                        <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>Personality Meter</Text>
                    </Button>
                </Left>
                <Body style={{flex: 0}}>
                </Body>
                <Right style={{flex: 0}}>

                </Right>
            </Header>


            <Content>
                <View style={{marginLeft: 10, marginRight: 10}}>
                    <View>
                        <View style={{alignSelf: 'center'}}>
                          <Pie
                            radius={120}
                            innerRadius={100}
                            sections={[
                              {
                                percentage: 95,
                                color: '#FF7A59',
                              },
                            ]}
                            backgroundColor="#ddd"
                          />
                          <View
                            style={styles.gauge}
                          >
                          <Text style={{textAlign: 'center'}}>Overall Personality</Text>
                            <Text style={styles.gaugeText}>{this.state.overallPersonality}{'%'}</Text>
                          </View>
                        </View>
                    </View>


                    <View style={{marginTop: 30, alignSelf: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <LinearGradient colors={['#FFD966', '#FFE599']} style={{ width: screenWidth * 0.46, borderRadius: 15, padding: 10, height: 100, justifyContent: 'center', marginRight: 10 }}>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <Image style={{ height: 50, width: 50 }} source={require('../../img/personality1.png')} />
                                    <View style={{marginLeft: 10, alignItems: 'center'}}>
                                        <Text style={{color: 'white'}}>Manners</Text>
                                           {
                                              this.state.manners == null ? 
                                              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>0%</Text>
                                              :
                                              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>{this.state.manners}{'%'}</Text>
                                            }
                                    </View>
                                </View>
                            </LinearGradient>
                            <LinearGradient colors={['#FF6666', '#FF9999']} style={{ width: screenWidth * 0.46, borderRadius: 15, padding: 10, height: 100, justifyContent: 'center' }}>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <Image style={{ height: 50, width: 50 }} source={require('../../img/personality2.png')} />
                                    <View style={{marginLeft: 10, alignItems: 'center'}}>
                                        <Text style={{color: 'white'}}>Negotiation</Text>
                                          {
                                            this.state.negotiation == null ? 
                                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>0%</Text>
                                            :
                                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>{this.state.negotiation}{'%'}</Text>
                                          }
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <LinearGradient colors={['#99CCFF', '#CCE5FF']} style={{ width: screenWidth * 0.46, borderRadius: 15, padding: 10, height: 100, justifyContent: 'center', marginRight: 10 }}>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <Image style={{ height: 50, width: 50 }} source={require('../../img/personality3.png')} />
                                    <View style={{marginLeft: 10, alignItems: 'center'}}>
                                        <Text style={{color: 'white'}}>Response</Text>
                                          {
                                            this.state.response == null ? 
                                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>0%</Text>
                                            :
                                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>{this.state.response}{'%'}</Text>
                                          }
                                    </View>
                                </View>
                            </LinearGradient>
                            <LinearGradient colors={['#66FF66', '#99FFCC']} style={{ width: screenWidth * 0.46, borderRadius: 15, padding: 10, height: 100, justifyContent: 'center' }}>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <Image style={{ height: 50, width: 50 }} source={require('../../img/personality4.png')} />
                                    <View style={{marginLeft: 10, alignItems: 'center'}}>
                                        <Text style={{color: 'white'}}>Punctuality</Text>
                                         {
                                            this.state.punctuality == null ? 
                                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>0%</Text>
                                            :
                                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>{this.state.punctuality}{'%'}</Text>
                                          }
                                    </View>
                                </View>
                            </LinearGradient>
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
  gauge: {
    position: 'absolute',
    width: 250,
    height: 250,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
})

export default PersonalityMeterScreen;