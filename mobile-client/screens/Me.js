import { NavigationContainer } from '@react-navigation/native'
import React , {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../constants'
import { useSelector, useDispatch } from 'react-redux'

const Me = ({route, navigation}) => {
    const CurrentUser = useSelector(state=> state.userReducer.user);
    //const [userId, setUserId] = useState(CurrentUser._id);
    //console.log(CurrentUser);
    // const [fullName, setFullName]=useState();
    // const getUser = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('USER')
    //       if(value !== null) {
    //         // value previously stored
    //         console.log("xin chao: ",value);
    //       }
    //     } catch(e) {
    //       // error reading value
    //     }
    //   }
    useEffect(() => {
        //getUser();
    }, )

    const dispatch = useDispatch();
    const setLogout=()=> dispatch({
        type: 'USER_LOGOUT', 
        //payload: cart
    })
    const handelLogout=()=>{
        Alert.alert(
            "Are you sure?",
            "Are you sure you want to sign out?",
            [
              {
                text: "CANCEL",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "SIGN OUT", onPress: setLogout }
            ]
          );
        

    }
    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
            }}>Me</Text>
            {
                !CurrentUser && (
                    <View style={{flexDirection: 'row'}}>
                        <Text>Not yet login, please </Text>
                        <TouchableOpacity
                            onPress={()=> navigation.navigate('Login') }
                        >
                            <Text style={{
                                fontWeight: 'bold',
                                color: COLORS.brand,
                                textDecorationLine: 'underline',
                            }}>Login</Text>
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
                            onPress={handelLogout}
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
