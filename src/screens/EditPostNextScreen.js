import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Image, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import ImagePicker from 'react-native-image-picker';
import APIData from '../api/data';
import HTTP from '../api/http';
import CONSTS from '../config/constants';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class EditPostScreen extends React.Component {

     navigateDetails(navigation)  {
         debugger
         navigation('HomeScreen');
    };

    constructor(props) {
        super(props);

        this.state = {
            modalVisibleDropDownMenu: false,
            pID:'',
            p_price: '',
            p_isFree: '',
            cat1ID: '',
            cat2ID: '',
            cat1Name: '',
            cat2Name: '',
            titleInput: '',
            priceInput: '',
            descInput: '',
            imagePush: [],
            p_img: [],
            stackImg: [],
            image1: [],
            image2: [],
            image3: [],
            image4: [],
            image5: [],
            image1ID: null,
            image2ID: null,
            image3ID: null,
            image4ID: null,
            image5ID: null,
            reviewImg1: null,
            reviewImg2: null,
            reviewImg3: null,
            reviewImg4: null,
            reviewImg5: null,
            fileUpload1: false,
            resourcePath1: {},
            fileUpload2: false,
            resourcePath2: {},
            fileUpload3: false,
            resourcePath3: {},
            fileUpload4: false,
            resourcePath4: {},
            fileUpload5: false,
            resourcePath5: {},
        }
    }

    componentDidMount = async () => {

        const { navigation } = this.props;
        this.state.pID =  this.props.route.params.PID;

        this.getEditProduct();
    }


    getEditProduct = async() =>{

        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;
        let p_id = this.state.pID;

        let result = await new HTTP().post(CONSTS.clone_URL + 'myProductDetailJs', {mlm_id, session_no, p_id});

        if (result.status){
            this.setState({titleInput: result.product.p_name, descInput: result.product.p_desc,
                           priceInput: result.product.p_price.toString(), p_isFree: result.product.p_isFree, 
                           cat1ID: result.product.p_category1, cat2ID: result.product.p_category2,
                           cat1Name: result.product.p_cat1_name, cat2Name: result.product.p_cat2_name,
                           p_img: result.product.p_images});
        }
        

        this.loopImageToImgPicker();
        console.log('Edit Post Next  Src getEditProduct: ', result.status);
    }

    loopImageToImgPicker(){

        let img = this.state.p_img;

        if(img != null || img != ''){
            
            if(typeof img[0] != 'undefined' || img[0] != null){
                this.setState({image1: img[0].path});
                this.setState({image1ID: img[0].pi_id});
                //this.processing(this.state.image1ID);
            }
            if(typeof img[1] != 'undefined' || img[1] != null){
                this.setState({image2: img[1].path});
                this.setState({image2ID: img[1].pi_id});
                //this.processing(this.state.image2ID);
            }
            if(typeof img[2] != 'undefined' || img[2] != null){
                this.setState({image3: img[2].path});
                this.setState({image3ID: img[2].pi_id});
                //this.processing(this.state.image3ID, this.state.image3);
            }
            if(typeof img[3] != 'undefined' || img[3] != null){
                this.setState({image4: img[3].path});
                this.setState({image4ID: img[3].pi_id});
            }
            if(typeof img[4] != 'undefined' || img[4] != null){
                this.setState({image5: img[4].path});
                this.setState({image5ID: img[4].pi_id});
            }
        }
  
    }

    //select image in image picker
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

    selectFile2 = () => {
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
                console.log('User cancelled image picker p2');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else {
                let source = res;
                this.setState({
                    fileUpload2: true,
                    resourcePath2: source,
                });
                this.setState({ reviewImg2: res });

            }
        });
    };

    selectFile3 = () => {
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
                console.log('User cancelled image picker p3');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else {
                let source = res;
                this.setState({
                    fileUpload3: true,
                    resourcePath3: source,
                });
                this.setState({ reviewImg3: res });

            }
        });
    };

    selectFile4 = () => {
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
                console.log('User cancelled image picker p4');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else {
                let source = res;
                this.setState({
                    fileUpload4: true,
                    resourcePath4: source,
                });
                this.setState({ reviewImg4: res });

            }
        });
    };

    selectFile5 = () => {
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
                console.log('User cancelled image picker p5');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else {
                let source = res;
                this.setState({
                    fileUpload5: true,
                    resourcePath5: source,
                });
                this.setState({ reviewImg5: res });

            }
        });
    };

    processing(v1, v2) {
        console.log('processing')
        console.log(v1, v2)


        var obj = {

            "p_id": "",
            "img": "",
        }


        console.log('before', obj)


        obj.p_id = v1
        obj.img = v2

        this.state.stackImg.push(obj)
        this.setState({})


        console.log('after', obj);
        this.state.stackImg.map((item, i) =>{
            
        console.log('replace existing ---- idx +++++', i)
        })
        console.log('replace existing ', this.state.stackImg)
    }

    onPost = async (nav) =>{

        let mlm_id = APIData.mlm_id;
        let session_no = APIData.session_no;
        let p_category1 = this.state.cat1ID;
        let p_category2 = this.state.cat2ID;
        let p_id = this.state.pID;
        let p_lat = APIData.latitude;
        let p_lng =APIData.longitude;
        let p_isFree = this.state.p_isFree;
        let p_price = this.state.priceInput;
        let p_name = this.state.titleInput;
        let p_desc = this.state.descInput;

        let price = parseFloat(p_price);

        if( price <= 0){
            p_isFree = 1;
        }

        console.log('price', p_isFree);
        
        const data = new FormData();

       data.append('mlm_id', mlm_id);
       data.append('session_no', session_no);
       data.append('p_id', p_id);
       data.append('p_lat' , p_lat);
       data.append('p_lng' , p_lng);
       data.append('p_category1', p_category1);
       data.append('p_category2', p_category2);
       data.append('p_price', p_price);
       data.append('p_isFree', p_isFree);
       data.append('p_name', p_name);
       data.append('p_desc', p_desc);

        var existingImgID = [];
        var editImg = [];
        var newImg = [];

        //Note: image1,2,3,4,5 is passing from API / post screen
        //    : reviewImg1,2,3,4,5 is pick picture from Img picker

        if (this.state.image1 != [] || this.state.reviewImg1 != null) {

            if(this.state.image1ID != null){ // if existing img is exist

                existingImgID.push(this.state.image1ID); // push ID to existingimgid state - required

                if( this.state.reviewImg1 != null) { // to replace exsiting - pick img from img picker

                   this.processing(this.state.image1ID); // pass to proccessing - required

                    editImg.push(this.state.reviewImg1);        

                }
                    
            }else{
                
                if(this.state.reviewImg1 != null){ // check after select img from picker 
                    newImg.push(this.state.reviewImg1) // new added img
                }
            }          
        }

       if (this.state.image2 != [] || this.state.reviewImg2 != null) {

            if(this.state.image2ID != null){

                existingImgID.push(this.state.image2ID);

                if( this.state.reviewImg2 != null) {

                   this.processing(this.state.image2ID);

                    editImg.push(this.state.reviewImg2);
                }
            }else{

               if(this.state.reviewImg2 != null){
                    newImg.push(this.state.reviewImg2)
                }
            }  
       }

       if (this.state.image3 != [] || this.state.reviewImg3 != null) {
       
        if(this.state.image3ID != null){

            existingImgID.push(this.state.image3ID);

                if( this.state.reviewImg3 != null) {

                    this.processing(this.state.image3ID, this.state.reviewImg3);

                    editImg.push(this.state.reviewImg3);
                }
            }else{

                 if(this.state.reviewImg3 != null){
                    newImg.push(this.state.reviewImg3)
                }
            }  
       }

       if (this.state.image4 != [] || this.state.reviewImg4 != null) {
            if(this.state.image4ID != null){

                existingImgID.push(this.state.image4ID);

                if( this.state.reviewImg4 != null) {

                    this.processing(this.state.image4ID, this.state.reviewImg4);

                    editImg.push(this.state.reviewImg4);
                }
            }else{

              if(this.state.reviewImg4 != null){
                    newImg.push(this.state.reviewImg4)
                }
            }  
       }

       if (this.state.image5 != [] || this.state.reviewImg5 != null) {
            if(this.state.image5ID != null){

                existingImgID.push(this.state.image5ID);

                if( this.state.reviewImg5 != null) {

                    this.processing(this.state.image5ID, this.state.reviewImg5);

                    editImg.push(this.state.reviewImg5);
                }

            }else{

               if(this.state.reviewImg5 != null){
                    newImg.push(this.state.reviewImg5)
                }
            }  
       }

       if(existingImgID.length > 0){
        data.append('existing_img', JSON.stringify(existingImgID));
       }
  
       console.log('existingImgID ++++++++++++++', existingImgID);
        

       //replace existing image
        this.state.stackImg.map((obj, idx1) => {
           
            editImg.forEach((element, idx2) => {
                const newFile = {
                    type: 'image/jpg', index: idx2, name: element.fileName, uri: Platform.OS === "android" ? element.uri : element.uri.replace("file://", "")
                } 
                
                if(idx1 == idx2){
                    this.state.stackImg[idx1].img = newFile;
                    data.append('replace_id[]', this.state.stackImg[idx1].p_id)
                    data.append('pi_img[]', newFile);
                    console.log('testing chck !!!!!!', this.state.stackImg);

                    console.log('replace id []==================', this.state.stackImg[idx1].p_id);
                    console.log('pi_img[]===================', newFile );
                }
            })
                  
       });
       //new add image
        newImg.forEach((element, i) => {
            const newFile = {
                type: 'image/jpg', index: i, name: element.fileName, uri: Platform.OS === "android" ? element.uri : element.uri.replace("file://", "")
            }

        data.append('new_added_img[]', newFile);

        });

        
       data.append('Content-Type', 'application/form-data');

       console.log('newImg ++++++', newImg);


        if (mlm_id != '' && session_no != '') {

            if(p_lat != '' && p_lng != ''){
               
                if(p_category1 != '' && p_category2 != ''){

                    if(p_name == '' || p_desc == '' || p_price == '' ){
                        
                        Alert.alert("Field is Empty ", 
                        "Please Fill in all the Field!",  [
                            { text: 'OK' }
                        ],
                        { cancelable: false });


                    } else {
                        await fetch(CONSTS.clone_URL + "submitEditProductJs", {
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
                                    console.log('here successfully post', x)
                                    Alert.alert(
                                        'Post Success',
                                         'You are Posted successfully!',
                                        [
                                            { text: 'OK', onPress: () => this.props.navigation.goBack() }
                                        ],
                                        { cancelable: false }
                                    );
            
            
                                } else {
                                    var x = '';
                                    x = response.errors;
                                    console.log('here required field is empty', x[0])
            
                                    Alert.alert(
                                        'Post Failed',
                                        x[0],
                                        [
                                            { text: 'OK'}
                                        ],
                                        { cancelable: false }
                                    );
                                }
                            })
                    }

                } else {
                    Alert.alert("Categroy Unavailable ", 
                    "Please Contact to Administrator!",  [
                        { text: 'OK' , onPress: () => nav.navigate('ProfileScreen')}
                    ],
                    { cancelable: false });
                }


            } else {
                Alert.alert("Your Current Location is Unavailable ", 
                "Please open GPS!",  [
                    { text: 'OK' , onPress: () => nav.navigate('HomeScreen')}
                ],
                { cancelable: false });
            }        

        } else {
            Alert.alert("Please Login", "Please proceed to login");
        }
      
    }

    priceChange(price){
        console.log('price change', price);

        if(price <= 0 || price == ''){
            this.setState({priceInput: '0'});
            this.setState({});
        }else{
            this.setState({priceInput: price});
        }
       
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
                            <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>Edit Post</Text>
                        </Button>
                    </Left>
                    <Body style={{flex: 0}}>
                    </Body>
                    <Right style={{flex: 0}}>

                    </Right>
                </Header>


                <Content>
                    <View style={{marginLeft: 10}}>

                        <ScrollView horizontal={true} style={{marginLeft: 10, marginBottom: 20, marginTop: 10}} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity onPress={this.selectFile1}>
                                    
                                   {typeof this.state.image1 == 'undefined' || this.state.image1 == ''  ? 

                                        <View>
                                            {this.state.fileUpload1 === false ?
                                                
                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={{ height: 55, width: 55 }} source={require('../../img/add.png')} />
                                                </View>
                                                :
                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={{ height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath1.uri }} />
                                                
                                                </View>
                                            }
                                        </View>   

                                    :

                                        <View>
                                            {this.state.fileUpload1 === false ?
                                                
                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={{height:  '100%', width: '100%', borderRadius: 10}} source={{uri: this.state.image1}} />
                                                </View>
                                                :                                        
                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={{ height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath1.uri }} />
                                                </View>
                                            }
                                        </View>
                                }

                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.selectFile2}>
                                    
                                {typeof this.state.image2 == 'undefined' || this.state.image2 == ''  ? 
                                    <View>
                                        {this.state.fileUpload2 === false ?
                                            
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{ height: 55, width: 55 }} source={require('../../img/add.png')} />
                                            </View>
                                            :
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{ height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath2.uri }} />
                                            </View>
                                        }
                                    </View>   
                                                                    
                                        :

                                    <View>
                                        {this.state.fileUpload2 === false ?
                                            
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{height:  '100%', width: '100%', borderRadius: 10}} source={{uri: this.state.image2}} />
                                            </View>
                                            :                                        
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{ height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath2.uri }} />
                                            </View>
                                        }
                                    </View>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.selectFile3}>
                                    
                                   {typeof this.state.image3 == 'undefined' || this.state.image3 == '' ? 

                                    <View>
                                        {this.state.fileUpload3 === false ?
                                            
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{ height: 55, width: 55 }} source={require('../../img/add.png')} />
                                            </View>
                                            :
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{ height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath3.uri }} />
                                            </View>
                                        }
                                    </View>

                                    :

                                      <View>
                                        {this.state.fileUpload3 === false ?
                                            
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{height:  '100%', width: '100%', borderRadius: 10}} source={{uri: this.state.image3}} />
                                            </View>
                                            :                                        
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{ height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath3.uri }} />
                                            </View>
                                        }
                                     </View>   
                                }
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.selectFile4}>
                                    
                                   {typeof this.state.image4 == 'undefined' || this.state.image4 == '' ? 

                                    <View>
                                        {this.state.fileUpload4 === false ?
                                            
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{ height: 55, width: 55 }} source={require('../../img/add.png')} />
                                            </View>
                                            :
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{ height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath4.uri }} />
                                            </View>
                                        }
                                    </View>  

                                    :
                                  
                                     <View>
                                        {this.state.fileUpload4 === false ?
                                            
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{height:  '100%', width: '100%', borderRadius: 10}} source={{uri: this.state.image4}} />
                                            </View>
                                            :                                        
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{ height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath4.uri }} />
                                            </View>
                                        }
                                     </View> 
                                }
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.selectFile5}>
                                    
                                   {typeof this.state.image5 == 'undefined' || this.state.image5 == '' ? 

                                    <View>
                                        {this.state.fileUpload5 === false ?
                                            
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{ height: 55, width: 55 }} source={require('../../img/add.png')} />
                                            </View>
                                            :
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{ height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath5.uri }} />
                                            </View>
                                        }
                                    </View>

                                    :
 
                                     <View>
                                        {this.state.fileUpload5 === false ?
                                            
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{height:  '100%', width: '100%', borderRadius: 10}} source={{uri: this.state.image5}} />
                                            </View>
                                            :                                        
                                            <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                <Image style={{ height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath5.uri }} />
                                            </View>
                                        }
                                    </View>   
                                }
                            </TouchableOpacity>
                           
                        </ScrollView>

                        <Text style={{fontSize: 12, marginLeft: 10}}>You may tap to edit the uploaded photos.</Text>



                        <View style={{marginTop: 20, marginLeft: 10}}>
                            <View style={{marginTop: 20}}>
                                <Text style={{fontWeight: 'bold'}}>Category</Text>
                                <View style={{backgroundColor: '#F1F1F1', width: screenWidth * 0.9, height: 40, justifyContent: 'center', marginTop: 5, borderRadius: 5}}>
                                    <Text style={{padding: 10, fontSize: 13}}>{this.state.cat1Name}{' > '}{this.state.cat2Name}</Text>
                                </View>
                            </View>

                            <View style={{marginTop: 20}}>
                                <Text style={{fontWeight: 'bold'}}>Title</Text>
                                <View style={{backgroundColor: '#F1F1F1', width: screenWidth * 0.9, height: 40, justifyContent: 'center', marginTop: 5, borderRadius: 5}}>
                                    <Input style={{padding: 10, fontSize: 13}} value={this.state.titleInput} onChangeText={(titleInput) => this.setState({titleInput})}/>
                                </View>
                            </View>

                            <View style={{marginTop: 20}}>
                                <Text style={{fontWeight: 'bold'}}>Price</Text>
                                <View style={{backgroundColor: '#F1F1F1', width: screenWidth * 0.9, height: 40, justifyContent: 'center', marginTop: 5, borderRadius: 5, flexDirection: 'row'}}>
                                    <Input style={{padding: 10, fontSize: 14, width: 40}} keyboardType={'numeric'} value={this.state.priceInput} onChangeText={(priceInput) => this.priceChange(priceInput)}/>
                                    <Button onPress={() => this.setState({priceInput: '0'})} style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 5, borderColor: '#FF3333', borderWidth: 2, elevation: 0, width: screenWidth * 0.2, height: 35, marginTop: 3, marginRight: 3}}>
                                        <Text style={{color: '#FF3333', fontWeight: 'bold'}}>FREE</Text>
                                    </Button>
                                </View>
                            </View>

                            <View style={{marginTop: 20}}>
                                <Text style={{fontWeight: 'bold'}}>Description</Text>
                                <View style={{backgroundColor: '#F1F1F1', width: screenWidth * 0.9, height: 150, justifyContent: 'center', marginTop: 5, borderRadius: 5}}>
                                    <Input style={{padding: 10, fontSize: 13, textAlignVertical: 'top'}} multiline={true} numberOfLines={5} value={this.state.descInput} onChangeText={(descInput) => this.setState({descInput})} />
                                </View>
                            </View>
                        </View>

                    </View>


                </Content>


                <Footer style={{ height: 60, borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: null }}>
                    <FooterTab style={{ backgroundColor: 'white' }}>
                        <Button vertical style={{backgroundColor: '#FF7A59', height: 40, marginLeft: 20, marginRight: 20, borderRadius: 10}} onPress={() => this.onPost(navigation)}>
                            <Text style={{color: 'white', fontSize: 15}}>Update Post</Text>
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

export default EditPostScreen;