import React, {useState, useEffect} from 'react'
import { StyleSheet,TextInput, Button, Alert, Text, ToastAndroid, StatusBar, View, TouchableOpacity } from 'react-native'
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { COLORS , SIZES, icons, images } from '../constants'
import SERVER_URL from '../api'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { CardView } from "react-native-credit-card-input-view";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Payment = ({navigation, route}) => {
    const CurrentUser = useSelector(state=> state.userReducer.user);
    // const { confirmPayment } = useStripe();
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState()
    const { confirmPayment, loading }= useConfirmPayment();

    const orderContainer=route.params;
    // console.log(orderContainer);
    const setCart=(cart)=> dispatch({
        type: 'SET_CART', 
        payload: cart
    })
    const dispatch = useDispatch();

    const handleCreateOrder=()=>{
        const url=`${SERVER_URL}/orders`;
        axios.post(url, orderContainer)
        .then(()=>{
            let url=`${SERVER_URL}/carts/clear/${CurrentUser._id}`;
            axios.post(url)
        })
        .then(()=>{
            handleResetCart();
        })
        .catch((err)=> {
            console.log(err+ " :ERROR!");
        })
    }
    const handleResetCart=()=>{
        axios.get(`${SERVER_URL}/carts/${CurrentUser._id}`)
                .then((data)=>{
                    //setCartData(data["data"]);
                    setCart(data["data"])
                    // console.log(data["data"]);
                })
    }
    const handlePayPress = async () => {
        //1.Gather the customer's billing information (e.g., email)
        if (!cardDetails?.complete || !email) {
          Alert.alert("Please enter Complete card details and Email");
          return;
        }
        const billingDetails = {
            email: email,
        };
        //2.Fetch the intent client secret from the backend
        const url=`${SERVER_URL}/stripe/create-payment-intent`;
        axios.post(url, {total: orderContainer.Total, DeliveryInfo: orderContainer.DeliveryInfo})
        .then( async (res)=>{
            // response= res;
            const{clientSecret, error} = res["data"];
            // console.log(clientSecret);
            //2. confirm the payment
            if (error) {
                console.log("Unable to process payment");
            } else {
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                type: "Card",
                billingDetails: billingDetails,
                });
                if (error) {
                alert(`Payment Confirmation Error ${error.message}`);
                } else if (paymentIntent) {
                    orderContainer.PaymentDetail=[paymentIntent]
                    // console.log(orderContainer);
                    handleCreateOrder();
                    navigation.navigate("CompleteOrder")
                    // console.log("Payment successful ", paymentIntent);
                }
            }

        })
        .catch((err)=> {
            console.log(err+ " :ERROR!");
        })
        //3.Confirm the payment with the card details
      };
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
                            Credit Card Payment
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
            <Header/>
            <View style={styles.PaymentContainer}>
                {/* <CardView
                    number={number}
                    cvc="121"
                    expiry={expiryMonth+"/"+expiryYear}
                    brand="visa"
                    name="Arun Ahuja"
                    display={true}
                    flipDirection="h"
                    onPressfunc={() => alert('clicked')}
                    onLongPressfunc={() => alert('Long clicked')} /> */}
                <TextInput
                    autoCapitalize="none"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    onChangeText={value => setEmail(value)}
                    style={styles.input}
                />
                <CardField
                    postalCodeEnabled={true}
                    placeholder={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                    }}
                    onCardChange={(cardDetails) => {
                        setCardDetails(cardDetails)
                        console.log('cardDetails', cardDetails);
                    }}
                    onFocus={(focusedField) => {
                        console.log('focusField', focusedField);
                    }}
                />
                <Button onPress={handlePayPress} title="Pay" disabled={loading} />
                {/* <TouchableOpacity 
                        style={styles.Button}
                        onPress={handlePayPress}
                    >
                        <Text style={{
                            color: COLORS.primary, 
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>
                            Payment
                        </Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    PaymentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Button:{
        width: '95%',
        height: 60,
        // padding: 15,
        // marginLeft: 10,
        marginTop: 25,
        backgroundColor: COLORS.brand,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        marginBottom: 60,
    },
    input: {
        backgroundColor: COLORS.white,
        width: '100%',
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
    },
    card: {
        backgroundColor: "#efefefef",
      },
    cardContainer: {
        height: 50,
        marginVertical: 30,
    },
})
