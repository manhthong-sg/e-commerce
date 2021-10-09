import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import {images, icons, COLORS} from '../constants'
import { Formik } from 'formik'
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'

const Login = () => {
    const [hidePassword, setHidePassword]=useState(true);
    return (
        <View style={styles.container}>
            {/* //logo image */}
            <Image
                source={require('../assets/icons/logo2.png')}
                resizeMode="contain"
                style={{
                    width: 150,
                    height: 150,
                    justifyContent: 'flex-start'
                }}
            />

            {/* //brand */}
            <Text style={{
                color: COLORS.brand, fontWeight: 'bold', fontSize: 24}}
            >
                E-Laptop
            </Text>
            {/* //titile */}
            <Text style={{
                color: COLORS.black, fontWeight: 'bold', fontSize: 17, marginTop: 10, letterSpacing: 2}}
            >
                Account Login
            </Text>
            {/* form login     */}
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={value=>console.log(value)}
                >
                {
                    ({handleChange, handleBlur, handleSubmit, values})=>{
                        return (
                            <View>
                                {/* edittext email */}
                                <MyTextInput
                                    label="Email Address"
                                    icon="mail"
                                    placeholder="abc@gmail.com"
                                    placeholderTextColor={COLORS.darklight}
                                    onChangeText={handleChange('email')}
                                    onBlur= {handleBlur('email')}
                                    value={values.email}
                                    keyboardType='email-address'
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
                                <Text style={{textAlign: 'center', fontSize: 13}}>
                                    . . .
                                </Text>

                                {/* Button login */}
                                <TouchableOpacity style={styles.Button}>
                                    <Text style={{
                                        color: COLORS.primary, 
                                        fontSize: 16,
                                        
                                    }}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
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
                                        fontSize: 16,
                                        paddingLeft: 5,
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
                                    <TouchableOpacity>
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
                            color={COLORS.darklight}
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
        backgroundColor: COLORS.secondary,
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
        backgroundColor: '#dd571c',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        //marginTop: 10,
        height: 60,
    }
})
