import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, FlatList,RefreshControl, StatusBar, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Drawer, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import APIData from '../api/data';
import HTTP from '../api/http';
import CONSTS from '../config/constants';
import { LightenDarkenColor } from 'lighten-darken-color';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class SubCategoryScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };

    constructor(props) {
        super(props);

        this.state = {
            modalVisibleDropDownMenu: false,
            maincategoryID: '',
            maincatName: '',
            maincatIcon: '',
            subcategoryID: '',
            subCat2_id: '',
            subcategory: [],
            subcategoryProduct: [],
            querysubcategoryProduct: [],
            querysubcategoryProducts: false,
            maincategory: [],
            modalVisibleFilter: false,
            color1: '',
        }
    }

    componentDidMount = async () => {

        const { navigation } = this.props;

        this.state.maincategoryID = this.props.route.params.maincategoryID;
        this.state.color1 = this.props.route.params.cat_color1;

        console.log('this.state.maincategoryID: ', this.state.maincategoryID);

        this.initSubCat();
    }

    initSubCat = async () => {
        await this.getMainCategory();
        await this.getSubCategory();
        await this.getAllProductByMainCat();

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

        await this.getAllProductByMainCat();

        this.setState({refreshing: false});
        
        console.log('refresh')

    }


    getMainCategory = async () => {

        let result = await new HTTP().post(CONSTS.clone_URL + 'catOneJs', { });

        if (result.status){
            this.setState({ maincategory: result.list}, () => {
                result.list.forEach((item)=>{
                    if(item != null){
                        if(this.state.maincategoryID == item.cat1_id){
                            this.setState({maincatName : item.cat1_name, maincatIcon: item.cat1_icon});
                        }
                       
                    }
                })
            })
        }
        console.log('Sub Category Src getMainCategory: ', result.status);
    }

    getSubCategory = async () =>{

        let cat1_id = this.state.maincategoryID;

        let result = await new HTTP().post(CONSTS.clone_URL + 'catTwoJs', {cat1_id});

        if (result.status){
            this.setState({subcategory: result.list});
        }

        console.log('Sub Category Src getSubCategory: ', result.status);

    }

    getAllProductByMainCat = async () =>{

        console.log(this.state.maincategoryID)
        let cat1_id = this.state.maincategoryID;
        let result = await new HTTP().post(CONSTS.clone_URL + 'getProductByCatOneJs', {cat1_id});

        if (result.status){
            this.setState({subcategoryProduct: result.list, querysubcategoryProducts: result.status});
        }else{
            this.setState({ querysubcategoryProducts: result.status})
        }

        console.log('Sub Category Src getProductByCatOneJs: ', result.status);
    }

    getQuerySubProduct1(nav, cat2_id){
        console.log('Sub Category Src getQuerySubProduct: Pressed + ', cat2_id );
        this.getQuerySubProduct(cat2_id);
    }

    getQuerySubProduct = async (cat2_id) => {

        this.state.subCat2_id = cat2_id;
        let result = await new HTTP().post(CONSTS.clone_URL + 'getProductByCatTwoJs', {cat2_id});

        if (result.status){
            this.setState({subcategoryProduct: result.list, querysubcategoryProducts: result.status});
        }else{
            this.setState({ querysubcategoryProducts: result.status})
        }
      
        console.log('Sub Category Src getQuerySubProduct: ', result.status);
    }

    goProductScreen(nav, pID, sID, cat2ID){
      
        if(pID != '' || pID != null ){
            nav.navigate('ProductScreen', {PID: pID, SID: sID, Cat2ID: cat2ID});
        }
    }

    switchSubCategory(navigation, cat1ID){
      
        if(cat1ID != '' || cat1ID != null ){
            this.props.navigation.replace('SubCategoryScreen', {maincategoryID: cat1ID});
        }
    }

    closeDrawerRight() { this.drawerRightRef._root.close() };

    openDrawerRight() { this.drawerRightRef._root.open() };

    setModalVisibleDropDownMenu = (visible) => {
        this.setState({ modalVisibleDropDownMenu: visible });
    }

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
    const { modalVisibleDropDownMenu } = this.state;


        return (
                <Container style={{flex: 1, backgroundColor: 'white'}}>
                    <Drawer styles={{ elevation: 0, mainOverlay: 0 }} type='displace' side='right' ref={(refRight) => { this.drawerRightRef = refRight }} content={<this.DrawerRight navigator={this.navigatorRight} />} onClose={() => this.closeDrawerRight()} >
                        <Header style={{height: 60, backgroundColor: 'white', elevation: 0, marginTop: 30}}>
                        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                            <Left style={{flex: 0.9, flexDirection: 'row'}}>
                                <Button transparent onPress={() => navigation.goBack()}>
                                    <Image style={{ height: 25, width: 25 }} source={require('../../img/back-icon.png')} />
                                </Button>

                                <Button onPress={() => this.setModalVisibleDropDownMenu(true)} transparent>
                                    <Image style={{ height: 25, width: 25, marginRight: 5 }} source={{uri: this.state.maincatIcon}} />
                                    <Text style={{fontWeight: 'bold', fontSize: 15}}>{this.state.maincatName}</Text>
                                    <Image style={{ height: 10, width: 10, marginLeft: 5 }} source={require('../../img/down-icon.png')} />
                                </Button>
                            </Left>
                            <Body style={{flex: 0}}>
                            </Body>
                            <Right style={{flex: 0.1}}>
                                <Button transparent onPress={() => { this.openDrawerRight() }} >
                                    <Image style={{ height: 25, width: 25 }} source={require('../../img/filter-icon.png')} />
                                </Button>
                            </Right>
                        </Header>


                        <Content refreshControl={this.refresh()} showsVerticalScrollIndicator={true}>
                
                            <ScrollView horizontal={true} style={{marginLeft: 10, marginBottom: 20, marginTop: 5}} showsHorizontalScrollIndicator={false}>

                                <FlatList
                                        data={this.state.subcategory}
                                        keyExtractor={(item) => item.cat2_id}
                                        horizontal={true}
                                        renderItem={({item, index}) => {

                                            let length = this.state.subcategory.length;
                                            let darken = 100;

                                            let calDarken = (index + 1)  * darken / length;
                                            
                                            return(
                                            <View>
                                                {
                                                    item.cat2_id != ''?
                                                    
                                                    <TouchableOpacity onPress={() => this.getQuerySubProduct1(navigation, item.cat2_id)}>
                                                         <View style={{height: 75, width: 75, backgroundColor: LightenDarkenColor(this.state.color1, calDarken ), marginRight: 10, borderRadius: 10}}>
                                                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15, position: 'absolute', left: 5, bottom: 5, right: 5}}>{item.cat2_name}</Text>
                                                        </View>
                                                    </TouchableOpacity> 
                                                    :
                                                    null
                                                }
                                            </View>
                                          
                                                   
                                            )                                       
                                                } }/>

                                </ScrollView>
                            


                            <ScrollView>
                                <View style={{alignItems: 'flex-start', width: screenWidth}}>
                                    <View style={{alignItems: 'flex-start', width: screenWidth * 0.95, marginLeft: 10}}>
                                    {
                                        this.state.querysubcategoryProducts == true?
                                            <FlatList
                                                data={this.state.subcategoryProduct}
                                                keyExtractor={(item) => item.p_id}
                                                horizontal={false}
                                                numColumns={2}
                                                renderItem={({item}) => ( 
                                            
                                                <View style={{marginTop: 20}}>
                                                    {
                                                        item.p_id != ''?
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

                                                    :

                                                    null

                                                    }
                                                    
                                                </View>
                                            )}/>

                                            :

                                            null
                                        }
                                          
                                    
                                    
                                    </View>
                            
                                </View>
                                
                            </ScrollView>
                        </Content>
                    </Drawer>
               

                    {/*Modal for dropdownmenu */}
                    <Modal animationType="none" transparent={true} visible={modalVisibleDropDownMenu} onRequestClose={() => { Alert.alert("Confirm cancel changes? "); }} >

                        <TouchableWithoutFeedback //this touchable closes modal
                            onPress={() => {
                                this.setModalVisibleDropDownMenu(false)
                            }
                            }>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row' }}>

                                    <Card style={{ width: 200, padding: 5, backgroundColor: 'white', borderRadius: 10, top: 40, left: 60 }}>
                                    <FlatList
                                        data={this.state.maincategory}
                                        keyExtractor={(item) => item.cat1_id}
                                        horizontal={false}
                                        renderItem={({item}) => (
                                            <View style={{flexDirection: 'column'}}>
                                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center'}} onPress={() => this.switchSubCategory(navigation, item.cat1_id)}>
                                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                        <Image style={{ height: 30, width: 30 }} source={{uri: item.cat1_icon}} />
                                                        <View style={{ marginLeft: 5 }}>
                                                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{item.cat1_name}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{ borderWidth: 0.5, borderColor: '#EEEEEE', marginTop: 5, marginBottom: 5 }}></View>
                                            </View> 
                                      
                                        )}/>
                               
                                    </Card>

                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                    </Modal>
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

export default SubCategoryScreen;