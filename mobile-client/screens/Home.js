import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import HomeHeader from '../components/Home/HomeHeader'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import { COLORS } from '../constants'
const Home = () => {
    return (
        // <KeyboardAvoidingWrapper>
            <View style={styles.container}>
                <HomeHeader/>
                
            </View>

        // {/* </KeyboardAvoidingWrapper> */}
    )
}

export default Home



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    }
})
