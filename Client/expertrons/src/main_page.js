import React ,{useState} from 'react'
import SignIn from './admin/sign_in'
import HomePage from './admin/home_page'
import { useSelector} from 'react-redux'

export default function MainPage() {

    const loggedIn = useSelector(state => state.loggedIn);
    
    return (
        <div>
            {loggedIn ? <HomePage/>: <SignIn/>}
        </div>
    )
}
