import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, FlatList, View, StatusBar, TextInput, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS, SIZES, icons } from '../constants'
import { useSelector, useDispatch } from 'react-redux'
import { io } from "socket.io-client";
import SERVER_URL from '../api'
import axios from 'axios'
import AutoScroll from 'react-native-auto-scroll'

const MyMessage = ({ navigation , route}) => {
    const CurrentUser = useSelector(state => state.userReducer.user);
    //get route data
    const room=route.params;
    
    const [message, setMessage] = useState("")
    const [messageData, setMessageData] = useState([
        
    ])
    
    //config socket io
    const socket = io(SERVER_URL);
    useEffect(() => {
        socket.on("onMessage", (data)=>{
            // console.log(messageData);
            // setMessageData([...messageData, data])
        setMessageData((msgs)=>[...msgs, data])

        })
       
    })
    const getAllMessageFromRoom=()=>{
        //get all message from room id
        axios.get(`${SERVER_URL}/rooms/messages/${room._id}`)
        .then((msg)=>{
            // console.log(msg["data"]);
            setMessageData(msg["data"])
        })
    }
    //handle send message to ui
    const handleSendMessage=()=>{
        //convert format date to "3:12 PM, 23/11"
        let today = new Date();
        let hours=today.getHours();
        let minutes=today.getMinutes();
        let ampm = today.getHours() >= 12 ? 'PM' : 'AM';

        if (hours > 12) {
            hours=hours-12;
        }
        if(hours<10 ){
            hours="0"+hours;
        }
        if(minutes<10){
            minutes="0"+minutes;
        }
        let currentTime = hours + ":" + minutes + " " + ampm + ", " + today.getDate() + '/' + (today.getMonth() + 1)
        let currentMsg={
            userId: CurrentUser._id,
            roomId: room._id,
            message: message,
            time: currentTime
        };
        // setMessageData((msgs)=>[...msgs, currentMsg])
        socket.emit("client-gui-tn", currentMsg)
        setMessage("");
    }
    useEffect(() => {
        getAllMessageFromRoom();
    }, [])
    useEffect(() => {
        socket.emit("join-room", room._id)
    }, [room._id])


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
                {
                    (item.userId !== CurrentUser._id) ? (
                        <View>
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
                                    borderTopRightRadius: 10,
                                    borderBottomRightRadius: 10,
                                    borderBottomLeftRadius: 20,
                                    elevation: 0.8,
                                    marginTop: 2,
                                    paddingLeft: 20,
                                    marginLeft: 20,
                                    marginBottom: 5,
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
                        </View>
                    )
                    :
                    (
                        // {/* my side  */}
                        <View
                            style={{
                                maxWidth: '70%',
                                backgroundColor: COLORS.brand,
                                // alignItems: "center",
                                justifyContent: 'center',
                                elevation: 0.2,
                                minHeight: 50,
                                marginBottom: 5,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 20,
                                elevation: 0.8,
                                marginTop: 10,
                                // paddingLeft: 20,
                                paddingRight: 10,
                                paddingLeft: 15,
                                marginBottom: 5,
                                right: -100,
                            }}
                        >
                            <Text style={{
                                color: COLORS.white,
                                textAlign: 'left'
                            }}>{item.message}</Text>
                            <Text style={{
                                fontSize: 8,
                                color: COLORS.white,
                                paddingTop: 5,
                                textAlign: 'right'
                            }}>{item.time}</Text>
                        </View>
                    )
                }
            </View>
        )
    }

    
    //main return
    return (
        <View style={styles.MyMessageContainer}>
            <Header />
            <AutoScroll>
                <FlatList
                    data={messageData}
                    style={{
                        // marginTop: 10
                        paddingTop: 10,
                        height: "100%",
                        backgroundColor: COLORS.white,
                        // paddingBottom: 10,
                        // maxHeight: 210,
                    }}
                    vertical
                    numColumns={1}
                    //showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item._id}`}
                    renderItem={renderMessage}
                    contentContainerStyle={{
                        bottom: 10,
                    }}
                />
            </AutoScroll>
            <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    backgroundColor: COLORS.white,
                    // marginTop: 10,
                }}>
                    <TextInput style={{
                        height: 50,
                        backgroundColor: COLORS.white,
                        borderWidth: 0.5,
                        // borderColor: COLORS.black,
                        width: '80%',
                        paddingLeft: 20,
                        marginBottom: 60
                    }}
                        placeholder="Type here . ."
                        onChangeText={msg=> setMessage(msg)}
                        value={message}
                    />
                    <TouchableOpacity 
                        style={{
                            height: 50,
                            width: 60,
                            backgroundColor: COLORS.brand,
                            marginLeft: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // marginTop: 20,
                        }}
                        onPress={handleSendMessage}
                    >
                        <Text style={{color: COLORS.primary}}>Send</Text>
                    </TouchableOpacity>
            </View>
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
