import React from "react";
import { Animated, Button, ScrollView, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import {BottomNavigation,  Tab, NavigationComponent } 
    from 'react-native-material-bottom-navigation';
//import { Icon } from 'react-native-vector-icons';
//import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';


//Screens
import SearchScreen from '../navigation/searchnavigator';
import TripsScreen from '../navigation/tripnavigator';
import RequestScreen from '../navigation/requestnavigator';
import PostTripScreen from '../navigation/posttripnavigator';
import NotificationsScreen from '../navigation/notifnavigator';
import ProfileScreen from '../navigation/profilenavigator';



//Stack Navigator for setting screen and navigation paths
const TabNavigationMain = TabNavigator(
    {
      Search: { 
        screen: SearchScreen,
        navigationOptions: {
          title: "Search",
          backgroundColor:'#FFF',
          tabBarIcon: () => (
            <Ionicons name="md-search" 
            size={24}  />
         )
        },
      },
      Request:{
        screen: RequestScreen,
        navigationOptions: {
          title: "Request",
          backgroundColor:'#FFF',
          tabBarIcon: () => (
            <Ionicons name="md-search" 
            size={24}  />
         )
        },
      },/*
      Trips: { screen: TripsScreen,
        navigationOptions: {
          title: 'Trip List',
          backgroundColor:'#FFF',
          tabBarIcon: () => (
            <Ionicons name="ios-car" 
            size={24}  />
         )
        },
      },*/
      'My Trips': { screen: PostTripScreen,
        header:'My Trips',
        navigationOptions: {
          title:'My Trips',
          backgroundColor:'#FFF',
          tabBarIcon: () => (
            <Ionicons name="ios-home" 
            size={24}  />
         )
        },
      },
      Notifications: { screen: NotificationsScreen,
        navigationOptions: {
          title:'Notifications',
          backgroundColor:'#FFF',
          tabBarIcon: () => (
            <Ionicons name="ios-notifications" 
            size={24}  />
         )
        },
      },
      Profile: { screen: ProfileScreen,
        navigationOptions: {
          title:'My Profile',
          backgroundColor:'#FFF',
          tabBarIcon: () => (
            <Ionicons name="md-person" 
            size={24}  />
         ),
         
        },
      },
    },
    {
      tabBarComponent: NavigationComponent,
      initialRouteName: 'My Trips',
      //header: 'Post a Trip',
      tabBarPosition: 'bottom',
      tabBarOptions: {
        showLabel:true,
        bottomNavigationOptions: {
          //labelColor: 'black',
          backgroundColor: '#FFF',
          labelColor:'#736356',
          inactiveTintColor:'yellow',
          showLabel:true,
          rippleColor: 'black',
          height: 56,
          elevation: 8,
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0
          /*
          tabs: {
            Search: {
              barBackgroundColor:'#FFF',
            },
            Trips: {
              barBackgroundColor: '#FFF',
            },
            'Post Trip': {
              barBackgroundColor: '#FFF',
            },
            Notifications: {
              barBackgroundColor: '#FFF',
            },
            Profile: {
              barBackgroundColor: '#FFF',
            },
          }*/
        }
      }
    }
  )

export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
     headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });
  render() {
    return <TabNavigationMain />;
  }
}