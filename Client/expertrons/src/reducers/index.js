import loggedReducer from './../reducers/isLogged'
import mentorReducer from './../reducers/mentorDetails'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    login:loggedReducer,
    mentor:mentorReducer
})

export default allReducers;