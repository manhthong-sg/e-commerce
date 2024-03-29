import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, Image, View, FlatList, StatusBar, TouchableOpacity, Animated, ToastAndroid, TextInput, ScrollView } from 'react-native'
import { COLORS , SIZES, icons, images } from '../constants'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import SERVER_URL from '../api'
import { useSelector, useDispatch } from 'react-redux';

const ProductDetail = ({navigation, route}) => {
    // get current user 
    const CurrentUser = useSelector(state=> state.userReducer.user);
    const Favorite = useSelector(state=> state.favoriteReducer.favorite.items);
    //console.log(Favorite[0].idProduct);
    const {
        _id,
        name,
        image,
        description,
        price,
        remaining,
        star,
        rating,
    }=route.params;
    
    const [count, setCount]=useState(1);
    const [total, setTotal]=useState(price);
    const [isFavorite, setIsFavorite]=useState(()=>{
        let flag=false;
        if(CurrentUser && Favorite[0] !== undefined){
            Favorite[0].idProduct.forEach(item => {
                if(item._id == _id){
                    flag=true;
                }
            });
            
        }
        return flag;
    });
    const setCart=(cart)=> dispatch({
        type: 'SET_CART', 
        payload: cart
    })
    const setFavorite=(fav)=> dispatch({
        type: 'SET_FAVORITE', 
        payload: fav
    })
    const dispatch = useDispatch();

    const handleResetCart=()=>{
        axios.get(`${SERVER_URL}/carts/${CurrentUser._id}`)
                .then((data)=>{
                    //setCartData(data["data"]);
                    setCart(data["data"])
                    // console.log(data["data"]);
                })
    }
    const handleResetFavorite=()=>{
        axios.get(`${SERVER_URL}/favorites/${CurrentUser._id}`)
                .then((data)=>{
                    //setCartData(data["data"]);
                    setFavorite(data["data"])
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
            const url=`${SERVER_URL}/carts`;
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
    
    //handle add to favorite 
    const handleAddToFavorite=()=>{
        //console.log(Favorite)
        if(CurrentUser){
            const url=`${SERVER_URL}/favorites`;
            axios.post(url, {idProduct: _id, idUser: CurrentUser._id})
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
                "Sorry, you must LOGIN to add to Favorite",
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
                                        source={{uri: `${SERVER_URL}/images/${item}`}}
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
                <View style={{
                    flexDirection: 'row',
                    paddingLeft: 22,
                    width: '100%',
                    height: 20,
                    // backgroundColor: COLORS.xam1,
                    alignItems: 'center'
                }}>
                    {
                        [1, 2, 3, 4, 5].map((rate)=>(
                            <FontAwesome5 
                            size={10} 
                            solid name='star' 
                            color={(rate <= star) ? COLORS.orange : COLORS.xam2}
                            style={{
                                marginLeft: 3
                            }}
                            />
                            ))
                    }
                    <Text style={{
                        color: COLORS.brand,
                        marginLeft: 10,
                        fontSize: 15,
                        // fontWeight: 'bold'
                    }}>({rating.length} rates)</Text>
                </View>
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
                    backgroundColor: isFavorite ? COLORS.orange: COLORS.xam1,
                    opacity: 10,
                    elevation: 10,
                    shadowColor: COLORS.orange,
                    top: -40,
                    right: 10,
                    //zIndex: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                    onPress={handleAddToFavorite}
                >
                    <FontAwesome5 
                        solid={isFavorite} 
                        name='heart' 
                        size={25} 
                        color={isFavorite ? COLORS.white: COLORS.black}
                        />
                </TouchableOpacity>

                
            </View>
        )
    }

    //renderRatingComment
    const renderRatingComment = () => {
      const renderItem = ({ item }) => {
        return (
          <View
            style={{
              backgroundColor: COLORS.lightGray,
              alignItems: "center",
              justifyContent: "center",
              elevation: 0.3,
              paddingTop: 10,
              marginBottom: 5,
              borderRadius: 5,
              elevation: 0.8,
              paddingBottom: 10,
            }}
            //onPress={() =>navigation.navigate("ProductDetail", item.idProduct)}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={styles.ImageCart}>
                <Image
                  source={icons.defaultAvatar_male}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    paddingLeft: 10,
                    fontSize: 16,
                    width: "100%",
                    // backgroundColor: COLORS.xam1
                  }}
                >
                  {item.user.name} 
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 7,
                    width: "100%",
                    height: 20,
                    // backgroundColor: COLORS.xam1,
                    alignItems: "center",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesome5
                      size={10}
                      solid
                      name="star"
                      color={star <= item.star ? COLORS.orange : COLORS.xam2}
                      style={{
                        marginLeft: 3,
                      }}
                    />
                  ))}
                  <Text style={{color: COLORS.brand}}>   {item.star}/5</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.xam3,
                      marginLeft: 5,
                      minHeight: 30,
                    }}
                  >
                    {item.comment}
                  </Text>
                </View>
                <Text
                style={{
                    color: COLORS.xam3,
                    marginLeft: 5,
                }}
                >
                {item.time}
                </Text>
              </View>
              <View>

              </View>
            </View>
          </View>
        );
      };
      return (
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.lightGray,
              elevation: 1,
              marginTop: 20,
              height: 60,
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                marginLeft: 20,
                flexDirection: "row",
                // justifyContent: 'center',
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  width: "85%",
                }}
              >
                Product Ratings
              </Text>
              <TouchableOpacity style={{}}>
                <Text>See all</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 22,
                width: "100%",
                height: 20,
                // backgroundColor: COLORS.xam1,
                alignItems: "center",
              }}
            >
              {[1, 2, 3, 4, 5].map((rate) => (
                <FontAwesome5
                  size={10}
                  solid
                  name="star"
                  color={rate <= star ? COLORS.orange : COLORS.xam2}
                  style={{
                    marginLeft: 3,
                  }}
                />
              ))}
              <Text
                style={{
                  color: COLORS.brand,
                  marginLeft: 10,
                  fontSize: 15,
                  // fontWeight: 'bold'
                }}
              >
                {star}/5 ({rating.length} rates)
              </Text>
            </View>
          </View>
          <FlatList
            data={rating}
            style={{
              //height: 210,
              backgroundColor: COLORS.white,
              // maxHeight: 210,
            }}
            vertical
            numColumns={1}
            //showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item._id}`}
            renderItem={renderItem}
            contentContainerStyle={{}}
          />
        </View>
      );
    };

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
                    {
                        remaining>0 && (
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

                        )
                    }
                    {
                        remaining<1 && (
                            <TouchableOpacity style={{
                                width: 150,
                                backgroundColor: COLORS.do2,
                                borderRadius: 2,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 20
                            }}
                                onPress={()=>{
                                    ToastAndroid.showWithGravity(
                                        "We so sorry it sold out. Please choose another item.",
                                        ToastAndroid.LONG,
                                        ToastAndroid.BOTTOM
                                      );
                                }}
                            >
                                <Text style={{
                                    color: COLORS.white,
                                    fontWeight: 'bold',

                                }}>SOLD OUT</Text>
                            </TouchableOpacity>

                        )
                    }
                </View>
        )
    }
    return (
        // <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView style={{flex: 1, marginBottom: 120}}>
                    {randerImagesProduct()}
                    {renderDescription()}
                    {renderRatingComment()}
                </ScrollView>
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
