import React from "react";
import { Route, Switch } from "react-router-dom";
import AddUser from "../Pages/AddUser";
import Homepage from "../Pages/Homepage";
import Profile from "../Pages/Profile";
import Users from "../Pages/Users";
import Login from "./Login";
import NotFound from "./NotFound";

const Routes = ({login, config, balance, totalInvest, totalCollection, totalProfit, nameHandler, ageHandler, imageHandler, idHandler, loanHandler, interestHandler, durationHandler, formHandler, userList, monthlyDebt, interestValue, date, credit, pay, handleSubmitEntry, handleDate, handleCredit, handlePay, handleDelete, handleUser, handlePassword, handleLogin}) => {
    return(
        <>
            <Switch>
            <Route exact path={"/"}>
                <Homepage 
                    balance={balance}
                    totalInvest={totalInvest}
                    totalCollection={totalCollection}
                    totalProfit={totalProfit}
                    userList={userList}
                    login={login}
                    config={config}
                />
            </Route>
            <Route exact path={"/users"}>
                <Users
                    login={login}
                    config={config}
                    userList={userList}
                    handleDelete={handleDelete}
                />
            </Route>
            <Route exact path={"/addUser"}>
                <AddUser
                    login={login}
                    config={config}
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
            </Route>
            <Route exact path={"/profile/:id"}>
                <Profile 
                    login={login}
                    config={config}
                    userList={userList}
                    date={date}
                    credit={credit}
                    pay={pay}
                    handleSubmitEntry={handleSubmitEntry}
                    handleDate={handleDate}
                    handleCredit={handleCredit}
                    handlePay={handlePay}
                />
            </Route>
            <Route exact path={"/login"}>
                <Login 
                    login={login}
                    config={config}
                    handleUser={handleUser}
                    handlePassword={handlePassword}
                    handleLogin={handleLogin}
                />
            </Route>
            <Route>
                <NotFound/>
            </Route>
            </Switch>
        </>
    )
}

export default Routes;