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
import Header from '../common/Header';

export default class ShowProduct extends Component {
    constructor(props){
        super(props);
        nthis = this;
        this.state={
            storedShirts: [],
            storedJeans: [],
            selectedTab:1
        }
        this.fetchProducts();
    }


    fetchProducts(){
        products.find({}, function (err, docs) {
            var shirts = [];
            var jeans = [];
            for(i = 0; i<docs.length; i++){
                if(docs[i].type == 'Jeans')
                    jeans.push(docs[i]);
                else
                    shirts.push(docs[i]);
            }
            nthis.setState({
                storedShirts: shirts ,
                storedJeans : jeans,
            })
        });
    }

    iterateAllJeans(){
        if(this.state.storedJeans.length == 0)
            return(
                <Text style = {{flex:1,textAlign:"center", color:'#363636', marginTop:10}}>No records to show</Text>
            );
        return(
            this.state.storedJeans.map( (data, index) =>{
                return(
                    <View style = {{width:width/2-1,backgroundColor:'#d6d6d6', marginTop:1, marginRight:1, padding:5}} key = {index} >
                        <Text style = {{fontSize:14, color:'#363636'}} >Title : <Text style = {{fontWeight:'600'}} >{data.title}</Text></Text>
                        <Text style = {{fontSize:14, color:'#363636', marginTop:5}} >Price : <Text style = {{fontWeight:'600'}} >{data.price}</Text></Text>
                        <Text style = {{fontSize:14, color:'#363636', marginTop:5}} >Quantity : <Text style = {{fontWeight:'600'}} >{data.quantity}</Text></Text>
                    </View>
                );
            })
        );
    }

    showJeans(){
        return(
            <View style = {{flexDirection:'row', flexWrap:'wrap', width:width, alignSelf:'center',}} >
                {this.iterateAllJeans()}
            </View>
        );
    }

    iterateAllShirts(){
        if(this.state.storedShirts.length == 0)
            return(
                <Text style = {{flex:1,textAlign:"center", color:'#363636', marginTop:10}}>No records to show</Text>
            );
        return(
            this.state.storedShirts.map( (data, index) =>{
                return(
                    <View style = {{width:width/2-1,backgroundColor:'#d6d6d6', marginTop:1, marginRight:1, padding:5}} key = {index} >
                        <Text style = {{fontSize:14, color:'#363636'}} >Title : <Text style = {{fontWeight:'600'}} >{data.title}</Text></Text>
                        <Text style = {{fontSize:14, color:'#363636', marginTop:5}} >Price : <Text style = {{fontWeight:'600'}} >{data.price}</Text></Text>
                        <Text style = {{fontSize:14, color:'#363636', marginTop:5}} >Quantity : <Text style = {{fontWeight:'600'}} >{data.quantity}</Text></Text>
                    </View>
                );
            })
        );
    }

    showShirts(){
        return(
            <View style = {{flexDirection:'row', flexWrap:'wrap', width:width, alignSelf:'center',}} >
                {this.iterateAllShirts()}
            </View>
        );
    }

    render(){
        const { selectedTab } = this.state;
        return(
            <View style = {estyles.container} >
                <Header leftText = 'Show Products' url = {require('../images/leftArrow.png')} onClick = {() => {Actions.pop()}} />
                <ScrollView showsVerticalScrollIndicator=  {true}>
                    <View style ={{flexDirection:'row'}} >
                        <View style = {[estyles.tabBar]}>
                            <TouchableOpacity onPress = {()=>{this.setState({selectedTab:1})}} >
                                <Text style = {{color:(selectedTab == 1)?'#000000':'#6A92C5', fontWeight:'600'}}>Jeans</Text>
                            </TouchableOpacity>
                            <View style = {(selectedTab == 1)?estyles.lineOn:estyles.lineOff} />
                        </View>
                        <View style = {[estyles.tabBar]}>
                            <TouchableOpacity onPress = {()=>{this.setState({selectedTab:2})}} >
                                <Text style = {{color:(selectedTab == 2)?'#000000':'#6A92C5', fontWeight:'600'}}>Shirts</Text>
                            </TouchableOpacity>
                            <View style = {(selectedTab == 2)?estyles.lineOn:estyles.lineOff} />
                        </View>
                    </View>

                    {(this.state.selectedTab == 1)?this.showJeans():this.showShirts()}
                </ScrollView>
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
    tabBar : {
        width:'50%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
    },
    lineOn:{
        width:'100%',
        marginTop:5,
        backgroundColor:'#000000',
        height:3
    },
    lineOff:{
        width:'100%',
        marginTop:7,
        backgroundColor:'#DDDDDD',
        height:1
    },
})
