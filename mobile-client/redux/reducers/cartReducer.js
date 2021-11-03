let defaultState= {
    cart: {
        items: [],
        itemNum: 0,
        total: 100,
    },
}

let cartReducer= (state = defaultState, action)=>{
    switch(action.type){
        case 'SET_CART' :{
            let items=[...state.cart.items=action.payload];
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