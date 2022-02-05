import React from "react";
import { Redirect } from "react-router-dom";
import UserList from "../Component/UserList";

const Users = ({login, config,userList, handleDelete}) => {

    if(config.user !== login.user && config.password !== login.password){
        return <Redirect to={"/login"}/>
    }else{
        return(
            <>
                <main>
                    <UserList
                        userList={userList}
                        handleDelete={handleDelete}
                    />
                </main>
            </>
        )
    }
    
}

export default Users;