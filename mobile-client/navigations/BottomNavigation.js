import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../constants';
import Me from '../screens/Me';
import Cart from '../screens/Cart';
import Favorite from '../screens/Favorite';
import HomeNavigation from './index'

const Tab = createBottomTabNavigator();
const screenOptions={
    headerShown: false,
}
const iconCuscom={
    icon_focus: 30,
    icon_out: 23,
    text_focus: 14,
    text_out: 13
}
const BottomNavigation = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle:{
                    position: 'absolute',
                    bttom: 35,
                    left: 20,
                    right: 20,
                    elevation: 3,
                    borderRadius: 15,
                    backgroundColor: COLORS.xam1,
                    height: 80,
                }
            }}
        >
            {/* Home Screen  */}
            <Tab.Screen 
                name="Home" 
                component={HomeNavigation} 
                options={
                    {headerShown: false, tabBarIcon: ({focused})=>(
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            //top: 10,
                        }}>
                                <FontAwesome5
                                    name='home'
                                    size={focused ? iconCuscom.icon_focus: iconCuscom.icon_out}
                                    color={focused ? COLORS.brand: COLORS.orange}
                                    //style={styles.Icon}
                                />
                                <Text style={{
                                    color: focused ? COLORS.brand: COLORS.orange,
                                    fontSize: focused ? iconCuscom.text_focus: iconCuscom.text_out
                                    
                                    }}>
                                    Home
                                </Text>
                        </View>
                )}}
            />

            {/* Favorite Screen  */}
            <Tab.Screen 
                name="Favorite" 
                component={Favorite} 
                options={
                    {headerShown: false, tabBarIcon: ({focused})=>(
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            //top: 10,
                        }}>
                                <FontAwesome5
                                    name='heart'
                                    size={focused ? iconCuscom.icon_focus: iconCuscom.icon_out}
                                    color={focused ? COLORS.brand: COLORS.orange}
                                    //style={styles.Icon}
                                />
                                <Text style={{
                                    color: focused ? COLORS.brand: COLORS.orange,
                                    fontSize: focused ? iconCuscom.text_focus: iconCuscom.text_out
                                    
                                    }}>
                                    Favorite
                                </Text>
                        </View>
                )}}
            />
            
            {/* Cart Screen  */}
            <Tab.Screen 
                name="Cart" 
                component={Cart} 
                options={
                    {headerShown: false, tabBarIcon: ({focused})=>(
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            //top: 10,
                        }}>
                                <FontAwesome5
                                    name='shopping-cart'
                                    size={focused ? iconCuscom.icon_focus: iconCuscom.icon_out}
                                    color={focused ? COLORS.brand: COLORS.orange}
                                    //style={styles.Icon}
                                />
                                <Text style={{
                                    color: focused ? COLORS.brand: COLORS.orange,
                                    fontSize: focused ? iconCuscom.text_focus: iconCuscom.text_out
                                    
                                    }}>
                                    Cart
                                </Text>
                        </View>
                )}}
            />

            {/* Me Screen  */}
            <Tab.Screen 
                name="Me" 
                component={Me} 
                options={
                    {headerShown: false, tabBarIcon: ({focused})=>(
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            //top: 10,
                        }}>
                                <FontAwesome5
                                    name='user'
                                    size={focused ? iconCuscom.icon_focus: iconCuscom.icon_out}
                                    color={focused ? COLORS.brand: COLORS.orange}
                                    //style={styles.Icon}
                                />
                                <Text style={{
                                    color: focused ? COLORS.brand: COLORS.orange,
                                    fontSize: focused ? iconCuscom.text_focus: iconCuscom.text_out
                                    
                                    }}>
                                    Me
                                </Text>
                        </View>
                )}}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigation
