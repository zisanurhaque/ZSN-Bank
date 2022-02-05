import React from "react";
import { Redirect } from "react-router-dom";
import UserEntry from "../Component/UserEntry";

const AddUser = ({login, config, nameHandler, ageHandler, imageHandler, idHandler, loanHandler, interestHandler, durationHandler, formHandler, monthlyDebt, interestValue}) => {

    if(config.user !== login.user && config.password !== login.password){
        return <Redirect to={"/login"}/>
    }else{
        return(
            <>
                <main>
                    <UserEntry 
                        nameHandler={nameHandler}
                        ageHandler={ageHandler}
                        imageHandler={imageHandler}
                        idHandler={idHandler}
                        loanHandler={loanHandler}
                        interestHandler={interestHandler}
                        durationHandler={durationHandler}
                        formHandler={formHandler}
                        monthlyDebt={monthlyDebt}
                        interestValue={interestValue}
                    />
                </main>
            </>
        )
    }
    
}

export default AddUser;