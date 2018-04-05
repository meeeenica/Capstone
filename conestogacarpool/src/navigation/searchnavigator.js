import React from "react";
import { StackNavigator } from "react-navigation";


//Screens
import SearchScreen from '../screens/Search';
import TripDetailsScreen from '../screens/TripDetails';


//Stack Navigator for setting screen and navigation paths
const NavigationContainer  = StackNavigator(
  {
    'Search': {
      screen: SearchScreen,
      navigationOptions: {title: 'Search',}
    },
    TripDetails:  {      
      screen : TripDetailsScreen,     
      navigationOptions: {title: 'Trip Details',}, 
      title: 'TripDetails'              
    },
  },
  {
    initialRouteName: 'Search',
    headerMode: 'screen',
    header: 'Search'
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