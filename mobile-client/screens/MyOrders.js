import React, {useEffect, useState}  from 'react'
import { StyleSheet,SafeAreaView, ToastAndroid, Image, Text, View, Platform, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SERVER_URL from '../api'
import axios from 'axios';
import { COLORS , SIZES, icons, images } from '../constants'
import { useSelector, useDispatch } from 'react-redux'
import LottieView from "lottie-react-native";

const MyOrders = ({navigation}) => {
    const CurrentUser = useSelector(state=> state.userReducer.user);

    var [ordersData, setOrdersData]=useState(null);
    
    const [statusData, setStatusData] = useState([
        {
            id: 0,
            name: "Waiting Confirm",
        },
        {
            id: 1,
            name: "Preparing",
        },
        {
            id: 2,
            name: "Delivering",
        },
        {
            id: 3,
            name: "Completed",
        },
        {
            id: 4,
            name: "Cancelled",
        },
        {
            id: 5,
            name: "Return Refund",
        },
    ])
    const [selectedStatus, setSelectedStatus] = useState(statusData[0])

    //onPress tab status
    const onSelectStatus = (status) =>{
        setOrdersData(null);
        //filter orders
        axios.get(`${SERVER_URL}/orders/${CurrentUser._id}/${selectedStatus.id}`)
        .then((ordersList)=>{
            // console.log(ordersList["data"]);
            setOrdersData(ordersList["data"])
            setSelectedStatus(status)
        })
    }

    useEffect(() => {
        onSelectStatus(selectedStatus);
        
    }, [selectedStatus]);
    
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
                        
                        navigation.navigate("Me");
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

    //render orders
    const renderOrders = ()=>{
        const renderOrderItem = ({ item }) => {
            // console.log(item.Message);

            return (
                <TouchableOpacity style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    elevation: 2,
                    marginTop: 10,
                }}
                    onPress={()=> navigation.navigate("OrderDetails", item)}
                >
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 5,
                    }}>
                        <Text style={{
                            // fontSize: 14,
                            fontWeight: 'bold',
                            marginLeft: 10,
                        }}>Order ID:</Text>
                        <Text style={{
                            paddingLeft: 5

                        }}>{item._id}</Text>
                        <View style={{
                            backgroundColor: COLORS.orange,
                            borderRadius: 3,
                            marginLeft: 20,
                            paddingLeft:5,
                            paddingRight: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: COLORS.white,
                            }}>{selectedStatus.name}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: COLORS.white,
                            alignItems: "center",
                            justifyContent: 'center',
                            elevation: 1.5,
                            height: 100,
                        }}
                        // onPress={() =>navigation.navigate("ProductDetail", item)}
                    > 
                        <View style={{
                            flexDirection: 'row',
                            //left: -95,

                        }}>
                            <View style={styles.ImageCart}>
                                <Image 
                                    source={{uri: `${SERVER_URL}/images/${item.OrderItems[0].idProduct.image[0]}`}}
                                    style={{
                                        width: 70,
                                        height: 70,
                                    }}
                                    resizeMode="contain"
                                    
                                />
                            </View>
                            <View style={{width: '65%',}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    paddingLeft: 10,
                                    fontSize: 16,
                                    width: '100%',
                                    // backgroundColor: COLORS.xam1
                                }}>{item.OrderItems[0].idProduct.name}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingLeft: 7,
                                    width: '100%',
                                    height: 20,
                                    // backgroundColor: COLORS.xam1,
                                    alignItems: 'center'
                                }}>
                                {
                                    [1, 2, 3, 4, 5].map((star)=>(
                                        <FontAwesome5 
                                            size={10} 
                                            solid name='star' 
                                            color={(star <= item.OrderItems[0].idProduct.star) ? COLORS.orange : COLORS.xam2}
                                            style={{
                                                marginLeft: 3
                                            }}
                                        />
                                    ))
                                }
                                </View>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            paddingLeft: 10,
                                            minWidth: 60,
                                            fontSize: 17,
                                            marginTop: 10,
                                            // backgroundColor: COLORS.xam1,
                                            alignItems: 'flex-end'
                                        }}>{item.OrderItems[0].idProduct.price}$</Text>
                                        <Text style={{
                                            minWidth: 60,
                                            fontSize: 15,
                                            marginTop: 10,
                                            color: COLORS.xam2,
                                            alignItems: 'flex-end'
                                        }}>x{item.OrderItems[0].itemNum}</Text>

                                    </View>
                            </View>
                        </View>
                        {
                            item.ItemsNum > 1 && (
                                <View style={{
                                    height: 20,
                                    justifyContent: 'center',
                                    alignItems:'center'
                                }}>
                                    <Text style={{
                                        color: COLORS.xam2,
                                        letterSpacing: 1.2,
                                        // paddingBottom: 10,
                                    }}>-- See all --</Text>
                                </View>
                            )
                        }
                    </View>
                    <View style={{
                        height: 40,
                        flexDirection: 'row',
                        // backgroundColor: COLORS.white,
                        //elevation: 2,
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        paddingRight: 20,
                    }}>
                        
                        <Text style={{
                            fontSize: 15,
                            letterSpacing: 0.5,
                            fontWeight: 'bold'
                        }}>Order Total </Text>
                        <Text>({item.ItemsNum} items): </Text>
                        <Text style={{fontSize: 17}}>{item.Total}$</Text>
                    </View>
                    {
                        item.Status == "3" && (
                            <TouchableOpacity style={{
                                width: 60,
                                height: 30,
                                flexDirection: 'row',
                                position: 'absolute',
                                backgroundColor: COLORS.red,
                                elevation: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                top: 128,
                                left: 20,
                            }}
                                onPress={()=> navigation.navigate("RatingProducts", item)}
                            >
                                <Text style={{fontSize: 15, color: COLORS.white}}>Rate</Text>
                            </TouchableOpacity>
                        )
                    }
                </TouchableOpacity>
            )
        }
        return (

            <View style={{}}>
                {
                    ordersData.length>0 && (
                        <FlatList
                                data={ordersData}
                                style={{
                                    
                                }}
                                inverted={true}
                                vertical
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => `${item._id}`}
                                renderItem={renderOrderItem}
                                contentContainerStyle={{}}
                        />
                    )
                }
                {
                    ordersData.length<1 && (
                        <View style={{
                            flex:1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 200,

                        }}>
                            <Text style={{
                                fontSize: 23, 
                                // fontWeight: 'bold'
                            }}>
                                Empty
                            </Text>
                        </View>
                    )
                }
                
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
            {ordersData ? renderOrders(): (
                <View style={{
                    marginTop: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                    <LottieView
                        source={require("../components/AnimationIcons/itemsLoading.json")}
                        autoPlay
                        loop={true}
                        resizeMode='contain'
                        style={{ height: 130 }}
                    />
                </View>
            )}
        </View>
    )
}

export default MyOrders

const styles = StyleSheet.create({
    ImageCart: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.xam1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
