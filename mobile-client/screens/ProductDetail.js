import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, Image, View, StatusBar, TouchableOpacity, Animated, ToastAndroid } from 'react-native'
import { COLORS , SIZES, icons, images } from '../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

const ProductDetail = ({navigation, route}) => {
    // get current user 
    const CurrentUser = useSelector(state=> state.userReducer.user);
    
    const {
        _id,
        name,
        image,
        description,
        price,
        remaining,
    }=route.params;
    
    const [count, setCount]=useState(1);
    const [total, setTotal]=useState(price);
    
    //console.log(description);
    const setCart=(cart)=> dispatch({
        type: 'SET_CART', 
        payload: cart
    })
    
    const dispatch = useDispatch();

    const handleResetCart=()=>{
        axios.get(`http://192.168.1.7:3000/carts/${CurrentUser._id}`)
                .then((data)=>{
                    //setCartData(data["data"]);
                    setCart(data["data"])
                    // console.log(data["data"]);
                })
    }
    
    //handle decrease product
    const handleIncreaseCount=()=>{
        if(count>remaining-1){
            ToastAndroid.showWithGravity(
                "Only "+remaining +" products left!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
        }else{
            setCount(count+1)
            
            setTotal(total+price)
        }
    }
    //handle increase product
    const handleDecreaseCount=()=>{
        if(count>1){
            setCount(count-1); 
            setTotal(total-price)
        }else{
            ToastAndroid.showWithGravity(
                "Minimum is 1",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
        }
    }

    //handle add to cart
    const handleAddToCart=()=>{
        if(CurrentUser){
            const item={
                idProduct: _id,
                itemNum: count,
                idUser: CurrentUser._id,
    
            };
            const url='http://192.168.1.7:3000/carts';
            axios.post(url, {idProduct: _id, itemNum: count, idUser: CurrentUser._id})
            .then(()=>{
                ToastAndroid.showWithGravity(
                    "Add to cart Successfully",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                  );
                handleResetCart();
                setCount(1)
            })
            .catch((err)=> {
                console.log(err+ " :ERROR!");
            })
            //setCart(item)
        }else{
            ToastAndroid.showWithGravity(
                "Sorry, you must LOGIN to add to cart",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
        }
    }
    //render header of this screens
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50, elevation: 2 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={()=> {
                        
                        navigation.goBack();
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
                        <Text style={{fontWeight: 'bold', fontSize: 25, color: COLORS.xam4}}>Product Details</Text>
                    </View>
                </View>
            </View>
        )
    }

    // render images products
    function randerImagesProduct(){
        const scrollX = new Animated.Value(0);
        const [images, setImages]=useState(image);
        function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width)
    
        return (
            <View style={{  }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: SIZES.padding
                    }}
                >
                    {images.map((item, index) => {
    
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
    
        function renderProductImages() {
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
                        images.map((item, index) => (
                            <View
                                key={`menu-${index}`}
                                style={{ alignItems: 'center' }}
                            >
                                <View style={{ height: 210 }}>
                                    {/* Food Image */}
                                    <Image
                                        source={{uri: `http://192.168.1.7:3000/images/${item}`}}
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
            <View style={{ elevation: 1.5}}>
                {renderProductImages()}
                {renderDots()}
            </View>
        )
    }

    // render description product
    function renderDescription(){
        return(
            <View style={{}}>
                <Text style={{
                    
                    fontWeight: 'bold', 
                    paddingLeft: 25,
                    fontSize: 21,
                }}>
                    {name}
                </Text>

                <Text style={{
                    fontWeight: 'bold', 
                    paddingLeft: 25,
                    fontSize: 16,
                    paddingTop: 20,
                }}>
                    Description
                </Text>

                {/* //info detail  */}
                <View style={{
                    flexDirection: 'row',
                    paddingLeft: 25,
                    paddingTop: 10,
                }}>
                    <Text style={{fontWeight: 'bold'}}>CPU:</Text>
                    <Text style={{left: 25}}>{description.cpu}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    paddingLeft: 25,
                    paddingTop: 10,
                }}>
                    <Text style={{fontWeight: 'bold'}}>RAM:</Text>
                    <Text style={{left: 25}}>{description.ram}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    paddingLeft: 25,
                    paddingTop: 10,
                }}>
                    <Text style={{fontWeight: 'bold'}}>ROM:</Text>
                    <Text style={{left: 25}}>{description.rom}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    paddingLeft: 25,
                    paddingTop: 10,
                }}>
                    <Text style={{fontWeight: 'bold'}}>PIN:</Text>
                    <Text style={{left: 25}}>{description.pin}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    paddingLeft: 25,
                    paddingTop: 10,
                }}>
                    <Text style={{fontWeight: 'bold'}}>Brand:</Text>
                    <Text style={{left: 25}}>{description.brand}</Text>
                </View>
                
                {/* // favorite add  */}
                <TouchableOpacity style={{
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: COLORS.orange,
                    opacity: 10,
                    elevation: 10,
                    shadowColor: COLORS.orange,
                    top: -40,
                    right: 10,
                    //zIndex: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FontAwesome5 solid name='heart' size={25} color={COLORS.white}/>
                </TouchableOpacity>

                
            </View>
        )
    }

    //render add to cart
    function renderAddToCart(){
        return (
                // {/* //edit number & add to cart  */}
                <View style={{
                    position: 'absolute',
                    bottom: 60,
                    flexDirection: 'row',
                    height: 60,
                    backgroundColor: COLORS.white,
                    width: "100%",
                    elevation: 5, 
                    paddingLeft: 10,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                
                }}>
                    <TouchableOpacity style={{
                        width: 30,
                        height: 30,
                        backgroundColor: COLORS.xam2,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                        onPress={handleDecreaseCount}
                    >
                        <Text style={styles.updown}>-</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 22, fontWeight: 'bold', marginLeft: 10, marginRight: 10}}>{(count>0) ? count : 0}</Text>
                    <TouchableOpacity style={{
                        width: 30,
                        height: 30,
                        backgroundColor: COLORS.brand,
                        borderRadius: 5,
                        //justifyContent: 'center',
                        alignItems: 'center',
                    }}
                        onPress={handleIncreaseCount}
                    >
                        <Text style={styles.updown}>+</Text>
                    </TouchableOpacity>
                    <View style={{marginLeft: 30}}>
                        <Text>Total </Text>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 23,
                            marginRight: 30,
                            }}>
                                {total}$
                        </Text>
                    </View>
                    <TouchableOpacity style={{
                        width: 150,
                        backgroundColor: COLORS.orange,
                        borderRadius: 2,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 20
                    }}
                        onPress={handleAddToCart}
                    >
                        <Text style={{
                            color: COLORS.white,
                            fontWeight: 'bold',

                        }}>ADD TO CART</Text>
                    </TouchableOpacity>
                </View>
        )
    }
    return (
        // <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                {renderHeader()}
                {randerImagesProduct()}
                {renderDescription()}
                {renderAddToCart()}
            </View>
        // </ScrollView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

    },
    updown:{
        fontWeight: 'bold',
        fontSize: 20,
        color: COLORS.white,
        
    }
})
