import React,{Component,useState} from 'react';

import {Camera} from 'expo-camera';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    
} from 'react-native';
import {
    IconButton,Button
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
class Camerscreen extends Component{

    constructor(props){
        super(props);

        this.state ={
            per : false,
            perGallery : false,
            Type : Camera.Constants.Type.back,
            image: null,
        }

        this.camera = React.createRef();
    }


    async componentDidMount (){
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({per : status === 'granted'});
        const { status1 } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(status1);
        this.setState({perGallery : status1 === 'granted'});
    }
    takePicture = async () =>{
        if (!this.state.per) return
        const photo = await this.camera.takePictureAsync();
        this.props.navigation.navigate("Mainpage" , { screen: "Upload", params: {photo : photo}});
    }
    pickImage = async() => {
        console.log(this.state.perGallery);
        if(!this.state.perGallery) return ;
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
          });
        if(!result.cancelled){
            this.setState({
                image:result
            });
            this.props.navigation.navigate("Mainpage" , { screen: "Upload", params: {photo : result}});
        }
          
    }

    render (){
     
        if(this.state.per === false){
            return <Text>No access to camera</Text>;
        }
        if(this.state.per === null){
            return <Text>Null</Text>;
        }
        if(this.state.perGallery === false){
            return <Text>No access to Photos</Text>
        }
        return(
            
            <View style={styles.container}>
                <Camera style={styles.camera} type={this.state.Type} ref={(r) => {this.camera = r}}>
                     <View style={styles.buttonContainer}> 
                        <IconButton
                            style = {styles.buttonrightleft}
                            icon="reload"
                            color = '#EF90A9'
                            size={50}
                            onPress={() => {
        
                                this.state.Type === Camera.Constants.Type.back
                                ? this.setState({Type : Camera.Constants.Type.front })
                                : this.setState({Type: Camera.Constants.Type.back })
                            
                            }}
                        />
                        <IconButton
                            style = {styles.button}
                            icon="camera"
                            color = '#EF90A9'
                            size={80}
                            onPress={this.takePicture}
                        />  
                        <IconButton
                            style = {styles.buttonrightright}
                            icon="image"
                            color = '#EF90A9'
                            size={50}
                            onPress={this.pickImage}
                        /> 
                    </View>
                </Camera>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      camera: {
        flex: 1,
      },
      buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
      },
      buttonrightleft: {
        flex: 0.25,
        alignSelf: 'flex-end',
        alignItems: 'center',
        alignContent : 'center',
      },
      buttonrightright: {
        flex: 0.25,
        alignSelf: 'flex-end',
        alignItems: 'center',
        alignContent : 'center',
      },

      button: {
        flex: 0.5,
        alignSelf: 'flex-end',
        alignItems: 'center',
        alignContent : 'center',
      },
    
    text: {
      fontSize: 18,
      color: 'white',
    },
});

export default Camerscreen;