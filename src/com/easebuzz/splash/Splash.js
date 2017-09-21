import React, {Component} from  'react';

import {
  View,
  Image,
  ActivityIndicator,
  Animated,
  Dimensions
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import Datastore from 'react-native-local-mongodb' ;
var {height, width} = Dimensions.get('window');

export default class Splash extends Component {
    constructor(props){
        super(props);
        this.state = {
            animating : true,
            bottom: new Animated.Value(height),
            opacity: new Animated.Value(0),
        }
    }

    down(){
        const { bottom , opacity } = this.state;
        Animated.timing(
            bottom,{
                toValue:0,
                friction:1,
                duration:1500,
            }
        ).start()

        Animated.timing(
            opacity,{
                toValue:1,
                friction:1,
                duration:3000,
            }
        ).start(()=>{ this.start() })

    }

    async start(){
        login.count({}, function (err, count) {
            if(count == 0)
                Actions.login();
            else
                Actions.home();
        });
    }

    componentDidMount() {
        //setTimeout( () => { this.start() },1000);
        this.down();
    }

    render(){
        return(
            <View style = {estyles.container} >
                <Animated.Image style = {[estyles.image, {bottom:this.state.bottom}]} source = {require('../images/splash-1.jpg')} />
                <Animated.Image style = {[estyles.image, {top:this.state.bottom}]} source = {require('../images/splash-2.jpg')} />
                <Animated.Image style = {{height:height, width:width,resizeMode:'cover', position:'absolute', opacity: this.state.opacity, }} source = {require('../images/splash-3.jpg')} />
            </View>
        );
    }
}

const estyles = EStyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
    },
    image:{
        height:"50%",
        width:"100%",
        resizeMode:"cover"
    },
    ActivityIndicator:{
        width:'100%',
        height:"100%",
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0)',
        alignItems:"center"
    }
})
