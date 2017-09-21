import React, {Component} from  'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import FBSDK, { LoginManager, AccessToken }  from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

import Datastore from 'react-native-local-mongodb' ;
login = new Datastore({ filename: 'asyncStorageKey', autoload: true });


import Header from '../common/Header';
var nthis = '';
export default class Home extends Component {
    constructor(props){
        super(props);
        nthis = this;
    }

    fetchUserDetails(id,token) {
        let url = 'https://graph.facebook.com/v2.3/'+id+'?fields=name,email&access_token='+token ;
        fetch(url).then((response) => {
            res = JSON.parse(response);
            //AsyncStorage.setItem('ACCESS_TOKEN', res.accessToken);
            var doc = {
                id :1,
                name : res.name,
                email : res.email,
                token : res.accessToken
            }
            login.insert(doc, function (err, newDoc) {
                console.log(newDoc);
                Actions.home()
            });

        })
        .catch(() => {
            console.log('ERROR GETTING DATA FROM FACEBOOK')
        })
    }

    fbLogin(){
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
          function(result) {
            if (result.isCancelled) {
              console.log('Login was cancelled');
            } else {
                console.log(JSON.stringify(result));
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    //console.log(data);
                    const { accessToken } = data
                        nthis.fetchUserDetails(data.userID,accessToken)
                    }
                )
            }
          },
          function(error) {
            console.log('Login failed with error: ' + error);
        })
    }

    googleLogin(){
       GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            GoogleSignin.configure({
                iosClientId: '631024875915-j6tfhqttphre0rgf0d0irihg4opmh4ok.apps.googleusercontent.com',
            })
            .then(() => {
                GoogleSignin.signIn()
                .then((user) => {
                    console.log(user);
                    var doc = {
                        id :1,
                        name : user.name,
                        email : user.email,
                        token : user.accessToken
                    }
                    login.insert(doc, function (err, newDoc) {
                        //console.log(newDoc);
                        Actions.home()
                    });
                })
                .catch((err) => {
                    console.log('WRONG SIGNIN', err);
                })
                .done();
            });
        })
        .catch((err) => {
          console.log("Play services error", err.code, err.message);
        })
    }

    render(){
        return(
            <View style = {estyles.container} >
                <Header leftText = 'Login'  onClick = {() => {this.setState({ isFilterByTagPanelOpen: true })}} />
                <TouchableOpacity onPress = {this.fbLogin.bind(this)} style = {[estyles.button, {backgroundColor:'#3B5998', marginTop:150 }]}  >
                    <Image style = {{width: 28, height: 28, resizeMode:'contain'}} source = {require('../images/fa-custom-fb.png')} />
                    <Text style = {{paddingLeft: 10, fontSize: 16, color: '#FFFFFF', fontWeight:'500'}}>Continue with FACEBOOK</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.googleLogin.bind(this)} style = {[estyles.button, {backgroundColor:'#E02F2F', marginTop:50 }]} >
                    <View style= {{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Image style = {{width: 32, height: 32, resizeMode:'contain'}} source = {require('../images/fa-custom-gplus.png')} />
                        <Text style = {{paddingLeft: 10, fontSize: 16, color: '#FFFFFF', fontWeight:'500'}}>Continue with GOOGLE</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const estyles = EStyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
        backgroundColor:"#FFFFFF",
    },
    button: {
        alignSelf: 'center',
        alignItems:'center',
        justifyContent:'center',
        width:300,
        borderRadius: 20,
        padding:10,
        flexDirection:'row'
    }
})
