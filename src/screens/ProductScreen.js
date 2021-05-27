import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, FlatList, Alert, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import SwiperFlatList from 'react-native-swiper-flatlist';
import Swiper from 'react-native-swiper'
import Pie from 'react-native-pie'
import APIData from '../api/data';
import HTTP from '../api/http';
import CONSTS from '../config/constants';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline, Polygon } from 'react-native-maps';

import { decode } from "@mapbox/polyline";
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const RADIUS = 300;

class ProductScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };


    constructor(props) {
        super(props);

        this.state = {
            modalVisibleDropDownMenu: false,
            productID: '',
            sellerID: '',
            sellerName: '',
            sellerPostBy: '',
            pName: '',
            pDesc: '',
            cat: '',
            category2ID: '',
            pPrice:'',
            currentIndex: 1,
            pImages: [],
            sImages: '',
            color1: 'white',
            color2: 'white',
            similarProduct: [],
            sellerRelatedProduct: [],
            modalVisibleDropDownMenu: false,
            favouriteList: [],
            favourite: false,
            favouriteID: '',
            mapRegion: null,
            currentLatitude: null,
            currentLongitude: null,
            pView: '',
            pfav: '',
            pSellerRate: 0,
            LATLNG: {
                latitude: 0.00,
                longitude: 0.00,
                latitudeDelta: 0.00,
                longitudeDelta: 0.00,
            },
            productLATLNG: {
                latitude: 0.00,
                longitude: 0.00,
            },
            
            //pointPolygon: [{"latitude": 3.16551, "longitude": 101.64101}, {"latitude": 3.1656, "longitude": 101.64275}, {"latitude": 3.16535, "longitude": 101.64319}, {"latitude": 3.16549, "longitude": 101.64366}, {"latitude": 3.16521, "longitude": 101.64445}, {"latitude": 3.16511, "longitude": 101.64476}, {"latitude": 3.16532, "longitude": 101.64572}, {"latitude": 3.1654, "longitude": 101.64636}, {"latitude": 3.16544, "longitude": 101.64666}, {"latitude": 3.16531, "longitude": 101.64846}, {"latitude": 3.1652, "longitude": 101.6504}, {"latitude": 3.16507, "longitude": 101.65251}, {"latitude": 3.16512, "longitude": 101.65379}, {"latitude": 3.16522, "longitude": 101.65431}, {"latitude": 3.16541, "longitude": 101.65455}, {"latitude": 3.16585, "longitude": 101.65518}, {"latitude": 3.16627, "longitude": 101.65562}, {"latitude": 3.16703, "longitude": 101.65632}, {"latitude": 3.16806, "longitude": 101.65733}, {"latitude": 3.16876, "longitude": 101.65829}, {"latitude": 3.16946, "longitude": 101.65924}, {"latitude": 3.16989, "longitude": 101.65994}, {"latitude": 3.17017, "longitude": 101.66017}, {"latitude": 3.17039, "longitude": 101.66032}, {"latitude": 3.17088, "longitude": 101.66033}, {"latitude": 3.17158, "longitude": 101.66033}, {"latitude": 3.17239, "longitude": 101.6604}, {"latitude": 3.17306, "longitude": 101.66052}, {"latitude": 3.17531, "longitude": 101.66129}, {"latitude": 3.17569, "longitude": 101.6613}, {"latitude": 3.17606, "longitude": 101.66122}, {"latitude": 3.1763, "longitude": 101.66103}, {"latitude": 3.17675, "longitude": 101.66081}, {"latitude": 3.17684, "longitude": 101.66047}, {"latitude": 3.17694, "longitude": 101.65997}, {"latitude": 3.17542, "longitude": 101.65679}, {"latitude": 3.17516, "longitude": 101.65592}, {"latitude": 3.17507, "longitude": 101.65454}, {"latitude": 3.17472, "longitude": 101.65416}, {"latitude": 3.17479, "longitude": 101.65304}, {"latitude": 3.17502, "longitude": 101.65306}, {"latitude": 3.17506, "longitude": 101.65106}, {"latitude": 3.17481, "longitude": 101.65076}, {"latitude": 3.17493, "longitude": 101.6486}, {"latitude": 3.17522, "longitude": 101.64644}, {"latitude": 3.17453, "longitude": 101.6465}, {"latitude": 3.17432, "longitude": 101.64941}, {"latitude": 3.17352, "longitude": 101.64942}, {"latitude": 3.17349, "longitude": 101.65012}, {"latitude": 3.17347, "longitude": 101.6506}, {"latitude": 3.17315, "longitude": 101.65056}, {"latitude": 3.17265, "longitude": 101.64994}, {"latitude": 3.17246, "longitude": 101.64975}, {"latitude": 3.17241, "longitude": 101.64905}, {"latitude": 3.1724, "longitude": 101.64893}, {"latitude": 3.17408, "longitude": 101.64843}, {"latitude": 3.17394, "longitude": 101.64809}, {"latitude": 3.17346, "longitude": 101.64822}, {"latitude": 3.17214, "longitude": 101.64837}, {"latitude": 3.17205, "longitude": 101.64838}, {"latitude": 3.17013, "longitude": 101.64767}, {"latitude": 3.17001, "longitude": 101.64771}, {"latitude": 3.16824, "longitude": 101.64631}, {"latitude": 3.16791, "longitude": 101.64637}, {"latitude": 3.16427, "longitude": 101.6456}, {"latitude": 3.16382, "longitude": 101.64299}, {"latitude": 3.16368, "longitude": 101.64299}],
        }
    }


    componentDidMount = async () => {
        const { navigation } = this.props;
        this.state.productID = this.props.route.params.PID;
        this.state.sellerID = this.props.route.params.SID;
        this.state.category2ID = this.props.route.params.Cat2ID;
        this.initProductDetail();

        this.focusListener = this.props.navigation.addListener('focus', async () => {
            this.setState({ modalVisibleDropDownMenu: false});
            await this.getMyFavourite();
        });

        //this.getPolygon();
    }

    initProductDetail = async () => {
        await this.getProductDetail();
        await this.getMyFavourite();
        await this.getSellerRelatedProduct();
        await this.getSimilarProduct();
    }

    
    getProductDetail = async () => {

        let p_id = this.state.productID;
        console.log('product scr getProductDetail', p_id)
        
        let result = await new HTTP().post(CONSTS.clone_URL + 'productDetailJs', {p_id});

        if (result.status){
            this.setState({ pName: result.product.p_name, pDesc: result.product.p_desc,
                            pImages: result.product.p_images, sImages: result.product.seller_img, sellerName: result.product.p_seller_name,
                            sellerPostBy: result.product.p_post_by, cat: result.product.p_cat1_name, 
                            pPrice: result.product.p_price, color1: result.product.color_1, color2: result.product.color_2,
                            pView: result.product.p_view, pfav: result.product.total_fav,
                            productLATLNG:{latitude: result.product.p_lat, longitude: result.product.p_lng},
                            LATLNG:{latitude: result.product.p_lat, longitude: result.product.p_lng, 
                                     latitudeDelta: 0.012, longitudeDelta: 0.012}})

        let average = (result.product.seller_manners + result.product.seller_negotiation + result.product.seller_punctuality + result.product.seller_response) / 4

        console.log('Product Src average up isssssssssssssssss', average)
        this.setState({ pSellerRate: average })
        }

        console.log('Product Src Product location : ', this.state.productLATLNG);
        console.log('Product Src getProductDetail: ', result.status);
    }

    ProductImgList(nav, itemList, index) {

        let ImgList = itemList;

        if (!ImgList == null || !ImgList == '') {
            nav.navigate('ProductScreenImg', { ProductImgList: ImgList, ImgIndex: index });
            //console.log('Image List: ', ImgList)
            //console.log(index)
        }
    }

    getSellerRelatedProduct = async () => {

        let seller_id = this.state.sellerID
        let p_id = this.state.productID;
        
        let result = await new HTTP().post(CONSTS.clone_URL + 'getProductOfSameSellerJs', {seller_id, p_id});

        if (result.status){
            this.setState({sellerRelatedProduct: result.list })
        }

        console.log('Product Src getSellerRelatedProduct: ', result.status);

    }

    getSimilarProduct = async () => {

        let cat2_id = this.state.category2ID
        let p_id = this.state.productID;
        
        let result = await new HTTP().post(CONSTS.clone_URL + 'getSimilarProdJs', {cat2_id, p_id});

        if (result.status){
            this.setState({similarProduct: result.list })
        }

        console.log('Product Src getSimilarProduct: ', result.status);
    }

  
    switchProductScreen(navigation, pID, sID, cat2ID){
      
        if(pID != '' || pID != null ){
            this.props.navigation.replace('ProductScreen', {PID: pID, SID: sID, Cat2ID: cat2ID});
        }
    }

    _swiper() {

        //console.log(this.refs.SwiperFlatList);

        if (this.refs.SwiperFlatList) {
            return this.refs.SwiperFlatList.getCurrentIndex() + 1
        } else {
            return 1
        }
    }

    setModalVisibleDropDownMenu = (visible) => {
        this.setState({ modalVisibleDropDownMenu: visible });
    }

    addOrDeleteFavourite = async() =>{

        let fav = this.state.favourite;
        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;
        let p_id = this.state.productID;
        let fav_id = this.state.favouriteID;

        const data = new FormData();

        data.append('mlm_id', mlm_id);
        data.append('session_no', session_no);
        

        if(fav == false){

            data.append('p_id', p_id);

            //add fav
            //console.log('Product Src addFavourite ');

            if (mlm_id !== '' && session_no !== '' && p_id !== '') {

                await fetch(CONSTS.clone_URL + "addToFavouriteJs", {
                    method: "POST",
                    body: data,
                    header: {
                        'Content-Type': 'application/form-data',
                    }
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log('Product Scr 1 response here', response);
                        if (response.status == true) {
                            //var x = '';
                           // x = response.msg;
                            this.setState({favourite: true});
                            this.setState({});
                        } else {
                            //var x = '';
                            //x = response.failed;
                            //console.log(x[0])
                            Alert.alert('Add Favourite Failed', response.failed[0]);
                        }
                    })
    
            } else {
                Alert.alert("Please Login 1", "Please proceed to login");
            }
        }
        
        if(fav == true){

            data.append('fav_id', fav_id);

            //remove fav
            //console.log('Product Src remove Favourite '); 

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
                        console.log('Product Scr 2 response here', response);
                        if (response.status == true) {
                            //var x = '';
                            //x = response.msg;
                            this.setState({favourite: false});
                            this.setState({});
                        } else {
                            //var x = '';
                            //x = response.failed;
                            //console.log(x[0])
                            Alert.alert('Remove Favourite Failed', response.failed[0]);
                        }
                    })
    
            } else {
                Alert.alert("Please Login 2", "Please proceed to login");
            }
        }


    }

    getMyFavourite = async () => {

        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;
        let p_id = this.state.productID;
        console.log(mlm_id, session_no)

        let result = await new HTTP().post(CONSTS.clone_URL + 'myFavouriteJs', {mlm_id, session_no});

        if (result.status){
            this.setState({favouriteList: result.list}, () => {
                result.list.forEach((item)=>{
                    if(item != null){
                        if(p_id == item.fav_product_id){
                            this.setState({favourite: true, favouriteID: item.fav_id})
                        }
                    }
                })
            })
        }

        //console.log('APIDATA : ', APIData);
        console.log('Product Src getMyFavourite: ', result.status);
    }

    onRegionChangeComplete(){
        
    }

    getPolygon() {

        let points = decode('mgiRiwjkRQ{Ip@wA[}Av@}CR}@i@_EO_CG{@XgJTcKXeLI_GSgBe@o@wA}BsAwAwCkCmEiEkC_EkC}DuAkCw@m@k@]aBAkC?aDMeCWaMyCkAAiANo@d@yAj@QbASbBnHzRr@lDPrGdAjAM~Em@CGnKp@z@WnLy@nLhCKh@eQ~CADkCB_B~@FbBzBd@\d@HjC@VoIbBZbA~AYfG]PA~JlCVG`JvG`AKvUxCxAhOZ');

        //console.log('getPolygon', LATLNG);

        const locations = points.map(([latitude, longitude]) => ({latitude, longitude}));
        console.log('getPolygon', locations);

        // let coords = points.map((point, index) =>  {

        //     console.log('index', index, point[0], point[1])

        //     return {
        //         latitude: point[0],
        //         longitude: point[1]
        //     };
        // });

    }

    goSellerProfileScr(nav){

        if( this.state.sellerID != '' ||  this.state.sellerID != null){
            nav.navigate('SellerProfileScreen', {seller_id:  this.state.sellerID});
        }
    }
    
    render() {

    const { navigation } = this.props;
    const { modalVisibleDropDownMenu } = this.state;

        return (
                <Container style={{flex: 1, backgroundColor: 'white'}}>

                <ScrollView>

                    <View style={{width: screenWidth, height: 450, marginBottom: 10}}>
                        <SwiperFlatList
                            ref={(component) => { this._swiper = component }}
                            data={this.state.pImages}
                            horizontal={true}
                            showPagination={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => this.ProductImgList(navigation, this.state.pImages, index)} >
                                    <View>
                                        <Image style={{ width: screenWidth, height: '93%', resizeMode: 'cover' }} source={{uri:item}} />       
                                    </View>
                                    
                                    <View style={{ height: 20, width: 50, marginTop: -60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(230, 230, 230, 0.5)', borderRadius: 20, right: 10, alignSelf: 'flex-end' }}>
                                        <Text style={{fontSize: 12}}>{this.state.currentIndex}/{this.state.pImages.length}</Text>
                                    </View>
                               
                                </TouchableOpacity>
                            )
                            }
                            index={0}
                            pagingEnabled={true}
                            paginationActiveColor='#ff5353'
                            paginationStyleItem={{ height: 5, width: 5, top: -150 }}
                            onChangeIndex={() => this.setState({ currentIndex: this._swiper.getCurrentIndex() + 1 })}
                        />

  
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 15, marginTop: -60}}>
                        <TouchableOpacity onPress={() => this.goSellerProfileScr(navigation)} style={{flexDirection: 'row', alignItems: 'center'}}>
                            {
                                this.state.sImages == ''?
                                <Image style={{ height: 40, width: 40, borderRadius: 20 }} source={require('../../img/user.png')} />
                                                                :
                                <Image style={{ height: 40, width: 40, borderRadius: 20 }} source={{uri: this.state.sImages}} />
                            }
                            <View style={{marginLeft: 5}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 14, marginRight: 10}}>{this.state.sellerName}</Text>
                                    <View style={{backgroundColor: '#65CAC4', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5, padding: 3, paddingLeft: 5, paddingRight: 5}}>
                                        <Image style={{ height: 12, width: 12, marginRight: 3 }} source={require('../../img/diamond-shape.png')} />
                                        <Text style={{color: 'white', fontSize: 10}}>Champ</Text>
                                    </View>
                                </View>
                                <Text style={{color: '#808080', fontSize: 10}}>Mont Kiara</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <View style={{position: 'absolute', right: 10}}>
                            <View>
                                <Pie
                                radius={20}
                                innerRadius={15}
                                sections={[
                                    {
                                    percentage: this.state.pSellerRate,
                                    color: '#FF7A59',
                                    },
                                ]}
                                backgroundColor="#ddd"
                                />
                                <View
                                style={styles.gauge}
                                >
                                <Text
                                    style={styles.gaugeText}
                                >
                                    {this.state.pSellerRate}%
                                </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{borderBottomWidth: 1, borderColor: '#F5F5F5', marginLeft: 10, marginRight: 10}}/>

                    <View style={{padding: 15}}>
                        {/*<Text style={{fontWeight: 'bold', fontSize: 18, color: 'red'}}>{'RM '}{this.state.pPrice}</Text>*/}
                        <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 5}}>{this.state.pName}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{backgroundColor: '#FF7A59', borderRadius: 5, width: 60, flexDirection: 'row', alignItems: 'center', padding: 3, marginTop: 5, marginRight: 5, justifyContent: 'center'}}>
                                <Image style={{ height: 12, width: 12}} source={require('../../img/location-icon-white.png')} />
                                <Text style={{color: 'white', fontSize: 10}}>1.95KM</Text>
                            </View>
                            <LinearGradient colors= {[this.state.color1, this.state.color2]} style={{borderRadius: 5, flexDirection: 'row', alignItems: 'center', padding: 3, marginTop: 5, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
                                <Text style={{color: 'white', fontSize: 10}}>{this.state.cat}</Text>
                            </LinearGradient>
                        </View>
                        <View style={{marginTop: 15}}>
                            <Text style={{fontSize: 13, textAlign: 'justify', marginBottom: 10}}>{this.state.pDesc}</Text>
                        </View>
                        <View style={{marginTop: 10}}>
                        <Text style={{ color: '#808080', fontSize: 10 }}>{this.state.sellerPostBy} • {this.state.pfav} favourites • {this.state.pView} views</Text>
                        </View>
                    </View>
                   

                    <View style={{borderBottomWidth: 1, borderColor: '#F5F5F5', marginLeft: 10, marginRight: 10}}/>

                    <View style={{padding: 15}}>
                        <Text style={{fontWeight: 'bold', marginBottom: 20, fontSize: 14}}>Approximated Location</Text>

                        {/* <Image style={{ height: 400, width: screenWidth * 0.95, borderRadius: 15, alignSelf: 'center' }} source={require('../../img/maps.png')} /> */}
                        <View style={{ height: 400, width: screenWidth * 0.95, alignSelf: 'center' }}>
                            
                            <MapView 
                                style = { { flex: 1} }
                                
                                showsUserLocation = { false }
                                followUserLocation = { false }
                                onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
                                pitchEnabled = {false}
                                rotateEnabled = {false}
                                scrollEnabled = {false}
                                zoomEnabled = {false}
                                showsMyLocationButton = {false}
                                showsPointsOfInterest = {false}
                                showsCompass = {false}
                                showsScale = {false}
                                showsBuildings = {false}
                                showsIndoors = {false}
                                toolbarEnabled={false}
                                region={this.state.LATLNG}
                                provider={PROVIDER_GOOGLE}>

                                {/* <MapView.Polygon
                                    coordinates={this.state.pointPolygon} /> */}

                                
                                    <MapView.Circle
                                        key = { (this.state.currentLongitude + this.state.currentLongitude).toString() }
                                        center = { this.state.productLATLNG }
                                        radius = { RADIUS }
                                        strokeWidth = { 1 }
                                        strokeColor = { '#FF7A59' }
                                        fillColor = { 'rgba(255, 0, 0, 0.4)' }
                                        onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
                                    />
                                   
                            </MapView>
                        </View>
                     
                    </View>

                    <View style={{borderBottomWidth: 1, borderColor: '#F5F5F5', marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10}}/>

                        
                    <View>
                        {
                            this.state.sellerRelatedProduct.length == 0?
                            null
                            :
                            <Text style={{fontWeight: 'bold', fontSize: 14, margin: 10}}>Other Items by {this.state.sellerName}</Text>
                        }
                       
                       
                        <View style={{alignSelf:'center'}}>
                        
                            <View style={{alignItems: 'flex-start', width: screenWidth * 0.95, marginLeft: 2}}>
                                
                                <FlatList
                                    data={this.state.sellerRelatedProduct}
                                    keyExtractor={(item) => item.p_id}
                                    horizontal={false}
                                    numColumns={2}
                                    renderItem={({item}) => ( 
                                    
                                    <View style={{marginTop: 20}}>
                                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                        <TouchableOpacity onPress={() => this.switchProductScreen(navigation, item.p_id, item.p_seller_id, item.p_category2)}>
                                        <View>
                                            <View>
                                                <Image style={{ height: 200, width: screenWidth * 0.465, borderRadius: 15 }} source={{uri: item.cover_img}} />
                                                <View style={{ height: 200, width: screenWidth * 0.465, borderRadius: 15, backgroundColor: 'black', position: 'absolute', opacity: 0.14 }}/>
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

                                           
                                        </View>
                                        </TouchableOpacity>

                                        <View style={{width: screenWidth * 0.025}}/>

                                    </View>

                                </View>
                                    )}/>
                            </View>
                    
                         </View>

                    </View>


                    <View style={{borderBottomWidth: 1, borderColor: '#F5F5F5', marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 10}}/>


                    <View>
                        {
                            this.state.similarProduct.length == 0?
                            null
                            :
                            <Text style={{fontWeight: 'bold', fontSize: 14, margin: 10}}>You Might Also Like</Text>
                        }
                       
                        <View style={{alignItems:'flex-start', width: screenWidth}}>
                        
                            <View style={{alignItems: 'flex-start', width: screenWidth * 0.95, marginLeft: 10}}>
                                
                                <FlatList
                                    data={this.state.similarProduct}
                                    keyExtractor={(item) => item.p_id}
                                    horizontal={false}
                                    numColumns={2}
                                    renderItem={({item}) => ( 
                                    
                                    <View style={{marginTop: 20}}>
                                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                        <TouchableOpacity onPress={() => this.switchProductScreen(navigation, item.p_id, item.p_seller_id, item.p_category2)}>
                                        <View>
                                            <View>
                                                <Image style={{ height: 200, width: screenWidth * 0.465, borderRadius: 15 }} source={{uri: item.cover_img}} />
                                                <View style={{ height: 200, width: screenWidth * 0.465, borderRadius: 15, backgroundColor: 'black', position: 'absolute', opacity: 0.14 }}/>
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

                    </View>

                </ScrollView>

                    <Button onPress={() => navigation.goBack()} style={{height: 30, width: 30, backgroundColor: 'rgba(100, 100, 100, 0.8)', position: 'absolute', borderRadius: 50, alignItems: 'center', justifyContent: 'center', top: 40, left: 15}}>
                        <Image style={{ height: 18, width: 18 }} source={require('../../img/back-icon-white.png')} />
                    </Button>
                    <Button onPress={() => this.setModalVisibleDropDownMenu(true)} style={{height: 30, width: 30, backgroundColor: 'rgba(100, 100, 100, 0.8)', position: 'absolute', borderRadius: 50, alignItems: 'center', justifyContent: 'center', top: 40, right: 15}}>
                        <Image style={{ height: 18, width: 18 }} source={require('../../img/more-options.png')} />
                    </Button>

                     {/*Modal for dropdownmenu */}
                     <Modal animationType="none" transparent={true} visible={modalVisibleDropDownMenu} onRequestClose={() => { Alert.alert("Confirm cancel changes? "); }} >

                        <TouchableWithoutFeedback //this touchable closes modal
                            onPress={() => {
                                this.setModalVisibleDropDownMenu(false)
                            }
                            }>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Right style={{}}>
                                        <Card style={{ width: 200, padding: 5, backgroundColor: 'white', marginHorizontal: 0, borderRadius: 10, height: 106, top: 10, right: 15 }}>

                                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => this.addOrDeleteFavourite()}>
                                                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                    <View style={{ position: 'absolute', left: 10 }}>
                                                        {
                                                            this.state.favourite == false?
                                                                <Image style={{ height: 25, width: 25 }} source={require('../../img/heart_empty.png')} />
                                                                :
                                                                <Image style={{ height: 25, width: 25 }} source={require('../../img/heart_full.png')} />
                                                        }

                                                    </View>
                                                    <View style={{ position: 'absolute', left: 60 }}>
                                                        <Text style={{ fontSize: 12 }}>Add to Favourite</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                            <View style={{ borderWidth: 0.5, borderColor: '#EEEEEE', marginTop: 5, marginBottom: 5 }}></View>

                                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
                                                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                    <View style={{ position: 'absolute', left: 10 }}>
                                                        <Image style={{ height: 25, width: 25 }} source={require('../../img/new_chat.png')} />
                                                    </View>
                                                    <View style={{ position: 'absolute', left: 60 }}>
                                                        <Text style={{ fontSize: 12 }}>Go to Messages</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                        </Card>
                                    </Right>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                     </Modal>


                     <Footer>
                        <FooterTab style={{backgroundColor: 'white'}}>
                            <Button onPress={() => this.addOrDeleteFavourite()} transparent style={{flex: 0.15}}>
                            {
                            this.state.favourite == false?
                                <Image style={{ height: 27, width: 27 }} source={require('../../img/heart_black.png')} />
                            :
                                <Image style={{ height: 27, width: 27 }} source={require('../../img/heart_full.png')} />
                            }
                            </Button>
                            <View style={{borderLeftWidth: 1, borderColor: '#f0f0f0', height: 40, marginTop: 7, marginRight: 10}} />
                            <View style={{justifyContent: 'center', flex: 0.425}}>
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>{'RM '}{this.state.pPrice}</Text>
                            </View>
                            <Button onPress={() => navigation.navigate('MessageDetailScreen')} transparent style={{backgroundColor: '#FF7A59', borderRadius: 10, height: 40, flex: 0.425, marginRight: 10}}>
                                <Text style={{color: 'white'}}>Chat</Text>
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
  height: 400,
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
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 10,
  },
})

export default ProductScreen;