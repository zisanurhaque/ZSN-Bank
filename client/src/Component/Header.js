import Plus from "@material-ui/icons/Add";
import Minus from "@material-ui/icons/Minimize";
import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({config, login, balanceInc, balanceDec ,handleLogOut, handleMenu}) => {

    if(config.user !== login.user && config.password !== login.password){

        return(
            <>
                <div className="header">
                    <div className="brand">
                        <a href="/"><h2>ZSN Bank</h2></a>
                    </div>
    
                    <div className="menu">
                        <NavLink exact activeStyle={{color: "pink"}} to={"/"}>Home</NavLink>
                        <NavLink exact activeStyle={{color: "pink"}} to={"/users"}>Members</NavLink>
                        <NavLink exact activeStyle={{color: "pink"}} to={"/addUser"}>Add Member</NavLink>
                    </div>
                </div>
            </>
        )
        
    }

    else{
        return(
            <>
                <div className="header">
                    <div className="brand">
                        <a href="/"><h2>ZSN Bank</h2></a>
                    </div>
                    
                    <div className="addBalance">
                        <button className="minus" onClick={(e) => balanceDec(e)}><Minus/></button>
                        <p>Add Balance</p>
                        <button onClick={(e) => balanceInc(e)}><Plus/></button>
                    </div>
    
                    <div className="menu">
                        <NavLink exact activeStyle={{color: "pink"}} to={"/"}>Home</NavLink>
                        <NavLink exact activeStyle={{color: "pink"}} to={"/users"}>Members</NavLink>
                        <NavLink exact activeStyle={{color: "pink"}} to={"/addUser"}>Add Member</NavLink>
                        <button onClick={(e) => handleLogOut(e)}>LogOut</button>
                    </div>
                </div>
            </>
        )
    }
    
}
export default Header;