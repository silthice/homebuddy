import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, BackHandler, StatusBar, Alert, RefreshControl, Image, AppRegistry,FlatList, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab, Picker, Drawer  } from "native-base";
import HTTP from '../api/http';
import CONSTS from '../config/constants';
import GetLocation from 'react-native-get-location';
import APIData from '../api/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class HomeScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };

    constructor(props) {
        super(props);

        this.state = {
            modalVisibleDropDownMenu: false,
            product: [],
            productImage: [],
            Latitude: 0.00,
            Longitude: 0.00,
            modalVisibleFilter: false,
            mainLoaded: false,
            selectedMain: [],
            location: [],
            locationTitle: '',
            main_cat: [
                {
                    'id': '1',
                    'name': 'WOMEN FASHION',
                    'total': '110'
                },
                {
                    'id': '2',
                    'name': 'MAN FASHION',
                    'total': '50'
                },
                {
                    'id': '3',
                    'name': 'CHILDREN FASHION',
                    'total': '34'
                },
                {
                    'id': '4',
                    'name': 'SPORT & GAMING',
                    'total': '66'
                },
                {
                    'id': '5',
                    'name': 'BOOK & DICTIONARY',
                    'total': '78'
                },
            ],

            main_cat_btn: [],
            main_cat_btn2: [],
        }
    }


    componentDidMount = async () => {
    
      const { navigation } = this.props;

      this.initgetInfo();

      this.focusListener = navigation.addListener('focus', () => {
 
        APIData.currentScreen = 'HomeScreen';

            this.initgetInfo();
        });

        this.spliceMainCat();
        this.setState({});
    }


    refresh() {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefreshing()} />
            
        );
    }

    onRefreshing = async() => {
        await this.setState({refreshing: true});

        this.initgetInfo();
        
        this.setState({refreshing: false});

        console.log('refresh')

    }



    initgetInfo = async () =>{
        await this.chkLocationPermission();
        await this.getAsyncStorage();
        await this.getLocation();
        await this.getProduct();
    }

    chkLocationPermission = async () => {
        const { navigation } = this.props;

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log('User current loation- Home Scr: ',location);
                this.setState({Latitude: location.latitude, Longitude: location.longitude});

                APIData.latitude = location.latitude;
                APIData.longitude = location.longitude;
                
                console.log('Latitude: ',  APIData.latitude);
                console.log('Longitude: ', APIData.longitude);
            })
            .catch(error => {

                const { code, message } = error;
                console.warn('Home Screen WARN -------', code, message);

                if (code === 'CANCELLED') {
                    // Alert.alert("Permission cancelled by user or by another request",
                    // "Please allow permission!",
                    //     [
                    //         {text: 'Yes', onPress: () => GetLocation.openAppSettings(), style: 'destructive'},
                    //         {text: 'Cancel'},
                    //     ],
                    //         {cancelable: false}
                    //  );
                    console.log('Permission cancelled by user')
                }

                if (code === 'UNAVAILABLE') {
                    Alert.alert("Location service is disabled or unavailable",
                    "Please open GPS location!",
                        [
                            {text: 'Yes', onPress: () => GetLocation.openGpsSettings(), style: 'destructive'},
                            {text: 'Cancel', onPress: () => BackHandler.exitApp()},
                        ],
                            {cancelable: false}
                     );
                }
                if (code === 'TIMEOUT') {
                    console.log('Location request timed out');
                    this.setState({});
                    navigation.navigate('HomeScreen');

                }
                if (code === 'UNAUTHORIZED') {
                    Alert.alert("Location Authorization Denied",
                    "Please allow to access location!",
                        [
                            {text: 'Yes', onPress: () => GetLocation.openAppSettings(), style: 'destructive'},
                            {text: 'Cancel', onPress: () => BackHandler.exitApp()},
                        ],
                            {cancelable: false}
                     );
                }
            })
    }

    getAsyncStorage = async() => {

        const a = await AsyncStorage.getItem('mlm_id');
        const b = await AsyncStorage.getItem('session_no');
        const c = await AsyncStorage.getItem('email');
        const d = await AsyncStorage.getItem('id');
        const e = await AsyncStorage.getItem('profile_pic');
        const f = await AsyncStorage.getItem('username');
        const g = await AsyncStorage.getItem('referral_id');
        const h = await AsyncStorage.getItem('status');
        const i = await AsyncStorage.getItem('type');
        const j = await AsyncStorage.getItem('verify');
        const k = await AsyncStorage.getItem('isLogin');
        const l = await AsyncStorage.getItem('contact_no');


        //is login?
        if(k != null || k != ''){

            if( k == '1'){

                APIData.isLogin = 1;
                APIData.mlm_id = a;
                APIData.session_no = b;
                APIData.id = d;
                APIData.username = f;
                APIData.profile_pic = e;
                APIData.email = c;
                APIData.referral_id = g;
                APIData.status = h;
                APIData.type = i;
                APIData.verify = j;

                if( l != null || l != ''){
                    APIData.contact_no = l;
                }

                console.log('Home scr getAsyncStorage: Done Login.')

               await this.getUserAccount();

            }else{ console.log('Home scr getAsyncStorage: havent login.')}
            
        }else{ console.log('Home scr getAsyncStorage: havent login.')}
    }


    getUserAccount = async () => {

        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;
        let result = await new HTTP().post(CONSTS.clone_URL + 'myProfileJs', {mlm_id, session_no});

        if (result.status){
           APIData.locationTitle = result.user.user_location_title;

        }

        console.log('Account Src getUserAccount: ', result.user.user_location_title);
    }

    getLocation = async() => {

        let result = await new HTTP().post(CONSTS.clone_URL + 'locationListJs', {});
  
        if(result.status){
          console.log('Home scr getlocation', result.status)
          this.setState({location: result.list})

          if(APIData.isLogin == 0){
              this.setState({locationTitle: result.list[0].l_title})
          }else{
                this.setState({locationTitle: APIData.locationTitle})
          }
          
        }else{
          console.log('Home scr getlocation', result.status)
        }
  
     } 


    getProduct = async () => {

        let result = await new HTTP().post(CONSTS.clone_URL + 'productListJs', { });

        if (result.status){
            this.setState({ product: result.list})
        }
        console.log('Home Src getProduct: ', result.status);
    }

    goProductScreen(nav, pID, sID, cat2ID){
      
        if(pID != '' || pID != null ){
            nav.navigate('ProductScreen', {PID: pID, SID: sID, Cat2ID: cat2ID});
        }
    }

    setModalVisibleDropDownMenu = (visible) => {
        this.setState({ modalVisibleDropDownMenu: visible });
    }

    spliceMainCat(){
        this.setState({ main_cat_btn: this.state.main_cat })
        this.setState({ main_cat_btn2: this.state.main_cat.splice(0, 4) })
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
                    <View style={{ padding: 5, flexDirection: 'column', marginTop: 15, marginLeft: 0 }}>
                        <FlatList
                            data={this.state.main_cat_btn2}
                            extraData={this.state.main_cat_btn}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: 10 }}>
                                    {/* {this.state.searchText == '' && APIData.fromScreen == 'SubCatScreen' ?
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
                                        : */}
                                        <Button  onPress={() => this.mainCatSelection(item, item.id, item.name)} style={this.state.selectedMain.includes(item) ? styles.selectedStyle : styles.notSelectedStyle}>
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
                                     {/* } */}
                                </View>
                            )}
                            numColumns={2}
                            keyExtractor={item => item.id}
                            ListFooterComponent={() => {
                                if (this.state.main_cat_btn2.length >= 4) {
                                    return this.renderFooter()
                                } else {
                                    return null
                                }

                            }}
                        />
                    </View>

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

    mainCatSelection(item, cat_id, cat_name) {
        //console.log(item, cat_id, cat_name)

        if (!this.state.selectedMain.includes(item)) {
            this.state.selectedMain.push(item);

        } else {
            const arrIndex = this.state.selectedMain.indexOf(item);
            var newArr = this.state.selectedMain.splice(arrIndex, 1);
        }
        this.setState({ selectedMain: this.state.selectedMain }, () => console.log('after', this.state.selectedMain));
     
    }

    renderFooter() {
        
        if (this.state.mainLoaded == false) {

            return (
                //Footer View with Load More button
                <View style={{ alignSelf: 'center' }}>
                    <Button
                        //onPress={getData}
                        onPress={() => this.showMoreMain()}
                        style={{ elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35 }}
                    >
                        <Text style={{ fontSize: 10 }}>Show More</Text>
                    </Button>
                </View>
            );
        } else {
            return (
                //Footer View with Load More button
                <View style={{ alignSelf: 'center' }}>
                    <Button
                        //onPress={getData}
                        onPress={() => this.showLessMain()}
                        style={{ elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35 }}
                    >
                        <Text style={{ fontSize: 10 }}>Show Less</Text>
                    </Button>
                </View>
            );
        }
    };

    showMoreMain() {
        var x = this.state.main_cat_btn2.concat(this.state.main_cat_btn)
        console.log(x)
        this.setState({ mainLoaded: true, main_cat_btn2: x });
    }

    showLessMain() {
       this.setState({ main_cat_btn2: this.state.main_cat_btn2.splice(0, 4), 
                        main_cat_btn: this.state.main_cat_btn2, mainLoaded: false })
    // this.setState({  main_cat_btn2: this.state.main_cat_btn2.splice(0, 4), mainLoaded: false}, () =>{
    //     console.log('show less main ::', this.state.mainLoaded)
    // });
    
    }

    reset = async(modalVisibleFilter) => {
        this.setModalVisibleFilter(!modalVisibleFilter);
        
        this.closeDrawerRight();
    }

    applyFilter = async(modalVisibleFilter) => {
        this.setModalVisibleFilter(!modalVisibleFilter);
        
        this.closeDrawerRight();
    }


    setLocation = async(item) =>{

         APIData.locationTitle = item.l_title;
         this.setState({locationTitle: item.l_title}, () => {this.setModalVisibleDropDownMenu(false)})
    }

    render() {

    const { navigation } = this.props;
    const { modalVisibleDropDownMenu } = this.state;

    return (
            <Container style={{flex: 1, backgroundColor: 'white'}}>
            
                {/*Modal for dropdownmenu */}
                <Modal animationType="none" transparent={true} visible={modalVisibleDropDownMenu} onRequestClose={() => { Alert.alert("Confirm cancel changes? "); }} >

                    <TouchableWithoutFeedback //this touchable closes modal
                        onPress={() => {
                            this.setModalVisibleDropDownMenu(false)
                        }
                        }>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>

                                <Card style={{ width: 150, padding: 5, backgroundColor: 'white', borderRadius: 10, top: 40, left: 10 }}>

                                    {
                                        this.state.location.map((item) =>{
                                            return(
                                                <View>
                                                     <TouchableOpacity onPress={() => this.setLocation(item)}>
                                                        <View style={{ alignItems: 'center', flexDirection: 'row', height: 30 }}>
                                                            <View style={{ marginLeft: 10}}>
                                                                <Text style={{ fontSize: 12 }}>{item.l_title}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>

                                                    <View style={{ borderWidth: 0.5, borderColor: '#EEEEEE', marginTop: 5, marginBottom: 5 }}></View>
                                                </View>
                                            )
                                        })
                                    }
                                    <TouchableOpacity onPress={() => navigation.navigate('NearbySettingScreen')}>
                                        <View style={{ alignItems: 'center', flexDirection: 'row', height: 30 }}>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={{ fontSize: 12}}>Nearby Setting</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                </Card>

                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                </Modal>

                <Drawer styles={{ elevation: 0, mainOverlay: 0 }} type='displace' side='right' ref={(refRight) => { this.drawerRightRef = refRight }} content={<this.DrawerRight navigator={this.navigatorRight} />} onClose={() => this.closeDrawerRight()} >
                    <Header style={{height: 60, backgroundColor: 'white', elevation: 0, marginTop: 30}}>
                    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                        <Left style={{flex: 1}}>
                            <Button onPress={() => this.setModalVisibleDropDownMenu(true)} transparent>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.state.locationTitle}</Text>
                                <Image style={{ height: 10, width: 10, marginLeft: 5 }} source={require('../../img/down-icon.png')} />
                            </Button>
                        </Left>
                        <Body style={{flex: 1}}>
                        </Body>
                        <Right style={{flex: 1}}>
                            <Button transparent onPress={() => navigation.navigate('SearchScreen')}>
                                <Image style={{ height: 25, width: 25 }} source={require('../../img/search-icon.png')} />
                            </Button>
                            <Button transparent onPress={() => { this.openDrawerRight() }}>
                                <Image style={{ height: 25, width: 25 }} source={require('../../img/filter-icon.png')} />
                            </Button>
                            <Button transparent onPress={() => navigation.navigate('NotificationScreen')}>
                                <Image style={{ height: 25, width: 25}} source={require('../../img/notification-icon-on.png')} />
                            </Button>
                        </Right>
                    </Header>

                    <View style={{alignItems:'flex-start', width: screenWidth, marginBottom: 100}}>
                        <View style={{alignItems: 'flex-start', width: screenWidth * 0.95, marginLeft: 10}}>
                        <FlatList
                            refreshControl={this.refresh()}
                            showsVerticalScrollIndicator={false}
                            data={this.state.product}
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
                                        <Image style={{ height: 12, width: 12, marginRight: 3, borderRadius: 10}} source={{uri: item.seller_img}} />
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
                      
                  
                </Drawer>



                <Footer style={{ height: 60, borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: null }}>
                    <FooterTab style={{ backgroundColor: 'white' }}>
                        <Button vertical active style={{ backgroundColor: null }}>
                            <Image style={{ height: 28, width: 28, marginBottom: 5 }} source={require('../../img/home-icon-on.png')} />
                                <Text style={{ fontSize: 8, color: '#FF7A59', fontWeight: 'bold' }}>Discover</Text>
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
  selectedStyle: {
    elevation: 0, borderWidth: 1, borderColor: '#ff5353', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35
  },
  notSelectedStyle: {
    elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35
  },
  priceSelectedStyle: {
    borderWidth: 1, borderColor: '#ff5353', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 90, height: 35, marginRight: 10
  },
 priceNotSelectedStyle: {
    borderRadius: 5, backgroundColor: '#FAFAFA', width: 90, height: 35, marginRight: 10, justifyContent: 'center'
 }
})

export default HomeScreen;