import React, { useState } from 'react'
import { StyleSheet, Alert, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, ToastAndroid } from 'react-native'
import { Formik } from 'formik'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import SERVER_URL from '../api'
import axios from 'axios'
import { COLORS, SIZES, icons, images } from '../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ChangePass = ({ navigation }) => {
    //console.log(SERVER_URL);
    const [hidePassword, setHidePassword] = useState(true);

    // handle select canlendar
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [dob, setDob] = useState();

    //mesage
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    //user info
    const [fullName, setFullName] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [confirmPW, setConfirmPW] = useState();
    const [user, setUser] = useState()

    //register form
    //const [submitting, setSubmitting]=useState();

    const handleOnChangeDatePicker = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    //handle message 
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    //handle datepicker
    const showDatePicker = () => {
        setShowCalendar(true);
    }

    //handle register
    const handleRegister = (credentials, setSubmitting) => {
        const { fullName, phone, password } = credentials


        handleMessage(null);
        const url = `${SERVER_URL}/users`;
        // console.log(url);
        axios.post(url, { fullName: fullName, phone: phone, password: password })
            .then((res) => {
                handleMessage("Register Successfully", "SUCCESS");
                //let {status, msg}=res.body;
                setSubmitting(false);
                ToastAndroid.showWithGravity(
                    "Register successfully, now you can login!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
                navigation.navigate('Login');
            })
            .catch((err) => {
                //console.log(err.json());
                setSubmitting(false);
                handleMessage("Phone number already exist");

            })
        // registerForm({fullName, phone, passward})
        //RegisterUser({fullName,phone,password,confirmPW})

    }
    const handleSave = () => {
        Alert.alert(
            "Are you sure?",
            "Are you sure you want change your password?",
            [
                {
                    text: "CANCEL",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "SAVE", onPress: () => navigation.navigate("Me") }
            ]
        );
    }
    //render header of this screens
    const Header = () => {
        return (
            <View style={{ flexDirection: 'row', height: 50, elevation: 2 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        navigation.navigate("MyProfile");
                    }}
                >
                    <FontAwesome5
                        name="arrow-left"
                        resizeMode="contain"
                        size={25}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: "100%",
                            //backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius,
                            marginRight: 20,
                        }}
                    >
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 25,
                            color: COLORS.xam4
                        }}>
                            Change passsword
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <KeyboardAvoidingWrapper>
            <View style={styles.container}>
                <Header />


                {/* //Ten thuong hieu
                <Text style={{
                    color: COLORS.brand, fontWeight: 'bold', fontSize: 24, marginTop: 20,}}
                >
                    E-Laptop
                </Text> */}



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
                    initialValues={{ fullName: '', phone: '', password: '', confirmPW: '' }}
                    onSubmit={(values, { setSubmitting }) => {

                        if (values.fullName == '' || values.phone == '' || values.password == '' || values.confirmPW == '') {
                            handleMessage('Please fill all the fields')
                            setSubmitting(false)
                        } else if (values.password != values.confirmPW) {
                            handleMessage('Make sure confirm password is same with password')
                            setSubmitting(false)
                        } else {
                            handleRegister(values, setSubmitting)

                        }
                    }}
                >
                    {
                        ({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => {
                            return (
                                <View>
                                    {/* edittext password  */}
                                    <MyTextInput
                                        label="Your current password"
                                        icon="lock"
                                        placeholder="* * * * * *"
                                        placeholderTextColor={COLORS.darklight}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />
                                    <MyTextInput
                                        label="New Password"
                                        icon="lock"
                                        placeholder="* * * * * *"
                                        placeholderTextColor={COLORS.darklight}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />

                                    {/* confirm password  */}
                                    <MyTextInput
                                        label="Confirm new password"
                                        icon="lock"
                                        placeholder="* * * * * *"
                                        placeholderTextColor={COLORS.darklight}
                                        onChangeText={handleChange('confirmPW')}
                                        onBlur={handleBlur('confirmPW')}
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
                                            marginTop: 15,
                                            textAlign: 'center',
                                            fontSize: 13,
                                            color: (messageType == 'SUCCESS' ? COLORS.green : COLORS.red)
                                        }}>
                                        {message}
                                    </Text>



                                    {
                                        !isSubmitting && (
                                            // {/* Button login */}
                                            <View>
                                                <TouchableOpacity onPress={handleSave} style={styles.Button}>
                                                    <Text style={{
                                                        color: COLORS.primary,
                                                        fontSize: 15,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        Save
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                    {
                                        isSubmitting && (
                                            <View>
                                                <TouchableOpacity disabled={true} style={styles.Button}>
                                                    <ActivityIndicator size="large" color={COLORS.primary} />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                </View>

                            )
                        }
                    }

                </Formik>
            </View>
        </KeyboardAvoidingWrapper>

    )
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (
        <View style={{ marginTop: 15, width: 300 }}>
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
                    style={styles.TextInput}
                    {...props}
                />
            }
            {
                isDate && (
                    <TouchableOpacity onPress={showDatePicker}>
                        <TextInput
                            style={styles.TextInput}
                            {...props}
                        />
                    </TouchableOpacity>)
            }

            {
                isPassword && (
                    <View style={styles.RightIcon}>
                        <Ionicons
                            size={25}
                            color={hidePassword ? COLORS.darklight : COLORS.brand}
                            name={hidePassword ? 'md-eye-off' : 'md-eye'}
                            onPress={() => setHidePassword(!hidePassword)}
                        />
                    </View>
                )
            }

        </View>
    )
}

export default ChangePass

const styles = StyleSheet.create({
    wrap: {

    },
    container: {
        alignItems: 'center',
        paddingTop: 30,
    },
    TextInput: {
        flexDirection: 'row',
        backgroundColor: COLORS.xam1,
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
    InputLabel: {
        color: COLORS.black,
        fontSize: 13,
        textAlign: 'left'
    },
    LeftIcon: {
        left: 15,
        top: 30,
        position: 'absolute',
        zIndex: 1
    },
    RightIcon: {
        right: 15,
        top: 30,
        position: 'absolute',
        zIndex: 1
    },
    Button: {
        padding: 15,
        backgroundColor: COLORS.brand,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        //marginTop: 10,
        height: 60,
    },
    ButtonGoogle: {
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
