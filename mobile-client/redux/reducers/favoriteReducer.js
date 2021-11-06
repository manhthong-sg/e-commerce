import AsyncStorage from '@react-native-async-storage/async-storage';

let defaultState= {
    favorite: {
        items: {
            
        }
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

let favoriteReducer= (state = defaultState, action)=>{
    switch(action.type){
        case 'SET_FAVORITE' :{
            favorite = {
                items: action.payload,
            }
            //console.log(favorite);
            //storeData(cart)
            //console.log(newState);
            return {
               favorite
            }
        }
        default: 
            return state;
    }
}

export default favoriteReducer