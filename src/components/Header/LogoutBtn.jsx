import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from "../../store/authSlice"
import { Link } from 'react-router-dom'
function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())
        window.location.reload(false);

        })        

    }
    return (
                <button className='inline-block duration-200 rounded-full'
        onClick={logoutHandler}>Logout</button>

    )
}

export default LogoutBtn;
