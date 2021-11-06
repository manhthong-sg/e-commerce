import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const BottomTabs = () => {
    return (
        <View style={styles.container}>
            <Icon icon='home' text='Home' />
            <Icon icon='heart' text='Favorite' />
            <Icon icon='shopping-cart' text='Cart' />
            <Icon icon='user' text='Account' />
            
        </View>
    )
}

export default BottomTabs

const Icon=(props)=>{
    return(
        <View>
            <TouchableOpacity>
                <FontAwesome5
                    name={props.icon}
                    size={25}
                    style={styles.Icon}
                />
                <Text style={{color: 'black'}}>
                    {props.text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        //height: 20,
        flexDirection: 'row',
        margin: 10,
        marginHorizontal: 30,
        justifyContent: 'space-around'
    },
    Icon: {
        marginBottom: 3,
        alignSelf: "center"
    }
    
})
