import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import {images, icons, COLORS} from '../constants'
import { Formik } from 'formik'
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import { registerUser as RegisterUser } from '../api'
import axios from 'axios'
const Register = () => {
    const [hidePassword, setHidePassword]=useState(true);
    
    // handle select canlendar
    const [showCalendar, setShowCalendar]=useState(false);
    const [date, setDate]=useState(new Date(2000, 0, 1));
    const [dob, setDob]=useState();

    //mesage
    const [message, setMessage]=useState();
    const [messageType, setMessageType]=useState();

    //user info
    const [fullName, setFullName]=useState();
    const [phone, setPhone]=useState();
    const [password, setPassword]=useState();
    const [confirmPW, setConfirmPW]=useState();
    const[user, setUser]=useState()

    //register form
    //const [submitting, setSubmitting]=useState();

    const handleOnChangeDatePicker=(event, selectedDate)=>{
        const currentDate=selectedDate || date;
        setShowCalendar(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    //handle message 
    const handleMessage=(message, type='FAILED')=>{
        setMessage(message);
        setMessageType(type);
    }

    //handle datepicker
    const showDatePicker=()=>{
        setShowCalendar(true);
    }

    //handle register
    const handleRegister=(credentials, setSubmitting)=>{
        const{fullName, phone, password}=credentials
        
        
        handleMessage(null);
        const url='http://192.168.1.11:3000/users';
        axios.post(url, {fullName: fullName, phone: phone, password: password})
        .then((res)=>{
            handleMessage("Register Successfully", "SUCCESS");
            let {status, msg}=res.body;
            setSubmitting(false)
        })
        .catch((err)=> {
            //console.log(err.json());
            setSubmitting(false);
            handleMessage("Phone number already exist");

        })
        // registerForm({fullName, phone, passward})
        //RegisterUser({fullName,phone,password,confirmPW})

    }

    return (
        <KeyboardAvoidingWrapper>
            <View style={styles.container}>
                

                {/* //Ten thuong hieu
                <Text style={{
                    color: COLORS.brand, fontWeight: 'bold', fontSize: 24, marginTop: 20,}}
                >
                    E-Laptop
                </Text> */}

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

                {/* //titile */}
                <Text style={{
                    color: COLORS.black, fontWeight: 'bold', fontSize: 22, letterSpacing: 2}}
                >
                    Account Register
                </Text>
                
                {/* //date picker show  */}
                {showCalendar && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={handleOnChangeDatePicker}

                    />
                )}

                {/* form login     */}
                <Formik
                    initialValues={{fullName:'',phone:'', password: '', confirmPW: ''}}
                    onSubmit={(values, {setSubmitting})=>{

                        if(values.fullName=='' || values.phone=='' || values.password=='' || values.confirmPW==''){
                            handleMessage('Please fill all the fields')
                            setSubmitting(false)
                        } else if(values.password != values.confirmPW){
                            handleMessage('Make sure confirm password is same with password')
                            setSubmitting(false)
                        } else{
                            handleRegister(values, setSubmitting)

                        }
                    }}
                    >
                    {
                        ({handleChange, handleBlur, handleSubmit, values, isSubmitting})=>{
                            return (
                                <View>
                                    {/* edittext email */}
                                    <MyTextInput
                                        label="Full Name"
                                        icon="person"
                                        placeholder="Nguyễn Văn A"
                                        placeholderTextColor={COLORS.darklight}
                                        onChangeText={handleChange('fullName')}
                                        onBlur= {handleBlur('fullName')}
                                        value={values.fullName}
                                        
                                    />
                                    {/* <MyTextInput
                                        label="Date of Birth"
                                        icon="calendar"
                                        placeholder="YYYY - MM - DD"
                                        placeholderTextColor={COLORS.darklight}
                                        onChangeText={handleChange('dateOfBirth')}
                                        onBlur= {handleBlur('dateOfBirth')}
                                        value={dob ? dob.toDateString() : ''}
                                        isDate={true}
                                        editable={false}
                                        showDatePicker={showDatePicker}
                                    /> */}
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
                                    {/* <MyTextInput
                                        label="Email Address"
                                        icon="mail"
                                        placeholder="abc@gmail.com"
                                        placeholderTextColor={COLORS.darklight}
                                        onChangeText={handleChange('email')}
                                        onBlur= {handleBlur('email')}
                                        value={values.email}
                                        keyboardType='email-address'
                                    /> */}

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

                                    {/* confirm password  */}
                                    <MyTextInput
                                        label="Confirm password"
                                        icon="lock"
                                        placeholder="* * * * * *"
                                        placeholderTextColor={COLORS.darklight}
                                        onChangeText={handleChange('confirmPW')}
                                        onBlur= {handleBlur('confirmPW')}
                                        value={values.confirmPW}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />

                                    {/* messagebox, show error register  */}
                                    <Text 
                                        type={messageType} 
                                        style={{
                                            textAlign: 'center', 
                                            fontSize: 13,
                                            color: (messageType=='SUCCESS'? COLORS.green: COLORS.red)
                                            }}>
                                        {message}
                                    </Text>

                                    

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
                                                        Register
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

                                    
                                    {/* no account/ register */}
                                    <View style={{
                                        flexDirection: 'row',
                                        //marginTop: 10,
                                    }}>
                                        <Text>Already have an account?</Text>
                                        <TouchableOpacity>
                                            <Text
                                                style={{
                                                    color: COLORS.brand,
                                                    fontWeight: 'bold',
                                                    paddingLeft: 5,
                                                    

                                                }}
                                            > 
                                                Login
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

const MyTextInput=({label, icon,isPassword,hidePassword, setHidePassword, isDate, showDatePicker, ...props})=>{
    return (
        <View style={{marginTop: 15, width: 300}}>
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
            
            {
                !isDate && <TextInput 
                style = {styles.TextInput}
                {...props}
            />
            }
            {
                isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <TextInput 
                        style = {styles.TextInput}
                        {...props}
                    />
                </TouchableOpacity>)
            }

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

export default Register

const styles = StyleSheet.create({
    wrap:{
        
    },
    container:{ 
        alignItems: 'center',
        paddingTop: 30,
    },
    TextInput:{
        flexDirection: 'row',
        backgroundColor: COLORS.secondary,
        padding: 13,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 5,
        fontSize: 16,
        height: 50,
        marginVertical: 1,
        marginBottom: 5,
        color: COLORS.tertiary,
    },
    InputLabel:{
        color: COLORS.black,
        fontSize: 13,
        textAlign: 'left'
    },
    LeftIcon:{
        left: 15,
        top: 30,
        position: 'absolute',
        zIndex: 1
    },
    RightIcon:{
        right: 15,
        top: 30,
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
