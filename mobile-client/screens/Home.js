import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native'

import HomeHeader from '../components/Home/HomeHeader'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import { COLORS , SIZES, icons} from '../constants'
const Home = () => {

    // data categories 
    const categoryData = [
        {
            id: 1,
            name: "Bussiness",
            icon: icons.logo,
        },
        {
            id: 2,
            name: "Gaming",
            icon: icons.logo,
        },
        {
            id: 3,
            name: "Graphics",
            icon: icons.logo,
        },
        {
            id: 4,
            name: "Students",
            icon: icons.logo,
        },
        {
            id: 5,
            name: "Burgers",
            icon: icons.logo,
        },
        {
            id: 6,
            name: "Noodles",
            icon: icons.logo,
        },
        {
            id: 7,
            name: "Hot Dogs",
            icon: icons.logo,
        },
        {
            id: 8,
            name: "Salads",
            icon: icons.logo,
        },
        {
            id: 9,
            name: "Burgers",
            icon: icons.logo,
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
            icon: icons.msi,
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
        },

    ]
    const [categories, setCategories] = useState(categoryData)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [brand, setBrand] = useState(brandData)

    const renderCategories=()=>{
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        marginLeft: 10,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.vang1 : COLORS.brand,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        //marginTop: 10,
                        bottom: 10,
                        zIndex: 2,
                    }}
                    //onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: 35,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
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
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.white,
                            fontWeight: 'bold'
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }
        
        
        return (
            <View>
                <View style={styles.MainCategoriesHeader}>
                    <Text style={{
                        color: COLORS.xam4, 
                        fontSize: 26,
                        paddingLeft: 10, 
                        }}
                    >
                        Main Categories
                    </Text>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        right: 12,
    
                    }}>
                        <Text style={{color: COLORS.xam4}}>See all {'>'} </Text>
                    </TouchableOpacity>
                </View>
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

    const renderBrand=()=>{
        const renderBrandItems = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        //padding: SIZES.padding,
                        marginLeft: 12,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.vang1 : COLORS.white,
                        borderRadius: 10,
                        alignItems: "center",
                        elevation: 1 ,
                        justifyContent: "center",
                        height: 40,
                        width: 110,
                        marginRight: 10,
                        //marginTop: 10,
                        //bottom: 40,
                        zIndex: 2,
                        marginBottom: 10,
                    }}
                    //onPress={() => onSelectCategory(item)}
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
            <View style={{backgroundColor: COLORS.do1, paddingBottom: 10, borderRadius: 10}}>
                <View style={styles.PopularBrandHeader}>
                    <Text style={{
                        color: COLORS.white, 
                        fontSize: 26,
                        paddingLeft: 10, 
                        }}
                    >
                        Popular Brand
                    </Text>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        right: 12,
    
                    }}>
                        <Text style={{color: COLORS.white}}>See all {'>'} </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                        data={brand}
                        style={{
                            zIndex: 1,
                        }}
                        vertical
                        numColumns={4}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => `${item.id}`}
                        renderItem={renderBrandItems}
                        contentContainerStyle={{  }}
                    />    
            </View>
        )
    }
    return (
        // <KeyboardAvoidingWrapper>
            <View style={styles.container}>
                <HomeHeader/>
                {renderCategories()}
                {renderBrand()}
            </View>

        // {/* </KeyboardAvoidingWrapper> */}
    )
}

export default Home



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    MainCategoriesHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: COLORS.orange,
        bottom: 20,
        marginBottom: -10,
        zIndex: -2,
        //position: 'absolute',
        //marginTop: 220,
    },
    PopularBrandHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: COLORS.orange,
        //top: 10,
        marginBottom: 15,
        zIndex: -2,
        //position: 'absolute',
        //marginTop: 220,
    }
})
