import * as React from 'react';
import {View} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from './Theme';

 function Divider(){
   const {Theme} = React.useContext(ThemeContext);
    const {colors} = useTheme();
    let textColor = Theme === 'Light' ? '#0D1936' : '#ECEFEE';
    return(

        <View
        style={{
          marginTop: 10,
          height: 0.6,
          backgroundColor:
            textColor === "#0D1936" ? "#6E7A7D" : textColor,
        }}
      />
    )
}
export default React.memo(Divider);