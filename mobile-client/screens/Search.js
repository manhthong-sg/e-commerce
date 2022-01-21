import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Picker, ToastAndroid, TextInput, Image, FlatList, TouchableOpacity, ScrollView, } from 'react-native'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { COLORS, SIZES, icons, images } from '../constants'
import SERVER_URL from '../api'
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux'
import LottieView from "lottie-react-native";
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
const Search = ({ navigation }) => {
    // Redux 
    const CurrentUser = useSelector(state => state.userReducer.user);
    const Favorite = useSelector(state => state.favoriteReducer.favorite);
    var favoriteData = [];
    if (CurrentUser && Favorite.items[0] !== undefined) {
        //lay ra id nhung item da them vao favorite de hien ra
        Favorite.items[0].idProduct.forEach(item => {
            favoriteData.push(item._id)
        })
    }
    const [searchData, setSearchData] = useState(null);
    const [productsData, setProductsData] = useState(null);
    const [searchKey, setSearchKey] = useState("");
    const [itemsNum, setItemsNum] = useState(0);
    //call api product and get all products
    const fetchProducts = async () => {
        const res = await axios.get(`${SERVER_URL}/products`).catch((err) => { console.log("Fetch API failed!! " + err); });
        //const res = await getProducts.getAllProduct(); 
        if (!res) return;

        //console.log(res["data"]);
        setProductsData(res["data"]);
    }

    //use state for sort
    //onpress sort
    const [isPriceSort, setPriceSort] = useState(true); //khi chon option price sort
    const [isAlphaSort, setAlphaSort] = useState(false); //khi chon option alpha sort
    const [isPriceDown, setPriceDown] = useState(true); //price down
    const [isAlphaDown, setAlphaDown] = useState(false); //alpha down
    const [brandFilterData, setBrandFilterData] = useState(
        [
            {
                id: 1,
                name: 'Acer',
                icon: icons.acer,
            },
            {
                id: 2,
                name: 'Asus',
                icon: icons.asus,
            },
            {
                id: 3,
                name: 'Dell',
                icon: icons.dell,
            },
            {
                id: 5,
                name: 'Msi',
                icon: icons.msi2,
            },
            {
                id: 6,
                name: 'Hp',
                icon: icons.hp,
            },
            {
                id: 7,
                name: 'Lenovo',
                icon: icons.lenovo,
            },
            {
                id: 8,
                name: 'MacBook',
                icon: icons.macbook,
            },
        ]
    )
    const [selectedBrandFilter, setSelectedBrandFilter] = useState("default")

    //handle press sort option
    function onSelectSort(type) {
        if (type == 1) {
            if (!isPriceSort) {
                setAlphaSort(prev => setAlphaSort(false))
                setPriceSort(prev => setPriceSort(true))
                setPriceDown(prev => setPriceDown(!prev))
            } else {
                setAlphaSort(prev => setAlphaSort(false))
                setPriceDown(prev => setPriceDown(!prev))
            }
        } else {
            if (!isAlphaSort) {
                setPriceSort(prev => setPriceSort(false))
                setAlphaSort(prev => setAlphaSort(true))
                setAlphaDown(prev => setAlphaDown(!isAlphaDown))
            } else {
                setPriceSort(prev => setPriceSort(false))
                setAlphaDown(prev => setAlphaDown(!isAlphaDown))
            }
        }
    }
    //useEffect get all brand
    useEffect(() => {
        setSelectedBrandFilter("default")
    }, [searchKey])
    //useEffect sort by price 
    useEffect(() => {
        if (searchData && isPriceSort) {
            if (isPriceDown == false) {
                //sort obj arr by price
                let tempData = searchData.sort((firstItem, secondItem) => secondItem.price - firstItem.price)
                setSearchData(tempData);
            } else {
                let tempData = searchData.sort((firstItem, secondItem) => firstItem.price - secondItem.price)
                setSearchData(tempData);
            }
        }
    })
    //useEffect sort by alphabet
    useEffect(() => {
        if (searchData && isAlphaSort) {
            if (isAlphaDown == false) {
                //sort obj arr by alphabet
                let tempData = searchData.sort(function (a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                setSearchData(tempData);
            } else {
                let tempData = searchData.sort(function (a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                });
                setSearchData(tempData);
            }
        }
    })
    useEffect(() => {
        //fetch products data
        fetchProducts();

    }, []);
    useEffect(() => {
        if (searchKey == "") {
            setSearchData(null)
            setItemsNum(0)
        }
        else if (productsData && searchKey !== "") {
            const newData = productsData.filter((product) => {
                const itemData = product.name
                    ? product.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = searchKey.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            let count = newData.length;
            setItemsNum(count);
            let tempData = newData.sort((firstItem, secondItem) => secondItem.price - firstItem.price)
            setSearchData(tempData);
        }

    }, [searchKey]);
    const setFavorite = (fav) => dispatch({
        type: 'SET_FAVORITE',
        payload: fav
    })
    const dispatch = useDispatch();
    const handleResetFavorite = () => {
        axios.get(`${SERVER_URL}/favorites/${CurrentUser._id}`)
            .then((data) => {
                //setCartData(data["data"]);
                setFavorite(data["data"])
                // console.log(data["data"]);
            })
    }
    //handle add to favorite 
    const handleAddToFavorite = (idProduct) => {
        //console.log(Favorite)
        if (CurrentUser) {
            const url = `${SERVER_URL}/favorites`;
            axios.post(url, { idProduct: idProduct, idUser: CurrentUser._id })
                .then(() => {
                    handleResetFavorite();
                    // setIsFavorite(!isFavorite)
                    //setCount(1)
                })
                .catch((err) => {
                    console.log(err + " :ERROR!");
                })
            //setCart(item)
        } else {
            ToastAndroid.showWithGravity(
                "Sorry, you must LOGIN to add to Favorite",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
        }
    }
    const SortContainer = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Picker
                    selectedValue={selectedBrandFilter}
                    style={{
                        height: 20,
                        width: 130,
                        fontSize: 18,
                        color: COLORS.brand,
                        fontWeight: 'bold',
                        elevation: 1,
                        // backgroundColor: COLORS.white,
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                        if (itemValue !== "default") {
                            //get all data by key search
                            const newData = productsData.filter((product) => {
                                const itemData = product.name
                                    ? product.name.toUpperCase()
                                    : ''.toUpperCase();
                                const textData = searchKey.toUpperCase();
                                return itemData.indexOf(textData) > -1;
                            })
                            //filter by brand name
                            const newData1 = newData.filter(item => {
                                return item.description.brand == itemValue
                            })
                            setSearchData(newData1)
                            setItemsNum(newData1.length)
                        } else {
                            //redo all search data by keysearch
                            const newData = productsData.filter((product) => {
                                const itemData = product.name
                                    ? product.name.toUpperCase()
                                    : ''.toUpperCase();
                                const textData = searchKey.toUpperCase();
                                return itemData.indexOf(textData) > -1;
                            })
                            let count = newData.length;
                            setItemsNum(count);
                            setSearchData(newData)
                        }
                        setSelectedBrandFilter(itemValue),
                            ToastAndroid.showWithGravity(
                                `${itemValue} is choose`,
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM
                            );
                    }}
                >
                    <Picker.Item label="All Brand" value="default" />
                    {
                        brandFilterData.map(brand => {
                            return (
                                <Picker.Item label={brand.name} value={brand.name} />
                            )
                        })
                    }
                </Picker>
                {/* // price sort */}
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        padding: SIZES.padding,
                        marginLeft: 10,
                        elevation: 2,
                        backgroundColor: COLORS.white,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        //marginTop: 10,
                        bottom: 10,
                        zIndex: 1,
                    }}
                    onPress={() => onSelectSort(type = 1)}
                >
                    <Text style={{
                        fontSize: 12,
                        marginRight: 5,
                        color: isPriceSort ? COLORS.brand : COLORS.xam4
                    }}
                    >
                        Price
                    </Text>
                    {
                        isPriceDown && (
                            <FontAwesome5
                                name="arrow-down"
                                size={13.5}
                                resizeMode="contain"
                                color={isPriceSort ? COLORS.brand : COLORS.xam4}
                            />

                        )
                    }
                    {
                        !isPriceDown && (
                            <FontAwesome5
                                name="arrow-up"
                                size={13.5}
                                resizeMode="contain"
                                color={isPriceSort ? COLORS.brand : COLORS.xam4}
                            />

                        )
                    }


                </TouchableOpacity>

                {/* alpha sort             */}
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        padding: SIZES.padding,
                        marginLeft: 10,
                        elevation: 2,
                        backgroundColor: COLORS.white,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        //marginTop: 10,
                        bottom: 10,
                        zIndex: 1,
                    }}
                    onPress={() => onSelectSort(type = 2)}
                >
                    <Text style={{
                        fontSize: 12,
                        marginRight: 5,
                        color: isAlphaSort ? COLORS.brand : COLORS.xam4
                    }}
                    >
                        Alpha
                    </Text>
                    {
                        isAlphaDown && (
                            <FontAwesome5
                                name="sort-alpha-down"
                                resizeMode="contain"
                                size={14}
                                color={isAlphaSort ? COLORS.brand : COLORS.xam4}
                            />

                        )
                    }
                    {
                        !isAlphaDown && (
                            <FontAwesome5
                                name="sort-alpha-up"
                                resizeMode="contain"
                                size={14}
                                color={isAlphaSort ? COLORS.brand : COLORS.xam4}
                            />

                        )
                    }


                </TouchableOpacity>
            </View>
        )
    }
    const renderProductItems = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: COLORS.white,
                    alignItems: "center",
                    elevation: 2,
                    height: 200,
                    width: "49.9%",
                    marginRight: 5,
                    marginBottom: 5,
                    zIndex: -1,
                }}
                onPress={() => navigation.navigate("ProductDetail", item)}
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
                    onPress={() => handleAddToFavorite(item._id)}
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
                    source={{ uri: `${SERVER_URL}/images/${item.image[0]}` }}
                    resizeMode="cover"
                    style={{
                        width: '100%',
                        height: '70%'

                    }}
                />
                <Text style={{ textAlign: 'left', paddingLeft: 10, width: '100%' }}>{item.name}</Text>
                <View style={{
                    //backgroundColor: COLORS.xam2,
                    flexDirection: 'row',
                    paddingLeft: 7,
                    width: '100%',
                    height: 40,
                    alignItems: 'center'
                }}>
                    {
                        [1, 2, 3, 4, 5].map((star) => (
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
                    <Text style={{ fontWeight: 'bold', textAlign: 'right', fontSize: 16, width: '55%' }}>{item.price}$</Text>
                </View>

            </TouchableOpacity>
        )
    }
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
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
                    <Image resizeMode="contain" style={{ maxWidth: 45 }} source={require('../assets/icons/logo_brand.png')} />
                </View>
                <TextInput
                    // autoFocus
                    autoFocus
                    value={searchKey}
                    style={styles.TextInput}
                    onChangeText={(text) => setSearchKey(text)}
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
                <SortContainer />
                <View style={{
                    maxHeight: SIZES.height - 100,
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
                        (searchKey == "") && (
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
                                    }} />
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
    container: {
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
    TextInput: {
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

    LeftIcon: {

        padding: 20,
        paddingTop: 48,
        left: 40,
        position: 'absolute',
        zIndex: 1
    },
    RightIcon: {
        right: 10,
        top: 50,
        position: 'absolute',
        zIndex: 1
    },
})
