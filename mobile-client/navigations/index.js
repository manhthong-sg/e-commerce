import React from 'react'
import { View, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import {NavigationContainer} from './BottomNavigation.js'
import Home from '../screens/Home'
const RootNavigation = () => {
    const Stack=createStackNavigator();
    const screenOptions={
        headerShown: false,
    }
    return (
        <NavigationContainer

        >
            <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
                <Stack.Screen name = 'Home' component = {Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation
