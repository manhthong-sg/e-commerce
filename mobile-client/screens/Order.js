import React, {useState, useEffect} from 'react'
import { StyleSheet, StatusBar, Text, View, TouchableOpacity, Picker, ScrollView, ToastAndroid, Image, FlatList, TextInput } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS , SIZES, icons, images } from '../constants'
import { useSelector, useDispatch } from 'react-redux';
import SERVER_URL from '../api'
import axios from 'axios';

const Order = ({navigation}) => {
    // get current user 
    const CurrentUser = useSelector(state=> state.userReducer.user);
    const Cart = useSelector(state=> state.cartReducer.cart);
    
    const [cartData, setCartData]=useState(null);

    //address usestate
    const [province, setProvince]= useState();
    const [district, setDistrict]= useState();
    const [ward, setWard]= useState();

    const [deliveryFee, setDeliveryFee]= useState();

    const setCart=(cart)=> dispatch({
        type: 'SET_CART', 
        payload: cart
    })
    const dispatch = useDispatch();
    
    //order container data
    const orderContainer={
        idUser:"",
        DeliveryInfo:{
            name: "",
            phone: "",
            address: ""
        },
        OrderItems: [],
        Message: "",
        Voucher: "",
        DeliveryFee: 0,
        ItemsNum: 0,
        Total: 0,
        PaymentMethod: "",
        PaymentDetail: "",
        Status: "0",
    }

    useEffect(() => {
        if(CurrentUser.address.province=="79"){
            setDeliveryFee(Math.ceil(Cart.total*0.03 * 100)/100)
        }else{
            setDeliveryFee(Math.ceil(Cart.total*0.05 * 100)/100)
        }
        //console.log(getCart());
        setCartData(Cart.items)
    }, [CurrentUser])

    
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
                            Order
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    useEffect(() => {
        axios.get(`https://provinces.open-api.vn/api/p/${CurrentUser.address.province}`)
                .then((data)=>{
                    //setCartData(data["data"]);
                    // setCart(data["data"])
                    setProvince(data["data"].name);
                })
        axios.get(`https://provinces.open-api.vn/api/d/${CurrentUser.address.district}`)
        .then((data)=>{
            //setCartData(data["data"]);
            // setCart(data["data"])
            setDistrict(data["data"].name);
        })
        axios.get(`https://provinces.open-api.vn/api/w/${CurrentUser.address.ward}`)
        .then((data)=>{
            //setCartData(data["data"]);
            // setCart(data["data"])
            setWard(data["data"].name);
        })
    }, [CurrentUser])
    //render your info and address
    const MyInfo = ()=> {
        
        return (
            <TouchableOpacity 
                style={styles.MyInfoContainer}
                onPress={()=> navigation.navigate("EditDeliveryInfo")}    
            >
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
                    <Text>{CurrentUser.fullName} || {CurrentUser.phone}</Text>
                    {province == "default" && (
                        <Text style={{
                        paddingBottom: 10
                        }}>Please choose your address</Text>
                    )}
                    {province !== "default" && (
                        <View>
                            <Text style={{
                                //paddingBottom: 10
                            }}>
                                {CurrentUser.address.apartmentAddress}, {ward}
                            </Text>
                            <Text style={{
                                // paddingBottom: 10
                            }}>
                                {district}, {province}
                            </Text>
                        </View>
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
    const MyItemsCart = ({orderContainer}) =>{

        //message for seller
        const MyMessage = ({orderContainer}) => {
            const [myMessage, setMyMessage]=useState("");
            useEffect(() => {
                orderContainer.Message=myMessage;
            }, [myMessage])
            return (
                <View style={{
                    height: 50,
                    flexDirection: 'row',
                    backgroundColor: COLORS.white,
                    elevation: 2,
                    alignItems: 'center',
                    marginBottom:5,
                }}>
                    <Image
                        source={icons.message}
                        style={{
                            width: 33,
                            height: 33,
                            marginLeft:15,
                        }}
                    />
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        paddingLeft: 15
                    }}>Message: </Text>
                    <TextInput
                        placeholder="Note for the store . ."
                        onChangeText={msg=> setMyMessage(msg)}
                        style={{
                            width: '100%',
                            paddingLeft: 10,
                            fontSize: 16,
                            // backgroundColor: COLORS.xam1
                        }}
                        />
                </View>
            )
        }

        //total items cart
        const TotalItems = () => {
            return (
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
                        fontSize: 17,
                        letterSpacing: 0.5,
                        fontWeight: 'bold'
                    }}>Total amount: </Text>
                    <Text style={{fontSize: 17}}>{Cart.total}$</Text>
                </View>
            )
        }
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.lightGray,
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
                    elevation: 2
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16
                        }}>Your Items</Text>
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
                        //height: 210,
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
                <TotalItems/>
                <MyMessage  orderContainer={orderContainer}/>
            </View>
        )
    }

    //voucher container
    const MyVoucher = ({orderContainer}) => {
        const [voucher, setVoucher] = useState("");
        useEffect(() => {
            orderContainer.Voucher=voucher
        }, [voucher])
        return (
            <View style={{
                height: 50,
                flexDirection: 'row',
                backgroundColor: COLORS.white,
                elevation: 2,
                paddingLeft: 15,
                alignItems: 'center'
            }}>
                <Image
                    source={icons.voucher}
                    size={20}
                    style={{
                        width: 30,
                        height: 30,
                    }}
                />
                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    paddingLeft: 15
                }}>Voucher: </Text>
                <TextInput
                    value={voucher}
                    placeholder="Type your voucher here . ."
                    autoCapitalize="characters"
                    onChangeText= {input => setVoucher(input)}
                    style={{
                        width: '100%',
                        paddingLeft: 10,
                        fontSize: 16,
                        
                    }}
                />
                    
            </View>
        )
    }
    
    //payment method container
    const MyPaymentMethod = ({orderContainer}) => {
        const [selectedPayment, setSelectedPayment] = useState("default");
        useEffect(() => {
            orderContainer.PaymentMethod=selectedPayment;
        }, [selectedPayment])
        return (
            <View style={{
                height: 60,
                flexDirection: 'row',
                backgroundColor: COLORS.white,
                elevation: 2,
                paddingLeft: 15,
                alignItems: 'center',
                marginTop: 5
            }}>
                <Image
                    source={icons.payment}
                    size={20}
                    style={{
                        width: 28,
                        height: 28,
                    }}
                />
                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    paddingLeft: 15
                }}>Payment method: </Text>
                <Picker
                    selectedValue={selectedPayment}
                    style={{ 
                        //height: 100,
                        width: 200,
                        fontSize: 18,
                        color: COLORS.brand,
                        fontWeight: 'bold'
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedPayment(itemValue),
                        ToastAndroid.showWithGravity(
                            `${itemValue} is choose`,
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM
                          );
                    }}
                >
                    <Picker.Item label="Choose your payment method" value="default" />
                    <Picker.Item label="Cash on Delivery" value="Cash" />
                    <Picker.Item label="Paypal" value="paypal" />
                    <Picker.Item label="Credit Card" value="creditCard" />
                </Picker>
            </View>
        )
    }


    //show total payment
    const TotalPayment = () =>{
        return (
            <View style={{
                elevation: 1,
                marginTop: 20
                // backgroundColor: COLORS.white
            }}>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft:15,
                    // paddingRight: 15,
                    marginTop: 10,
                    elevation: 1,
                    // backgroundColor: COLORS.white
                }}>
                    <Text style={{
                        width: '70%',
                        fontSize: 16,
                        letterSpacing: 1,
                    }}>Discount:</Text>
                    <Text
                        style={{
                            width: '25%',
                            fontSize: 16,
                            letterSpacing: 1,
                            textAlign: 'right',
                            // backgroundColor: COLORS.xam1,
                        }}
                    >0$</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft:15,
                    // paddingRight: 15,
                    marginTop: 10,
                    elevation: 1,
                    // backgroundColor: COLORS.white
                }}>
                    <Text style={{
                        width: '70%',
                        fontSize: 16,
                        letterSpacing: 1,
                        // fontWeight: 'bold'
                    }}>Delivery fee:</Text>
                    <Text
                        style={{
                            width: '25%',
                            fontSize: 16,
                            letterSpacing: 1,
                            textAlign: 'right',
                            // backgroundColor: COLORS.xam1,
                            // fontWeight: 'bold'
                        }}
                    >
                        {
                            deliveryFee
                        }$
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft:15,
                    // paddingRight: 15,
                    marginTop: 10,
                    elevation: 1,
                    // backgroundColor: COLORS.white
                }}>
                    <Text style={{
                        width: '70%',
                        fontSize: 17,
                        letterSpacing: 1,
                        fontWeight: 'bold'
                    }}>TOTAL:</Text>
                    <Text
                        style={{
                            width: '25%',
                            fontSize: 17,
                            letterSpacing: 1,
                            textAlign: 'right',
                            fontWeight: 'bold',
                            // backgroundColor: COLORS.xam1,
                        }}
                    >{Cart.total+deliveryFee}$</Text>
                </View>
            </View>
        )
    }

    //button payment
    const ButtonPayment = ({orderContainer,apartmentAddress, district, ward, province, deliveryFee}) =>{
        const handleResetCart=()=>{
            axios.get(`${SERVER_URL}/carts/${CurrentUser._id}`)
                    .then((data)=>{
                        //setCartData(data["data"]);
                        setCart(data["data"])
                        // console.log(data["data"]);
                    })
        }
        const handleCreateOrder=()=>{
            const url=`${SERVER_URL}/orders`;
            axios.post(url, orderContainer)
            .then(()=>{
                let url=`${SERVER_URL}/carts/clear/${CurrentUser._id}`;
                axios.post(url)
            })
            .then(()=>{
                handleResetCart();
                ToastAndroid.showWithGravity(
                    "Order Successfully",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                  );
            })
            .catch((err)=> {
                console.log(err+ " :ERROR!");
            })
        }
        const setInfoOrder=()=>{
            orderContainer.idUser=CurrentUser._id;
            orderContainer.DeliveryInfo.name=CurrentUser.fullName;
            orderContainer.DeliveryInfo.phone=CurrentUser.phone;
            orderContainer.DeliveryInfo.address=`${apartmentAddress}, ${ward}, ${district}, ${province}`;
            orderContainer.OrderItems=Cart.items;
            orderContainer.DeliveryFee=deliveryFee;
            orderContainer.ItemsNum=Cart.itemNum;
            orderContainer.Total=Cart.total+deliveryFee;
        }
        const handleSubmitOrder =()=>{
            if(orderContainer.PaymentMethod == 'Cash'){
                setInfoOrder();
                handleCreateOrder();
                navigation.navigate('CompleteOrder');
                // console.log(orderContainer);
                
            }else if (orderContainer.PaymentMethod == 'default'){
                ToastAndroid.showWithGravity(
                    `Please choose your payment method!`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                  );
            }
            else{
                ToastAndroid.showWithGravity(
                    `Waiting for payment online UI . . .`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                  );
                setInfoOrder();
                navigation.navigate("Payment", orderContainer)
            }
        }
        return(
            <TouchableOpacity 
                    style={styles.Button}
                    onPress={handleSubmitOrder}
                >
                    <Text style={{
                        color: COLORS.primary, 
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>
                        Payment
                    </Text>
            </TouchableOpacity>
        )
    }

    //screen return
    return (
        <View style={{
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }}>
            <Header/>
            <ScrollView style={styles.Ordercontainer}>
                <MyInfo/>
                <MyItemsCart 
                    orderContainer={orderContainer}
                />
                <MyVoucher 
                    orderContainer={orderContainer}
                />
                <MyPaymentMethod 
                    orderContainer={orderContainer}
                />
                <TotalPayment/>
                <ButtonPayment
                    orderContainer={orderContainer}
                    apartmentAddress={CurrentUser.address.apartmentAddress} 
                    ward={ward} 
                    district={district}
                    province={province}
                    deliveryFee={deliveryFee}
                />

            </ScrollView>

        </View>
    )
}
export default Order

const styles = StyleSheet.create({
    Ordercontainer:{
        flex: 1,
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
        paddingBottom: 5,
    },
    Info:{
        marginLeft: 15,
        width: '80%',
        // backgroundColor: COLORS.xam2
    },
    ImageCart: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Button:{
        width: '95%',
        height: 60,
        // padding: 15,
        marginLeft: 10,
        marginTop: 25,
        backgroundColor: COLORS.brand,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        marginBottom: 60,
    },
})
