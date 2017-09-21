import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Router, Scene } from 'react-native-router-flux';

EStyleSheet.build({
  $textColor: 'green' // variable
});

import Splash from './splash/Splash';
import Login from './login/Login';
import Home from './home/Home';
import AddProduct from './product/AddProduct';
import ShowProduct from './product/ShowProduct';
import MyLocation from './location/MyLocation';

export default class Navigator extends Component {
    render() {
        return (
          <Router>
            <Scene key="root">
                <Scene key="splash" component={Splash} hideNavBar={true} initial />
                <Scene key="login" component={Login} hideNavBar={true}  />
                <Scene key="home" component={Home} hideNavBar={true}   />
                <Scene key="addProduct" component={AddProduct} hideNavBar={true} />
                <Scene key="showProduct" component={ShowProduct} hideNavBar={true} />
                <Scene key="myLocation" component={MyLocation} hideNavBar={true}  />
            </Scene>
          </Router>
        )
    }
}
