import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import {COLORS} from './constants/index' 
import Login from './screens/Login'
import Register from './screens/Register'

export default function App() {
  return (
    <View style={styles.container}>
      <Register/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
