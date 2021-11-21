import { NavigationContainer } from '@react-navigation/native'
import React , {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Alert, StatusBar, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, icons } from '../constants'
import { useSelector, useDispatch } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Me = ({route, navigation}) => {
    const CurrentUser = useSelector(state=> state.userReducer.user);

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
            
            {
                !CurrentUser && (
                    <View style={{
                        flex: 1, 
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            width: '100%',
                            alignSelf: 'center',
                            justifyContent:'center',
                            alignItems:'center',
                            // textAlign: 'center',
                        }}>Me</Text>
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

                    </View>
                )
            }
            {
                CurrentUser && (
                    <View style={styles.MeContainer}>
                        <Image
                            source={icons.defaultAvatar_male}
                            resizeMode="contain"
                            style={{
                                width: 100,
                                height: 100,
                                alignSelf: 'center'
                            }}
                        />
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>
                           {CurrentUser.fullName}
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.xam2,
                            alignSelf: 'center',
                        }}>
                           Phone number: {CurrentUser.phone}
                        </Text>
                        <Text 
                            style={{
                                marginBottom: 10,
                                color: COLORS.xam1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            _________________________________________________
                        </Text>

                        {/* //my profile folder */}
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 40,
                        
                            // backgroundColor: COLORS.orange,
                        }}>
                            <FontAwesome5
                                solid
                                name="user-circle"
                                size={24}
                                resizeMode="contain"
                                color= {COLORS.xam3}
                            />
                            <Text style={{
                                alignSelf: 'auto',
                                fontSize: 16,
                                color: COLORS.xam3,
                                fontWeight: 'bold',
                                left: -60,
                                // backgroundColor: COLORS.orange
                            }}>Edit my profile</Text>
                            <FontAwesome5
                                solid
                                name="angle-right"
                                size={24}
                                resizeMode="contain"
                                color= {COLORS.xam3}
                            />
                        </TouchableOpacity>

                        {/* //my orders folder */}
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 40,
                            // backgroundColor: COLORS.orange,
                        }}
                            onPress={()=>navigation.navigate("MyOrders")}
                        >
                            <FontAwesome5
                                solid
                                name="receipt"
                                size={24}
                                resizeMode="contain"
                                color= {COLORS.xam3}
                                style={{
                                    marginLeft: 2,
                                }}
                            />
                            <Text style={{
                                alignItems: 'flex-start',
                                fontSize: 16,
                                color: COLORS.xam3,
                                fontWeight: 'bold',
                                left: -75,
                                // backgroundColor: COLORS.orange
                            }}>My orders</Text>
                            <FontAwesome5
                                solid
                                name="angle-right"
                                size={24}
                                resizeMode="contain"
                                color= {COLORS.xam3}
                            />
                        </TouchableOpacity>

                        {/* //button sign out  */}
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
    MeContainer: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    container: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //marginVertical: 'center'
        
    },
    Button:{
        marginTop: 20,
        padding: 15,
        backgroundColor: COLORS.do2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        //marginTop: 10,
        height: 50,
    },
})
