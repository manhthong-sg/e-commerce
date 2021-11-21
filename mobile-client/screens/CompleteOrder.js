import React from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import LottieView from "lottie-react-native";
import { COLORS } from '../constants';

const CompleteOrder = ({navigation}) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }}>
            <LottieView
                source={require("../components/AnimationIcons/completeOrder.json")}
                autoPlay
                loop={false}
                resizeMode='contain'
                style={{ height: 100 }}
            />
            <Text style={styles.TextCuscom}>Thanks for your order</Text>
            <Text style={styles.TextCuscom}>We will confirm your order as soon as possible!</Text>
            <TouchableOpacity 
                    style={styles.Button}
                    onPress={()=>navigation.navigate("Home")}
                >
                    <Text style={{
                        color: COLORS.brand, 
                        fontSize: 15,
                        fontWeight: 'bold'
                    }}>
                        Continute Shopping
                    </Text>
            </TouchableOpacity>
        </View>
    )
}

export default CompleteOrder

const styles = StyleSheet.create({
    TextCuscom: {
        fontWeight: 'bold', 
        textAlign: 'center',
        color: COLORS.xam3
    },
    Button:{
        width: '50%',
        height: 50,
        // backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.brand,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginVertical: 5,
        marginTop: 50,
    },
})
