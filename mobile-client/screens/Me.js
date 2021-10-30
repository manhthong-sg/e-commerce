import { NavigationContainer } from '@react-navigation/native'
import React , {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../constants'
import { useSelector } from 'react-redux'

const Me = ({route, navigation}) => {
    const CurrentUser = useSelector(state=> state.userReducer.user);
    //const [userId, setUserId] = useState(CurrentUser._id);
    console.log(CurrentUser);
    return (
        <View style={styles.container}>
            {
                !CurrentUser && (
                    <View style={{flexDirection: 'row'}}>
                        <Text>Not yet login, please </Text>
                        <TouchableOpacity
                            onPress={()=> navigation.navigate('Login') }
                        >
                            <Text style={{fontWeight: 'bold', color: COLORS.brand,}}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            {
                CurrentUser && (
                    <View>
                        <Text style={{
                            fontSize: 35,
                            fontWeight: 'bold'
                        }}>
                            Xin chào {CurrentUser.fullName}
                        </Text>
                        <TouchableOpacity 
                            style={styles.Button}
                        >
                            <Text style={{
                                color: COLORS.primary, 
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>
                                Sign out
                            </Text>
                        </TouchableOpacity>
                    </View>

                )
            }
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
        
    },
    Button:{
        padding: 15,
        backgroundColor: COLORS.do2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        //marginTop: 10,
        height: 60,
    },
})
