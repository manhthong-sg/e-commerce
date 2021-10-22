import React, {useState} from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import { COLORS , SIZES, icons, } from '../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CategoriesContainer = ({route, navigation}) => {

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

    //brand data
    const brandData=[
        {
            id: 1,
            name: 'MacBook',
            star: 3,
            icon: icons.acer,
            price: "1500$"
        },
        {
            id: 2,
            name: 'MacBook',
            icon: icons.asus,
            star: 2,
            price: "1500$"
        },
        {
            id: 3,
            name: 'MacBook',
            icon: icons.dell,
            star: 4,
            price: "1500$"
        },
        {
            id: 4,
            name: 'MacBook',
            icon: icons.macbook,
            star: 5,
            price: "1500$"
        },
        {
            id: 5,
            name: 'MacBook',
            icon: icons.msi2,
            star: 1,
            price: "1500$"
        },
        {
            id: 6,
            name: 'MacBook',
            icon: icons.lg,
            star: 2,
            price: "1500$"
        },
        {
            id: 7,
            name: 'MacBook',
            icon: icons.lenovo,
            star: 2,
            price: "1500$"
        },
        {
            id: 8,
            name: 'MacBook',
            icon: icons.msi,
            star: 2,
            price: "1500$"
        },{
            id: 9,
            name: 'MacBook',
            icon: icons.acer,
            star: 2,
            price: "1500$"
        },
        {
            id: 10,
            name: 'MacBook',
            icon: icons.asus,
            star: 2,
            price: "1500$"
        },
        {
            id: 11,
            name: 'MacBook',
            icon: icons.dell,
            star: 2,
            price: "1500$"
        },
        {
            id: 12,
            name: 'MacBook',
            icon: icons.macbook,
            star: 2,
            price: "1500$"
        },
        {
            id: 13,
            name: 'MacBook',
            icon: icons.msi2,
            star: 2,
            price: "1500$"
        },
        {
            id: 14,
            name: 'MacBook',
            icon: icons.lg,
            star: 2,
            price: "1500$"
        },
        {
            id: 15,
            name: 'MacBook',
            icon: icons.lenovo,
            star: 2,
            price: "1500$"
        },
        {
            id: 16,
            name: 'MacBook',
            icon: icons.msi,
            star: 2,
            price: "1500$"
        },{
            id: 17,
            name: 'MacBook',
            icon: icons.acer,
            star: 2,
            price: "1500$"
        },
        {
            id: 18,
            name: 'MacBook',
            icon: icons.asus,
            star: 2,
            price: "1500$"
        },
        {
            id: 19,
            name: 'MacBook',
            icon: icons.dell,
            star: 2,
            price: "1500$"
        },
        {
            id: 20,
            name: 'MacBook',
            icon: icons.macbook,
            star: 2,
            price: "1500$"
        },
    ]

    const initialSelectedCategory = route.params

    
    const [categories, setCategories] = useState(categoryData)
    const [selectedCategory, setSelectedCategory] = useState(
        initialSelectedCategory
    )
    const [products, setProducts] = useState(categoryData)
    
    //add to favorite
    const [selectedFavorite, setSelectedFavorite]=useState([])

    //products
    const [brands, setBrands] = useState(brandData)
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
    function onSelectCategory(category) {
        //filter restaurant
        //let categoriesList = categoryData.filter(a => a.categories.includes(category.id))

        //setRestaurants(categoriesList)

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

                {/* <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.basket}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity> */}
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
                    //onPress={() => onSelectedBrand(item)}
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
                        //onPress={() => onSelectFavorite(item)}
                    >
                        <FontAwesome5
                                //solid
                                //solid={(selectedFavorite[item.id].id == item.id) ? true : false}
                                name="heart"
                                size={20}
                                color={(selectedFavorite[4]?.id == item.id) ? COLORS.orange : COLORS.xam2} 
                            />    
                    </TouchableOpacity>
                    <Image
                        source={item.icon}
                        resizeMode="contain"
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
                        <Text style={{fontWeight: 'bold', textAlign: 'right', fontSize: 16, width: '55%'}}>{item.price}</Text>
                    </View>
                    
                </TouchableOpacity>
            )
        }
    
        return (
            <View style={{marginBottom: 125}}>
                
                <FlatList
                        data={brands}
                        style={{
                            
                        }}
                        vertical
                        numColumns={2}
                        //showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => `${item.id}`}
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
            {renderProducts()}
        </View>
    )
}

export default CategoriesContainer

const styles = StyleSheet.create({
    container:{
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

    },
})
