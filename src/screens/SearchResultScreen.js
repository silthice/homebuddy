import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, Alert, StatusBar, Image, FlatList, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Drawer, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import APIData from '../api/data';
import HTTP from '../api/http';
import CONSTS from '../config/constants';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class SearchScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };

    constructor(props) {
        super(props);

        this.state = {
            modalVisibleDropDownMenu: false,
            searchproduct: [],
            searchText: '',
            modalVisibleFilter: false,
        }
    }

    componentDidMount = async () => {
        // this.focusListener = navigation.addListener('focus', () => {
        //     this.setState({ modalVisibleDropDownMenu: false, });
        // });
        const { navigation } = this.props;
        this.state.searchText = this.props.route.params.title;
        this.state.searchproduct = this.props.route.params.searchProduct;
        this.setState({});

        //console.log('search text screen', this.state.searchText);
        //console.log('search result screen', this.state.searchproduct);
        
        //this.initProduct();
    }

    initProduct = async () => {
        //await this.getSearchProduct();
    }

    getSearchProduct = async () => {

        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;
        let s_title = this.state.searchText;

        const data = new FormData();

        data.append('mlm_id', mlm_id);
        data.append('session_no', session_no);
        data.append('s_title', s_title);

        if(s_title != ''){
            let result = await new HTTP().post(CONSTS.clone_URL + 'searchJs', {mlm_id, session_no, s_title});

            if (result.status){

                if (mlm_id !== '' && session_no !== '' && s_title !== '') {
        
                    await fetch(CONSTS.clone_URL + "searchJs", {
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
                                this.setState({ searchproduct: response.list })
                            } 
                            else {
                                console.log('Search Failed', response.failed[0]);
                            }
                        })
                   
                }else{
                    Alert.alert("Please Insert Text", "Please type your product name.");
                }
            }

            console.log('Search Result Src getSearchProduct 1: ', result.status);
        }
        else{

            let result = await new HTTP().post(CONSTS.clone_URL + 'productListJs', { });
    
            if (result.status){
                this.setState({ searchproduct: result.list })
            }
    
            console.log('Search Result Src getSearchProduct 2: ', result.status);
        }
       
         
    }

    goProductScreen(nav, pID){
      
        if(pID != '' || pID != null ){
            nav.navigate('ProductScreen', {PID: pID});
        }
    }

    closeDrawerRight() { this.drawerRightRef._root.close() };

    openDrawerRight() { this.drawerRightRef._root.open() };

    setModalVisibleFilter = (visible) => {
        this.setState({ modalVisibleFilter: visible });
    }
    
    DrawerRight = () => {
        const { modalVisibleFilter } = this.state;
        return (

            <Container style={{ flex: 1, borderLeftWidth: 0.5, borderColor: '#cccccc', elevation: 1 }}>
                <Content style={{ padding: 15, marginTop: 35 }}>

                    <Text style={{ fontSize: 15, fontWeight: 'bold', fontSize: 17 }}>Search Filter</Text>

                    <Text style={{ marginTop: 15, fontSize: 13, fontWeight: 'bold' }}>Sort</Text>

                    <View style={{ padding: 5, flexDirection: 'row', marginTop: 15, marginLeft: 0 }}>
                        <Button style={{elevation: 0, borderWidth: 1, borderColor: '#FF7A59', borderRadius: 5, backgroundColor: '#FFEBE6', justifyContent: 'center', width: 125, height: 35, marginRight: 10}}>
                            <Text style={{fontSize: 10, color: '#FF7A59'}}>Popular</Text>
                        </Button>

                        <Button style={{elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35}}>
                            <Text style={{fontSize: 10}}>Recent</Text>
                        </Button>
                    </View>

                    <View style={{ padding: 5, flexDirection: 'row', marginLeft: 0 }}>
                        <Button style={{elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35, marginRight: 10}}>
                            <Text style={{fontSize: 10}}>Price: Low to High</Text>
                        </Button>

                        <Button style={{elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35}}>
                            <Text style={{fontSize: 10}}>Price: High to Low</Text>
                        </Button>
                    </View>

                    <Text style={{ marginTop: 15, fontSize: 13, marginTop: 35, fontWeight: 'bold'  }}>Category</Text>

                    <View style={{ padding: 5, flexDirection: 'row', marginTop: 15, marginLeft: 0 }}>
                        <Button style={{elevation: 0, borderWidth: 1, borderColor: '#FF7A59', borderRadius: 5, backgroundColor: '#FFEBE6', justifyContent: 'center', width: 125, height: 35, marginRight: 10}}>
                            <Text style={{fontSize: 10, textAlign: 'center', color: '#FF7A59'}}>Mobile Phones & Tablets</Text>
                        </Button>

                        <Button style={{elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35}}>
                            <Text style={{fontSize: 10, textAlign: 'center'}}>Electronics</Text>
                        </Button>
                    </View>

                    <View style={{ padding: 5, flexDirection: 'row', marginLeft: 0 }}>
                        <Button style={{elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35, marginRight: 10}}>
                            <Text style={{fontSize: 10, textAlign: 'center'}}>{"Men's Fashion"}</Text>
                        </Button>

                        <Button style={{elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35}}>
                            <Text style={{fontSize: 10, textAlign: 'center'}}>{"Women's Fashion"}</Text>
                        </Button>
                    </View>

                    <View style={{ padding: 5, flexDirection: 'row', marginLeft: 0 }}>
                        <Button style={{elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35, marginRight: 10}}>
                            <Text style={{fontSize: 10, textAlign: 'center'}}>Health & Beauty</Text>
                        </Button>
                    </View>

                    <View style={{ alignSelf: 'center', padding: 5 }}>
                        <Button style={{ elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35 }}>
                            <Text style={{ fontSize: 10 }}>Show More</Text>
                        </Button>
                    </View>

                    <Text style={{ marginTop: 15, fontSize: 13, marginTop: 35, fontWeight: 'bold'  }}>Sub Category</Text>

                    <View style={{ padding: 5, flexDirection: 'row', marginTop: 15, marginLeft: 0 }}>
                        <Button style={{elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35, marginRight: 10}}>
                            <Text style={{fontSize: 10, textAlign: 'center'}}>iPhones</Text>
                        </Button>

                        <Button style={{elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35}}>
                            <Text style={{fontSize: 10, textAlign: 'center'}}>Android Phones</Text>
                        </Button>
                    </View>

                    <View style={{ padding: 5, flexDirection: 'row', marginLeft: 0 }}>
                        <Button style={{elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35, marginRight: 10}}>
                            <Text style={{fontSize: 10, textAlign: 'center'}}>Tablets</Text>
                        </Button>

                        <Button style={{elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35}}>
                            <Text style={{fontSize: 10, textAlign: 'center'}}>Accessories</Text>
                        </Button>
                    </View>

                    <View style={{ padding: 5, flexDirection: 'row', marginLeft: 0 }}>
                        <Button style={{elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35, marginRight: 10}}>
                            <Text style={{fontSize: 10, textAlign: 'center'}}>Others</Text>
                        </Button>
                    </View>

                    <View style={{ alignSelf: 'center', padding: 5 }}>
                        <Button style={{ elevation: 0, borderWidth: 1, borderColor: 'white', borderRadius: 5, backgroundColor: '#FAFAFA', justifyContent: 'center', width: 125, height: 35 }}>
                            <Text style={{ fontSize: 10 }}>Show More</Text>
                        </Button>
                    </View>

                    <Text style={{ marginTop: 15, fontSize: 13, marginTop: 35, fontWeight: 'bold'  }}>Price Range</Text>

                    <View style={{marginTop: 20, flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column', marginRight: 10}}>
                            <Text style={{fontSize: 12}}>Minimum Price</Text>
                            <Item style={{borderBottomWidth: 0, height: 40, backgroundColor: '#F5F5F5', borderRadius: 5, width: screenWidth * 0.3}}>
                                <Input style={{ fontSize: 12, height: 40, fontSize: 12}} placeholderTextColor="#000" />
                            </Item>
                        </View>

                        <View style={{flexDirection: 'column'}}>
                            <Text style={{fontSize: 12}}>Maximum Price</Text>
                            <Item style={{borderBottomWidth: 0, height: 40, backgroundColor: '#F5F5F5', borderRadius: 5, width: screenWidth * 0.3}}>
                                <Input style={{ fontSize: 12, height: 40, fontSize: 12}} placeholderTextColor="#000" />
                            </Item>
                        </View>
                    </View>


                    <View style={{ height: 100 }}>
                    </View>


                </Content>




                <Footer style={{ height: 50 }}>
                    <FooterTab style={{ padding: 20, backgroundColor: 'white' }}>
                        <Button onPress={() => { this.reset(modalVisibleFilter) }} style={{ height: 35, borderRadius: 5, borderWidth: 1, borderColor: '#FF7A59', backgroundColor: '#FAFAFA', flex: 1, justifyContent: 'center', marginRight: 10 }}><Text style={{ color: '#FF7A59', fontSize: 12 }}>Reset</Text></Button>
                        <Button onPress={() => this.applyFilter(modalVisibleFilter)} style={{ height: 35, borderRadius: 5, backgroundColor: '#FF7A59', flex: 1, justifyContent: 'center' }}><Text style={{ color: 'white', fontSize: 12 }}>Apply</Text></Button>
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
                    <Left style={{flex: 0.1}}>
                        <Button transparent onPress={() => navigation.navigate('HomeScreen')}>
                            <Image style={{ height: 25, width: 25 }} source={require('../../img/back-icon.png')} />
                        </Button>
                    </Left>
                    <Body style={{flex: 0.8}}>
                        <Item style={{borderBottomWidth: 0, height: 40, backgroundColor: '#F5F5F5', borderRadius: 10, width: screenWidth * 0.75}}>
                            <Image source={require("../../img/search-icon.png")} style={{ height: 15, width: 15, marginLeft: 10 }} />
                            <Input placeholder='Nearby Search' style={{ fontSize: 12, height: 40}} placeholderTextColor="#000" value={this.state.searchText} onChangeText={(searchText) => this.setState({searchText})}/>
                            {/*
                            <TouchableOpacity onPress={() => this.getSearchProduct()}>
                                <Text style={{color: 'gray', width: 50, fontSize: 13}}>Search</Text>
                            </TouchableOpacity>
                            */}
                        </Item>
                    </Body>
                    <Right style={{flex: 0.1}}>
                        <Button transparent onPress={() => { this.openDrawerRight() }}>
                            <Image style={{ height: 25, width: 25 }} source={require('../../img/filter-icon.png')} />
                        </Button>
                    </Right>
                </Header>


                <Content>
                    <ScrollView>
                    <View style={{alignItems: 'flex-start', width: screenWidth}}>
                        <View style={{alignItems: 'flex-start', width: screenWidth * 0.95, marginLeft: 10}}>
                        <FlatList
                            data={this.state.searchproduct}
                            keyExtractor={(item) => item.p_id}
                            horizontal={false}
                            numColumns={2}
                            renderItem={({item}) => ( 
                                <View style={{marginTop: 20}}>
                                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                    <TouchableOpacity onPress={() => this.goProductScreen(navigation, item.p_id)}>
                                    <View>
                                        <View>
                                            <Image style={{ height: 200, width: screenWidth * 0.465, borderRadius: 15 }} source={{uri: item.cover_img}} />
                                            <View style={{ height: 200, width: screenWidth * 0.465, borderRadius: 15, backgroundColor: 'black', position: 'absolute', opacity: 0.14 }}/>
                                            <Text style={{position: 'absolute', color: 'white', fontSize: 11, top: 5, left: 5}}>23 minutes ago</Text>
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
                    </ScrollView>

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
})

export default SearchScreen;