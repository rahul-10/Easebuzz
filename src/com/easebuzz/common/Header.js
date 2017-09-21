import React, {Component} from  'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

class Header extends Component {

    render() {
        return (
            <View style = {estyles.container} >
                <TouchableOpacity onPress={this.props.onClick } >
                    <Image style = {{width:18, height: 18, resizeMode: 'contain', tintColor:'#FFFFFF'}} source={this.props.url} />
                </TouchableOpacity>
                <Text style = {{marginLeft:15, fontWeight:'600', fontSize:16, color :'#FFFFFF' }} >{this.props.leftText}</Text>
            </View>
        );
    }
}

const estyles = EStyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        backgroundColor :'#005596',
        paddingLeft: 15,
        flexDirection:'row',
        alignItems:'center'
    },
});

export default Header ;
