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
import Order from '../screens/Order'
import EditDeliveryInfo from '../screens/EditDeliveryInfo'
import CompleteOrder from '../screens/CompleteOrder'
import MyOrders from '../screens/MyOrders'
import OrderDetails from '../screens/OrderDetails'
import Search from '../screens/Search'
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
                <Stack.Screen name = 'Search' component = {Search} screenOptions={screenOptions}/>
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
                <Stack.Screen name = 'MyOrders' component = {MyOrders} screenOptions={screenOptions}/>
                <Stack.Screen name = 'OrderDetails' component = {OrderDetails} screenOptions={screenOptions}/>
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
                <Stack.Screen name = 'Order' component = {Order} screenOptions={screenOptions}/>
                <Stack.Screen name = 'EditDeliveryInfo' component = {EditDeliveryInfo} screenOptions={screenOptions}/>
                <Stack.Screen name = 'CompleteOrder' component = {CompleteOrder} screenOptions={screenOptions}/>
            </Stack.Navigator>
    )
}
export {CartNavigation}
