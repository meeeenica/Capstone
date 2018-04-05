import React from "react";
import { StackNavigator } from "react-navigation";


//Screens
import PostTripScreen from '../screens/Post_Trip';
import MyTripsScreen from '../screens/MyTrips';
import TripDetailsScreen from '../screens/TripDetails';



//Stack Navigator for setting screen and navigation paths
const NavigationContainer  = StackNavigator(
  {
    'Post Trip': {
      screen: PostTripScreen,
      navigationOptions: {title: 'Post Trip',}
    },
    MyTrips: {
      screen: MyTripsScreen,
      navigationOptions: {title: 'My Trips',}
    },
    TripDetails:  {      
      screen : TripDetailsScreen,      
      title: 'TripDetails'              
    },
  },
  {
    initialRouteName: 'MyTrips',
    headerMode: 'screen',
    header: 'My Trips'
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