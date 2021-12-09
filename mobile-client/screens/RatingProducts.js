import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, FlatList, Image, Button,  } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS , SIZES, icons, images } from '../constants'
import SERVER_URL from '../api'
import axios from 'axios';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useSelector, useDispatch } from 'react-redux';

const RatingProducts = ({navigation, route}) => {
    // get current user 
    const CurrentUser = useSelector(state=> state.userReducer.user);

    const {
        _id,
        ItemsNum,
        DeliveryFee,
        DeliveryInfo,
        Message,
        OrderItems,
        PaymentMethod,
        PaymentDetail,
        Status,
        Total,
        Voucher,
        createdAt,
        CancelDate
    }=route.params;

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
                        
                        navigation.navigate("MyOrders");
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
                            marginRight: 10,
                        }}
                        >
                        <Text style={{
                            fontWeight: 'bold', 
                            fontSize: 25,
                            color: COLORS.xam4
                        }}>
                            Rate Product
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={()=> navigation.navigate("MyOrders")}
                >
                    <Text style={{
                        fontSize: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: COLORS.orange,
                        fontWeight: 'bold',
                        color: COLORS.brand,
                        textAlign: 'center',
                        marginRight: 10,
                    }}>Done</Text>
                </TouchableOpacity>
            </View>
        )
    }

    //show all cart that you wanna buy
    const MyItemsOrder = () =>{

        const[comment, setComment] =useState("");

        const renderItem = ({ item }) => {
            let star=3;
            // handle rating and comment after done an order 
            const handleRating=()=>{
                let url=`${SERVER_URL}/products/rating`;
                console.log({
                    idProduct: item["idProduct"]._id,
                    user:{
                        image: CurrentUser.profilePicture,
                        name: CurrentUser.fullName,
                    },
                    star: star,
                    comment: comment,
                });
                axios.post(url, {
                    idProduct: item["idProduct"]._id,
                    idOrder: item._id,
                    user:{
                        image: CurrentUser.profilePicture,
                        name: CurrentUser.fullName,
                    },
                    star: star,
                    comment: comment,

                })
            }
            return (
                <View
                    style={{
                        backgroundColor: COLORS.lightGray,
                        alignItems: "center",
                        justifyContent: 'center',
                        elevation: 0.3 ,
                        paddingTop: 10,
                        marginBottom: 5,
                        borderRadius: 5,
                        elevation:0.8,
                        paddingBottom: 20,
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
                
                {/* rating  */}
                <AirbnbRating 
                    showRating
                    ratingCount
                    onFinishRating={sao=> star=sao}
                />

                <View style={{
                    flexDirection: 'row',
                }}>
                    <TextInput style={{
                        height: 50,
                        backgroundColor: COLORS.white,
                        borderWidth: 0.5,
                        borderColor: COLORS.black,
                        width: '75%',
                        paddingLeft: 20,
                        marginTop: 20,
                    }}
                        placeholder="Please give us your experience for this product."
                        onChangeText={cmt=> setComment(cmt)}
                        value={comment}
                    />
                    <TouchableOpacity 
                        style={{
                            height: 50,
                            width: 60,
                            backgroundColor: COLORS.brand,
                            marginLeft: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                        }}
                        onPress={handleRating}
                    >
                        <Text style={{color: COLORS.primary}}>Send</Text>
                    </TouchableOpacity>
                </View>

                </View>    
            )
        }
        return (
            <View style={{width: '100%', marginTop: 5}}>
                <View style={{
                    backgroundColor: COLORS.white,
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                    paddingLeft: 20,
                    elevation: 2
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16
                        }}>Your Order</Text>
                    <View style={{
                        backgroundColor: COLORS.orange,
                        borderRadius: 3,
                        marginLeft: 5,
                        paddingLeft:5,
                        paddingRight: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{color: COLORS.white}}>{ItemsNum} items</Text>
                    </View>
                </View>
                <FlatList
                    data={OrderItems}
                    style={{
                        //height: 210,
                        backgroundColor: COLORS.white,
                        // maxHeight: 210,
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
        <View style={styles.container}>
            <Header/>
            <MyItemsOrder/>

        </View>
    )
}

export default RatingProducts

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    ImageCart: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
