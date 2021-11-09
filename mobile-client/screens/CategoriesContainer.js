import React, {useEffect, useState} from 'react'
import { Image, ActivityIndicator,SafeAreaView, StyleSheet, ToastAndroid, Text, View, Platform, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import { COLORS , SIZES, icons, } from '../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SERVER_URL from '../api'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'

const CategoriesContainer = ({route, navigation}) => {
    const CurrentUser = useSelector(state=> state.userReducer.user);
    const Favorite = useSelector(state=> state.favoriteReducer.favorite);
    var favoriteData=[];
    if(CurrentUser){
        //lay ra id nhung item da them vao favorite de hien ra
        Favorite.items[0].idProduct.forEach(item=>{
            favoriteData.push(item._id)
        })
    }
    //console.log(favoriteData);
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
                setIsFavorite(!isFavorite)
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
    const initialSelectedCategory = route.params;
    //console.log(initialSelectedCategory);
    var [productsData, setProductData]=useState(null);
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(categoryData)
    const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory)
    const [isFavorite, setIsFavorite]=useState(false);
    
    
    //call api product and get all products
    const fetchProducts = async () => {
        const res = await axios.get(`${SERVER_URL}/products`).catch((err) => { console.log("Fetch API failed!! " + err); }); 
        //const res = await getProducts.getAllProduct(); 
        if (!res) return;

        //console.log(res["data"]);
        setProductData(res["data"]);
    }


    useEffect(() => {
        //fetch products data
        fetchProducts();
        
    }, []);


    useEffect(() => {
        //fetch products data
        // if (products)
            onSelectCategory(selectedCategory);
        // else return;
        
    }, [selectedCategory]);
    
    

    
    
    
    
    //add to favorite
    const [selectedFavorite, setSelectedFavorite]=useState([])
    
    //products
    
    const [selectedBrand, setSelectedBrand] = useState(null)

    //onpress sort
    const [isPriceSort, setPriceSort]=useState(true); //khi chon option price sort
    const [isAlphaSort, setAlphaSort]=useState(false); //khi chon option alpha sort
    const [isPriceDown, setPriceDown]=useState(true); //price down
    const [isAlphaDown, setAlphaDown]=useState(false); //alpha down
    
    //handle press sort option
    function onSelectSort(type){
        if(type==1){
            if(!isPriceSort){
                setAlphaSort(false)
                setPriceSort(true)
                setPriceDown(!isPriceDown)
            }else{
                setAlphaSort(false)
                setPriceDown(!isPriceDown)
            }
        }else{
            if(!isAlphaSort){
                setPriceSort(false)
                setAlphaSort(true)
                setAlphaDown(!isAlphaDown)
            }else{
                setPriceSort(false)
                setAlphaDown(!isAlphaDown)
            }
        }
    }
    //onPress category
    const onSelectCategory = async (category) =>{
        //filter restaurant
        let productsList = await axios.get(`${SERVER_URL}/products/categories/${category.id}`)
        
        setProducts(productsList["data"])
        setSelectedCategory(category)
    }

    //onPress favorite
    function onSelectFavorite(item) {
        //filter restaurant
        //let categoriesList = categoryData.filter(a => a.categories.includes(category.id))

        //setRestaurants(categoriesList)
        //console.log((oldDta)=> [...oldDta, {}])
        setSelectedFavorite(prev=> [...prev,item])
        console.log(selectedFavorite)
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
                            marginRight: 18,
                        }}
                    >
                        <Text style={{fontWeight: 'bold', fontSize: 25, color: COLORS.xam4}}>Main Categories</Text>
                    </View>
                </View>
            </View>
        )
    }


    
    //render categories list item
    const renderCategories=()=>{
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
                        zIndex:1,
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
            <View style={{paddingTop: 15}}>
                
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
    const renderSort=()=>{
        return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
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
                        zIndex:1,
                    }}
                    onPress={() => onSelectSort(type=1)}
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
                                    color= {isPriceSort ? COLORS.brand : COLORS.xam4}
                                />

                            )
                        }
                        {
                            !isPriceDown && (
                                <FontAwesome5
                                    name="arrow-up"
                                    size={13.5}
                                    resizeMode="contain"
                                    color= {isPriceSort ? COLORS.brand : COLORS.xam4}
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
                        zIndex:1,
                    }}
                    onPress={() => onSelectSort(type=2)}
                >
                        <Text style={{
                            fontSize: 12,
                            marginRight: 5,
                            color: isAlphaSort ? COLORS.brand: COLORS.xam4
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
                                    color= {isAlphaSort ? COLORS.brand : COLORS.xam4}
                                />

                            )
                        }
                        {
                            !isAlphaDown && (
                                <FontAwesome5
                                    name="sort-alpha-up"
                                    resizeMode="contain"
                                    size={14}
                                    color= {isAlphaSort ? COLORS.brand : COLORS.xam4}
                                />

                            )
                        }
    
                    
                </TouchableOpacity>
            </View>
        )
    }

    // render products 
    const renderProducts=()=>{

        //if (!productsData) return <Text>Loading...</Text>
        
        const renderProductItems = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        backgroundColor: (selectedBrand?.id == item.id) ? COLORS.white : COLORS.white,
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
                        source={{uri: `http://192.168.1.7:3000/images/${item.image[0]}`}}
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

                <View style={{marginBottom: 125, maxHeight: SIZES.height-50}}>
                    
                    <FlatList
                            data={!products ? productsData: products}
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
            {productsData ? renderProducts() : (
                    <View style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ActivityIndicator size ="large" color ={COLORS.brand}/>
                    </View>
                )
            }
        </View>
    )
}

export default CategoriesContainer

const styles = StyleSheet.create({
    container:{
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

    },
})
