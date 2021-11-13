import React, {useState, useEffect} from 'react'
import { StyleSheet, StatusBar, Text, View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS , SIZES, icons, images } from '../constants'
import { useSelector, useDispatch } from 'react-redux';
import SERVER_URL from '../api'

const Payment = ({navigation}) => {
    // get current user 
    const CurrentUser = useSelector(state=> state.userReducer.user);
    const Cart = useSelector(state=> state.cartReducer.cart);
    
    const [cartData, setCartData]=useState(null);
    useEffect(() => {
        //console.log(getCart());
        setCartData(Cart.items)
    },)


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
                        <Text style={{fontWeight: 'bold', fontSize: 25, color: COLORS.xam4}}>Payment</Text>
                    </View>
                </View>
            </View>
        )
    }

    //render your info and address
    const MyInfo = ()=> {
        return (
            <TouchableOpacity style={styles.MyInfoContainer}>
                <FontAwesome5 
                    name="map-marker-alt"
                    size={18}
                    color={COLORS.orange}
                    style={{
                        marginLeft: 20,
                        paddingTop: 7,
                    }}
                />
                <View style={styles.Info}>
                    <Text style={{
                        paddingBottom: 5, 
                        fontWeight: 'bold',
                        fontSize: 16,
                        paddingTop: 5,
                    }}>
                        Delivery address
                    </Text>
                    <Text>{CurrentUser.fullName} | {CurrentUser.phone}</Text>
                    {CurrentUser.address == "" && (
                        <Text style={{
                        paddingBottom: 10
                        }}>Please choose your address</Text>
                    )}
                    {CurrentUser.address !== "" && (
                        <Text style={{
                            paddingBottom: 10
                        }}>
                            {CurrentUser.address}
                        </Text>
                    )}
                </View>
                <FontAwesome5 
                    name="angle-right"
                    color={COLORS.xam1}
                    size={22}
                    style={{
                        width: "10%",
                        //backgroundColor: COLORS.xam1,
                        height: '100%',
                        textAlign: 'left',
                        textAlignVertical: 'center',
                        
                    }}
                />
            </TouchableOpacity>
        )
    }

    //show all cart that you wanna buy
    const MyItemsCart = () =>{
        const renderItem = ({ item }) => {
        
            return (
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.xam1,
                        alignItems: "center",
                        justifyContent: 'center',
                        elevation: 0.3 ,
                        height: 100,
                        marginBottom: 5,
                        borderRadius: 5,
                        elevation:0.8,
                    }}
                    //onPress={() =>navigation.navigate("ProductDetail", item.idProduct)}
                > 
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <View style={styles.ImageCart}>
                            <Image 
                                source={{uri: `${SERVER_URL}/images/${item["idProduct"].image[0]}`}}
                                style={{
                                    width: 70,
                                    height: 70,
                                }}
                                resizeMode="contain"
                                
                            />
                        </View>
                        <View style={{width: '70%',}}>
                            <Text style={{
                                fontWeight: 'bold',
                                paddingLeft: 10,
                                fontSize: 16,
                                width: '100%',
                                // backgroundColor: COLORS.xam1
                            }}>{item["idProduct"].name}</Text>
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
                                        color={(star <= item["idProduct"].star) ? COLORS.orange : COLORS.xam2}
                                        style={{
                                            marginLeft: 3
                                        }}
                                    />
                                ))
                            }
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                alignItems: 'center',
                                flex: 1,
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    paddingLeft: 10,
                                    maxWidth: 60,
                                    minWidth: 60,
                                    fontSize: 17,
                                    // backgroundColor: COLORS.xam1,
                                    alignItems: 'flex-end'
                                }}>{item["idProduct"].price}$</Text>
                                <Text style={{
                                    color: COLORS.xam3,
                                    marginLeft: 5,
                                }}>x{item.itemNum}</Text>
                                </View>
                            </View>
                        <View>
                    </View>
                </View>
                </TouchableOpacity>    
            )
        }
        return (
            <View style={{width: '100%', marginTop: 20}}>
                <View style={{
                    backgroundColor: COLORS.white,
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                    paddingLeft: 20,
                    elevation: 0.2
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16
                        }}>Your Cart</Text>
                    <View style={{
                        backgroundColor: COLORS.orange,
                        borderRadius: 3,
                        marginLeft: 5,
                        paddingLeft:5,
                        paddingRight: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{color: COLORS.white}}>{Cart.itemNum} items</Text>
                    </View>
                </View>
                <FlatList
                    data={cartData}
                    style={{
                        backgroundColor: COLORS.white,
                        maxHeight: 210,
                    }}
                    vertical
                    numColumns={1}
                    //showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item._id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{}}
                />

            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <Header/>
            <MyInfo/>
            <MyItemsCart/>
        </ScrollView>
    )
}
export default Payment

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

    },
    updown:{
        fontWeight: 'bold',
        fontSize: 20,
        color: COLORS.white,
        
    },
    MyInfoContainer:{
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        elevation: 2,
    },
    Info:{
        marginLeft: 15,
        width: '80%',
        // backgroundColor: COLORS.xam2
    },
    ImageCart: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.xam1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
