import React, {useState} from 'react'
import { StyleSheet, Button, TouchableOpacity, Alert, ScrollView, Text, View } from 'react-native'
import { CreditCardInput, LiteCreditCardInput, CardView  } from "react-native-credit-card-input-view";
import { COLORS } from '../constants';
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import SERVER_URL from '../api'
import axios from 'axios';

const PaymentTest = () => {
    // _onChange => form => console.log(form);
    const [cardDetails, setCardDetails] = useState()
    const { confirmPayment, loading }= useConfirmPayment();
    const { createPaymentMethod, handleCardAction } = useStripe();
    const _onChange =(data) => {
        // setCardDataComplete(cardDetails.complete);
        setCardDetails(data)
      }
    const handlePayPress = async () => {
        //1.Gather the customer's billing information (e.g., email)
        if (!cardDetails?.valid) {
          Alert.alert("Please enter Complete card details and Email");
          return;
        }
        const billingDetails = {
          email: "thong@gmail.com",
        };
        //2.Fetch the intent client secret from the backend
        const url=`${SERVER_URL}/stripe/create-payment-intent`;
        axios.post(url)
        .then( async (res)=>{
            // response= res;
            const{clientSecret, error} = res["data"];
            console.log(clientSecret);
            //2. confirm the payment
            if (error) {
                console.log("Unable to process payment");
            } else {
                // const {paymentIntent, error } = await confirmPayment(clientSecret, {
                // type: "Card",
                // billingDetails: billingDetails,
                // });
                const { paymentMethod, error } = await createPaymentMethod({ type: 'Card', billingDetails });
                if (error) {
                alert(`Payment Confirmation Error ${error.message}`);
                } else if (paymentMethod) {
                alert("Payment Successful");
                console.log("Payment successful ", paymentMethod);
                }
            }

        })
        .catch((err)=> {
            console.log(err+ " :ERROR!");
        })
        //3.Confirm the payment with the card details
      };
    return (
        <View style={styles.PaymentContainer}>
            
            {/* <Button onPress={handlePayPress} title="Pay" disabled={loading} /> */}
            <TouchableOpacity 
                    style={styles.Button}
                    onPress={handlePayPress}
                    disabled={loading}
                >
                    <Text style={{
                        color: COLORS.primary, 
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>
                        Pay
                    </Text>
            </TouchableOpacity>
            <CreditCardInput requiresName style={styles.Pay} onChange={(cardDetails)=>setCardDetails(cardDetails)} />
        </View>
    )
}

export default PaymentTest

const styles = StyleSheet.create({
    PaymentContainer:{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // height: 1000,
        marginTop: 200,
        // height: 300,
    },
    Pay:{
        // zIndex: 1,
        // backgroundColor: COLORS.brand,
        // color: COLORS.black,
        // marginTop: 400
        maxHeight: 400,
    },
    Button:{
        // width: '100%',
        zIndex:1,
        height: 60,
        // padding: 15,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
        backgroundColor: COLORS.brand,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        top: 380,
        // marginBottom: 60,
    },
})
