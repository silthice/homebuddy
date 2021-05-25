import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import Slider from '@react-native-community/slider';
import APIData from '../api/data';
import HTTP from '../api/http';
import CONSTS from '../config/constants';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline, Polygon } from 'react-native-maps';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
//const RADIUS = 300
class NearbySettingScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };

    constructor(props) {
      super(props);

      this.state = {
          
          mapRegion: null,
          currentLatitude: null,
          currentLongitude: null,
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
          sliderValue: '',
          RADIUS: 100,
          //pointPolygon: [{"latitude": 3.16551, "longitude": 101.64101}, {"latitude": 3.1656, "longitude": 101.64275}, {"latitude": 3.16535, "longitude": 101.64319}, {"latitude": 3.16549, "longitude": 101.64366}, {"latitude": 3.16521, "longitude": 101.64445}, {"latitude": 3.16511, "longitude": 101.64476}, {"latitude": 3.16532, "longitude": 101.64572}, {"latitude": 3.1654, "longitude": 101.64636}, {"latitude": 3.16544, "longitude": 101.64666}, {"latitude": 3.16531, "longitude": 101.64846}, {"latitude": 3.1652, "longitude": 101.6504}, {"latitude": 3.16507, "longitude": 101.65251}, {"latitude": 3.16512, "longitude": 101.65379}, {"latitude": 3.16522, "longitude": 101.65431}, {"latitude": 3.16541, "longitude": 101.65455}, {"latitude": 3.16585, "longitude": 101.65518}, {"latitude": 3.16627, "longitude": 101.65562}, {"latitude": 3.16703, "longitude": 101.65632}, {"latitude": 3.16806, "longitude": 101.65733}, {"latitude": 3.16876, "longitude": 101.65829}, {"latitude": 3.16946, "longitude": 101.65924}, {"latitude": 3.16989, "longitude": 101.65994}, {"latitude": 3.17017, "longitude": 101.66017}, {"latitude": 3.17039, "longitude": 101.66032}, {"latitude": 3.17088, "longitude": 101.66033}, {"latitude": 3.17158, "longitude": 101.66033}, {"latitude": 3.17239, "longitude": 101.6604}, {"latitude": 3.17306, "longitude": 101.66052}, {"latitude": 3.17531, "longitude": 101.66129}, {"latitude": 3.17569, "longitude": 101.6613}, {"latitude": 3.17606, "longitude": 101.66122}, {"latitude": 3.1763, "longitude": 101.66103}, {"latitude": 3.17675, "longitude": 101.66081}, {"latitude": 3.17684, "longitude": 101.66047}, {"latitude": 3.17694, "longitude": 101.65997}, {"latitude": 3.17542, "longitude": 101.65679}, {"latitude": 3.17516, "longitude": 101.65592}, {"latitude": 3.17507, "longitude": 101.65454}, {"latitude": 3.17472, "longitude": 101.65416}, {"latitude": 3.17479, "longitude": 101.65304}, {"latitude": 3.17502, "longitude": 101.65306}, {"latitude": 3.17506, "longitude": 101.65106}, {"latitude": 3.17481, "longitude": 101.65076}, {"latitude": 3.17493, "longitude": 101.6486}, {"latitude": 3.17522, "longitude": 101.64644}, {"latitude": 3.17453, "longitude": 101.6465}, {"latitude": 3.17432, "longitude": 101.64941}, {"latitude": 3.17352, "longitude": 101.64942}, {"latitude": 3.17349, "longitude": 101.65012}, {"latitude": 3.17347, "longitude": 101.6506}, {"latitude": 3.17315, "longitude": 101.65056}, {"latitude": 3.17265, "longitude": 101.64994}, {"latitude": 3.17246, "longitude": 101.64975}, {"latitude": 3.17241, "longitude": 101.64905}, {"latitude": 3.1724, "longitude": 101.64893}, {"latitude": 3.17408, "longitude": 101.64843}, {"latitude": 3.17394, "longitude": 101.64809}, {"latitude": 3.17346, "longitude": 101.64822}, {"latitude": 3.17214, "longitude": 101.64837}, {"latitude": 3.17205, "longitude": 101.64838}, {"latitude": 3.17013, "longitude": 101.64767}, {"latitude": 3.17001, "longitude": 101.64771}, {"latitude": 3.16824, "longitude": 101.64631}, {"latitude": 3.16791, "longitude": 101.64637}, {"latitude": 3.16427, "longitude": 101.6456}, {"latitude": 3.16382, "longitude": 101.64299}, {"latitude": 3.16368, "longitude": 101.64299}],
      }
  }

  componentDidMount = async () => {
    const { navigation } = this.props;

    //this.initProductDetail();

      this.setState({
          productLATLNG: { latitude: APIData.latitude, longitude: APIData.longitude },
          LATLNG: {
              latitude: APIData.latitude, longitude: APIData.longitude,
              latitudeDelta: 0.012, longitudeDelta: 0.012
          }
      })

      let url = 'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json';
      url += '?prox=' + APIData.latitude + ',' + APIData.longitude;
      url += '&mode=retrieveAddresses&maxResults=1&gen=9&apiKey=' + 'lUXHy4ZjSlIi_QzCAH-UHFYLZrkeN_Yp4pW86T4NIVs';
      console.log("dsdsdsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
      console.log(url);

      let result2 = await new HTTP().get(url);
      if (result2 != null && result2 != undefined) {
          console.log("second log");
          console.log(result2);
          // Alert.alert("here")
          let r = result2;
          let target = r.Response.View[0].Result[0].Location.Address.District + ', ' + r.Response.View[0].Result[0].Location.Address.State + ', ' + r.Response.View[0].Result[0].Location.Address.City;;
          console.log(target)
      }

}

initProductDetail = async () => {
    await this.getProductDetail();
}

getProductDetail = async () => {

    let p_id = 3;//this.state.productID;
    
    let result = await new HTTP().post(CONSTS.clone_URL + 'productDetailJs', {p_id});

    if (result.status){
        this.setState({ pName: result.product.p_name, pDesc: result.product.p_desc,
                        pImages: result.product.p_images, sellerName: result.product.p_seller_name,
                        sellerPostBy: result.product.p_post_by, cat: result.product.p_cat1_name, 
                        pPrice: result.product.p_price, 
                        productLATLNG:{latitude: result.product.p_lat, longitude: result.product.p_lng},
                        LATLNG:{latitude: result.product.p_lat, longitude: result.product.p_lng, 
                                 latitudeDelta: 0.012, longitudeDelta: 0.012}})
    }

    console.log('Nearby Setting getProductDetail : ', this.state.productLATLNG);
    console.log('Nearby Setting getProductDetail: ', result.status);
}

  sliderValue(value){
    console.log('slider value', value);

    if(value == 1){
      this.setState({RADIUS: 100});
    }
    if(value == 2){
      this.setState({RADIUS: 200});
    }
    if(value == 3){
      this.setState({RADIUS: 300});
    }
  }

  onRegionChangeComplete(){
        
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
                              <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>Nearby Settings</Text>
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

                                        <MapView.Circle
                                            key = { (this.state.currentLongitude + this.state.currentLongitude).toString() }
                                            center = { this.state.productLATLNG }
                                            radius = { this.state.RADIUS }
                                            strokeWidth = { 1 }
                                            strokeColor = { '#1a66ff' }
                                            fillColor = { 'rgba(255, 0, 0, 0.4)' }
                                            onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
                                        />
                                      
                                </MapView>
                            </View>
                              
                          </View>

                          <View style={{alignItems: 'center', marginTop: 30}}>
                              <Text style={{fontSize: 12, marginBottom: 10}}>Current Location</Text>
                              <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Mont Kiara</Text>
                              <Text style={{color: '#808080', fontSize: 10}}>You can set the distance up to 3KM diameter.</Text>
                          </View>


                          <View style={{alignItems: 'center', marginTop: 20}}>
                            <Slider
                              style={{width: screenWidth * 0.95, height: 40}}
                              minimumValue={1}
                              maximumValue={3}
                              minimumTrackTintColor="#FF7A59"
                              maximumTrackTintColor="#E6E6E6"
                              thumbTintColor="#FF7A59"
                              step={1}
                              onValueChange={(sliderValue) => this.sliderValue(sliderValue)}
                            />
                            <View style={{flexDirection: 'row'}}>
                              <Text style={{flex: 0.33, textAlign: 'left', marginLeft: 10}}>1KM</Text>
                              <Text style={{flex: 0.33, textAlign: 'center'}}>2KM</Text>
                              <Text style={{flex: 0.33, textAlign: 'right', marginRight: 10}}>3KM</Text>
                            </View>
                          </View>



                      </View>


                  </Content>

                  <Footer style={{ height: 60, borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: null }}>
                      <FooterTab style={{ backgroundColor: 'white' }}>
                          <Button vertical style={{backgroundColor: '#FF7A59', height: 40, marginLeft: 20, marginRight: 20, borderRadius: 10}}>
                              <Text style={{color: 'white', fontSize: 15}}>Range Check</Text>
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

export default NearbySettingScreen;