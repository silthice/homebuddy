import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, FlatList, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Drawer, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import Pie from 'react-native-pie';
import LinearGradient from 'react-native-linear-gradient';
import APIData from '../api/data';
import HTTP from '../api/http';
import CONSTS from '../config/constants';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ProfileScreen extends React.Component {

        navigateDetails(navigation)  {
            debugger
            navigation('HomeScreen');
    };



    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userprofileimg: '',
            mlm_id: '',
            manners: '',
            nego: '',
            response: '',
            punctuality: '',
            overallPersonality: '',
            productLength: '',
            myProductList: [],    
            modalVisibleFilter: false,
        }
    }

    componentDidMount = async () => {
        // this.focusListener = navigation.addListener('focus', () => {
        //     this.setState({ modalVisibleDropDownMenu: false, });
        // });
        const { navigation } = this.props;
        this.initUserAccount();
    }

    initUserAccount = async () => {
        await this.getUserAccount();
        await this.getUserProductListing();
    }

    getUserAccount = async () => {
        //May change & get from API data js file
        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;

        let result = await new HTTP().post(CONSTS.clone_URL + 'myProfileJs', {mlm_id, session_no});

        if (result.status){
            this.setState({ mlm_id: result.user.mlm_id, userprofileimg: result.user.profile_pic, 
                            username: result.user.username, manners: result.user.manners, nego: result.user.negotiation,
                            response: result.user.response, punctuality: result.user.punctuality})
        }

        this.calOverallPersonality();
        console.log('Profile Src getUserAccount: ', result.status);
    }

    calOverallPersonality(){

        let manners = this.state.manners;
        let negotiation = this.state.nego;
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
    
        console.log('total personality in profile src ::: ', this.state.overallPersonality);


    
      }

    getUserProductListing = async () => {

        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;

        let result = await new HTTP().post(CONSTS.clone_URL + 'myProductJs', {mlm_id, session_no});

        if (result.status){
            this.setState({ myProductList: result.list })

            
            var productLength = this.state.myProductList.length;
            
            this.setState({productLength: productLength});
            this.setState({});
            console.log('length ========', productLength)
        }


        console.log('Profile Src getUserProductListing: ', result.status);
    }
    
    
    goProductScreen(nav, pID, sID, cat2ID){
      
        if(pID != '' || pID != null ){
            nav.navigate('ProductScreen', {PID: pID, SID: sID, Cat2ID: cat2ID});
        }
    }

    goEditPostNextScr(nav, pID){
        
        if(pID != ''){
            nav.navigate('EditPostNextScreen', {PID: pID});
        }
        
    }

    deleteProduct(pID){

        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;

        if(mlm_id != '' && session_no != '' && pID != ''){
            Alert.alert("Alert ! Delete Product ! ", 
            "Are you really want to delete this product?",  [
                { text: 'OK' , onPress: () => this.triggerDeleteProduct(pID) },
                { text: 'CANCEL'}
            ],
            { cancelable: true });
        }
    }
    
    triggerDeleteProduct = async (p_id) => {

        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;

        let result = await new HTTP().post(CONSTS.clone_URL + 'deleteProductJs', {mlm_id, session_no, p_id});

        if (result.status){

            Alert.alert("Deleted Product ! ", 
            "Successfully Delete Product?",  [
                { text: 'OK' , onPress: () => this.getUserProductListing()}
            ],
            { cancelable: false });

            this.contentView._root.scrollToPosition(0, 0);
        }
      
        console.log('Profile Src triggerDeleteProduct: ', result.status);
        console.log('Deleted product', pID);
    }

    closeDrawerRight() { this.drawerRightRef._root.close() };

    openDrawerRight() { this.drawerRightRef._root.open() };

    setModalVisibleFilter = (visible) => {
        this.setState({ modalVisibleFilter: visible });
    }
    
    DrawerRight = () => {
        const { modalVisibleFilter } = this.state;
        return (

            <Container style={{ flex: 1, }}>
                <Content style={{ padding: 15, marginTop: 35 }}>

                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Search Filter</Text>

                    <Text style={{ marginTop: 15, fontSize: 13 }}>Categories</Text>
                    {/* <View style={{ padding: 5, flexDirection: 'column', marginTop: 15, marginLeft: 0 }}>
                        <FlatList
                            data={this.state.main_cat_btn2}
                            extraData={this.state.main_cat_btn}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: 10 }}>
                                    {this.state.searchText == '' && APIData.fromScreen == 'SubCatScreen' ?
                                        <Button disabled='true' onPress={() => this.mainCatSelection(item, item.id, item.name)} style={this.state.selectedMain.includes(item) ? styles.selectedStyle : styles.notSelectedStyle}>
                                            {item.name.length < 10 ?
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 10 }}>{(item.name).toUpperCase()}</Text>
                                                    <Text style={{ fontSize: 10 }}> ({item.total})</Text>
                                                </View>
                                                :
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 10 }}>{(item.name).substr(0, 12).toUpperCase() + '...'}</Text>
                                                    <Text style={{ fontSize: 10 }}> ({item.total})</Text>
                                                </View>
                                            }
                                        </Button>
                                        :
                                        <Button onPress={() => this.mainCatSelection(item, item.id, item.name)} style={this.state.selectedMain.includes(item) ? styles.selectedStyle : styles.notSelectedStyle}>
                                            {item.name.length < 10 ?
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 10 }}>{(item.name).toUpperCase()}</Text>
                                                    <Text style={{ fontSize: 10 }}> ({item.total})</Text>
                                                </View>
                                                :
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 10 }}>{(item.name).substr(0, 12).toUpperCase() + '...'}</Text>
                                                    <Text style={{ fontSize: 10 }}> ({item.total})</Text>
                                                </View>
                                            }
                                        </Button>
                                    }
                                </View>
                            )}
                            numColumns={2}
                            keyExtractor={item => item.id}
                            ListFooterComponent={() => {
                                if (this.state.main_cat_btn.length > 4) {
                                    return this.renderFooter()
                                } else {
                                    return null
                                }

                            }}
                        />
                    </View> */}

                    <Text style={{ marginTop: 15, fontSize: 13 }}>Sub Categories</Text>
                  

                    <Text style={{ marginTop: 15, fontSize: 13 }}>Shipping Option</Text>
                  

                    <Text style={{ marginTop: 15, fontSize: 13 }}>Rating</Text>
                    

                    <Text style={{ marginTop: 15, fontSize: 13 }}>Service & Promotion</Text>
                  

                    <Text style={{ marginTop: 15, fontSize: 13 }}>Price Range (RM)</Text>
                  

                    <View style={{ height: 100 }}>
                    </View>


                </Content>




                <Footer style={{ height: 50 }}>
                    <FooterTab style={{ padding: 20, backgroundColor: 'white' }}>
                        <Button onPress={() => { this.reset(modalVisibleFilter) }} style={{ height: 35, borderRadius: 5, borderWidth: 1, borderColor: '#ff5353', backgroundColor: '#FAFAFA', flex: 1, justifyContent: 'center', marginRight: 10 }}><Text style={{ color: '#ff5353', fontSize: 12 }}>Reset</Text></Button>
                        <Button onPress={() => this.applyFilter(modalVisibleFilter)} style={{ height: 35, borderRadius: 5, backgroundColor: '#ff5353', flex: 1, justifyContent: 'center' }}><Text style={{ color: 'white', fontSize: 12 }}>Apply</Text></Button>         
                    </FooterTab>
                </Footer>

            </Container>
        );
    }

    reset = async(modalVisibleFilter) => {
        this.setModalVisibleFilter(!modalVisibleFilter);
        
        this.closeDrawerRight();
    }

    applyFilter = async(modalVisibleFilter) => {
        this.setModalVisibleFilter(!modalVisibleFilter);
        
        this.closeDrawerRight();
    }


    render() {

    const { navigation } = this.props;


    return (
        <Container style={{flex: 1, backgroundColor: 'white'}}>
             <Drawer styles={{ elevation: 0, mainOverlay: 0 }} type='displace' side='right' ref={(refRight) => { this.drawerRightRef = refRight }} content={<this.DrawerRight navigator={this.navigatorRight} />} onClose={() => this.closeDrawerRight()} >
             <Header style={{height: 60, backgroundColor: 'white', elevation: 0, marginTop: 30}}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                <Left style={{flex: 1}}>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Image style={{ height: 25, width: 25 }} source={require('../../img/back-icon.png')} />
                    </Button>
                </Left>
                <Body style={{flex: 0}}>
                </Body>
                <Right style={{flex: 1}}>
                    <Button transparent onPress={() => navigation.navigate('NotificationScreen')}>
                        <Image style={{ height: 25, width: 25}} source={require('../../img/notification-icon-on.png')} />
                    </Button>
                </Right>
            </Header>


            <Content ref={(c) => { this.contentView = c; return; }}>
                <View style={{marginLeft: 10, marginRight: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={{ height: 55, width: 55, borderRadius: 50 }} source={{uri: this.state.userprofileimg}} />
                            <View style={{marginLeft: 5}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 14, marginRight: 10}}>{this.state.username}</Text>
                                    <View style={{backgroundColor: '#65CAC4', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5, padding: 3, paddingLeft: 5, paddingRight: 5}}>
                                        <Image style={{ height: 12, width: 12, marginRight: 3 }} source={require('../../img/diamond-shape.png')} />
                                        <Text style={{color: 'white', fontSize: 10}}>Champ</Text>
                                    </View>
                                </View>
                                <Text style={{color: '#808080', fontSize: 10}}>Mont Kiara</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                            <View style={{alignItems: 'center'}}>
                                <Pie
                                radius={30}
                                innerRadius={25}
                                sections={[
                                    {
                                    percentage: this.state.overallPersonality,
                                    color: '#FF7A59',
                                    },
                                ]}
                                backgroundColor="#ddd"
                                />
                                <View style={styles.gauge}>
                                    <Text style={styles.gaugeText}>{this.state.overallPersonality}{'%'}</Text>
                                </View>
                                <Text style={{fontSize: 8, marginTop: 5}}>Overall Personality</Text>
                            </View>
                        </View>

                        <View>
                            <ScrollView horizontal={true} style={{marginLeft: 10, width: screenWidth * 0.8}} showsHorizontalScrollIndicator={false}>
                                <LinearGradient colors={['#FFD966', '#FFE599']} style={{ width: 80, borderRadius: 15, padding: 10, height: 100, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                    <View style={{height: 75, width: 75, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image style={{ height: 35, width: 35 }} source={require('../../img/personality1.png')} />
                                        <View style={{alignItems: 'center', marginTop: 5}}>
                                            <Text style={{color: 'white', fontSize: 11}}>Manners</Text>
                                            {
                                                this.state.manners == null ? 
                                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>0%</Text>
                                                :
                                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{this.state.manners}{'%'}</Text>
                                            }
                                            
                                        </View>
                                    </View>
                                </LinearGradient>
                                <LinearGradient colors={['#FF6666', '#FF9999']} style={{ width: 80, borderRadius: 15, padding: 10, height: 100, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                    <View style={{height: 75, width: 75, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image style={{ height: 35, width: 35 }} source={require('../../img/personality2.png')} />
                                        <View style={{alignItems: 'center', marginTop: 5}}>
                                            <Text style={{color: 'white', fontSize: 11}}>Negotiation</Text>
                                            {
                                                this.state.manners == null ? 
                                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>0%</Text>
                                                :
                                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{this.state.nego}{'%'}</Text>
                                            }
                                        </View>
                                    </View>
                                </LinearGradient>
                                <LinearGradient colors={['#99CCFF', '#CCE5FF']} style={{ width: 80, borderRadius: 15, padding: 10, height: 100, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                    <View style={{height: 75, width: 75, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image style={{ height: 35, width: 35 }} source={require('../../img/personality3.png')} />
                                        <View style={{alignItems: 'center', marginTop: 5}}>
                                            <Text style={{color: 'white', fontSize: 11}}>Response</Text>
                                            {
                                                this.state.manners == null ? 
                                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>0%</Text>
                                                :
                                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{this.state.response}{'%'}</Text>
                                            }
                                        </View>
                                    </View>
                                </LinearGradient>
                                <LinearGradient colors={['#66FF66', '#99FFCC']} style={{ width: 80, borderRadius: 15, padding: 10, height: 100, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                    <View style={{height: 75, width: 75, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image style={{ height: 35, width: 35 }} source={require('../../img/personality4.png')} />
                                        <View style={{alignItems: 'center', marginTop: 5}}>
                                            <Text style={{color: 'white', fontSize: 11}}>Punctuality</Text>
                                            {
                                                this.state.manners == null ? 
                                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>0%</Text>
                                                :
                                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{this.state.punctuality}{'%'}</Text>
                                            }
                                        </View>
                                    </View>
                                </LinearGradient>
                            </ScrollView>
                        </View>
                        </View>

                    <View style={{borderBottomWidth: 1, borderColor: '#F5F5F5', marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 20}}/>

                    <View>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.state.productLength} Listing(s)</Text>
                        </View>
                        <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                            <Item style={{borderBottomWidth: 0, height: 40, backgroundColor: '#F5F5F5', borderRadius: 10, width: screenWidth * 0.85}}>
                                <Image source={require("../../img/search-icon.png")} style={{ height: 15, width: 15, marginLeft: 10 }} />
                                <Input placeholder="Search in seller's listing" style={{ fontSize: 12, height: 40}} placeholderTextColor="#CCCCCC" onSubmitEditing={() => navigation.navigate('SearchResultScreen')}/>
                            </Item>
                            <Button transparent style={{marginLeft: 10}} onPress={() => { this.openDrawerRight() }}>
                                <Image style={{ height: 25, width: 25 }} source={require('../../img/filter-icon.png')} />
                            </Button>
                        </View>      
                    </View>
                </View>

                <View style={{alignItems:'flex-start', width: screenWidth}}>
                    <View style={{alignItems: 'flex-start', width: screenWidth * 0.95, marginLeft: 10}}>
                        <FlatList
                            data={this.state.myProductList}
                            keyExtractor={(item) => item.p_id}
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
                                            <Text style={{position: 'absolute', color: 'white', fontSize: 11, top: 5, left: 5}}>{item.p_post_by}</Text>
                                            <TouchableOpacity onPress={() => this.deleteProduct(item.p_id)} style={{position: 'absolute',  backgroundColor: 'rgba(255, 99, 71, 0.6)',  borderRadius: 50, width: 20, height: 20, marginTop: 5, right: 10, alignItems:'center'}}>
                                                <View>
                                                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12, marginTop: 2}}>X</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.goEditPostNextScr(navigation, item.p_id)} style={{position: 'absolute',  backgroundColor: 'rgba(255, 99, 71, 0.6)',  borderRadius: 10, width: 50, height: 35, bottom: 5, right: 13, alignItems:'center'}}>
                                                <View>
                                                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12, marginTop: 7}}>EDIT</Text>
                                                </View>
                                            </TouchableOpacity>
                                           
                                          
                                            <View style={{position: 'absolute', backgroundColor: item.p_isFree == 1? 'rgba(255, 99, 71, 0.7)' : 'rgba(1, 1, 1, 0.7)', borderRadius: 10, padding: 10, bottom: 5, left: 5}}>
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
             </Drawer>
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
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  },
})

export default ProfileScreen;