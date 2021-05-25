import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Alert, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab, Picker } from "native-base";
import Swiper from 'react-native-swiper';
import ImagePicker from 'react-native-image-picker';
import HTTP from '../api/http';
import CONSTS from '../config/constants';
import GetLocation from 'react-native-get-location';
import APIData from '../api/data';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class SignUpScreen extends React.Component {

    navigateDetails(navigation) {
        debugger
        navigation('HomeScreen');
    };

    constructor(props) {
        super(props);
        this.state = {
            fileUpload1: false,
            resourcePath1: {},
            reviewImg1: null,
            location: [],
            username: 'giap',
            email: 'giap@mail.com',
            password: '123456789@',
            confirmPassword: '123456789@',
            selected: undefined,
            resUri: '',
            resType: '',
            resFileName: '',
            selectedLatitude: '',
            selectedLongitude: '',
            selectedPlaceTitle: '',
            selectedRadius: 100,
        };
    }


    componentDidMount = async () => {

        const { navigation } = this.props;

        this.initInfo();

        this.focusListener = navigation.addListener('focus', () => {

        });

    }





    initInfo = async () => {
        this.getLocation();
    }


    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    selectFile1 = () => {
        var options = {
            title: 'Select Image',
            noData: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, res => {

            if (res.didCancel) {
                console.log('User cancelled image picker p1');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else {
                let source = res;
                this.setState({
                    fileUpload1: true,
                    resourcePath1: source,
                });
                this.setState({ reviewImg1: res });

            }
        });
    };

    getLocation = async () => {

        let result = await new HTTP().post(CONSTS.clone_URL + 'locationListJs', {});

        if (result.status) {
            console.log('SignUp scr getlocation', result.status)
            this.setState({ location: result.list })
        } else {
            console.log('SignUp src getlocation', result.status)
        }

    }


    registerUser = async (nav) => {

        //let username = this.state.username;
        //let email = this.state.email;
        //let password = this.state.password;
        //let confirm_pwd = this.state.confirmPassword;

        let username = 'giaps';
        let email = 'ryonlim@hotmail.com';
        let password = '123456789@';
        let confirm_pwd = '123456789@';

        const data = new FormData();


        data.append('username', username);
        data.append('email', email);
        data.append('password', password);
        data.append('confirm_pwd', confirm_pwd);

        if (this.state.reviewImg1 != null) {
            data.append('profile_pic', {
                uri: Platform.OS === "android" ? this.state.reviewImg1.uri : this.state.reviewImg1.uri.replace("file://", ""),
                type: this.state.reviewImg1.type,
                name: this.state.reviewImg1.fileName,
                //data: res.data
            });
        } else {
            Alert.alert('Image is Required', 'Please Upload you profile Image')
        }



        data.append('Content-Type', 'application/form-data');

        console.log(data._parts[4])

        if (this.state.reviewImg1 != null) {

            if (email != '') {

                if (username != '') {

                    if (password != '') {

                        if (confirm_pwd != '') {

                            if (this.state.selected != undefined) {

                                console.log('post data', data);

                                await fetch(CONSTS.clone_URL + "registerJs", {
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
                                            var x = '';
                                            x = response.status;

                                            this.getLocationisSlc(response.user.mlm_id, response.user.session_no);

                                        } else {
                                            var x = '';
                                            x = response.errors;
                                            console.log('here required field is empty', x[0])

                                            Alert.alert(
                                                'Post Failed',
                                                x[0],
                                                [
                                                    { text: 'OK' }
                                                ],
                                                { cancelable: false }
                                            );
                                        }
                                    })

                            } else { Alert.alert('Location is not selected', 'Please Select a Location!') }

                        } else { console.log('confirm password is empty') }

                    } else { console.log('password is empty') }

                } else { console.log('username is empty') }

            } else { console.log('email is empty') }

        } else { console.log('profile image is empty') }

        //let result = await new HTTP().post(CONSTS.clone_URL + 'registerJs', {username, email, password, confirm_pwd, profile_pic});

    }

    getLocationisSlc = async (mlm_id, session_no) => {

        this.state.location.forEach((item) => {

            if (item.l_id == this.state.selected) {
                this.setState({ selectedLatitude: item.l_lat, selectedLongitude: item.l_lng, selectedPlaceTitle: item.l_title }, () => { this.addUserSetting(mlm_id, session_no) });
                //console.log('get this itemmmmmmmmmmmmmmmmm', item)
            }
        })
    }

    addUserSetting = async (mlm_id, session_no) => {

        let curr_latitude = this.state.selectedLatitude;
        let curr_longitude = this.state.selectedLongitude;
        let us_location_title = this.state.selectedPlaceTitle;
        let us_distance = this.state.selectedRadius;

        console.log(mlm_id, session_no, curr_latitude, curr_longitude, us_distance)

        let result = await new HTTP().post(CONSTS.clone_URL + 'userSettingJs', { mlm_id, session_no, curr_latitude, curr_longitude, us_distance, us_location_title })

        console.log(result)

        if (result.status) {

            console.log('Sign up src: register successfully')
            Alert.alert(
                'Register',
                'Register successfully! Please Try Login Now.',
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('LoginScreen') }
                ],
                { cancelable: false }
            )

        } else {
            Alert.alert(
                'Error',
                'Register failed! Please Try Again.',
                [
                    { text: 'OK', onPress: () => this.props.navigation.goBack() }
                ],
                { cancelable: false }
            )
        }
    }


    render() {

        const { navigation } = this.props;


        return (
            <Container style={{ flex: 1, backgroundColor: 'white' }}>

                <Header style={{ height: 60, backgroundColor: 'white', elevation: 0, marginTop: 30 }}>
                    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Image style={{ height: 25, width: 25 }} source={require('../../img/back-icon.png')} />
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>Sign Up</Text>
                        </Button>
                    </Left>
                    <Body style={{ flex: 0 }}>
                    </Body>
                    <Right style={{ flex: 0 }}>

                    </Right>
                </Header>


                <Content>
                    <TouchableOpacity>
                        <View style={{ alignSelf: 'center', marginTop: 30 }}>
                            <TouchableOpacity onPress={this.selectFile1}>

                                {this.state.fileUpload1 === false ?

                                    <View style={{ height: 150, width: 150, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 80, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ height: 150, width: 150 }} source={require('../../img/user.png')} />
                                    </View>
                                    :

                                    <View style={{ height: 150, width: 150, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 80, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ height: 150, width: 150, borderRadius: 80 }} source={{ uri: this.state.resourcePath1.uri }} />
                                    </View>
                                }
                            </TouchableOpacity>
                            <Text style={{ textAlign: 'center', fontSize: 12 }}>Add a Profile Picture</Text>
                        </View>
                    </TouchableOpacity>


                    <View style={{ alignSelf: 'center', marginTop: 50 }}>


                        <Item style={{ borderBottomWidth: 0, height: 50, backgroundColor: '#F5F5F5', borderRadius: 5, width: screenWidth * 0.8, marginBottom: 10 }}>
                            <Input placeholder='Username' style={{ fontSize: 12 }} placeholderTextColor="#CCCCCC" onChangeText={(usr) => this.setState({ username: usr })} />
                        </Item>

                        <Item style={{ borderBottomWidth: 0, height: 50, backgroundColor: '#F5F5F5', borderRadius: 5, width: screenWidth * 0.8, marginBottom: 10 }}>
                            <Input placeholder='Email' style={{ fontSize: 12 }} placeholderTextColor="#CCCCCC" onChangeText={(eml) => this.setState({ email: eml })} />
                        </Item>

                        <Item style={{ borderBottomWidth: 0, height: 50, backgroundColor: '#F5F5F5', borderRadius: 5, width: screenWidth * 0.8, marginBottom: 10 }}>
                            <Input placeholder='Password' style={{ fontSize: 12 }} placeholderTextColor="#CCCCCC" secureTextEntry={true} onChangeText={(pss) => this.setState({ password: pss })} />
                        </Item>

                        <Item style={{ borderBottomWidth: 0, height: 50, backgroundColor: '#F5F5F5', borderRadius: 5, width: screenWidth * 0.8 }}>
                            <Input placeholder='Confirm Password' style={{ fontSize: 12 }} placeholderTextColor="#CCCCCC" secureTextEntry={true} onChangeText={(cpss) => this.setState({ confirmPassword: cpss })} />
                        </Item>

                        <Item picker style={{ backgroundColor: '#F5F5F5', width: screenWidth * 0.8, marginTop: 10, borderRadius: 5, borderBottomWidth: 0, marginLeft: 2 }}>
                            <Picker
                                mode="dropdown"
                                placeholder="Select Location"
                                iosIcon={<Icon name="arrow-down" />}
                                Icon={<Icon name="arrow-down" />}
                                textStyle={{ color: "black", backgroundColor: 'white' }}
                                itemStyle={{
                                    backgroundColor: "#d3d3d3",
                                }}
                                itemTextStyle={{ color: 'black' }}
                                style={{ width: screenWidth * 0.8, color: 'black', scaleX: 0.75, scaleY: 0.75 }}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="Select Location" value="key0" />
                                {
                                    this.state.location.map((item) => {

                                        return (<Picker.Item label={item.l_title} value={item.l_id} />)
                                    })
                                }
                            </Picker>
                        </Item>

                        <Button onPress={() => this.registerUser(navigation)} style={{ backgroundColor: '#FF7A59', width: screenWidth * 0.8, justifyContent: 'center', borderRadius: 5, marginTop: 40, marginLeft: 2 }}>
                            <Text style={{ color: 'white' }}>SIGN UP</Text>
                        </Button>


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
        height: 500,
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

export default SignUpScreen;