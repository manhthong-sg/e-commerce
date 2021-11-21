import React, {useEffect, useState}  from 'react'
import { StyleSheet,SafeAreaView, ToastAndroid, Image, Text, View, Platform, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SERVER_URL from '../api'
import axios from 'axios';
import { COLORS , SIZES, icons, images } from '../constants'
import { useSelector, useDispatch } from 'react-redux'

const MyOrders = ({navigation}) => {
    
    const [statusData, setStatusData] = useState([
        {
            id: 1,
            name: "Waiting Confirm",
        },
        {
            id: 2,
            name: "Preparing",
        },
        {
            id: 3,
            name: "Delivering",
        },
        {
            id: 4,
            name: "Completed",
        },
        {
            id: 5,
            name: "Cancelled",
        },
        {
            id: 6,
            name: "Return Refund",
        },
    ])
    const [selectedStatus, setSelectedStatus] = useState({
        id: 1,
        name: "Waiting Confirm",
    })
    //onPress category
    const onSelectStatus = async (status) =>{
        //filter restaurant
        // let productsList = await axios.get(`${SERVER_URL}/products/categories/${category.id}`)
        
        // setProducts(productsList["data"])
        setSelectedStatus(status)
    }
    //render header of this screens
    const Header = () => {
        return (
            <View style={{ flexDirection: 'row', height: 50, elevation: 2 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={()=> {
                        
                        navigation.goBack();
                    }}
                >
                    <FontAwesome5
                        name="arrow-left"
                        resizeMode="contain"
                        size={25}
                    />
                </TouchableOpacity>
    
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: "100%",
                            //backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius,
                            marginRight: 30,
                        }}
                    >
                        <Text style={{
                            fontWeight: 'bold', 
                            fontSize: 25,
                            color: COLORS.xam4
                        }}>
                            My Orders
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    //render categories list item
    const TabOrdersStatus=()=>{

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        marginLeft: 10,
                        // backgroundColor: (selectedCategory?.id == item.id) ? COLORS.brand : null,
                        // borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        borderBottomWidth: 2,
                        borderBottomColor: (selectedStatus?.id == item.id) ? COLORS.brand : COLORS.white,
                        bottom: 10,
                        zIndex:1,
                    }}
                    onPress={() => onSelectStatus(item)}

                >
                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedStatus?.id == item.id) ? COLORS.brand : COLORS.xam4,
                            fontWeight: 'bold'
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }
        
        
        return (
            <View style={{
                // borderBottomWidth: 1,
                // backgroundColor: COLORS.white,
                bottom:10,
                elevation: 1,
            }}>
                
                <FlatList
                        data={statusData}
                        style={{
                            zIndex: 1,
                        }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingVertical: SIZES.padding }}
                    />    
            </View>
        )
    }

    //render main My Orders
    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{
                paddingTop: 30,
                height: 122,
                backgroundColor: COLORS.white,
            }}>
                <Header/>
                <TabOrdersStatus/>

            </View>
        </View>
    )
}

export default MyOrders

const styles = StyleSheet.create({})
