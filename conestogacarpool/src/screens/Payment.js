import React, { Component } from "react";
import { StyleSheet, Text, View, 
  ScrollView, TextInput, Button, Image, 
  AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import {List, ListItem} from 'react-native-elements';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);


class PaymentScreen extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
       headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
          headerStyle:{
              backgroundColor:'white',
          },
      });
    
      constructor(props) {
        super(props);
        this.renderPaymentOptions = this.renderPaymentOptions.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
      }
  
      renderPaymentOptions(payment) {
          return (< ListItem titleStyle={styles.listItemStyle}
            key={payment.title}
            title={payment.title}
            //onPress={() => this.onPress(option)}
          />)
      }
  
      renderOptions = () => {
        PaymentChoice =  [
                    {"title":"Applepay", /*"Page":"Applepay"*/},
                    {"title":"Credit Card", /*"Page":"Credit Card"*/},
                  ]                  
        return PaymentChoice.map((p) => (
          this.renderPaymentOptions(p)
        ))
      }
  
      render(){
        const navigation = this.props.navigation;
        return (
          <View style={styles.container}>
            <List containerStyle={styles.inputContainer}>
                {this.renderOptions()}
              </List>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity style = {styles.addButton}>
                        <Text style = {styles.ButtonText}>+</Text>
                </TouchableOpacity>
            </View>
          </View>
        );
      }
   }
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#efe7da',
        //alignItems: 'center',
        //justifyContent: 'center',
      },
      listItemStyle:{
        fontSize: 14,
      },
      logoContainer: {
        //flex: 1,
      },
      inputContainer: {
        //flex: 1,
        justifyContent: 'center',
        width: "100%",
        //padding: 10,
        //backgroundColor: 'white',
        //margin: 20,
        borderBottomColor: 'white',
        borderTopColor:'white',
      },
      buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
      },
      addButton: {
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.1)',
       alignItems:'center',
       justifyContent:'center',
       width:50,
       height:50,
       backgroundColor:'rgba(255,255,255, 0.7)',
       borderRadius:100,
      },
      ButtonText:{
        color: '#ddd',
        fontSize:45,
        fontWeight:'bold'
      },
  });    
  
  export default PaymentScreen;
