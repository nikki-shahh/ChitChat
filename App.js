
import React, { Component } from "react";
//importing screens
import Start from './components/Start';
import Chat from './components/Chat';
//importing react native gesture handler
import "react-native-gesture-handler";
//importing react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

/*
 * Main component holds the navigation container &
 * switch from one screen to the other
 */

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} options={{ title: "Welcome to ChitChat!" }} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
