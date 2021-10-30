let defaultState= {
    // user: {
    //     _id: "",
    //     fullName: "",
    //     password: "",
    //     phone: "",
    //     dateOfBirth: "",
    //     address: "",
    //     profilePicture: ""
    // }
}

let userReducer= (state = defaultState, action)=>{
    switch(action.type){
        case 'SET_USER' :{
            let newState = {...state};
            newState.user ={
                _id: action.payload._id,
                fullName: action.payload.fullName,
                password: action.payload.password,
                phone: action.payload.phone,
                dateOfBirth: action.payload.dateOfBirth,
                address: action.payload.address,
                profilePicture: action.payload.profilePicture,
            };
            //console.log(newState);
            return newState;
        }
        default: 
            return state;
    }
}

export default userReducer