import React,{Component,useState,useEffect, useRef} from 'react';

import {Camera} from 'expo-camera';
import {

    Text,
    StyleSheet,
    View,

} from 'react-native';

import {
    IconButton
} from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';

const CamerScreen  = (props) => {

    const [gallerypermission,setGallerypermission] = useState(false);
    const [permission,setPermission] = useState(false);
    const [cameratype,setCameratype] = useState(Camera.Constants.Type.back);
    const [image,setImage] = useState(null);

    const camera = useRef(null);

    useEffect(() => {
        (async() =>{
            const { status } =   await Camera.requestPermissionsAsync();
        setPermission(status === 'granted');
        const status1  =  await ImagePicker.requestMediaLibraryPermissionsAsync();
        setGallerypermission(status1.status === 'granted');
        })()
    },[])

    const takepicture = async() => {
        if(!permission) return ;
        const photo = await camera.current.takePictureAsync();
        props.navigation.navigate("Mainpage" , { screen: "Upload", params: {photo : photo}});
    }

    const pickImage = async() => {
        if(!gallerypermission)return ;
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
          });
        if(!result.cancelled){
            setImage(result)
            props.navigation.navigate("Mainpage" , { screen: "Upload", params: {photo : result}});
        }
    }

    if(permission === false){
        return <Text>No access to camera</Text>;
    }
    if(permission === null){
        return <Text>Null</Text>;
    }
    if(gallerypermission === false){
        return <Text>No access to Photos</Text>
    }

    return(
            
        <View style={styles.container}>
            <Camera style={styles.camera} type={cameratype} ref={camera}>
                 <View style={styles.buttonContainer}> 
                    <IconButton
                        style = {styles.buttonrightleft}
                        icon="reload"
                        color = '#EF90A9'
                        size={50}
                        onPress={() => {
                            cameratype === Camera.Constants.Type.back
                            ? setCameratype(Camera.Constants.Type.front)
                            : setCameratype(Camera.Constants.Type.back )
                        }}
                    />
                    <IconButton
                        style = {styles.button}
                        icon="camera"
                        color = '#EF90A9'
                        size={80}
                        onPress={takepicture}
                    />  
                    <IconButton
                        style = {styles.buttonrightright}
                        icon="image"
                        color = '#EF90A9'
                        size={50}
                        onPress={pickImage}
                    /> 
                </View>
            </Camera>
        </View>
    )
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

export default React.memo(CamerScreen);