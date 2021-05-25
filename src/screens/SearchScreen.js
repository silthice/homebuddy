import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, Alert, FlatList, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
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
            searchHistory: [],
            popularSearch: [],
            searchText: '',
        }
    }

    componentDidMount = async () => {
        // this.focusListener = navigation.addListener('focus', () => {
        //     this.setState({ modalVisibleDropDownMenu: false, });
        // });
        const { navigation } = this.props;
        this.initSearch();
    }

    initSearch = async () => {
        await this.getSearchHistory();
        await this.getPopularSearch(); 
    }

    getSearchHistory = async () =>{

        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;

        let result = await new HTTP().post(CONSTS.clone_URL + 'searchHistoryJs', {mlm_id, session_no});
        
        if (result.status){
            this.setState({ searchHistory: result.list})
        }
        console.log('Search Src getSearchHistory: ', result.status);
    }

    getPopularSearch = async () => {
        let result = await new HTTP().post(CONSTS.clone_URL + 'popularSearchJs', { });
        
        if (result.status){
            this.setState({ popularSearch: result.list})
        }
        console.log('Search Src getPopularSearch: ', result.status);
    }

    goSearchResultScreen = async (nav) => {

        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;
        let s_title = this.state.searchText;



        if (s_title !== '') {


            let result = ''
            if (mlm_id == '' && session_no == '') {
                result = await new HTTP().post(CONSTS.clone_URL + 'searchJs', { s_title });
            } else {
                result = await new HTTP().post(CONSTS.clone_URL + 'searchJs', { s_title, mlm_id, session_no });
            }
            console.log(result)


            if (result.status == true) {
                //var x = '';
                //x = response.msg;
                nav.navigate('SearchResultScreen', { title: s_title, searchProduct: result.list });

                console.log('Search result src : result :', result.status);
                //console.log('search screen result: ', data2);
            } else {
                //var x = '';
                //x = response.failed;
                //console.log(x[0])
                nav.navigate('SearchResultScreen', { title: '' });

                console.log('Search Failed', result.errors[0]);
            }
        } else {
            Alert.alert("Search product invalid", "Please enter a product name to search");
        }

        this.getSearchHistory()
    }


  
    pressSearchHitoryP(sTitle){
        this.setState({searchText: sTitle});
        this.setState({});
    }

    pressSearchPopularP(sTitle){
        this.setState({searchText: sTitle});
        this.setState({});
    }


render() {

    const { navigation } = this.props;


        return (
                <Container style={{flex: 1, backgroundColor: 'white'}}>

                <Header style={{height: 60, backgroundColor: 'white', elevation: 0, marginTop: 30}}>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                    <Left style={{flex: 0.1}}>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Image style={{ height: 25, width: 25 }} source={require('../../img/back-icon.png')} />
                        </Button>
                    </Left>
                    <Body style={{flex: 0.8}}>
                        <Item style={{borderBottomWidth: 0, height: 40, backgroundColor: '#F5F5F5', borderRadius: 10, width: screenWidth * 0.7}}>
                            <Image source={require("../../img/search-icon.png")} style={{ height: 15, width: 15, marginLeft: 10 }} />
                            <Input placeholder="Search Nearby" style={{ fontSize: 12, height: 40}} placeholderTextColor="#CCCCCC" value={this.state.searchText} onChangeText={(searchText) => this.setState({searchText})}/>
                        </Item>
                    </Body>
                    <Right style={{flex: 0.1}}>
                        <TouchableOpacity onPress={() => this.goSearchResultScreen(navigation)}>
                            <Text style={{color: 'gray', width: 50, fontSize: 13}}>Search</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>


                <Content>
                    <View style={{marginLeft: 10, marginRight: 10}}>
                        <View>
                            <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 10}}>Search History</Text>

                            <FlatList
                                data={this.state.searchHistory}
                                keyExtractor={(item) => item.s_id}
                                horizontal={false}
                                numColumns={3}
                                renderItem={({item}) => (       
                                    <View style={{flexDirection: 'row', marginTop: 10}}>
                                        <TouchableOpacity onPress={() => this.pressSearchHitoryP(item.s_title)}>
                                            <View style={{borderRadius: 15, borderWidth: 1, borderColor: '#E6E6E6', padding: 5, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20, marginRight: 10}}>
                                                <Text style={{fontSize: 12}}>{item.s_title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{marginBottom: 10}}/>
                                    </View>                                                         
                                )}/>

                        </View>


                        <View>
                            <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 50}}>Popular Searches</Text>

                            <FlatList
                                data={this.state.popularSearch}
                                keyExtractor={(item) => item.s_title}
                                horizontal={false}
                                numColumns={3}
                                renderItem={({item}) => (       
                                    <View style={{flexDirection: 'row', marginTop: 10}}>
                                        <TouchableOpacity onPress={() => this.pressSearchPopularP(item.s_title)}>
                                        <View style={{borderRadius: 15, borderWidth: 1, borderColor: '#E6E6E6', padding: 5, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20, marginRight: 10}}>
                                            <Text style={{fontSize: 12}}>{item.s_title}</Text>
                                        </View>
                                        </TouchableOpacity>
                                        <View style={{marginBottom: 10}}/>
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

export default SearchScreen;