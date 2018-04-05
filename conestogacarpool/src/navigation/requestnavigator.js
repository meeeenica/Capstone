import React from "react";
import { StackNavigator } from "react-navigation";


//Screens
import RequestScreen from '../screens/ListOfRequests';


//Stack Navigator for setting screen and navigation paths
const NavigationContainer  = StackNavigator(
  {
    Request: {
      screen: RequestScreen,
      navigationOptions: {title: 'Request',}
    },
  },
  {
    initialRouteName: 'Request',
    headerMode: 'screen',
    header: 'Request'
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