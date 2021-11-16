import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Picker,
  ScrollView,
  ToastAndroid,
  TextInput,
  Alert,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { COLORS, SIZES, icons } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import SERVER_URL from '../api'


const EditDeliveryInfo = ({ navigation }) => {
  const CurrentUser = useSelector((state) => state.userReducer.user);

  const [recipientName, setRecipientName] = useState(CurrentUser.fullName);
  const [recipientPhone, setRecipientPhone] = useState(CurrentUser.phone);
    
  const [selectedProvince, setSelectedProvince] = useState(Number(CurrentUser.address.province));
  const [dataProvince, setDataProvince] = useState(null);

  const [selectedDistrict, setSelectedDistrict] = useState(Number(CurrentUser.address.district));
  const [dataDistrict, setDataDistrict] = useState(null);
  
  const [selectedWard, setSelectedWard] = useState(Number(CurrentUser.address.ward));
  const [dataWard, setDataWard] = useState(null);
  
  const dispatch = useDispatch();

  const setUser=(user)=> dispatch({
        type: 'SET_USER', 
        payload: user
    })
  const handleResetUser=()=>{
        axios.get(`${SERVER_URL}/users/${CurrentUser._id}`)
                .then((data)=>{
                    //setCartData(data["data"]);
                    setUser(data["data"])
                    // console.log(data["data"]);
                })
    }
  const [apartmentAddress, setAparmentAddress] =useState(CurrentUser.address.apartmentAddress);
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
      <View style={{ flexDirection: "row", height: 50, elevation: 2 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesome5 name="arrow-left" resizeMode="contain" size={25} />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              //backgroundColor: COLORS.lightGray3,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
              marginRight: 30,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                color: COLORS.xam4,
              }}
            >
              Delivery Information
            </Text>
          </View>
        </View>
      </View>
    );
  };
 
 const handleConfirmSave = () =>{
    const url=`${SERVER_URL}/users/updateAddress/${CurrentUser._id}`;
    // console.log(url);
    axios.post(url, {
        province: selectedProvince,
        district: selectedDistrict, 
        ward: selectedWard, 
        apartmentAddress: apartmentAddress
    })
    .then((res)=>{
        handleResetUser();
        navigation.navigate('Order')
    })
    .catch((err)=> {
        console.log("Update address fail");
    })
 }
 const handleSave=()=>{
    Alert.alert(
        "Are you sure?",
        "Are you sure you want update your delivery address?",
        [
          {
            text: "CANCEL",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "SAVE", onPress: handleConfirmSave }
        ]
      );
 }

  return (
    <View style={styles.EditDeliveryInfo}>
      <Header />
      <ScrollView style={styles.ContentContainer}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            marginLeft: 15,
          }}
        >
          Contact
        </Text>
        <TextInput
          placeholder="Enter the recipient's name . ."
          onChangeText={(input) => setRecipientName(input)}
          value={recipientName}
          style={{
            backgroundColor: COLORS.white,
            elevation: 2,
            height: 50,
            borderStyle: "dashed",
            borderColor: COLORS.xam4,
            marginTop: 5,
            paddingLeft: 20,
            fontSize: 18,
          }}
        />
        <TextInput
          placeholder="Enter the recipient's phone . ."
          onChangeText={(input) => setRecipientPhone(input)}
          value={recipientPhone}
          style={{
            backgroundColor: COLORS.white,
            elevation: 2,
            height: 50,
            borderStyle: "dashed",
            borderColor: COLORS.xam4,
            marginTop: 2,
            paddingLeft: 20,
            fontSize: 18,
          }}
        />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            marginTop: 15,
            marginLeft: 15,
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
            {/* <Picker.Item
                  value="default"
                  label="Your Ward"
                /> */}
            {dataWard &&
              dataWard.map((ward) => (
                <Picker.Item
                  value={selectedDistrict}
                  label={ward.name}
                  value={ward.code}
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
        <TouchableOpacity 
            style={styles.Button}
            onPress={handleSave}
        >
            <Text style={{
                color: COLORS.primary, 
                fontSize: 15,
                fontWeight: 'bold'
            }}>
                Save
            </Text>
        </TouchableOpacity>    
      </ScrollView>
    </View>
  );
};

export default EditDeliveryInfo;

const styles = StyleSheet.create({
  EditDeliveryInfo: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  ContentContainer: {
    flex: 1,
    marginTop: 10,
  },
  Button:{
    padding: 15,
    backgroundColor: COLORS.brand,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    marginTop: 20,
    width: 350,
    height: 60,                                                                                                                                                                                                                                  
    alignSelf: 'center'
    // marginRight: 50,
  },

});
