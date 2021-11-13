import React from 'react'
import { View, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
// import {NavigationContainer} from './BottomNavigation.js'
import Home from '../screens/Home'
import CategoriesContainer from '../screens/CategoriesContainer'
import BrandsContainer from '../screens/BrandsContainer'
import ProductDetail from '../screens/ProductDetail'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Me from '../screens/Me'
import Cart from '../screens/Cart'
import Payment from '../screens/Payment'
const HomeNavigation = () => {
    const Stack=createStackNavigator();
    const screenOptions={
        headerShown: false,
    }
    return (
            <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
                <Stack.Screen name = 'Home' component = {Home} screenOptions={screenOptions}/>
                <Stack.Screen name = 'CategoriesContainer' component = {CategoriesContainer} screenOptions={screenOptions}/>
                <Stack.Screen name = 'BrandsContainer' component = {BrandsContainer} screenOptions={screenOptions}/>
                <Stack.Screen name = 'ProductDetail' component = {ProductDetail} screenOptions={screenOptions}/>
            </Stack.Navigator>
    )
}
export {HomeNavigation}

const MeNavigation = () => {
    const Stack=createStackNavigator();
    const screenOptions={
        headerShown: false,
    }
    return (
            <Stack.Navigator initialRouteName='Me' screenOptions={screenOptions}>
                <Stack.Screen name = 'Me' component = {Me} screenOptions={screenOptions}/>
                <Stack.Screen name = 'Login' component = {Login} screenOptions={screenOptions}/>
                <Stack.Screen name = 'Register' component = {Register} screenOptions={screenOptions}/>
                {/* <Stack.Screen name = 'Cart' component = {Cart} screenOptions={screenOptions}/> */}
            </Stack.Navigator>
    )
}
export {MeNavigation}

const CartNavigation = () => {
    const Stack=createStackNavigator();
    const screenOptions={
        headerShown: false,
    }
    return (
            <Stack.Navigator initialRouteName='Cart' screenOptions={screenOptions}>
                <Stack.Screen name = 'Cart' component = {Cart} screenOptions={screenOptions}/>
                <Stack.Screen name = 'Payment' component = {Payment} screenOptions={screenOptions}/>
            </Stack.Navigator>
    )
}
export {CartNavigation}
