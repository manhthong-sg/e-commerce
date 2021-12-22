import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, SafeAreaView, Animated} from 'react-native'
import { COLORS, SIZES, images } from '../../constants'
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import SERVER_URL from '../../api'
import { useSelector, useDispatch } from 'react-redux'

const HomeHeader = ({navigation}) => {
    const CurrentUser = useSelector(state=> state.userReducer.user);

    const scrollX = new Animated.Value(0);
    const [banner, setBanner]=useState([
        {photo: images.banner4},
        {photo: images.banner2},
        {photo: images.banner3},
        {photo: images.banner1},


    ]);
    const handlePressMessage=()=>{
        axios.get(`${SERVER_URL}/rooms/${CurrentUser._id}`)
        .then((room)=>{
            // console.log(room["data"]);
            navigation.navigate("MyMessage", room["data"])
        })
    }
    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width)
    
        return (
            <View style={{ height: 30 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: SIZES.padding
                    }}
                >
                    {banner.map((item, index) => {
    
                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        })
    
                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: "clamp"
                        })
    
                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                            extrapolate: "clamp"
                        })
    
                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: dotSize,
                                    height: dotSize,
                                    marginBottom: 30,
                                    backgroundColor: COLORS.white
                                }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }
    
    function renderBanner() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={ Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                {
                    banner.map((item, index) => (
                        <View
                            key={`menu-${index}`}
                            style={{ alignItems: 'center' }}
                        >
                            <View style={{ height: 210 }}>
                                {/* Food Image */}
                                <Image
                                    source={item.photo}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width,
                                        height: '100%',
                                        //marginBottom: 50,
                                    }}
                                />
    
                                
                            </View>
    
                            
                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }
    return (
        <View>

            <View 
                style={styles.container}
                // onPress={()=> navigation.navigate("Search")}    
            >
                {/* search bar        */}
                <View style={styles.LeftIcon}>
                    <Image resizeMode="contain" style={{maxWidth: 45}} source= {require('../../assets/icons/logo_brand.png')}/>
                </View>
                <TextInput 
                    style = {styles.TextInput}
                    onFocus={()=> navigation.navigate("Search")}
                />
                <TouchableOpacity 
                    style={styles.RightIcon}
                    onPress={handlePressMessage}
                >
                    <FontAwesome5
                        solid
                        size={25}
                        color={COLORS.white}
                        name='comment-dots'
                    />
                </TouchableOpacity>   
            </View>

            {/* //banner quang cao */}
            {renderBanner()}
            {renderDots()}
        </View>
    )
}



export default HomeHeader

const styles = StyleSheet.create({
    
    container:{ 
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        paddingTop: 25,
        // backgroundColor: COLORS.orange,
        //backgroundColor: 'transparent',
        width: '100%',
        height: 100,
        zIndex: 1,
        
    },
    TextInput:{
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 10,
        paddingLeft: 70,
        paddingRight: 55,
        borderRadius: 2,
        fontSize: 16,
        width: '85%',
        height: 40,
        marginLeft: 15,
        marginVertical: 3,
        //marginBottom: 10,
        color: COLORS.xam4,
    },
    
    LeftIcon:{
        
        padding: 20,
        paddingTop: 48,
        position: 'absolute',
        zIndex: 1
    },
    RightIcon:{
        right: 10,
        top: 50,
        position: 'absolute',
        zIndex: 1
    },
    Message:{
        right: -30,
        top: 50,
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
