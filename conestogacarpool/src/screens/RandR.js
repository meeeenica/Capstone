import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import {List, ListItem} from 'react-native-elements';

import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);

class RandRScreen extends Component{
  static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
       headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
          headerStyle:{
              backgroundColor:'white',
          },
      });
    
    
    constructor(props) {
      super(props);
      this.renderReviewList = this.renderReviewList.bind(this);
      this.renderOptions = this.renderOptions.bind(this);

    }

    renderReviewList(review) {
      return (< ListItem titleStyle={styles.listItemStyle}
      key={review.title}
      title={review.title}
      rating={review.title}
      />)
    }
    
    renderOptions = () => {
      Reviews =  [
        {"rating":"","title":"The driver is very nice","Page":"trip1"},
        {"rating":"","title":"It's good","Page":"trip2"},
      ]                  
        return Reviews.map((p) => (
        this.renderReviewList(p)
        ))
    }

    render(){
      const navigation = this.props.navigation;
      return (
        <View style={styles.container}>
          <List containerStyle={styles.inputContainer}>
            {this.renderOptions()}
         </List>
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
    inputContainer: {
      //flex: 1,
      //justifyContent: 'center',
      padding: 10,
      backgroundColor: 'white',
      margin: 10,
      borderBottomColor: 'white',
      borderTopColor:'white',
    },
    
  });    
  
  export default RandRScreen;
