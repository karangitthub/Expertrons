const mentorReducer = (state = [] , action) => {
    switch(action.type){
        case 'FETCH_REQUEST':
            return action.payload;
        default:
            return state;
        
    }
}

export default mentorReducer;