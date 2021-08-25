



import * as SecureStore from 'expo-secure-store';
import {React,useState} from 'react';

const initialState = {
    user : {
                accountUsername : "JhonnyAppleseed",
                accountNumber : "1234567890",
                token : "JhonnyAppleseed",
                isAuthenticated: false,
            },
    
}

export const setUser = (username, usernumber, token, auth) => async (dispatch) => {
    
     let user = {
        accountUsername : username,
        accountNumber : usernumber,
        token : token,
        isAuthenticated: auth,
    };
    
    try {
        let checkSecureStorage = await SecureStore.isAvailableAsync();

        if (checkSecureStorage){
            
            let added = await SecureStore.setItemAsync('user', JSON.stringify(user));
        }

        

        dispatch({
            type : "SET_USER",
            payload: {user : user}
        });
    }
    catch (error) {
        console.log("error");
        console.log(error);
        dispatch({
            type : "SET_USER",
            payload: {user : initialState.user}
        });
    }


};


export const getUser = () => async (dispatch) => {

    
    let getuser = await SecureStore.getItemAsync('user');

    var user = JSON.parse(getuser);
    

    
    
    if(user !== null){
    
    dispatch({
        type: 'SET_USER',
        payload : {user : user}
    })
    }

    else{
        
        user = initialState;
        dispatch({
            type: 'SET_USER',
            payload : {user : user}
        })
    }

    
};

export const logoutUser = () => async (dispatch) => {
    let checkSecureStorage = await SecureStore.isAvailableAsync();
    if (checkSecureStorage) {
        await SecureStore.deleteItemAsync('user');
        console.log('logout user');
        dispatch({
        type: 'LOGOUT_USER',
        });
    }
}