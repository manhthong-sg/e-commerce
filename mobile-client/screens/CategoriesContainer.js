import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Picker, ToastAndroid, Text, View, Platform, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import { COLORS, SIZES, icons, } from '../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SERVER_URL from '../api'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import LottieView from "lottie-react-native";

const CategoriesContainer = ({ route, navigation }) => {
    const CurrentUser = useSelector(state => state.userReducer.user);
    const Favorite = useSelector(state => state.favoriteReducer.favorite);
    var favoriteData = [];
    if (CurrentUser && Favorite.items[0] !== undefined) {
        //lay ra id nhung item da them vao favorite de hien ra
        Favorite.items[0].idProduct.forEach(item => {
            favoriteData.push(item._id)
        })
    }
    // data categories 
    const categoryData = [
        {
            id: 1,
            name: "Bussiness",
            icon: icons.bussiness,
        },
        {
            id: 2,
            name: "Gaming",
            icon: icons.gaming,
        },
        {
            id: 3,
            name: "Graphics",
            icon: icons.do_hoa,
        },
        {
            id: 4,
            name: "Students",
            icon: icons.student1,
        },
        {
            id: 5,
            name: "Like new 99%",
            icon: icons.student2,
        },
    ]

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
                    setIsFavorite(!isFavorite)
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
    const initialSelectedCategory = route.params;
    //console.log(initialSelectedCategory);
    // var [productsData, setProductData] = useState(null);
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(categoryData)
    const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory)
    const [isFavorite, setIsFavorite] = useState(false);


    // //call api product and get all products
    // const fetchProducts = async () => {
    //     const res = await axios.get(`${SERVER_URL}/products`).catch((err) => { console.log("Fetch API failed!! " + err); });
    //     //const res = await getProducts.getAllProduct(); 
    //     if (!res) return;

    //     //console.log(res["data"]);
    //     setProductData(res["data"]);
    // }



    useEffect(() => {
        //fetch data initial products category
        onSelectCategory(initialSelectedCategory)

    }, []);


    useEffect(() => {
        //fetch products data
        onSelectCategory(selectedCategory);
    }, [selectedCategory]);

    //products

    const [selectedBrand, setSelectedBrand] = useState(null)

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

                // let tempData = products.sort((firstItem, secondItem) => firstItem.price - secondItem.price)
                // setProducts(tempData);

            } else {
                setAlphaSort(prev => setAlphaSort(false))
                setPriceDown(prev => setPriceDown(!prev))

                // // setAlphaSort(false)
                // let tempData = products.sort((firstItem, secondItem) => secondItem.price - firstItem.price)
                // setProducts(tempData);

            }
        } else {
            if (!isAlphaSort) {
                setPriceSort(prev => setPriceSort(false))
                setAlphaSort(prev => setAlphaSort(true))
                setAlphaDown(prev => setAlphaDown(!isAlphaDown))

                // let tempData = products.sort(function(a, b) {
                //     var textA = a.name.toUpperCase();
                //     var textB = b.name.toUpperCase();
                //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                // });
                // setProducts(tempData);

            } else {
                setPriceSort(prev => setPriceSort(false))
                setAlphaDown(prev => setAlphaDown(!isAlphaDown))

                // let tempData = products.sort(function(a, b) {
                //     var textA = a.name.toUpperCase();
                //     var textB = b.name.toUpperCase();
                //     return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                // });
                // setProducts(tempData);

            }
        }
    }
    useEffect(() => {
        if (products && isPriceSort) {
            if (isPriceDown == false) {
                //sort obj arr by price
                let tempData = products.sort((firstItem, secondItem) => secondItem.price - firstItem.price)
                setProducts(tempData);
            } else {
                let tempData = products.sort((firstItem, secondItem) => firstItem.price - secondItem.price)
                setProducts(tempData);
            }
        }
    })

    useEffect(() => {
        if (products && isAlphaSort) {
            if (isAlphaDown == false) {
                //sort obj arr by alphabet
                let tempData = products.sort(function (a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                setProducts(tempData);
            } else {
                let tempData = products.sort(function (a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                });
                setProducts(tempData);
            }
        }
    })

    //onPress category
    const onSelectCategory = (category) => {
        // refresh Filter by brand
        setSelectedBrandFilter("default")
        //filter restaurant
        axios.get(`${SERVER_URL}/products/categories/${category.id}`)
            .then((productsList) => {
                setProducts(productsList["data"]);
                setSelectedCategory(category)
                setPriceSort(true)
                setPriceDown(true)
                setAlphaDown(false)
                setAlphaSort(false)
            })
    }

    //render header of this screens
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => {

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
                            marginRight: 18,
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: COLORS.xam4 }}>Main Categories</Text>
                    </View>
                </View>
            </View>
        )
    }



    //render categories list item
    const renderCategories = () => {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        marginLeft: 10,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.brand : null,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        //marginTop: 10,
                        bottom: 10,
                        zIndex: 1,
                    }}
                    onPress={() => onSelectCategory(item)}

                >
                    <View
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: 35,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.xam1
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 40,
                                height: 40
                            }}
                        />
                    </View>

                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.xam4,
                            fontWeight: 'bold'
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }


        return (
            <View style={{ paddingTop: 15 }}>

                <FlatList
                    data={categories}
                    style={{
                        zIndex: 1,
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding }}
                />
            </View>
        )
    }

    //render filter
    const renderSort = () => {
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
                    onValueChange={async (itemValue, itemIndex) => {
                        if (itemValue !== "default") {
                            axios.get(`${SERVER_URL}/products/categories/${selectedCategory.id}`)
                                .then((productsList) => {
                                    const newData = productsList["data"].filter(item => {
                                        return item.description.brand == itemValue
                                    })
                                    setProducts(newData)
                                })
                            //filter by brand name
                            // const newData = products.filter(item => {
                            //     return item.description.brand == itemValue
                            // })
                            // setProducts(newData)
                        } else {
                            //redo all search data by keysearch
                            onSelectCategory(selectedCategory);
                            // setProducts(newData)
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

    // render products 
    const renderProducts = () => {

        //if (!productsData) return <Text>Loading...</Text>

        const renderProductItems = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        backgroundColor: (selectedBrand?.id == item.id) ? COLORS.white : COLORS.white,
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

            <View style={{ marginBottom: 125, maxHeight: SIZES.height - 50 }}>

                <FlatList
                    // data={!products ? productsData : products}
                    data={products}
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
            </View>

        )
    }


    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderCategories()}
            {renderSort()}
            {products ? renderProducts() : (
                <View style={{
                    marginTop: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                    <LottieView
                        source={require("../components/AnimationIcons/itemsLoading.json")}
                        autoPlay
                        loop={true}
                        resizeMode='contain'
                        style={{ height: 130 }}
                    />
                </View>
            )
            }
        </View>
    )
}

export default CategoriesContainer

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

    },
})
