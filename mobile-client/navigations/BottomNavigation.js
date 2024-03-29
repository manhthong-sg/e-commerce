import React, {useState, useEffect} from 'react'
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
import {HomeNavigation, MeNavigation, CartNavigation} from './index'
import { useSelector, useDispatch } from 'react-redux'
import Payment from '../screens/Order';
import {createStackNavigator} from '@react-navigation/stack'
import LottieView from "lottie-react-native";


const Stack=createStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions={
    headerShown: false,
}

//custom focus icon animation
const iconCuscom={
    icon_focus: 22,
    icon_out: 18,
    text_focus: 13,
    text_out: 12
}
const BottomNavigation = () => {
    const CartContainer = useSelector(state1=> state1.cartReducer.cart);
    var [onChangeCartNum, setOnChangeCartNum]=useState()
    useEffect(() => {
        setOnChangeCartNum(CartContainer.itemNum)
    }, [CartContainer])
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle:{
                    position: 'absolute',
                    //bottom: 35,
                    elevation: 3,
                    //borderRadius: 15,
                    backgroundColor: COLORS.white,
                    height: 55,
                }
            }}
        >
            {/* Home Screen  */}
            <Tab.Screen 
                name="HomeContainer" 
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
                                    color={focused ? COLORS.brand: COLORS.xam2}
                                    //style={styles.Icon}
                                />
                                <Text style={{
                                    color: focused ? COLORS.brand: COLORS.xam2,
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
                                    color={focused ? COLORS.brand: COLORS.xam2}
                                    //style={styles.Icon}
                                />
                                <Text style={{
                                    color: focused ? COLORS.brand: COLORS.xam2,
                                    fontSize: focused ? iconCuscom.text_focus: iconCuscom.text_out
                                    
                                    }}>
                                    Favorite
                                </Text>
                        </View>
                )}}
            />
            
            {/* Cart Screen  */}
            <Tab.Screen 
                name="CartContainer" 
                component={CartNavigation} 
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
                                    color={focused ? COLORS.brand: COLORS.xam2}
                                    //style={styles.Icon}
                                />
                                <Text style={{
                                    color: focused ? COLORS.brand: COLORS.xam2,
                                    fontSize: focused ? iconCuscom.text_focus: iconCuscom.text_out
                                    
                                }}>
                                    Cart
                                </Text>
                                <View style={{
                                    position: 'absolute',
                                    backgroundColor: COLORS.red,
                                    width: 18,
                                    height: 18,
                                    borderRadius: 7,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    bottom: focused ? 28: 25,
                                    left: 20
                                }}>
                                    <Text style={{fontSize: focused ? 15: 14, color: COLORS.white, zIndex:1 }}>{onChangeCartNum}</Text>
                                    
                                    <LottieView
                                        source={require("../components/AnimationIcons/cartChange.json")}
                                        autoPlay
                                        loop={false}
                                        resizeMode='contain'
                                        style={{ 
                                            height: 100 , 
                                            // zIndex: -1,
                                            position: 'absolute',
                                            // top: 5,
                                        }}
                                    />

                                </View>
                        </View>
                )}}
            />

            {/* Me Screen  */}
            <Tab.Screen 
                name="MeContainer" 
                component={MeNavigation} 
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
                                    color={focused ? COLORS.brand: COLORS.xam2}
                                    //style={styles.Icon}
                                />
                                <Text style={{
                                    color: focused ? COLORS.brand: COLORS.xam2,
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
