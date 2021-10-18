import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Cart = () => {
    return (
        <View style={styles.container}>
            <Text>Cart Screen</Text>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //marginVertical: 'center'
        
    }
})
