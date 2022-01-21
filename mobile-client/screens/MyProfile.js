import React, { useState, useEffect } from 'react'
import { StyleSheet, Alert, Picker, ToastAndroid, Text, View, TouchableOpacity, TextInput, StatusBar, FlatList, Image, Button, } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS, SIZES, icons, images } from '../constants'
import { useSelector, useDispatch } from 'react-redux'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { Formik } from 'formik'
import axios from "axios";
import SERVER_URL from '../api'
import DateTimePicker from '@react-native-community/datetimepicker';

const MyProfile = ({ navigation }) => {
    const CurrentUser = useSelector(state => state.userReducer.user);
    const [hidePassword, setHidePassword] = useState(true);
    const [messageType, setMessageType] = useState();
    const [message, setMessage] = useState();


    // /address 
    const [recipientName, setRecipientName] = useState(CurrentUser.fullName);
    const [recipientPhone, setRecipientPhone] = useState(CurrentUser.phone);

    const [selectedProvince, setSelectedProvince] = useState(Number(CurrentUser.address.province));
    const [dataProvince, setDataProvince] = useState(null);

    const [selectedDistrict, setSelectedDistrict] = useState(Number(CurrentUser.address.district));
    const [dataDistrict, setDataDistrict] = useState(null);

    const [selectedWard, setSelectedWard] = useState(Number(CurrentUser.address.ward));
    const [dataWard, setDataWard] = useState(null);
    const [apartmentAddress, setAparmentAddress] = useState(CurrentUser.address.apartmentAddress);

    useEffect(() => {
        //get all province from this api
        axios.get(`https://provinces.open-api.vn/api/?p==1`).then((res) => {
            setDataProvince(res["data"]);
        });
    }, []);

    useEffect(() => {
        //get all districts from the province you choice
        axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`).then((res) => {
            setDataDistrict(res["data"]?.districts);
        });
    }, [selectedProvince]);

    useEffect(() => {
        //get all wards from the district you choice
        axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`).then((res) => {
            setDataWard(res["data"]?.wards);
        });
    }, [selectedDistrict]);

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
                        navigation.navigate("Me");
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
                            My Profile
                        </Text>
                    </View>
                </View>
            </View>
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
                            <TouchableOpacity
                            onPress={()=> navigation.navigate("ChangePass")}
                            >
                                <Text style={{
                                    // position: 'absolute',
                                    // // backgroundColor: COLORS.cam1,
                                    bottom: 60,
                                    left: 40,
                                    marginBottom: 40,
                                    marginLeft:10,
                                    width: 50,
                                    fontSize: 13,
                                    color: COLORS.brand,
                                }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

            </View>
        )
    }
    const ProfileContainer = () => {
        const [showCalendar, setShowCalendar] = useState(false);
        const [date, setDate] = useState(new Date(2000, 0, 1));
        var aa = CurrentUser.dateOfBirth.split("/");
        // month is 0-based, that's why we need dataParts[1] - 1
        var DOB = new Date(+aa[2], aa[1] - 1, +aa[0]);
        const [dob, setDob] = useState(DOB);

        const handleOnChangeDatePicker = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            // let a=currentDate.getDate()+ '/'+(currentDate.getMonth()+1)+'/'+currentDate.getFullYear()
            setShowCalendar(false);
            setDate(currentDate);
            setDob(currentDate);
        }
        //handle datepicker
        const showDatePicker = () => {
            setShowCalendar(true);
        }
        const handleSave=()=>{
            Alert.alert(
                "Are you sure?",
                "Are you sure you want update your profile?",
                [
                  {
                    text: "CANCEL",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "SAVE", onPress: ()=>navigation.navigate("Me") }
                ]
              );
        }
        return (
            <View style={styles.ProfileContainer}>
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
                <Formik
                    initialValues={{
                        fullName: `${CurrentUser.fullName}`,
                        phone: `${CurrentUser.phone}`, password: `*********`,
                        confirmPW: '',
                        dateOfBirth: `${CurrentUser.dateOfBirth}`
                    }}
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
                                    {/* edittext email */}
                                    <MyTextInput
                                        label="Full Name"
                                        icon="person"
                                        placeholder="Nguyễn Văn A"
                                        placeholderTextColor={COLORS.darklight}
                                        onChangeText={handleChange('fullName')}
                                        onBlur={handleBlur('fullName')}
                                        value={values.fullName}

                                    />
                                     <MyTextInput
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
                                    />
                                    <MyTextInput
                                        label="Your Phone"
                                        icon="rocket"
                                        placeholder="xxxx-xxx-xxx"
                                        placeholderTextColor={COLORS.darklight}
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
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
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        editable={false}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />



                                    {/* address  */}
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            // fontWeight: "bold",
                                            marginTop: 15,
                                            // marginLeft: 15,
                                        }}
                                    >
                                        Address
                                    </Text>

                                    {/* //picker for province  */}
                                    <View
                                        style={{
                                            backgroundColor: COLORS.white,
                                            elevation: 1,
                                            borderWidth: 0.8,
                                            borderColor: COLORS.xam2,
                                            // width: '100%'
                                        }}
                                    >
                                        <Picker
                                            selectedValue={selectedProvince}
                                            style={{
                                                fontSize: 18,
                                                color: COLORS.brand,
                                                fontWeight: "bold",
                                                backgroundColor: COLORS.xam2,
                                            }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSelectedProvince(itemValue)
                                            }}
                                        >
                                            {/* {
                selectedProvince == "default" && (
                     <Picker.Item
                        value="default"
                        label="Choose Your Province"
                        />
                    )
            } */}
                                            {dataProvince &&
                                                dataProvince.map((province) => (
                                                    <Picker.Item
                                                        value={selectedProvince}
                                                        label={province.name}
                                                        value={province.code}
                                                    />
                                                ))}
                                        </Picker>
                                    </View>

                                    {/* // picer for districts  */}
                                    <View
                                        style={{
                                            backgroundColor: COLORS.white,
                                            elevation: 1,
                                            borderWidth: 0.8,
                                            borderColor: COLORS.xam2,
                                        }}
                                    >
                                        <Picker
                                            selectedValue={selectedDistrict}
                                            style={{
                                                //height: 100,
                                                // width: 200,
                                                fontSize: 18,
                                                color: COLORS.brand,
                                                fontWeight: "bold",
                                                backgroundColor: COLORS.xam2,
                                            }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSelectedDistrict(itemValue)
                                            }}
                                        >
                                            {/* <Picker.Item
                value="default"
                label="Your Districts"
            /> */}
                                            {dataDistrict &&
                                                dataDistrict.map((district) => (
                                                    <Picker.Item
                                                        value={selectedDistrict}
                                                        label={district.name}
                                                        value={district.code}
                                                    />
                                                ))}
                                        </Picker>
                                    </View>

                                    {/* //picker for wards  */}
                                    <View
                                        style={{
                                            backgroundColor: COLORS.white,
                                            elevation: 1,
                                            borderWidth: 0.8,
                                            borderColor: COLORS.xam2,
                                        }}
                                    >
                                        <Picker
                                            selectedValue={selectedWard}
                                            style={{
                                                //height: 100,
                                                // width: 200,
                                                fontSize: 18,
                                                color: COLORS.brand,
                                                fontWeight: "bold",
                                                backgroundColor: COLORS.xam2,
                                            }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSelectedWard(itemValue),
                                                    ToastAndroid.showWithGravity(
                                                        `${itemValue} is choose`,
                                                        ToastAndroid.LONG,
                                                        ToastAndroid.BOTTOM
                                                    );
                                            }}
                                        >

                                            {dataWard &&
                                                dataWard.map((ward) => (
                                                    <Picker.Item
                                                        value={selectedDistrict}
                                                        label={ward.name}
                                                        value={ward.code}
                                                        style={{
                                                            backgroundColor: COLORS.xam3
                                                        }}
                                                    />
                                                ))}
                                        </Picker>
                                    </View>
                                    <TextInput
                                        placeholder="Enter your apartment address . ."
                                        onChangeText={(address) => setAparmentAddress(address)}
                                        value={apartmentAddress}
                                        style={{
                                            backgroundColor: COLORS.white,
                                            elevation: 2,
                                            height: 50,
                                            borderStyle: "dashed",
                                            borderColor: COLORS.xam4,
                                            marginTop: 2,
                                            paddingLeft: 20,
                                            fontSize: 16,
                                        }}
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
        )
    }
    return (
        <View>
            <Header />
            <ProfileContainer />
        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    ProfileContainer: {
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
