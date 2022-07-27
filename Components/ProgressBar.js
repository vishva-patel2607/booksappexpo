import * as React from 'react';
import { ProgressBar } from 'react-native-paper';
import { View } from 'react-native';
import StaticText from './StaticText';

export default function UserProgress({userscore}){
    return(
        <View style={{flex:2,marginHorizontal:15,paddingHorizontal:5}}>
            <StaticText text="User Score" />
            <ProgressBar progress={userscore} color={'blue'} style={{marginTop:10,borderRadius:100,marginRight:10}}/>
        </View>
    )
}