import React, {Component} from  'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import Datastore from 'react-native-local-mongodb' ;
var {height, width} = Dimensions.get('window');
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
Geocoder.setApiKey('AIzaSyAxoYKDd56RPgsTn4UTMXBycDsXzsAsmnI');


import { customMapStyle } from './CustomMapStyle';
import Header from '../common/Header';

var nthis = '';

export default class ShowProduct extends Component {
    constructor(props){
        super(props);
        nthis = this;
        this.state={
            region : {
                latitude: 28.4595,
                longitude: 77.0266,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            adddress:''
        }
        this.getCurrentLocation();
    }

    async fetchCurrentAddress(lat, long){
        Geocoder.getFromLatLng(lat, long).then(
           json => {
                res = json.results;
                console.log(json);
                if(res.length > 0){
                    nthis.setState({address : res[0].formatted_address })
                }
            },
           error => {
               console.log(error);
           }
       )
    }

    /*    Geocoder.geocodePosition(NY).then(res => {
            console.log(res);
            if(res.length > 0){
                nthis.setState({address : res[0].formattedAddress })
            }
        })

        .catch(err => console.log(err)) */

    getCurrentLocation(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var loc = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude ,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
                console.log(loc);
                this.fetchCurrentAddress(loc.latitude, loc.longitude);
                nthis.setState({region:loc});

            },
            (error) => {
                console.log(error);
            }
        );
    }

    onRegionChange(region) {
        let center = {
            latitude : region.latitude,
            longitude : region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        //region = center ;
        //console.log(region);
    }

    showIcon(){
        return(
            <TouchableOpacity
                style={{position:'absolute', height:30, width:30, borderRadius:30, backgroundColor:'#FFFFFF', right:20,bottom:130,
                        justifyContent:'center', alignItems:'center'}}
                onPress = {()=>{this.getCurrentLocation();}}
                >
                    <Image style = {{height:24, width: 24, resizeMode:'contain'}} source  = {require('../images/centralizeIcon.png')} />

            </TouchableOpacity>
        )
    }


    render(){
        const { region } = this.state;
        return(
            <View style = {estyles.container} >
                <Header leftText = 'My Location' url = {require('../images/leftArrow.png')} onClick = {() => {Actions.pop()}} />
                <MapView
                  provider={MapView.PROVIDER_GOOGLE}
                  style={estyles.map}
                  customMapStyle={customMapStyle}
                  region={region}
                  onRegionChange={this.onRegionChange}
                  cacheEnabled = {true}
                >
                <MapView.Marker
                  coordinate={region}
                />
                </MapView>
                {this.showIcon()}
                <View style = {{width:width,backgroundColor:'#FFFFFF',}}>
                    <Text style = {{color:'#363636', padding:10}} >{this.state.address}</Text>
                </View>
            </View>
        );
    }
}

const estyles = EStyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
        backgroundColor:"#FFFFFF",
        justifyContent:'space-between'
    },
    map: {
        width: '100%',
        height: '90%',
        left: 0,
        right: 0,
        top: 60,
        bottom: 0,
        position: 'absolute'
    },
})
