import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import {COLORS} from './constants/index' 
import Home from './screens/Home';
import Login from './screens/Login'
import Register from './screens/Register'
import BottomNavigation from './navigations/BottomNavigation';
import {createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
export default function App() {
  const Stack=createStackNavigator();
  const Tab = createBottomTabNavigator();
  const [isLogin, setIsLogin]=useState(true);
  return (
    <View style={styles.container}>
      {isLogin && (
        <NavigationContainer>
          <BottomNavigation/>
        </NavigationContainer>

      )}
      {!isLogin && (
        <Login/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
