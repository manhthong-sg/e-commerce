import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, LogBox } from 'react-native';
import {COLORS} from './constants/index' 
import Home from './screens/Home';
import Login from './screens/Login'
import Register from './screens/Register'
import BottomNavigation from './navigations/BottomNavigation';
import {createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import {Provider as ReduxProvider} from 'react-redux'
import configureStore from './redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';

const store = configureStore();
export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const [publishableKey, setPublishableKey] = useState('pk_test_51JzgurFjDAOe92VrmpZf0aIiqBDMjooBS1UmClbHHEKEoLdKbj7cYLTSDfS33Fo53oPihgnYniyUW5dak9OqUvJV00BNQI92C5');
  
  return (
    <StripeProvider
      publishableKey={publishableKey}
      // merchantIdentifier="merchant.identifier"
    >
      <ReduxProvider store={store}>
        <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
            <NavigationContainer>
                <BottomNavigation/>
            </NavigationContainer>
        </View>
      </ReduxProvider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
