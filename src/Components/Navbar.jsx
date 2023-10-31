import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../features/useSlice";
import '../styling/navbar.css'
const Navbar = () => {
    const [inputValue,setInputValue] = useState('');
    const isSignedIn = useSelector((state) => state.user.isSignedIn)
    const userData = useSelector((state) => state.user.userData)
    const dispatch = useDispatch();
    const logout = (response) => {
        dispatch(actions.setSignedIn(false))
        dispatch(actions.setUserData(null))
    }
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(actions.setInput(inputValue))
    }
  return (
    <div className="navbar">
        <h1 className="navbar__header">
            BlogThach 💬
        </h1>
        {isSignedIn &&(
            <div className="blog__search">
                <input type="text" className="search" placeholder="Search for a blog" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <button className="submit" onClick={handleClick}>
                    Search
                </button>
            </div>
        )}
        {isSignedIn ? (
            <div className="navbar__user__data">
                <Avatar 
                className="user"
                src={userData?.imageUrl}
                alt={userData?.name}
                />
            <h1 className="signedIn">
                {userData?.givenName}
            </h1>
            <GoogleLogout
            clientId="1084334404054-jch76dh3eqbj787ostatku2t93h61muv.apps.googleusercontent.com"
            render={(renderProps) =>{
                return (
                    <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="logout__button"
                    >
                        Logout 😦
                    </button>
                )
            }}
            onLogoutSuccess={logout}
            />
            </div>
        ) : (
            <h1 className="notSignedIn">User not available</h1>
        )}
    </div>
  )
}

export default Navbar