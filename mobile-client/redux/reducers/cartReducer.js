import AsyncStorage from '@react-native-async-storage/async-storage';

let defaultState= {
    cart: {
        items: [],
        itemNum: 0,
        total: 0,
    },
}

const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('CART', jsonValue)
    } catch (e) {
      // saving error
      console.log("Error: ", e);
    }
  }

let cartReducer= (state = defaultState, action)=>{
    switch(action.type){
        case 'SET_CART' :{
            let items = action.payload;
            let count=0;
            let priceTotal=0;
            items.forEach(item => {
                count=count+item.itemNum
                priceTotal=priceTotal+(item.itemNum)*(item.idProduct.price)
            });
            
            //let newState = {...state};

            cart= {
                items: items,
                itemNum: count,
                total: priceTotal,
            }
            //console.log(items);
            //storeData(cart)
            //console.log(newState);
            return {
               cart
            }
        }
        default: 
            return state;
    }
}

export default cartReducer