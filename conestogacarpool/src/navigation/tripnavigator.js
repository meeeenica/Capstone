import React from "react";
import { StackNavigator } from "react-navigation";


//Screens
import TripScreen from '../screens/Trips';
import RequestedTripScreen from '../screens/ListOfRequests';
import ListOfTripScreen from '../screens/ListOfTrips';
import MyTrips from '../screens/MyTrips';
import PostTripNav from '../navigation/posttripnavigator';


//Stack Navigator for setting screen and navigation paths
const NavigationContainer  = StackNavigator(
  {
    'Requested Trips': {
      screen: RequestedTripScreen,
      navigationOptions: {title: 'Request Trip',},
    },
    Trip: {
      screen: TripScreen,
      navigationOptions: {title: 'Trip List'},
    },
    'My Trips': {
      screen:MyTrips,//ListOfTripScreen,
      navigationOptions: {title: 'My Trips'},
    },
  },
  {
    initialRouteName: 'Trip',
    headerMode: 'screen',
    header: 'Trip List',
    //navigationOptions: {
    //    headerVisible: false,
    //}
  }
);

export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    return <NavigationContainer />;
  }
}