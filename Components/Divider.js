import * as React from 'react';
import {View} from 'react-native';
import { ThemeContext } from './Theme';

 function Divider(){
   const {textcolor} = React.useContext(ThemeContext);
    return(

        <View
        style={{
          marginTop: 10,
          height: 0.6,
          backgroundColor:
            textcolor === "#0D1936" ? "#6E7A7D" : textColor,
        }}
      />
    )
}
export default React.memo(Divider);