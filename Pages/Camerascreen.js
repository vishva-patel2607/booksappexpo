import React,{Component,useState} from 'react';

import {Camera} from 'expo-camera';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    
} from 'react-native';

import {
    IconButton
} from 'react-native-paper';

class Camerscreen extends Component{

    constructor(props){
        super(props);

        this.state ={
            per : false,
            Type : Camera.Constants.Type.back,
        }

        this.camera = React.createRef();
    }


    async componentDidMount (){
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({per : status === 'granted'});

    }


    takePicture = async () =>{
        
        if (!this.state.per) return
        const photo = await this.camera.takePictureAsync()
        
        this.props.navigation.navigate("Mainpage" , { screen: "Upload", params: {photo : photo}});
    }

    render (){
     
        if(this.state.per === false){
            return <Text>No access to camera</Text>;
        }
        if(this.state.per === null){
            return <Text>Null</Text>;
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