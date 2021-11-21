import AsyncStorage from '@react-native-async-storage/async-storage';

let defaultState= {
    order: {
        idUser:"",
        DeliveryInfo:{
            name: "",
            phone: "",
            address: {
                province: "",
                district: "",
                ward: "",
                apartmentAddress: ""
            }
        },
        OrderItems: [],
        Voucher: "",
        DeliveryFree: 0,
        Total: 0,
        PaymentMethod: "",
        PaymentDetail: "",
        Status: "",
    },
}


let orderReducer= (state = defaultState, action)=>{
    switch(action.type){
        case 'SET_ORDER' :{
            let myOrder = action.payload;
            order= {
                idUser: myOrder.idUser,
                DeliveryInfo: {
                    name: myOrder.DeliveryInfo.name,
                    phone: myOrder.DeliveryInfo.phone,
                    address: {
                        province: myOrder.DeliveryInfo.address.province,
                        district: myOrder.DeliveryInfo.address.district,
                        ward: myOrder.DeliveryInfo.address.ward,
                        apartmentAddress: myOrder.DeliveryInfo.address.apartmentAddress,
                    }
                },
                OrderItems: myOrder.OrderItems,
                Voucher: myOrder.Voucher,
                DeliveryFree: myOrder.DeliveryFree,
                Total: myOrder.Total,
                PaymentMethod: myOrder.PaymentMethod,
                PaymentDetail: myOrder.PaymentDetail,
                Status: myOrder.Status,
            }

            return {
               order
            }
        }
        default: 
            return state;
    }
}

export default orderReducer