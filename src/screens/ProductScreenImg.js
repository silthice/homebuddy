import React from 'react'
import {
    StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, AppRegistry, ScrollView,
    TouchableOpacity, Animated, Platform, Easing, FlatList, Alert, Modal, TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Badge, Picker } from "native-base";
import Swiper from 'react-native-swiper';
import { Col, Row, Grid } from "react-native-easy-grid";
import APIdata from '../api/data';
import HTTP from '../api/http';
import CONSTS from '../config/constants';
import GallerySwiper from "react-native-gallery-swiper";

const Header_Maximum_Height = 70;
const Header_Minimum_Height = 70;

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ProductScreenImg extends React.Component {
   
   constructor(props){
     super(props);
       this.state={
           ProductImgList: [],
           ImgIndex: 0,
           currentIndex: 0,
       }
   }

   componentDidMount(){
       this.state.ProductImgList = this.props.route.params.ProductImgList;
       this.state.currentIndex = this.props.route.params.ImgIndex;
       this.state.ImgIndex = this.props.route.params.ImgIndex;
       this.setState({});
    }


    renderImages(idx) {

        console.log('render images')
        console.log(this.state.ProductImgList)
        console.log(this.state.ImgIndex)


        let productImgs = [];
        for (var i = 0; i < this.state.ProductImgList.length; i++) {
            productImgs.push({ "uri": this.state.ProductImgList[i] });
        }

        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
        console.log('images: ', productImgs);
        console.log('from prop', idx)

        console.log(productImgs[idx])
        let index = idx;

        console.log('indexxxxxx', index)

        if (typeof productImgs[idx] == 'undefined') {
            return null
        } else {
            return (
                <View>
                <GallerySwiper

                    images={productImgs}

                    // Version *1.15.0 update
                    // onEndReached={() => {
                    //     // add more images when scroll reaches end
                    // }}
                    initialPage={index}
                    // Change this to render how many items before it.
                    //initialNumToRender={2}
                    // Turning this off will make it feel faster
                    // and prevent the scroller to slow down
                        // on fast swipes.
                        onPageSelected={(position) => {
                            console.log('after scrolled', position)
                            this.setState({ currentIndex: position })

                        }}
                    sensitiveScroll={false}
                    resizeMode={'contain'}
                    style={{ flex: 0.9 }}

                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: screenWidth, position: 'absolute', top: screenHeight * 0.85 }}>
                        {
                            this.state.ProductImgList.map((item, index) => (
                                <View style={{ backgroundColor: index == this.state.currentIndex ? '#FF7A59' : '#f1f1f1', height: 10, width: 10, borderRadius: 10, marginHorizontal: 5 }}></View>

                        ))
                    }    
                    </View>

                </View>

            )
        }

        //return null

    }
  

   render(){

        const { navigation } = this.props;

        return(

            <Container style={styles.container}>


                
                <View style={{textAlign: 'left', width: "50%", top: 40, left: 15, backgroundColor: 'transparent', zIndex: 1}}>
                    <TouchableOpacity  onPress={() => navigation.goBack()} style={{height: 30, width: 30, backgroundColor: 'rgba(100, 100, 100, 0.8)', borderRadius: 50, alignItems: 'center', justifyContent: 'center',}}>
                        <Image style={{width: 18, height: 18}} source={require("../../img/back-icon-white.png")}/>
                    </TouchableOpacity>
                </View>
                 {/* <Button onPress={() => navigation.goBack()} style={{height: 30, width: 30, backgroundColor: 'rgba(100, 100, 100, 0.8)', position: 'absolute', borderRadius: 50, alignItems: 'center', justifyContent: 'center', top: 40, left: 15}}>
                        <Image style={{ height: 18, width: 18 }} source={require('../../img/back-icon-white.png')} />
                </Button> */}

                <View style={{ flex: 1, alignItems: 'center' }}>

                    {this.renderImages(this.state.ImgIndex)}

                </View>
               
            </Container>
        )

   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    }, 
    container2: {
        flex: 1,
        justifyContent: 'center',
    },
    swiper: {},

  });

export default ProductScreenImg;