import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Alert, Dimensions, Linking, StatusBar, PermissionsAndroid, Image, FlatList, AppRegistry, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Item, Input, Card, CardItem, Footer, FooterTab, Content, Thumbnail, Tab, Tabs, ScrollableTab  } from "native-base";
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker from 'react-native-image-picker';
import HTTP from '../api/http';
import CONSTS from '../config/constants';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class PostScreen extends React.Component {

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
            querysubcategory:[],
            title: '',
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
            reviewImg1: null,
            reviewImg2: null,
            reviewImg3: null,
            reviewImg4: null,
            reviewImg5: null,
            cPermission: '',
            openCam: false,
        }
    }

    componentDidMount = async () => {

        // this.focusListener = navigation.addListener('focus', () => {
        //     this.setState({ modalVisibleDropDownMenu: false, });
        // });

        const { navigation } = this.props;
        this.initCat();
    }

    initCat = async () => {
        await this.getMainCategory();
        //await this.getSubCategory();
    }

    // chkCameraPermission = async () => {
      
    //     Alert.alert("Permission is Required",
    //     "CAMERA or File permission is required!",
    //         [
    //             {text: 'Yes', onPress: () => Linking.openSettings(), style: 'destructive'},
    //             {text: 'Cancel'},
    //         ],
    //             {cancelable: false}
    //         );
              
    // }

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

        console.log('Post Src getMainCategory: ', result.status);
    }

    getSubCategory = async (cat1_id) =>{
        
        let result = await new HTTP().post(CONSTS.clone_URL + 'catTwoJs', {cat1_id});

        if (result.status){

            //console.log('Check sub category id: ', cat1_id);
            //console.log('Result list checking: ', result.list);

            result.list.forEach((item)=>{
                this.state.setsubcategory.push(item);
                //console.log('Check subcategory item: ', item);
           })       
            this.setState({});
        }

        //console.log('Check category: ', cat1_id);
        //console.log('Cat Src getSubCategory: ', result.status);
    }

    openSubCat(item){

        //console.log('Open modal is Pressed: category id ++++ ', item.cat1_id);

        let subcategoryitem = this.state.setsubcategory;
        this.state.querysubcategory = [];
        this.state.title = '';
       

        //console.log('Sub item ', subcategoryitem);
        this.state.title = item.cat1_name;

        subcategoryitem.forEach((subItem) => {

            //console.log('Sub item id: ++' , subItem.cat2_cat1_id);

            if(item.cat1_id === subItem.cat2_cat1_id){
                //console.log('Sub item is Found');
                this.state.querysubcategory.push(subItem)
            }
            else{
                //console.log('Sub item is Not Found');
            }

        })
        this.setState({});
        this.modal.open();
          //console.log('querysubcategory',  this.state.querysubcategory);
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

    goPostNextScreen(nav, mainCatID, subCatID, mainTitle, subTitle){

       var img = [];

       if (this.state.reviewImg1 != null) {
             img.push(this.state.reviewImg1)
        }

        if (this.state.reviewImg2 != null) {
            img.push(this.state.reviewImg2)
        }

       if (this.state.reviewImg3 != null) {
            img.push(this.state.reviewImg3)
        }

        if (this.state.reviewImg4 != null) {
            img.push(this.state.reviewImg4)
        }

        if (this.state.reviewImg5 != null) {
            img.push(this.state.reviewImg5)
        }

        if(mainCatID != '' ||  subCatID != ''){
            
            nav.navigate('PostNextScreen', {cat1id: mainCatID, cat2id: subCatID, 
                                            cat1Name: mainTitle, cat2Name: subTitle, 
                                            image1: img[0], image2: img[1], image3: img[2], image4: img[3], image5: img[4]});
            //console.log('goPostNextScreen img::: ++', img);

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
                                        <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>Post</Text>
                                    </Button>
                                </Left>
                                <Body style={{flex: 0}}>
                                </Body>
                                <Right style={{flex: 0}}>

                                </Right>
                            </Header>


                            <Content>
                                <View style={{marginLeft: 10}}>

                                    <View style={{marginLeft: 10}}>
                                        <Text style={{color: '#666666', fontSize: 17}}>Upload Photo</Text>
                                    </View>

                                    <ScrollView horizontal={true} style={{marginLeft: 10, marginBottom: 20, marginTop: 10}} showsHorizontalScrollIndicator={false}>
                                        
                                        <TouchableOpacity onPress={this.selectFile1}>

                                            {this.state.fileUpload1 === false ?
                                                
                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={{ height: 55, width: 55 }} source={require('../../img/add.png')} />
                                                </View>
                                                :
                                               
                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={{ height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath1.uri }} />
                                                </View>
                                            }
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity onPress={this.selectFile2}>

                                            {this.state.fileUpload2 === false ?

                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                     <Image style={{ height: 55, width: 55 }} source={require('../../img/add.png')} />
                                                </View>
                                                :

                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                     <Image style={{height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath2.uri }} />
                                                </View>
                                            }
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={this.selectFile3}>

                                            {this.state.fileUpload3 === false ?
                                                
                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={{ height: 55, width: 55 }} source={require('../../img/add.png')} />
                                                </View>
                                                :
                                            
                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={{height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath3.uri }} />
                                                </View>
                                            }
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={this.selectFile4}>

                                            {this.state.fileUpload4 === false ?

                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={{ height: 55, width: 55 }} source={require('../../img/add.png')} />
                                                </View>
                                                :

                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={{height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath4.uri }} />
                                                </View>
                                            }
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={this.selectFile5}>

                                            {this.state.fileUpload5 === false ?

                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={{ height: 55, width: 55 }} source={require('../../img/add.png')} />
                                                </View>
                                                :

                                                <View style={{height: 140, width: 140, backgroundColor: '#F1F1F1', marginRight: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                                    <Image style={{height:  '100%', width: '100%', borderRadius: 10}} source={{ uri: this.state.resourcePath5.uri }} />
                                                </View>
                                            }
                                        </TouchableOpacity>

                                    </ScrollView>


                                    <View style={{marginLeft: 10, marginTop: 20}}>
                                        <Text style={{color: '#666666', fontSize: 17}}>Select Category</Text>
                                    </View>

                                     <View style={{marginTop: 20}}>

                                        <FlatList
                                            data={this.state.category}
                                            keyExtractor={(item) => item.cat1_id}
                                            horizontal={false}
                                            renderItem={({item}) => ( 
                                                // onPress={() => this.modal.open()}
                                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => this.openSubCat(item)}> 
                                                    <View style={{ alignItems: 'center', flexDirection: 'row', padding: 5 }}>
                                                        <Image style={{ height: 35, width: 35 }} source={{uri: item.cat1_icon}} />
                                                        <View style={{ marginLeft: 5 }}>
                                                            <Text style={{ fontSize: 12 }}>{item.cat1_name}</Text>
                                                        </View>
                                                        <View style={{position: 'absolute', right: 25}}>
                                                            <Image style={{ height: 15, width: 15 }} source={require('../../img/chevron.png')} />
                                                        </View>
                                                    </View>
                                                    <View style={{borderBottomWidth: 1, borderColor: '#F5F5F5', marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10}} />
                                                </TouchableOpacity>

                                            )}/>                 
                                    </View>
                                

                                    <RBSheet
                                        ref={ref => {
                                        this.modal= ref;
                                        }}
                                        keyExtractor={(ref) => ref + '0'}
                                        height={500}
                                        openDuration={250}
                                        customStyles={{
                                        container: {
                                            padding: 20
                                        }
                                        }}
                                    >
                                         <View>
                                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.title}</Text>

                                            {
                                                this.state.querysubcategory.map((itemSub, index) =>  {
                                                
                                                    return(

                                                        <View style={{marginTop: 20}}>
                                                            <TouchableOpacity style={{justifyContent: 'center' }} onPress={() => {
                                                            this.modal.close()
                                                            this.goPostNextScreen(navigation, itemSub.cat2_cat1_id, itemSub.cat2_id, this.state.title, itemSub.cat2_name)
                                                            }}>
                                                                <View style={{ alignItems: 'center', flexDirection: 'row', padding: 5 }}>
                                                                    <View style={{ marginLeft: 5 }}>
                                                                        <Text style={{ fontSize: 12 }}>{itemSub.cat2_name}</Text>
                                                                    </View>
                                                                    <View style={{position: 'absolute', right: 25}}>
                                                                        <Image style={{ height: 15, width: 15 }} source={require('../../img/chevron.png')} />
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                          
                                                        </View>
                                                    )
                                                })     
                                            }   
                                        </View>
                                   
                                </RBSheet>
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

export default PostScreen;