import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native'
import {images, icons, COLORS} from '../constants'
import { Formik } from 'formik'
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import axios from 'axios'
import SERVER_URL from '../api'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation}) => {
    const [hidePassword, setHidePassword]=useState(true);
    
    const dispatch = useDispatch();

    const setUser=(user)=> dispatch({
        type: 'SET_USER', 
        payload: user
    })

    const setCart=(cart)=> dispatch({
        type: 'SET_CART', 
        payload: cart
    })
    const setFavorite=(fav)=> dispatch({
        type: 'SET_FAVORITE', 
        payload: fav
    })
    var userClone;
    //mesage
    const [message, setMessage]=useState();
    const [messageType, setMessageType]=useState();

    //handle message 
    const handleMessage=(message, type='FAILED')=>{
        setMessage(message);
        setMessageType(type);
    }
    const storeUser = async (value) => {
        try {
          //const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('USER', value)
        } catch (e) {
          // saving error
          console.log("Error: ", e);
        }
      }
    //handle login
    const handleLogin=(credentials, setSubmitting)=>{
        const{phone, password}=credentials
        
        
        handleMessage(null);
        const url=`${SERVER_URL}/users/auth`;
        axios.post(url, {phone: phone, password: password})
        .then((res)=>{
            let {user, msg}=res.data; //get user from res data
            userClone=res.data.user;
            //console.log(user);
            setUser(user)
            storeUser("Thong")
            handleMessage("Login Successfully", "SUCCESS");
            setSubmitting(false)
            navigation.goBack();
            navigation.navigate('Home', user)
        })
        .then(()=>{
            // fetch api cart items from id user 
            axios.get(`${SERVER_URL}/carts/${userClone._id}`)
            .then((data)=>{
                //setCartData(data["data"]);
                setCart(data["data"])
                // console.log(data["data"]);
            })
            //.then(()=> console.log(arrCart))
            .catch(err=>console.log(err))

            // fetch api favorite items from id user
            axios.get(`${SERVER_URL}/favorites/${userClone._id}`)
            .then((data)=>{
                //setCartData(data["data"]);
                setFavorite(data["data"])
                // console.log(data["data"]);
            })
            //.then(()=> console.log(arrCart))
            .catch(err=>console.log(err))
        })
        .catch((err)=> {
            //console.log(err.json());
            setSubmitting(false);
            handleMessage("Please check your info again.");

        })
        

    }
    return (
        <KeyboardAvoidingWrapper>
            <View style={styles.container}>
                {/* //logo image */}
                <Image
                    source={require('../assets/icons/logo_brand.png')}
                    resizeMode="contain"
                    style={{
                        width: 150,
                        height: 150,
                        //position: 'absolute',
                        bottom: -15,
                        justifyContent: 'flex-start',
                        //marginTop:20,
                    }}
                />

                {/* //Ten thuong hieu */}
                {/* <Text style={{
                    color: COLORS.brand, fontWeight: 'bold', fontSize: 24}}
                >
                    E-Laptop
                </Text> */}
                {/* //titile */}
                <Text style={{
                    color: COLORS.xam4, fontWeight: 'bold', fontSize: 22, letterSpacing: 2}}
                >
                    Account Login
                </Text>
                {/* form login     */}
                <Formik
                    initialValues={{phone: '', password: ''}}
                    onSubmit={(values, {setSubmitting})=>{

                        if(values.phone=='' || values.password==''){
                            handleMessage('Please fill all the fields')
                            setSubmitting(false)
                        } else{
                            handleLogin(values, setSubmitting)

                        }
                    }}
                    >
                    {
                        ({handleChange, handleBlur, handleSubmit, values, isSubmitting})=>{
                            return (
                                <View>
                                    {/* edittext phone number */}
                                    <MyTextInput
                                        label="Your Phone"
                                        icon="rocket"
                                        placeholder="xxxx-xxx-xxx"
                                        placeholderTextColor={COLORS.darklight}
                                        onChangeText={handleChange('phone')}
                                        onBlur= {handleBlur('phone')}
                                        value={values.phone}
                                        keyboardType='numeric'
                                    />

                                    {/* edittext password  */}
                                    <MyTextInput
                                        label="Password"
                                        icon="lock"
                                        placeholder="* * * * * *"
                                        placeholderTextColor={COLORS.darklight}
                                        onChangeText={handleChange('password')}
                                        onBlur= {handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />

                                    {/* messagebox, show error login  */}
                                    <Text 
                                        type={messageType} 
                                        style={{
                                            textAlign: 'center', 
                                            fontSize: 13,
                                            color: (messageType=='SUCCESS'? COLORS.green: COLORS.red)
                                            }}>
                                        {message}
                                    </Text>
                                    
                                    {/* //login button  */}
                                    {
                                        !isSubmitting && (
                                            // {/* Button login */}
                                            <View>
                                                <TouchableOpacity onPress={handleSubmit} style={styles.Button}>
                                                    <Text style={{
                                                        color: COLORS.primary, 
                                                        fontSize: 15,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        Login
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                    {
                                        isSubmitting && (
                                            <View>
                                                <TouchableOpacity disabled={true} style={styles.Button}>
                                                    <ActivityIndicator size ="large" color ={COLORS.primary}/>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                    <Text 
                                        style={{
                                            marginBottom: 10,
                                            color: COLORS.darklight,
                                            //fontWeight: 'thin'
                                        }}
                                    >
                                        ______________________________________________
                                    </Text>

                                    {/* button login with gg      */}
                                    <TouchableOpacity style={styles.ButtonGoogle}>
                                        <Fontisto 
                                            name="google" 
                                            color={COLORS.primary}
                                            size={25}
                                            />
                                        <Text style={{
                                            color: COLORS.primary, 
                                            fontSize: 15,
                                            paddingLeft: 5,
                                            fontWeight: 'bold',
                                        }}>
                                            Sign with Google
                                        </Text>
                                    </TouchableOpacity>    

                                    {/* no account/ register */}
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                    }}>
                                        <Text>Don't have an account already?</Text>
                                        <TouchableOpacity
                                            onPress={()=>navigation.navigate('Register')}
                                        >
                                            <Text
                                                style={{
                                                    color: COLORS.brand,
                                                    fontWeight: 'bold',
                                                    paddingLeft: 5,
                                                    

                                                }}
                                            > 
                                                Register
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                        )}
                    }
                    
                </Formik>    
            </View>
        </KeyboardAvoidingWrapper>
        
    )
}

const MyTextInput=({label, icon,isPassword,hidePassword, setHidePassword, ...props})=>{
    return (
        <View style={{marginTop: 20, width: 300}}>
            <View style={styles.LeftIcon}>
                <Octicons
                    name={icon}
                    size={25}
                    color={COLORS.brand}
                />
            </View>
            <Text style={styles.InputLabel}>
                {label}
            </Text>
            <TextInput 
                style = {styles.TextInput}
                {...props}
            />
            {
                isPassword && (
                    <View style={styles.RightIcon}>
                        <Ionicons
                            size={25}
                            color={hidePassword ? COLORS.darklight: COLORS.brand}
                            name={hidePassword ? 'md-eye-off': 'md-eye'}
                            onPress={()=>setHidePassword(!hidePassword)}
                        />
                    </View>
                )
            }
            
        </View>
        )
}

export default Login

const styles = StyleSheet.create({
    wrap:{
        
    },
    container:{ 
        alignItems: 'center',
        paddingTop: 50,
    },
    TextInput:{
        flexDirection: 'row',
        backgroundColor: COLORS.xam1,
        padding: 13,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 5,
        fontSize: 16,
        height: 60,
        marginVertical: 3,
        marginBottom: 10,
        color: COLORS.tertiary,
    },
    InputLabel:{
        color: COLORS.black,
        fontSize: 13,
        textAlign: 'left'
    },
    LeftIcon:{
        left: 15,
        top: 38,
        position: 'absolute',
        zIndex: 1
    },
    RightIcon:{
        right: 15,
        top: 38,
        position: 'absolute',
        zIndex: 1
    },
    Button:{
        padding: 15,
        backgroundColor: COLORS.brand,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        //marginTop: 10,
        height: 60,
    },
    ButtonGoogle:{
        flexDirection: 'row',
        padding: 15,
        backgroundColor: COLORS.orange,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        //marginTop: 10,
        height: 60,
    }
})
