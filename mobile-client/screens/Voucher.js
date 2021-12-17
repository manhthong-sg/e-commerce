import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, FlatList, Image, Button, } from 'react-native'
import SERVER_URL from '../api'
import axios from 'axios';
import { COLORS, SIZES, icons, images } from '../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux'

const Voucher = ({ navigation }) => {
    const CurrentUser = useSelector(state => state.userReducer.user);

    const [code, setCode] = useState("")
    const [voucherData, setVoucherData] = useState()
    const [selectedVoucher, setSelectedVoucher] = useState({
        _id: "",
        name: "",
        code: "",
        value: 0,
        type: "0",
        start: "",
        end: "",
        description: "",
        limit: 1

    })
    // voucherData 
    // [
    //     {
    //         "_id": "61acd9ee397fa9f04e1cdee7",
    //         "code": "ELAP10PERCENT",
    //         "description": "This voucher will discount your order 10%",
    //         "end": "5-12-2021",
    //         "image": "voucher.jpg",
    //         "limit": 10,
    //         "name": "Voucher discount 10% price",
    //         "start": "2-12-2021",
    //         "type": "%",
    //         "value": 0.1,
    //     }
    // ]
    useEffect(() => {
        axios.get(`${SERVER_URL}/users/myvouchers/${CurrentUser._id}`)
            .then((data) => {
                setVoucherData(data["data"].myVouchers)
                // console.log(data["data"])
            })
    }, [])

    const handleSelectedVoucher = (item) => {
        setSelectedVoucher(item)
        console.log(selectedVoucher);
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

                        navigation.navigate("Order", selectedVoucher);
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
                            Choose voucher
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    //list your voucher
    const renderItem = ({ item }) => {
        // check expire time 
        let checkExpire = true;

        let a = item.start
        let b = item.end

        var aa = a.split("-");
        // month is 0-based, that's why we need dataParts[1] - 1
        var startDay = new Date(+aa[2], aa[1] - 1, +aa[0]);

        var bb = b.split("-");
        // month is 0-based, that's why we need dataParts[1] - 1
        var endDay = new Date(+bb[2], bb[1] - 1, +bb[0]);

        let today = new Date();

        if (today < startDay || today > endDay) {
            checkExpire = false;
        }
        return (
            <>
                {
                    checkExpire && (
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.lightGray,
                                alignItems: "center",
                                justifyContent: 'center',
                                elevation: 0.3,
                                minheight: 100,
                                marginBottom: 5,
                                borderRadius: 5,
                                elevation: 0.8,
                            }}
                            onPress={() => handleSelectedVoucher(item)}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={styles.ImageCart}>
                                    <Image
                                        source={{ uri: `${SERVER_URL}/images/${item.image}` }}
                                        style={{
                                            width: 70,
                                            height: 70,
                                        }}
                                        resizeMode="contain"

                                    />
                                </View>
                                <View style={{ width: '70%', }}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        paddingLeft: 10,
                                        fontSize: 16,
                                        width: '100%',
                                        color: COLORS.brand
                                    }}>{item.name}</Text>
                                    <Text style={{
                                        paddingLeft: 10,
                                        width: '100%',
                                    }}>{item.description}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingLeft: 7,
                                        width: '100%',
                                        height: 20,
                                        // backgroundColor: COLORS.xam1,
                                        alignItems: 'center'
                                    }}>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        width: '100%',
                                        alignItems: 'center',
                                        flex: 1,
                                    }}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            paddingLeft: 10,
                                            color: COLORS.black
                                        }}>Valid date: </Text>
                                        <Text>{item.start} to {item.end}</Text>
                                    </View>
                                </View>
                                <View>
                                </View>
                                <FontAwesome5
                                    name="circle"
                                    solid={selectedVoucher._id == item._id ? true : false}
                                    color={COLORS.brand}
                                    size={14}
                                    style={{
                                        marginTop: 20,
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                }
            </>
        )
    }
    //main return 
    return (
        <View style={styles.VoucherContainer}>
            <View style={{
                backgroundColor: COLORS.lightGray,
                marginBottom: 20,
                // elevation: 1,
            }}>
                <Header />
                <View style={{
                    flexDirection: "row",
                    height: 40,
                    justifyContent: "center"
                }}>
                    <TextInput
                        value={code}
                        placeholder="Type your voucher here . ."
                        autoCapitalize="characters"
                        onChangeText={input => setCode(input)}
                        style={{
                            width: '80%',
                            paddingLeft: 10,
                            fontSize: 16,
                            borderColor: COLORS.xam2,
                            borderWidth: 1,
                        }}
                    />
                    <TouchableOpacity style={{
                        backgroundColor: COLORS.brand,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: COLORS.primary,
                        }}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={voucherData}
                style={{
                    // backgroundColor: COLORS.white,
                    marginBottom: 100,
                    // flex: 1,
                }}
                vertical
                numColumns={1}
                //showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{}}
            />
            <TouchableOpacity style={{
                backgroundColor: COLORS.orange,
                width: '100%',
                height: 60,
                marginBottom: 55,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center'
            }}
                onPress={() => navigation.navigate("Order", selectedVoucher)}
            >
                <Text style={{
                    color: COLORS.primary,
                    fontWeight: 'bold',
                }}>OK</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Voucher

const styles = StyleSheet.create({
    VoucherContainer: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    ImageCart: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
