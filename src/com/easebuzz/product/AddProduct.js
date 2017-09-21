import React, {Component} from  'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import ModalDropdown from 'react-native-modal-dropdown';
import Datastore from 'react-native-local-mongodb' ;
products = new Datastore({ filename: 'asyncStorageKey', autoload: true });

import Header from '../common/Header';

export default class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            type:'Jeans',
            price:'',
            quantity:'',
            typeList: ['Jeans', 'Shirts'],
            error:''
        }
    }

    saveProduct(){
        const {title, type, price, quantity} = this.state ;
        if(title.length <= 0   )
            this.setState({error:"Title can't be blank"});
        else if (type.length <= 0)
            this.setState({error:"Type can't be blank"});
        else if (price.length <= 0)
            this.setState({error:"Price can't be blank"});
        else if (quantity.length <= 0)
            this.setState({error:"Quantity can't be blank"});
        else {
            var doc = {
                title: title,
                type: type,
                price: price,
                quantity: quantity,
            }
            products.count({title : title}, function (err, count) {
                if(count > 0){
                    products.update({ $and : [{ title : title }, { type: type }] } , { $set: doc }, { multi: true }, function (err, numReplaced) {   // Callback is optional
                        console.log('numReplaced  : ' + numReplaced);
                    });
                }else {
                    products.insert(doc, function (err, newDoc) {
                        console.log(newDoc);
                    });
                }
            });
            this.setState({
                title:'',
                type:'Jeans',
                price:'',
                quantity:'',
                error:'Added Product Successfully!'
            })
        }
    }

    renderRow(rowData, rowID, highlighted) {
        return (
            <View style = {{height:30,justifyContent:'center',alignItems:'center'}}>
                <Text >{rowData}</Text>
            </View>
        );
    }


    render(){
        return(
            <View style = {estyles.container} >
                <Header leftText = 'Add Product' url = {require('../images/leftArrow.png')} onClick = {() => {Actions.pop()}} />
                <ScrollView style = {{margin:10}} >
                    <View style = {{ marginHorizontal:10, marginTop:15}}>
                        <Text style ={{fontSize:14,marginBottom:3, color:'#717171'}} >Title <Text style = {{color:'red',}} > *</Text></Text>
                        <TextInput
                            underlineColorAndroid='transparent'
                            autoCorrect = {false}
                            autoCapitalize = 'none'
                            keyboardType = 'default'
                            returnKeyType = 'done'
                            style={estyles.input}
                            onChangeText={(text) => this.setState({title:text})}
                            value={this.state.title}
                          />
                    </View>
                    <View style = {{ marginHorizontal:10, marginTop:15}}>
                            <Text style ={{fontSize:14,marginBottom:3, color:'#717171'}} >Type <Text style = {{color:'red',}} > *</Text></Text>
                            <View  >
                                <ModalDropdown
                                    options={this.state.typeList}
                                    onSelect = {(index, value ) => this.setState({type : value})}
                                    dropdownStyle = {{height: this.state.typeList.length*30 , width: 70}}
                                    renderRow={this.renderRow.bind(this)} >
                                    <View style = {[estyles.otherInput]}>
                                        <Text>{this.state.type}</Text>
                                        <Image style={{height:10, width:10,resizeMode:'contain', tintColor:'#6A92C3'}} source = {require('../images/arrow-icon.png')} />
                                    </View>
                                </ModalDropdown>
                            </View>
                        </View>
                    <View style = {{ marginHorizontal:10, marginTop:15}}>
                        <Text style ={{fontSize:14,marginBottom:3, color:'#717171'}} >Price <Text style = {{color:'red',}} > *</Text></Text>
                        <TextInput
                            underlineColorAndroid='transparent'
                            autoCorrect = {false}
                            autoCapitalize = 'none'
                            keyboardType = 'numeric'
                            returnKeyType = 'done'
                            style={estyles.input}
                            onChangeText={(text) => this.setState({price:text})}
                            value={this.state.price}
                          />
                    </View>
                    <View style = {{ marginHorizontal:10, marginTop:15}}>
                        <Text style ={{fontSize:14,marginBottom:3, color:'#717171'}} >Quantity <Text style = {{color:'red',}} > *</Text></Text>
                        <TextInput
                            underlineColorAndroid='transparent'
                            autoCorrect = {false}
                            autoCapitalize = 'none'
                            keyboardType = 'numeric'
                            returnKeyType = 'done'
                            style={estyles.input}
                            onChangeText={(text) => this.setState({quantity:text})}
                            value={this.state.quantity}
                          />
                    </View>
                    <Text style = {{color:'red', textAlign:'center', marginVertical:20}} >{this.state.error}</Text>
                    <TouchableOpacity style = {[estyles.button,{backgroundColor:'#000096', }]}  onPress = {() => this.saveProduct()}>
                            <Text style = {{fontSize:14, fontWeight:'600', color:'#FFFFFF'}}>Save Product</Text>
                        </TouchableOpacity>
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
    otherInput: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#FBFCFF',
        borderColor:'#D7D8DA',
        marginBottom:1,
        paddingLeft:5,
        paddingRight:5,
        height: 30,
        borderWidth: 0.5,
        borderRadius:4,
        zIndex:2,
    },
    input: {
        backgroundColor:'#FBFCFF',
        marginBottom:1,
        paddingLeft:5,
        color:'#000000',
        borderColor:'#D7D8DA',
        height: 30,
        borderWidth: 0.5,
        borderRadius:4,
        zIndex:2,
        fontSize:12
    },
    button:{
        width:'50%',
        height:35,
        borderRadius:20,
        alignItems:'center',
        justifyContent:"center",
        alignSelf:'center',
        marginVertical:20
    },
})
