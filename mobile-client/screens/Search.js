import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, ToastAndroid, TextInput, Image, FlatList, TouchableOpacity, ScrollView,} from 'react-native'
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'
import { COLORS, SIZES, images } from '../constants'
import SERVER_URL from '../api'
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux'
import LottieView from "lottie-react-native";

const Search = ({navigation}) => {
    // Redux 
    const CurrentUser = useSelector(state=> state.userReducer.user);
    const Favorite = useSelector(state=> state.favoriteReducer.favorite);
    var favoriteData=[];
    if(CurrentUser && Favorite.items[0] !== undefined){
        //lay ra id nhung item da them vao favorite de hien ra
        Favorite.items[0].idProduct.forEach(item=>{
            favoriteData.push(item._id)
        })
    }
    const [searchData, setSearchData]=useState(null);
    const [productsData, setProductsData]=useState(null);
    const [searchKey, setSearchKey]=useState("");
    const [itemsNum, setItemsNum]=useState(0);
    //call api product and get all products
    const fetchProducts = async () => {
        const res = await axios.get(`${SERVER_URL}/products`).catch((err) => { console.log("Fetch API failed!! " + err); }); 
        //const res = await getProducts.getAllProduct(); 
        if (!res) return;

        //console.log(res["data"]);
        setProductsData(res["data"]);
    }
    
    useEffect(() => {
        //fetch products data
        fetchProducts();
        
    }, []);
    useEffect(() => {
        if(searchKey==""){
            setSearchData(null)
        }
        else if(productsData && searchKey !== ""){
            const newData= productsData.filter((product)=>{
                const itemData = product.name
                ? product.name.toUpperCase()
                : ''.toUpperCase();
                const textData = searchKey.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            let count=newData.length;
            setItemsNum(count);
            setSearchData(newData)

        }
        
    }, [searchKey]);
    const setFavorite=(fav)=> dispatch({
        type: 'SET_FAVORITE', 
        payload: fav
    })
    const dispatch = useDispatch();
    const handleResetFavorite=()=>{
        axios.get(`${SERVER_URL}/favorites/${CurrentUser._id}`)
                .then((data)=>{
                    //setCartData(data["data"]);
                    setFavorite(data["data"])
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
                // setIsFavorite(!isFavorite)
                //setCount(1)
            })
            .catch((err)=> {
                console.log(err+ " :ERROR!");
            })
            //setCart(item)
        }else{
            ToastAndroid.showWithGravity(
                "Sorry, you must LOGIN to add to Favorite",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
        }
    }
    const renderProductItems = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: COLORS.white,
                    alignItems: "center",
                    elevation: 2 ,
                    height: 200,
                    width: "49.9%",
                    marginRight: 5,
                    marginBottom: 5,
                    zIndex: -1,
                }}
                onPress={() =>navigation.navigate("ProductDetail", item)}
            >   
                {/* //icon favorite      */}
                <TouchableOpacity 
                    style={{
                        width: 45,
                        height: 45, 
                        zIndex: 10,
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        right: 0,

                    }}
                    onPress={()=>handleAddToFavorite(item._id)}
                >
                    <FontAwesome5
                            solid
                            //solid={(selectedFavorite[item.id].id == item.id) ? true : false}
                            name="heart"
                            size={20}
                            color={(favoriteData.includes(item._id)) ? COLORS.do2 : COLORS.white} 
                        />    
                </TouchableOpacity>
                <Image
                    source={{uri: `${SERVER_URL}/images/${item.image[0]}`}}
                    resizeMode="cover"
                    style={{
                        width: '100%',
                        height: '70%'

                    }}
                />
                <Text style={{textAlign: 'left', paddingLeft: 10, width: '100%'}}>{item.name}</Text>
                <View style={{
                    //backgroundColor: COLORS.xam2,
                    flexDirection: 'row',
                    paddingLeft: 7,
                    width: '100%',
                    height: 40,
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
                    <Text style={{fontWeight: 'bold', textAlign: 'right', fontSize: 16, width: '55%'}}>{item.price}$</Text>
                </View>
                
            </TouchableOpacity>
        )
    }
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                >
                    <FontAwesome5
                        size={25}
                        color={COLORS.white}
                        name='arrow-left'
                        //onPress={()=>setHidePassword(!hidePassword)}
                    />
                </TouchableOpacity>   
                {/* search bar        */}
                <View style={styles.LeftIcon}>
                    <Image resizeMode="contain" style={{maxWidth: 45}} source= {require('../assets/icons/logo_brand.png')}/>
                </View>
                <TextInput
                    // autoFocus
                    value={searchKey}
                    style = {styles.TextInput}
                    onChangeText= {(text)=> setSearchKey(text)}
                />
            </View>
            <ScrollView style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    padding: 20,
                    color: COLORS.orange,
                    fontSize: 18,

                }}>Related results ({itemsNum} items)</Text>
                <View style={{
                    maxHeight: SIZES.height-100,
                    marginTop: 10,
                    marginBottom: 50
                }}>
                    {
                        searchData && (
                            <FlatList
                                    data={searchData}
                                    style={{
                                        
                                    }}
                                    vertical
                                    numColumns={2}
                                    //showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={item => `${item._id}`}
                                    renderItem={renderProductItems}
                                    contentContainerStyle={{}}
                                />    
                        )
                    }
                    {
                        (searchKey=="") && (
                            <View style={{
                                // flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                // height: 500

                            }}>
                                <LottieView
                                source={require("../components/AnimationIcons/typing.json")}
                                autoPlay
                                loop={true}
                                resizeMode='contain'
                                style={{ 
                                    width: 200, 
                                    // paddingLeft: 20,
                                }}/>
                                <Text style={{
                                    color: COLORS.xam2,
                                    fontSize: 16
                                }}>Type name of your laptop above</Text>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container:{ 
        flexDirection: 'row',
        // position: 'absolute',
        alignItems: 'center',
        // marginLeft: 40,
        paddingTop: 25,
        backgroundColor: COLORS.brand,
        paddingLeft: 15,
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
        // paddingRight: 55,
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
        left: 40,
        position: 'absolute',
        zIndex: 1
    },
    RightIcon:{
        right: 10,
        top: 50,
        position: 'absolute',
        zIndex: 1
    },
})
