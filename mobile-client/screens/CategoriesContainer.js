import React, {useState} from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import { COLORS , SIZES, icons, } from '../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CategoriesContainer = ({navigation}) => {

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
            icon: icons.acer,
        },
        {
            id: 2,
            name: 'MacBook',
            icon: icons.asus,
        },
        {
            id: 3,
            name: 'MacBook',
            icon: icons.dell,
        },
        {
            id: 4,
            name: 'MacBook',
            icon: icons.macbook,
        },
        {
            id: 5,
            name: 'MacBook',
            icon: icons.msi2,
        },
        {
            id: 6,
            name: 'MacBook',
            icon: icons.lg,
        },
        {
            id: 7,
            name: 'MacBook',
            icon: icons.lenovo,
        },
        {
            id: 8,
            name: 'MacBook',
            icon: icons.msi,
        },{
            id: 9,
            name: 'MacBook',
            icon: icons.acer,
        },
        {
            id: 10,
            name: 'MacBook',
            icon: icons.asus,
        },
        {
            id: 11,
            name: 'MacBook',
            icon: icons.dell,
        },
        {
            id: 12,
            name: 'MacBook',
            icon: icons.macbook,
        },
        {
            id: 13,
            name: 'MacBook',
            icon: icons.msi2,
        },
        {
            id: 14,
            name: 'MacBook',
            icon: icons.lg,
        },
        {
            id: 15,
            name: 'MacBook',
            icon: icons.lenovo,
        },
        {
            id: 16,
            name: 'MacBook',
            icon: icons.msi,
        },{
            id: 17,
            name: 'MacBook',
            icon: icons.acer,
        },
        {
            id: 18,
            name: 'MacBook',
            icon: icons.asus,
        },
        {
            id: 19,
            name: 'MacBook',
            icon: icons.dell,
        },
        {
            id: 20,
            name: 'MacBook',
            icon: icons.macbook,
        },
    ]

    const [categories, setCategories] = useState(categoryData)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [products, setProducts] = useState(categoryData)
    
    //products
    const [brands, setBrands] = useState(brandData)
    const [selectedBrand, setSelectedBrand] = useState(null)

    //onpress sort
    const [isPriceSort, setPriceSort]=useState(false); //khi chon option price sort
    const [isAlphaSort, setAlphaSort]=useState(false); //khi chon option alpha sort
    const [isPriceDown, setPriceDown]=useState(false); //price down
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

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={()=> navigation.navigate("Home")}
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
                                    resizeMode="contain"
                                    color= {isPriceSort ? COLORS.brand : COLORS.xam4}
                                />

                            )
                        }
                        {
                            !isPriceDown && (
                                <FontAwesome5
                                    name="arrow-up"
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
                                    name="arrow-down"
                                    resizeMode="contain"
                                    color= {isAlphaSort ? COLORS.brand : COLORS.xam4}
                                />

                            )
                        }
                        {
                            !isAlphaDown && (
                                <FontAwesome5
                                    name="arrow-up"
                                    resizeMode="contain"
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
        const renderBrandItems = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        //padding: SIZES.padding,
                        //marginLeft: 16,
                        backgroundColor: (selectedBrand?.id == item.id) ? COLORS.white : COLORS.white,
                        //borderRadius: 10,
                        alignItems: "center",
                        elevation: 1 ,
                        justifyContent: "center",
                        height: 200,
                        width: "49.9%",
                        marginRight: 5,
                        //marginTop: 10,
                        //bottom: 40,
                        zIndex: 2,
                        marginBottom: 5,
                    }}
                    //onPress={() => onSelectedBrand(item)}
                >     
                    <Image
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                            width: 80,
                            height: 80
                        }}
                    />
                    
                </TouchableOpacity>
            )
        }
    
        return (
            <View style={{paddingBottom: 10}}>
                
                <FlatList
                        data={brands}
                        style={{
                            
                        }}
                        vertical
                        numColumns={2}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderBrandItems}
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
