import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, FlatList, View, StatusBar, TextInput, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS, SIZES, icons } from '../constants'
import { useSelector, useDispatch } from 'react-redux'

const MyMessage = ({ navigation }) => {
    const CurrentUser = useSelector(state => state.userReducer.user);

    const [messageData, setMessageData] = useState([
        {
            userId: "CurrentUser._id",
            roomId: "5720394857203948",
            message: "Xin chao cac ban",
            time: "12:23 AM, 17/12"
        },
        {
            userId: "237490832042938",
            roomId: "5720394857203948",
            message: "hello cau",
            time: "12:23 AM, 17/12"
        },
        {
            userId: "CurrentUser._id",
            roomId: "5720394857203948",
            message: "cho tui hoi xiu",
            time: "12:23 AM, 17/12"
        }
    ])
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
                            Chat
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderMessage = ({ item }) => {
        return (
            <View style={{
                width: "100%",
                // backgroundColor: COLORS.cam1,
            }}>
                {/* opposite side */}
                <Text style={{
                    fontSize: 10,
                    color: COLORS.brand,
                    marginLeft: 20,
                }}>Supporter</Text>
                <View
                    style={{
                        maxWidth: '70%',
                        backgroundColor: COLORS.lightGray,
                        // alignItems: "center",
                        justifyContent: 'center',
                        elevation: 0.2,
                        height: 50,
                        marginBottom: 5,
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        elevation: 0.8,
                        marginTop: 2,
                        paddingLeft: 20,
                        marginLeft: 20
                    }}
                >
                    <Text style={{
                        color: COLORS.black,

                    }}>{item.message}</Text>
                    <Text style={{
                        fontSize: 8,
                        color: COLORS.black,
                        paddingTop: 5
                    }}>{item.time}</Text>
                </View>
                {/* my side  */}
                <View
                    style={{
                        maxWidth: '70%',
                        backgroundColor: COLORS.brand,
                        // alignItems: "center",
                        justifyContent: 'center',
                        elevation: 0.2,
                        height: 50,
                        marginBottom: 5,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        elevation: 0.8,
                        marginTop: 10,
                        // paddingLeft: 20,
                        paddingRight: 20,
                        right: -100,
                    }}
                >
                    <Text style={{
                        color: COLORS.white,
                        textAlign: 'right'
                    }}>{item.message}</Text>
                    <Text style={{
                        fontSize: 8,
                        color: COLORS.white,
                        paddingTop: 5,
                        textAlign: 'right'
                    }}>{item.time}</Text>
                </View>

            </View>
        )
    }

    //main return
    return (
        <View style={styles.MyMessageContainer}>
            <Header />
            <FlatList
                data={messageData}
                style={{
                    // marginTop: 10
                    paddingTop: 10,
                    height: "100%",
                    backgroundColor: COLORS.white,
                    // maxHeight: 210,
                }}
                vertical
                numColumns={1}
                //showsVerticalScrollIndicator={false}
                keyExtractor={item => `${item._id}`}
                renderItem={renderMessage}
                contentContainerStyle={{}}
            />
        </View>
    )
}

export default MyMessage

const styles = StyleSheet.create({
    MyMessageContainer: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
})
