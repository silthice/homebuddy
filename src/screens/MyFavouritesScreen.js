import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, FlatList, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import APIData from '../api/data';
import HTTP from '../api/http';
import CONSTS from '../config/constants';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class MyFavouritesScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };



    constructor(props) {
        super(props);

        this.state = {
            modalVisibleDropDownMenu: false,
            myFavourite: [],
        }
    }

    componentDidMount = async () => {
        // this.focusListener = navigation.addListener('focus', () => {
        //     this.setState({ modalVisibleDropDownMenu: false, });
        // });
        const { navigation } = this.props;
        this.initMyFavourite();
    }

    initMyFavourite= async () => {
        await this.getMyFavourite();
    }

    goProductScreen(nav, pID, sID, cat2ID){
      
        if(pID != '' || pID != null ){
            nav.navigate('ProductScreen', {PID: pID, SID: sID, Cat2ID: cat2ID});
        }
    }

    getMyFavourite= async () => {
   
        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;
        let result = await new HTTP().post(CONSTS.clone_URL + 'myFavouriteJs', {mlm_id, session_no});

        if (result.status){
            this.setState({ myFavourite: result.list })
        }
        //console.log('APIDATA : ', APIData);
        console.log('My Favourite Src getMyFavourite: ', result.list);
    }

    removeFav = async(fav_id) =>{

        console.log('removed fav');

        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;
        const data = new FormData();

        data.append('mlm_id', mlm_id);
        data.append('session_no', session_no);
        data.append('fav_id', fav_id);

        if (mlm_id !== '' && session_no !== '' && fav_id !== '') {

            await fetch(CONSTS.clone_URL + "deleteFavouriteJs", {
                method: "POST",
                body: data,
                header: {
                    'Content-Type': 'application/form-data',
                }
            })
                .then(response => response.json())
                .then(response => {
                    console.log('response here', response);
                    if (response.status == true) {
                        var x = '';
                        x = response.msg;
                        this.props.navigation.replace('MyFavouritesScreen', {mlm_id, session_no});
                    } else {
                        var x = '';
                        x = response.failed;
                        console.log(x[0])
                        Alert.alert('Remove Favourite Failed', response.failed[0]);
                    }
                })

        } else {
            Alert.alert("Please Login", "Please proceed to login");
        }      
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
                                <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>My Favourites</Text>
                            </Button>
                        </Left>
                        <Body style={{flex: 0}}>
                        </Body>
                        <Right style={{flex: 0}}>

                        </Right>
                    </Header>


                    <Content>
                        <View style={{marginLeft: 10, marginRight: 10}}>

                            <View style={{flexDirection: 'row', alignSelf: 'center'}}>

                            <FlatList
                                data={this.state.myFavourite}
                                keyExtractor={(item) => item.fav_id}
                                horizontal={false}
                                numColumns={2}
                                renderItem={({item}) => ( 
                                    <View style={{marginTop: 20}}>
                                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>

                                        <TouchableOpacity onPress={() => this.goProductScreen(navigation, item.p_id, item.p_seller_id, item.p_category2)}>
                                        <View>
                                            <View>
                                                <Image style={{ height: 200, width: screenWidth * 0.465, borderRadius: 15 }} source={{uri: item.cover_img}} />
                                                <View style={{ height: 200, width: screenWidth * 0.465, borderRadius: 15, backgroundColor: 'black', position: 'absolute', opacity: 0.14 }}/>
                                                <TouchableOpacity onPress={() => this.removeFav(item.fav_id)} style={{ height: 35, width: 35, position: 'absolute', right: 5, top: 5  }}>
                                                    <Image style={{ height: 30, width: 30, position: 'absolute', right: 10, top: 10  }} source={require('../../img/heart_full.png')} />
                                                </TouchableOpacity>
                                              
                                                <Text style={{position: 'absolute', color: 'white', fontSize: 11, top: 5, left: 5}}>{item.p_post_by}</Text>
                                                <View style={{position: 'absolute', backgroundColor: 'rgba(1, 1, 1, 0.7)', borderRadius: 10, padding: 10, bottom: 5, left: 5}}>
                                                    {
                                                        item.p_isFree == 1 ?
        
                                                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>FREE</Text>
                                                        :
                                                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>RM {item.p_price}</Text>
                                                    }
                                                </View>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <View style={{backgroundColor: '#FF7A59', borderRadius: 5, width: 60, flexDirection: 'row', alignItems: 'center', padding: 3, marginTop: 10, marginRight: 5, justifyContent: 'center'}}>
                                                    <Image style={{ height: 12, width: 12}} source={require('../../img/location-icon-white.png')} />
                                                    <Text style={{color: 'white', fontSize: 10}}>1.02KM</Text>
                                                </View>
                                            </View>
                                            <View style={{marginTop: 3}}>
                                                {
                                                    item.p_name.length > 20 ?
                                                    <Text style={{fontWeight: 'bold', fontSize: 13}}>{item.p_name.substr(0,20)} ...</Text>
                                                    :
                                                    <Text style={{fontWeight: 'bold', fontSize: 13}}>{item.p_name}</Text>
                                                }
                                            </View>
                                            <View style={{flexDirection: 'row', marginTop: 2}}>
                                                <Image style={{ height: 12, width: 12, marginRight: 3}} source={require('../../img/user.png')} />
                                                <Text style={{fontSize: 10}}>{item.seller}</Text>
                                            </View>
                                        </View>
                                        </TouchableOpacity>
        
                                        <View style={{width: screenWidth * 0.025}}/>
        
                                    </View>
                                    </View>
                                )}/>
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

export default MyFavouritesScreen;