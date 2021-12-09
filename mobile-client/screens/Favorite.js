import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Image, ToastAndroid} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { COLORS , SIZES, icons, } from '../constants'
import SERVER_URL from '../api'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const Favorite = ({navigation}) => {
    //get current user
    const CurrentUser = useSelector(state=> state.userReducer.user);

    const Cart = useSelector(state1=> state1.cartReducer.cart);

    const Favorite = useSelector(state=> state.favoriteReducer.favorite);

    const [favoriteData, setFavoriteData]=useState(null);
    const [isFavorite, setIsFavorite] =useState(true);
    const setFavorite=(cart)=> dispatch({
        type: 'SET_FAVORITE', 
        payload: cart
    })

    
    const dispatch = useDispatch();

    const handleResetFavorite=()=>{
        axios.get(`${SERVER_URL}/favorites/${CurrentUser._id}`)
                .then((data)=>{
                    setFavorite(data["data"])
                    //setFavoriteData(data["data"]);
                    // console.log(data["data"]);
                })
    }
    //handle add to favorite 
    const handleAddToFavorite=(idProduct)=>{
        //console.log(Favorite)
        if(CurrentUser){
            const url=`${SERVER_URL}/favorites`;
            axios.post(url, {idProduct: idProduct, idUser: CurrentUser._id})
            .then(()=>{
                handleResetFavorite();
                //setIsFavorite(!isFavorite)
                //setCount(1)
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

    useEffect(() => {
        //console.log(getCart());
        // console.log(Favorite[0].idProduct)
        if(CurrentUser && Favorite.items[0] !== undefined){
            setFavoriteData(Favorite.items[0].idProduct)

        }
    })

    const ListFavoriteItems=()=>{
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.white,
                        alignItems: "center",
                        justifyContent: 'center',
                        elevation: 0.3 ,
                        height: 100,
                        width: "95%",
                        marginRight: 25,
                        marginLeft: 10,
                        marginBottom: 15,
                        borderRadius: 10,
                        //zIndex: -1,
                    }}
                    onPress={() =>navigation.navigate("ProductDetail", item)}
                > 
                    <View style={{
                        flexDirection: 'row',
                        //left: -95,

                    }}>
                        <View style={styles.ImageCart}>
                            <Image 
                                source={{uri: `${SERVER_URL}/images/${item.image[0]}`}}
                                style={{
                                    width: 70,
                                    height: 70,
                                }}
                                resizeMode="contain"
                                
                            />
                        </View>
                        <View style={{width: '65%',}}>
                            <Text style={{
                                fontWeight: 'bold',
                                paddingLeft: 10,
                                fontSize: 16,
                                width: '100%',
                                // backgroundColor: COLORS.xam1
                            }}>{item.name}</Text>
                            <View style={{
                                flexDirection: 'row',
                                paddingLeft: 7,
                                width: '100%',
                                height: 20,
                                // backgroundColor: COLORS.xam1,
                                alignItems: 'center'
                            }}>
                            {
                                [1, 2, 3, 4, 5].map((star)=>(
                                    <FontAwesome5 
                                        size={10} 
                                        solid name='star' 
                                        color={(star <= item.star) ? COLORS.orange : COLORS.xam2}
                                        style={{
                                            marginLeft: 3
                                        }}
                                    />
                                ))
                            }
                            </View>
                                <Text style={{
                                    fontWeight: 'bold',
                                    paddingLeft: 10,
                                    minWidth: 60,
                                    fontSize: 17,
                                    marginTop: 10,
                                    // backgroundColor: COLORS.xam1,
                                    alignItems: 'flex-end'
                                }}>{item.price}$</Text>
                            </View>
                        <View>
                            {/* // button delete cart item  */}
                            <TouchableOpacity
                                onPress={()=>handleAddToFavorite(item._id)}
                            >
                                <FontAwesome5  
                                    solid
                                    name='heart' 
                                    size={18} 
                                    color={isFavorite ? COLORS.do2 : COLORS.xam2} 
                                    />
                            </TouchableOpacity>
                            
                             
                            
                        </View>
                    </View>
                </TouchableOpacity>    
            )
        }
        return (
            <View style={{width: '95%', marginTop: 20, height: SIZES.height-170}}> 
                <FlatList
                    data={favoriteData}
                    style={{
                        
                    }}
                    vertical
                    numColumns={1}
                    //showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item._id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{}}
                />    
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
            }}>Favorite</Text>
            
            {/* //list cart  */}
            {
                !CurrentUser && (
                    <View style={{
                        flex: 1,
                        height: '100%',
                        justifyContent: 'center'
                    }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text>Please </Text>
                            <TouchableOpacity
                                onPress={()=> navigation.navigate('Login') }
                            >
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: COLORS.brand,
                                    textDecorationLine: 'underline',
                                }}>Login</Text>

                            </TouchableOpacity>
                            <Text> to see your Favorite</Text>

                        </View>

                    </View>
                )
            }
            {
                (!favoriteData && CurrentUser) && (
                    <Text style={{
                        fontSize: 28, 
                        flex: 1, 
                        textAlignVertical: 'center'
                    }}>Favorite is Empty</Text>
                )
            }
            {
                (favoriteData && CurrentUser) && (
                    <View style={{
                        width: '100%',
                        marginLeft: 15,
                    }}>

                        <Text style={{
                            textAlign: 'left', 
                            width: '100%',
                            fontSize: 18,
                            paddingLeft: 20,
                            letterSpacing: 1,
                        }}>
                                {Favorite.itemsNum} Items
                        </Text>
                        <ListFavoriteItems/>
                    </View>

                )
            }
            
            {/* payment  */}
        </View>
    )
}

export default Favorite

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    ImageCart: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.xam1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Button:{
        padding: 15,
        backgroundColor: COLORS.brand,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 5,
        marginTop: 20,
        width: '95%',
        height: 60,
    },
    updown:{
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.white,
        
    }
})
