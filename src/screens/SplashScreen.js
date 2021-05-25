import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, Picker, Alert } from 'react-native'
import {
    Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Badge,
    Footer, FooterTab, Content, Thumbnail
} from "native-base";
import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import APIData from '../api/data';
import HTTP from '../api/http';
import CONSTS from '../config/constants';

const screenWidth = Math.round(Dimensions.get('screen').width);
const screenHeight = Math.round(Dimensions.get('screen').height);

class SplashScreen extends React.Component {

    navigateDetails(navigation) {
        debugger
        navigation('HomeScreen');
    };

    componentDidMount = async() => {

        const { navigation } = this.props;

        //console.log('splash')
        //console.log(this.props)

        //await this.getSplashImage();

        this.startCountDown();
    }

    constructor(props) {
        super(props);
        this.state = {
            remainingTime: 3, 
            splashScreenURL: '',
            defaultSplashImg: ''
        }
    }

    getSplashImage = async () => {

        let result = await new HTTP().post(CONSTS.clone_URL + 'splashScreenJs', {});
   
        if (result.status) {
           //setState to pic
           this.setState({ splashScreenURL: result.ss})
        } 

        //console.log('Result getSplahsImg: ', result.ss)
    }

    startCountDown() {

        console.log('started')
        var timer = 0;


        timer = setInterval(() => {

            if (this.state.remainingTime == 0) {
                clearInterval(timer);
                //this.setState({ remainingTime: 3 });
            } else {
                this.state.remainingTime = this.state.remainingTime - 1;
                this.setState({ remainingTime: this.state.remainingTime });
            }

            //console.log(this.state.remainingTime)
        }, 1000);


        setTimeout(() => {
            this.props.navigation.replace('HomeScreen')
            //this.state.countDownTimer = this.state.countDownTimer - 1
            //this.setState({})
            //this.setState({ countDownTimer: this.state.countDownTimer - 1 })


        }, 4000);


    }


    render() {

        const { navigation } = this.props;
        const { modalVisibleBank, modalVisibleBankAccNo, modalVisibleBankAccHolderName } = this.state;

        return (
        <Container>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 

                    <ImageBackground
                        //source={this.state.splashScreenURL == ''? require("../../img/general-splash.png") : {uri: this.state.splashScreenURL}}
                        // source={{uri: this.state.splashScreenURL}}
                        source={require("../../img/launch_screen.png")}
                        style={{ flex: 1, height: screenHeight, width: screenWidth }}
                        resizeMode='cover'// must be passed from the parent, the number may vary depending upon your screen size
                    >
             
                    <View style={{ position: 'absolute', top: '5%', right: screenWidth * 0.05, height: 30, width: 60, backgroundColor: 'rgba(52, 52, 52, 0.5)', justifyContent: 'center', alignItems: 'center', borderColor: '#F5F5F5', borderWidth: 0.5, borderRadius: 3 }}>
                        {
                            this.state.remainingTime == 0 ?
                                <TouchableOpacity onPress={() => {
                                    console.log(navigation)
                                    navigation.replace('HomeScreen')

                                }}>
                                    <Text style={{color: '#F5F5F5', fontSize: 14}}>Skip</Text>
                                </TouchableOpacity>
                                :
                                <Text style={{color: '#F5F5F5', fontSize: 14}}>{this.state.remainingTime}s</Text>
                        }
                    </View>
                </ImageBackground>
            </View>
        </Container>
        )
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

export default SplashScreen;
