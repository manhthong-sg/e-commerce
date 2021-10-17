import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Home/Header'
import HomeHeader from '../components/Home/HomeHeader'
import SearchBar from '../components/Home/HomeHeader'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'

const Home = () => {
    return (
        // <KeyboardAvoidingWrapper>
            <View style={styles.containter}>
                <HomeHeader/>
            </View>

        // {/* </KeyboardAvoidingWrapper> */}
    )
}

export default Home



const styles = StyleSheet.create({
    container: {

    }
})
