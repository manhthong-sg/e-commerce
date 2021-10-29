import React from 'react'
import { View, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
// import {NavigationContainer} from './BottomNavigation.js'
import Home from '../screens/Home'
import CategoriesContainer from '../screens/CategoriesContainer'
import BrandsContainer from '../screens/BrandsContainer'
import DetailProduct from '../screens/DetailProduct'

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
                <Stack.Screen name = 'DetailProduct' component = {DetailProduct} screenOptions={screenOptions}/>
            </Stack.Navigator>
    )
}

export default HomeNavigation
