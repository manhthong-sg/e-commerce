import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../constants'

const Me = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Text>Not yet login, please </Text>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('Login') }
                >
                    <Text style={{fontWeight: 'bold', color: COLORS.brand,}}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Me

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //marginVertical: 'center'
        
    }
})
