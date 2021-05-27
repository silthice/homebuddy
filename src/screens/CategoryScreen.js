import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import LinearGradient from 'react-native-linear-gradient';
import HTTP from '../api/http';
import CONSTS from '../config/constants';
import MasonryList from '@react-native-seoul/masonry-list';
import APIData from '../api/data';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class CategoryScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };

    constructor(props) {
        super(props);

        this.state = {
            modalVisibleDropDownMenu: false,
            category: [],
            subcategory: [],
            setsubcategory: [],
        }
    }

    componentDidMount = async () => {
      
        const { navigation } = this.props;
        this.initCat();

          this.focusListener = navigation.addListener('focus', () => {
            APIData.cuurentScreen = 'CategoryScreen';
        });
    }

    initCat = async () => {
        await this.getMainCategory();
        //await this.getSubCategory();
    }

    getMainCategory = async () => {

        let result = await new HTTP().post(CONSTS.clone_URL + 'catOneJs', { });

        if (result.status){
            this.setState({ category: result.list}, () => {
                result.list.forEach((item)=>{
                     this.getSubCategory(item.cat1_id)
                     //console.log('Sub Category Item: ' , item)
                })
            })

        }

        console.log('Cat Src getMainCategory: ', result.status);
    }

    getSubCategory = async (cat1_id) =>{
        
        let result = await new HTTP().post(CONSTS.clone_URL + 'catTwoJs', {cat1_id});

        if (result.status){
            result.list.forEach((item)=>{
                this.state.setsubcategory.push(item);
                //console.log('Check subcategory item: ', item);
           })       
            this.setState({});
            console.log('Check sub category id: ', cat1_id);
            //console.log('Check sub category item ++++: ',   this.state.setsubcategory);
        }

        //console.log('Check category: ', cat1_id);
        console.log('Category Src getSubCategory: ', result.status);
    }

    goSubCategoryScreen(nav, mainCatID, cat_color1, cat_color2){

        if(!mainCatID == ''){
            console.log('subCat Main ID : ', mainCatID);
            nav.navigate('SubCategoryScreen', {maincategoryID: mainCatID, cat_color1: cat_color1, cat_color2: cat_color2});
        }
    }
    


    setModalVisibleDropDownMenu = (visible) => {
        this.setState({ modalVisibleDropDownMenu: visible });
    }

    render() {

    const { navigation } = this.props;
    const { modalVisibleDropDownMenu } = this.state;

        return (
                
                <Container style={{flex: 1, backgroundColor: 'white'}}>

                <Header style={{height: 60, backgroundColor: 'white', elevation: 0, marginTop: 30}}>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                    <Left style={{flex: 1}}>
                        <Button onPress={() => this.setModalVisibleDropDownMenu(true)} transparent>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>Mont Kiara</Text>
                            <Image style={{ height: 10, width: 10, marginLeft: 5 }} source={require('../../img/down-icon.png')} />
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
                    <ScrollView>
                        <View style={{ alignSelf: 'center', flexDirection: 'row', marginHorizontal: screenWidth * 0.015 }}>
                            
                        <MasonryList
                                data={this.state.category}
                                keyExtractor={(item, index): string => index.toString()}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.goSubCategoryScreen(navigation, item.cat1_id, item.cat1_color1, item.cat1_color2)}>
                                
                                <LinearGradient colors={[item.cat1_color1, item.cat1_color2]} style={{ width: screenWidth * 0.465, borderRadius: 15, padding: 10, marginLeft: 0 }}>
                                    <View>
                                        <View style={{height: 40}}>
                                            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>{item.cat1_name}</Text>
                                        </View>
                                        <View style={{alignSelf: 'center'}}>
                                            <Image style={{ height: 50, width: 50, marginBottom: 5 }} source={{uri: item.cat1_icon}} />
                                        </View>
                                        {
                                            this.state.setsubcategory.map((item2, index) =>  {

                                                    return item.cat1_id === item2.cat2_cat1_id ?

                                                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                                        <Text style={{color: 'white', fontSize: 12}}>{item2.cat2_name} ( <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>{item2.product_count}</Text> ) </Text>
                                                       
                                                    </View>
                                                :

                                                    null
                                                
                                            })     
                                        }   
                                    </View>
                                </LinearGradient>
                                <View style={{marginBottom: 10}}/>
                                </TouchableOpacity>
                            </View>

                            )}/>

                        </View>
                    </ScrollView>
                </Content>


            {/*Modal for dropdownmenu */}
            <Modal animationType="none" transparent={true} visible={modalVisibleDropDownMenu} onRequestClose={() => { Alert.alert("Confirm cancel changes? "); }} >

                <TouchableWithoutFeedback //this touchable closes modal
                    onPress={() => {
                        this.setModalVisibleDropDownMenu(false)
                    }
                    }>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>

                                <Card style={{ width: 150, padding: 5, backgroundColor: 'white', borderRadius: 10, height: 150, top: 40, left: 10 }}>

                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
                                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={{ fontSize: 12 }}>Tropicana</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <View style={{ borderWidth: 0.5, borderColor: '#EEEEEE', marginTop: 5, marginBottom: 5 }}></View>

                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
                                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={{ fontSize: 12 }}>Bangsar</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <View style={{ borderWidth: 0.5, borderColor: '#EEEEEE', marginTop: 5, marginBottom: 5 }}></View>

                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
                                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={{ fontSize: 12, color: '#999999' }}>Nearby Setting</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                </Card>

                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>



            <Footer style={{ height: 60, borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: null }}>
                <FooterTab style={{ backgroundColor: 'white' }}>
                    <Button vertical onPress={() => navigation.navigate('HomeScreen')}>
                        <Image style={{ height: 28, width: 28, marginBottom: 5 }} source={require('../../img/home-icon.png')} />
                            <Text style={{ fontSize: 8 }}>Discover</Text>
                    </Button>
                    <Button vertical active style={{ backgroundColor: null }}>
                        <Image style={{ height: 25, width: 25, marginBottom: 5 }} source={require('../../img/category-icon-on.png')} />
                            <Text style={{ fontSize: 8, color: '#FF7A59', fontWeight: 'bold' }}>Category</Text>
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
})

export default CategoryScreen;