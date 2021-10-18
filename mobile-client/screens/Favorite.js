import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Favorite = () => {
    return (
        <View style={styles.container}>
            <Text>Favorte Screen</Text>
        </View>
    )
}

export default Favorite

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //marginVertical: 'center'
        
    }
})
