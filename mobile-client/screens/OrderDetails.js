import React, {useState, useEffect} from 'react'
import { StyleSheet, StatusBar, Text, View, TouchableOpacity, Alert, ScrollView, ToastAndroid, Image, FlatList, TextInput } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS , SIZES, icons, images } from '../constants'
import { useSelector, useDispatch } from 'react-redux';
import SERVER_URL from '../api'
import LottieView from "lottie-react-native";
import axios from 'axios';

const OrderDetails = ({navigation, route}) => {
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
    console.log(PaymentDetail);
    var date = new Date(createdAt);

    // console.log("Date: "+date.getDate()+
    //       "/"+(date.getMonth()+1)+
    //       "/"+date.getFullYear()+
    //       " "+date.getHours()+
    //       ":"+date.getMinutes()+
    //       ":"+date.getSeconds());

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
                            Order Details
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    //when status =0 (waiting confirm)
    const OnCancelStatus=()=>{
        return (
            <View style={{
                height: 120,
                backgroundColor: COLORS.red,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 20,
            }}>
                <View>
                    <Text style={{
                        fontWeight: "bold",
                        color: COLORS.primary,
                        width: 230,
                    }}>
                        Order cancelled
                    </Text>
                    <Text style={{
                        width: 230,
                        color: COLORS.primary,
                        marginTop: 15,
                        fontSize: 13,
                    }}>
                        You have cancelled this order. We are sorry about that. 
                    </Text>
                </View>
                <LottieView
                source={require("../components/AnimationIcons/cancelStatus.json")}
                autoPlay
                loop={false}
                resizeMode='contain'
                style={{ 
                    width: 80, 
                    paddingLeft: 20,
                 }}
            />
            </View>
        )
    }
    //when status order = 4 (cancel)
    const OnWaitingConfirm=()=>{
        return (
            <View style={{
                height: 120,
                backgroundColor: COLORS.green,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 20,
            }}>
                <View>
                    <Text style={{
                        fontWeight: "bold",
                        color: COLORS.primary,
                        width: 230,
                    }}>
                        Your order will be confirmed as soon as possible
                    </Text>
                    <Text style={{
                        width: 230,
                        color: COLORS.primary,
                        marginTop: 15,
                        fontSize: 13,
                    }}>
                        We will endeavor to confirm your order within 3 days
                    </Text>
                </View>
                <LottieView
                source={require("../components/AnimationIcons/waitConfirmStatus.json")}
                autoPlay
                loop={true}
                resizeMode='contain'
                style={{ 
                    width: 150, 
                    
                 }}
            />
            </View>
        )
    }
    //render your info and address
    const MyInfo = ()=> {
        
        return (
            <View 
                style={styles.MyInfoContainer}
            >
                <FontAwesome5 
                    name="map-marker-alt"
                    size={18}
                    color={COLORS.orange}
                    style={{
                        marginLeft: 20,
                        paddingTop: 5,
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
                    <Text>{DeliveryInfo.name} || {DeliveryInfo.phone}</Text>
                    <View style={{width: 250}}>
                        <Text style={{
                            //paddingBottom: 10
                        }}>
                            {DeliveryInfo.address}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    //show all cart that you wanna buy
    const MyItemsOrder = () =>{

        //message for seller
        const MyMessage = () => {
            return (
                <View style={{
                    flex: 1,
                    height: 50,
                    flexDirection: 'row',
                    backgroundColor: COLORS.white,
                    elevation: 2,
                    alignItems: 'center',
                    marginBottom:5,
                    paddingLeft: 15,
                }}>
                    <Image
                        source={icons.message}
                        style={{
                            width: 28,
                            height: 28,
                            // marginLeft:15,
                        }}
                    />
                    <Text style={{
                        width: '30%',
                        fontSize: 15,
                        fontWeight: 'bold',
                        paddingLeft: 15
                    }}>Message: </Text>
                    <Text style={{
                        textAlign: 'right',
                        width: '60%',
                        color: COLORS.brand,
                    }}>{Message}</Text>
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
                        maxHeight: 210,
                    }}
                    vertical
                    numColumns={1}
                    //showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item._id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{}}
                />
                <MyMessage/>
            </View>
        )
    }

    //voucher container
    const MyVoucher = () => {
        return (
            <View style={{
                flex: 1,
                height: 50,
                flexDirection: 'row',
                backgroundColor: COLORS.white,
                elevation: 2,
                paddingLeft: 15,
                alignItems: 'center'
            }}>
                <Image
                    source={icons.voucher}
                    size={17}
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />
                <Text style={{
                    width: '30%',
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 15
                }}>Voucher: </Text>
                <Text style={{
                    width: '60%',
                    textAlign: 'right',
                    color: COLORS.brand
                }}>{Voucher ? Voucher : "No voucher was used"}</Text>
                    
            </View>
        )
    }
    
    //payment method container
    const MyPaymentMethod = () => {
        return (
            <View style={{
                flex: 1,
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
                    size={19}
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />
                <Text style={{
                    width: '40%',
                    fontSize: 14,
                    fontWeight: 'bold',
                    paddingLeft: 15
                }}>Payment method: </Text>
                <Text style={{
                    width: '50%',
                    paddingLeft: 20,
                    color: COLORS.brand,
                    textAlign: 'right',
                }}>{PaymentMethod}</Text>
            </View>
        )
    }


    //show total payment
    const OrderTotal = () =>{
        const [hide, setHide]=useState(false);
        const HiddenOrderInfo=()=>{
            return(
                <View>
                    {/* total amount */}
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingRight: 20,
                    }}>
                        
                        <Text style={{
                            width: '30%',
                            fontSize: 14,
                            letterSpacing: 0.5,
                            marginLeft: 10,
                        }}>Total amount</Text>
                        <Text style={{
                            width: '70%',
                            textAlign: 'right',
                        }}>
                        {
                            Total-DeliveryFee
                        }
                        </Text>
                    </View>
                    {/* discount voucher  */}
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingRight: 20,
                    }}>
                        
                        <Text style={{
                            width: '30%',
                            fontSize: 14,
                            letterSpacing: 0.5,
                            marginLeft: 10,
                        }}>Discount</Text>
                        <Text style={{
                            width: '70%',
                            textAlign: 'right',
                        }}>
                        0
                        </Text>
                    </View>
                    {/* delivery fee  */}
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingRight: 20,
                    }}>
                        
                        <Text style={{
                            width: '30%',
                            fontSize: 14,
                            letterSpacing: 0.5,
                            marginLeft: 10,
                        }}>Delivery fee</Text>
                        <Text style={{
                            width: '70%',
                            textAlign: 'right',
                        }}>
                        {
                            DeliveryFee
                        }
                        </Text>
                    </View>    
                </View>
                
            )
        }
        return (
            <View style={{marginTop: 10,}}>
                {/* //order total  */}
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 20,
                }}>
                    <Text style={{
                        // width: '25%',
                        fontSize: 15,
                        letterSpacing: 0.5,
                        fontWeight: 'bold',
                        marginLeft: 10,
                    }}>Order Total </Text>
                    <Text style={{
                        width: '25%',
                    }}>({ItemsNum} items): </Text>
                    <TouchableOpacity
                        style={{
                            width: '53%',
                            marginLeft: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}
                        onPress={()=> setHide(!hide)}
                        >
                        <Text style={{fontSize: 16}}>${Total}  </Text>
                        <FontAwesome5
                            name="angle-down"
                            size={18}
                            color={COLORS.xam2}
                            />
                    </TouchableOpacity>
                </View>
                {
                    hide && (
                        <HiddenOrderInfo/>
                    )
                }
            </View>
        )
    }

    //button payment
    const ContactUs = () =>{
        return(
            <TouchableOpacity 
                style={styles.Button}
            >
                <LottieView
                    source={require("../components/AnimationIcons/messageOrderDetails.json")}
                    autoPlay
                    loop={true}
                    resizeMode='contain'
                    style={{ height: 60 }}
                />
                <Text style={{
                    color: COLORS.xam3, 
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>
                    Contact us
                </Text>
            </TouchableOpacity>
        )
    }
    //button payment
    const CancelOrder = () =>{
        const handleConfirmYes =()=>{
            if(PaymentDetail[0] == ""){
                const url=`${SERVER_URL}/orders/cancel/${_id}`;
                axios.post(url)
                .then(()=>{
                    ToastAndroid.showWithGravity(
                        "Cancel order successfully!",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM
                      );
                    navigation.navigate("MyOrders")
                })
                .catch((err)=> {
                    console.log(err+ " :ERROR!");
                })
            }else{

                const url=`${SERVER_URL}/stripe/v1/refunds`;
                axios.post(url, {paymentIntent: PaymentDetail[0].paymentIntent.id})
                .then((refundsInfo)=>{
                    const url=`${SERVER_URL}/orders/cancel/${_id}`;
                    axios.post(url, refundsInfo)
                    .then(()=>{
                        ToastAndroid.showWithGravity(
                            "Cancel order successfully!",
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM
                        );
                        navigation.navigate("MyOrders")
                    })
                    .catch((err)=> {
                        console.log(err+ " :ERROR!");
                    })
                })
                .catch((err)=> {
                    console.log(err+ " :ERROR!");
                })
            }
        }
        const handleCancelOrder =()=>{
            Alert.alert(
                "Are you sure?",
                "You want to cancel your order?",
                [
                  {
                    text: "NO",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "YES", onPress: handleConfirmYes }
                ]
              );
        }
        return(
            <TouchableOpacity 
                style={styles.Button}
                onPress={handleCancelOrder}
            >
                <Text style={{
                    color: COLORS.xam3, 
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>
                    Cancel Order
                </Text>
            </TouchableOpacity>
        )
    }
    const OrderIdContainer=()=>{
        return(
            <View style={{
                // height: 100,
                backgroundColor: COLORS.white,
                justifyContent: 'space-around',
                elevation: 1,
                marginTop: 10,
                paddingVertical: 10
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 20,
                }}>
                    
                    <Text style={{
                        width: '30%',
                        fontSize: 15,
                        letterSpacing: 0.5,
                        fontWeight: 'bold',
                        marginLeft: 10,
                    }}>Order ID </Text>
                    <Text style={{
                        width: '70%',
                        textAlign: 'right',
                        fontWeight: 'bold',
                    }}>{_id}</Text>
                </View>
                {
                    (PaymentDetail[0] !== "") && (

                        <View style={{
                            flex: 1,
                            // height: 40,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingRight: 20,
                        }}>
                            
                            <Text style={{
                                width: '30%',
                                fontSize: 14,
                                letterSpacing: 0.5,
                                marginLeft: 10,
                            }}>Payment time</Text>
                            <Text style={{
                                width: '70%',
                                textAlign: 'right',
                            }}>
                            {
                                date.getDate()+
                                    "-"+(date.getMonth()+1)+
                                    "-"+date.getFullYear()+
                                    " "+date.getHours()+
                                    ":"+(date.getMinutes()-1)+""
                            }
                            </Text>
                        </View>
                    )
                }
                <View style={{
                    flex: 1,
                    // height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 20,
                }}>
                    
                    <Text style={{
                        width: '30%',
                        fontSize: 14,
                        letterSpacing: 0.5,
                        marginLeft: 10,
                    }}>Order time</Text>
                    <Text style={{
                        width: '70%',
                        textAlign: 'right',
                    }}>
                    {
                        date.getDate()+
                              "-"+(date.getMonth()+1)+
                              "-"+date.getFullYear()+
                              " "+date.getHours()+
                              ":"+date.getMinutes()
                    }
                    </Text>
                </View>
                {
                    Status=="4" && (
                        <View style={{
                            flex: 1,
                            // height: 40,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingRight: 20,
                        }}>
                            
                            <Text style={{
                                width: '30%',
                                fontSize: 14,
                                letterSpacing: 0.5,
                                marginLeft: 10,
                            }}>Cancel time</Text>
                            <Text style={{
                                width: '70%',
                                textAlign: 'right',
                            }}>
                            {
                                CancelDate
                            }
                            </Text>
                        </View>

                    )
                }
            </View>
        )
    }

    //return-refund received order container
    const RefundReceivedContainer =()=>{
        return(
            <View style={{
                flexDirection: 'row',
            }}>
                <TouchableOpacity 
                        style={styles.ButtonReturn}
                    >
                        <Text style={{
                            color: COLORS.xam3, 
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>
                            Return/Refund
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                        style={styles.ButtonReceived}
                    >
                        <Text style={{
                            color: COLORS.primary, 
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>
                            Order Received
                        </Text>
                </TouchableOpacity>
            </View>
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
                {
                    Status == "0" && (
                        <OnWaitingConfirm/>
                    )
                }
                {
                    Status == "4" && (
                        <OnCancelStatus/>
                    )
                }
                <MyInfo/>
                <MyItemsOrder/>
                <MyVoucher/>
                <MyPaymentMethod/>
                <OrderTotal/>
                <OrderIdContainer/>
                {
                   (Status == "0" || Status == "1" ) && (
                       <CancelOrder/>
                   )
                }
                <ContactUs/>

            </ScrollView>
            {
                (Status == "2" || Status == "3" ) && (
                    <RefundReceivedContainer/>
                )
            }
        </View>
    )
}
export default OrderDetails

const styles = StyleSheet.create({
    Ordercontainer:{
        flex: 1,
        marginBottom: 60,
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
        paddingBottom: 8,
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
        height: 50,
        marginLeft: 10,
        marginTop: 10,
        borderColor: COLORS.xam3,
        borderWidth: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 20,
        // marginBottom: 30,
    },
    ButtonReturn:{
        width: '45%',
        height: 50,
        // padding: 15,
        marginLeft: 10,
        marginTop: 10,
        backgroundColor: COLORS.xam1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 5,
        marginVertical: 5,
        marginBottom: 60,
    },
    ButtonReceived:{
        width: '45%',
        height: 50,
        // padding: 15,
        marginLeft: 20,
        marginTop: 10,
        backgroundColor: COLORS.brand,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 5,
        marginVertical: 5,
        marginBottom: 60,
    },
})
