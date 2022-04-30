import * as React from 'react';
import {View} from 'react-native';
import { useTheme } from '@react-navigation/native';

 function Divider(){
    const {colors} = useTheme();
    return(
        <View
        style={{
          marginTop: 10,
          height: 0.6,
          backgroundColor:
            colors.text === "#000000" ? "#6E7A7D" : colors.text,
        }}
      />
    )
}
export default React.memo(Divider);