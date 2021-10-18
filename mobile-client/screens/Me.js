import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Me = () => {
    return (
        <View style={styles.container}>
            <Text>Me Screen</Text>
        </View>
    )
}

export default Me

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //marginVertical: 'center'
        
    }
})
