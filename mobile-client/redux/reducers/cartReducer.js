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
        case 'SET_INSCREASE':{
            //get id product that want to increase
            let idUpdate=action.payload
            // console.log(idUpdate);
            // console.log(state.cart.items);
            let items = state.cart.items;
            let priceTotal=state.cart.total;
            items.map(item => {
                if(item.idProduct._id==idUpdate){
                    //tang itemNum cua sp do len 1
                    item.itemNum+=1;
                    
                    //cong gia tien no len khi tang 1 sp
                    priceTotal+=item.idProduct.price
                }
            });
            cart= {
                ...state.cart,
                itemNum: state.cart.itemNum+1,
                total: priceTotal,
            }
            return {
                cart
            }
        }
        case 'SET_DESCREASE':{
            //get id product that want to increase
            let idUpdate=action.payload
            // console.log(idUpdate);
            // console.log(state.cart.items);
            let items = state.cart.items;
            let priceTotal=state.cart.total;
            items.map(item => {
                if(item.idProduct._id==idUpdate){
                    //tang itemNum cua sp do len 1
                    item.itemNum-=1;
                    
                    //cong gia tien no len khi tang 1 sp
                    priceTotal-=item.idProduct.price
                }
            });
            cart= {
                ...state.cart,
                itemNum: state.cart.itemNum-1,
                total: priceTotal,
            }
            return {
                cart
            }
        }
        default: 
            return state;
    }
}

export default cartReducer