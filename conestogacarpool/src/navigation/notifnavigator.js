import React from "react";
import { StackNavigator } from "react-navigation";


//Screens
import NotificationScreen from '../screens/Notifications';


//Stack Navigator for setting screen and navigation paths
const NavigationContainer  = StackNavigator(
  {
    'Notification': {
      screen: NotificationScreen,
      navigationOptions: {title: 'Notifications',}
    },
  },
  {
    initialRouteName: 'Notification',
    headerMode: 'screen',
    header: 'Notifications'
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