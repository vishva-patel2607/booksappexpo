import * as React from 'react';
import {View} from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Seperator(){
    const {colors} = useTheme();
    return(
        <View
        style={{
          marginTop: 10,
          height: 1,
          backgroundColor:
            colors.seperator
        }}
      />
    )
}