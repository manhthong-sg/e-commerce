import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Image} from 'react-native'
import { COLORS , SIZES, icons, } from '../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useSelector } from 'react-redux'

const Cart = ({navigation}) => {
    //get current user
    const CurrentUser = useSelector(state=> state.userReducer.user); 
    const [count, setCount]=useState(1);
    const [cartData, setCartData]=useState();
    // fetch api cart items from id user 
    const fetchItemsCart=()=>{
        axios.get(`http://192.168.1.7:3000/carts/${CurrentUser._id}`)
        .then((data)=>{
            setCartData(data["data"]);
        })
        //.then(()=> console.log(arrCart))
        .catch(err=>console.log(err))

    }

    useEffect(() => {
         if(CurrentUser){
            fetchItemsCart();
        }
    },[])

    //handle decrease product
    const handleIncreaseCount=()=>{
        if(count>remaining-1){
            ToastAndroid.showWithGravity(
                "Only "+remaining +" products left!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
        }else{
            setCount(count+1)
            
            setTotal(total+price)
        }
    }
    //handle increase product
    const handleDecreaseCount=()=>{
        if(count>1){
            setCount(count-1); 
            setTotal(total-price)
        }else{
            ToastAndroid.showWithGravity(
                "Minimum is 1",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
        }
    }

    const ListCartItems=()=>{
        const renderItem = ({ item }) => {
            return (
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        alignItems: "center",
                        justifyContent: 'center',
                        elevation: 0.3 ,
                        height: 100,
                        width: "95%",
                        marginRight: 25,
                        marginLeft: 10,
                        marginBottom: 15,
                        borderRadius: 10,
                        //zIndex: -1,
                    }}
                    //onPress={() =>navigation.navigate("ProductDetail", item)}
                > 
                    <View style={{
                        flexDirection: 'row',
                        //left: -95,

                    }}>
                        <View style={styles.ImageCart}>
                            <Image 
                                source={{uri: `http://192.168.1.7:3000/images/${item["idProduct"].image[0]}`}}
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
                                {/* //edit increase or decrease  */}
                                <View style={{
                                    flexDirection: 'row',
                                    height: 30,
                                    // backgroundColor: COLORS.orange,
                                    alignItems: 'center',
                                    marginLeft: 140
                                }}>
                                    <TouchableOpacity style={{
                                        width: 20,
                                        height: 20,
                                        backgroundColor: COLORS.xam2,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                        //onPress={handleDecreaseCount}
                                    >
                                        <Text style={styles.updown}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 5, marginRight: 5}}>{item.itemNum}</Text>
                                    <TouchableOpacity style={{
                                        width: 20,
                                        height: 20,
                                        backgroundColor: COLORS.brand,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                        //onPress={handleIncreaseCount}
                                    >
                                        <Text style={styles.updown}>+</Text>
                                    </TouchableOpacity>         
                                    </View>  
                                </View>
                            </View>
                        <View>
                            {/* // button delete cart item  */}
                            <TouchableOpacity>
                                <FontAwesome5 name='trash-alt' size={18} color={COLORS.xam4} />
                            </TouchableOpacity>
                            
                             
                            
                        </View>
                    </View>
                </View>    
            )
        }
        return (
            <View style={{width: '95%', marginTop: 20, height: SIZES.height-430}}> 
                <FlatList
                    data={cartData}
                    style={{
                        
                    }}
                    vertical
                    numColumns={1}
                    //showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item._id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{}}
                />    
            </View>
        )
    }
    const PaymentContainer=()=> {
        return (
            <View style={{
                width: '90%',
                marginLeft: 20,
                marginRight: 25,
                marginTop: 30,
                // backgroundColor: COLORS.white,
                elevation: 1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    //backgroundColor: COLORS.xam2
                }}>
                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        letterSpacing: 1
                    }}>Order Amount:</Text>
                    <Text
                        style={{
                            fontSize: 16,
                            letterSpacing: 1,
                            textAlign: 'right'
                        }}
                    >0$</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    marginVertical: 20,
                    //backgroundColor: COLORS.xam2
                }}>
                    <Text style={{
                        width: '90%',
                        fontSize: 16,
                        letterSpacing: 1
                    }}>Discount:</Text>
                    <Text
                        style={{
                            fontSize: 16,
                            letterSpacing: 1,
                            textAlign: 'right'
                        }}
                    >0$</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    //backgroundColor: COLORS.xam2
                }}>
                    <Text style={{
                        width: '90%',
                        // maxwidth: '90%'-20,
                        fontSize: 16,
                        letterSpacing: 1
                    }}>Delivery:</Text>
                    <Text
                        style={{
                            fontSize: 16,
                            letterSpacing: 1,
                            textAlign: 'right'
                        }}
                    >0$</Text>
                </View>
                
                <Text style={{
                    color: COLORS.xam2,
                    //  marginLeft: 5,
                    marginRight: 10,
                    // backgroundColor: COLORS.xam1,
                    textAlign: 'center'
                }}>
                    ____________________________________________________
                </Text>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    top: 10,
                    // backgroundColor: COLORS.xam2
                }}>
                    <Text style={{
                        width: '90%',
                        fontSize: 17,
                        letterSpacing: 1,
                        fontWeight: 'bold'
                    }}>Total:</Text>
                    <Text
                        style={{
                            fontSize: 17,
                            letterSpacing: 1,
                            textAlign: 'right',
                            fontWeight: 'bold'
                        }}
                    >0$</Text>
                </View>
                <TouchableOpacity 
                    style={styles.Button}
                >
                    <Text style={{
                        color: COLORS.primary, 
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>
                        Payment
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
            }}>Cart</Text>
            
            {/* //list cart  */}
            {
                !CurrentUser && (
                    <View style={{
                        flex: 1,
                        height: '100%',
                        justifyContent: 'center'
                    }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text>Please </Text>
                            <TouchableOpacity
                                onPress={()=> navigation.navigate('Login') }
                            >
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: COLORS.brand,
                                    textDecorationLine: 'underline',
                                }}>Login</Text>

                            </TouchableOpacity>
                            <Text> to see your Cart</Text>

                        </View>

                    </View>
                )
            }
            {
                !cartData &&CurrentUser && (
                    <Text style={{
                        fontSize: 28, 
                        flex: 1, 
                        textAlignVertical: 'center'
                    }}>Cart Empty</Text>
                )
            }
            {
                (cartData &&CurrentUser) && (
                    <View style={{
                        width: '100%',
                        marginLeft: 15,
                    }}>

                        <Text style={{
                            textAlign: 'left', 
                            width: '100%',
                            fontSize: 18,
                            paddingLeft: 20,
                            letterSpacing: 1,
                        }}>
                                0 Item
                        </Text>
                        <ListCartItems/>
                        <PaymentContainer/>

                    </View>

                )
            }
            
            {/* payment  */}
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    ImageCart: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.xam1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Button:{
        padding: 15,
        backgroundColor: COLORS.brand,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        marginTop: 20,
        width: '95%',
        height: 60,
    },
    updown:{
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.white,
        
    }
})
