import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import Routes from "./Component/Routes";


const session = () => {
    const sessionData = localStorage.getItem('session');
    if(sessionData){
        return JSON.parse(localStorage.getItem('session'));
    }else{
        return []
    }
}

const localBalance = () => {
    const balance = localStorage.getItem('balance');
    if(balance){
        return JSON.parse(localStorage.getItem('balance'));
    }else{
        return null
    }
}

const App = () => {

    const config = {user: "Zisanur Haque", password: 123456};
    const [login, setLogin] = useState(session());

    const [userConfig, setUserConfig] = useState('');
    const [passwordConfig, setPasswordConfig] = useState(0);
    
    const handleUser = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setUserConfig(value);
    }
    const handlePassword = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setPasswordConfig(value);
    }
    const handleLogin = (e) =>{
        e.preventDefault();
        const value = {user: userConfig, password: passwordConfig}
        if(!value){
            alert("Wrong Login Details")
        }else{
            if(value.user !== config.user && value.password !== config.password){
                toast.warning("Username & Password Is Wrong", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                })
            }else if(value.user !== config.user){
                toast.warning("Username Is Wrong", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                })
            }else if(value.password !== config.password){
                toast.warning("Password Is Wrong", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                })
            }else{
                setUserConfig('');
                setPasswordConfig();
                setLogin(value);
                toast.success("Log In Successfull!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                })
            }
        }
        
    }
    const handleLogOut = (e) => {
        e.preventDefault();
        setLogin({user: "clear", password: 0});
        toast.info("You Are Logged Out", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        })
    }
    


    const [userName, setUserName] = useState('');
    const [age, setAge] = useState(0);
    const [id, setId] = useState(0);
    const [loan, setLoan] = useState(0);
    const [interest, setInterest] = useState(0);
    const [duration, setDuration] = useState(0);
    const [monthly, setMonthly] = useState(0);
    const [monthlyDebt, setMonthlyDebt] = useState(0);
    const [interestValue, setInterestValue] = useState(0);

    const [date, setDate] = useState('');
    const [credit, setCredit] = useState(0);
    const [pay, setPay] = useState(0);
    const [userList, setUserList] = useState([]); //This is a full list

    const [balance, setBalance] = useState(localBalance());

    const totalInvest = userList.reduce((a,b) => {
        return a + b.loan;
    },0);

    const singleProfit = userList.map((item) => {
        return (item.monthly * (item.duration*12)) - item.loan;
    })

    const totalProfit = (singleProfit.reduce((a,b) => (a + b),0))

    const singleCollection = userList.map((item) => {
        return item.userData.reduce((a,b) => (a + b.paid), 0);
    })

    const totalCollection = singleCollection.reduce((a,b) => (a + b), 0);
    
    useEffect(() => {
        const month = duration*12;
        const interestRate = interest/100;
        const totalInterest = loan*interestRate;
        const total = loan+totalInterest;
        const due = total/month;

        setInterestValue(totalInterest);
        setMonthly(Math.round(due));
        setMonthlyDebt(Math.round(due));

        localStorage.setItem('session', JSON.stringify(login));
        localStorage.setItem('balance', JSON.stringify(balance));
        axios.get(`${process.env.URL}/get`).then(response => setUserList(response.data.data))

    }, [balance, login, duration, interest, loan, userList]);

    const balanceInc = (e) => {
        e.preventDefault();
        setBalance(balance + 50000);
        toast.success("Balance 50000 USD Has Been Added", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        })
    }
    const balanceDec = (e) => {
        e.preventDefault();
        if(balance <= 0){
            setBalance(0);
        }else{
            setBalance(balance - 50000);
            toast.warning("50000 USD Has Been Minus", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }
    }

    const nameHandler = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setUserName(value);
    }
    const ageHandler = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setAge(value);
    }
    const idHandler = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setId(value);
    }
    const loanHandler = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setLoan(value);
    }
    const interestHandler = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setInterest(value);
    }
    const durationHandler = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setDuration(value);
    } 

    const idCheck = userList.map((item) => {
        return item.uid;
    })
    const usedId = idCheck.find((item) => item === id);

    // Add User Function

    const formHandler = (e) => {
        e.preventDefault();
        const userData = [];
        const value = {userName, id, age, loan, interest, duration, monthly, userData};

        if(userName === ''){
            toast.warning("Please Type User's Name", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }else if(age <= 20){
            toast.warning("Please Type User's Age(21+)", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }else if(!id || usedId === id){
            toast.warning("Please Give An Unique ID", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }
        else if(!loan){
            toast.warning("Please Type Loan Value", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }else if(loan > balance){
            toast.warning("Balance Shortage", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }
        else if(!interest){
            toast.warning("Please Mention Interest Rate", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }else if(!duration){
            toast.warning("Please Type Loan Duration", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }
        else{
            setBalance(balance - loan);
            axios.post(`${process.env.URL}/addUser`, value)
            toast.success("Member Added Successfully!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }
    }
    const handleDate = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setDate(value);
    }
    const handleCredit = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setCredit(value);
    }
    const handlePay = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setPay(value);
    }

    const handleSubmitEntry = async (id) => {
        const value = {date:date, credit: credit, paid:pay};

        const update = userList.find((item) => {
            return item._id === id;
        });
        const sameDateCheker = update.userData.find((item) => {
            return item.date === value.date;
        });

        const expiration = update.duration*12;
        const debts = update.userData.map((item, index) => {
            return index;
        })
        const due = debts.length + 1;

        if(!date){
            toast.warning("Date Is Required", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }else if(sameDateCheker){
            toast.warning("You Paid Your Monthly Debt On This Date", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }
        else if(credit < 24){
            toast.warning("Less Than 25 Savings Is Not Acceptable", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }else if(pay !== update.monthly){
            toast.warning("You Have To Pay Your Exact Monthly Debt", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }else if(expiration < due){
            toast.warning("All Debt Has Been Paid!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }
        else{
            axios.put(`${process.env.URL}/update/${id}`, value);
            setBalance(balance + value.paid);
            toast.success("Monthly Debt Has Been Paid!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }
    }

    const handleDelete = async (id) => {
        await axios.delete(`${process.env.URL}/delete/${id}`);
        toast.error("Member Has Been Deleted! Investment Will Never Come Back.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        })
    }

    return(
        <>
            <BrowserRouter>
                <Header 
                    config={config}
                    login={login}
                    balanceInc={balanceInc}
                    balanceDec={balanceDec}
                    handleLogOut={handleLogOut}/>
                <Routes
                    config={config}
                    login={login}
                    balance={balance}
                    totalInvest={totalInvest}
                    totalProfit={totalProfit}
                    totalCollection={totalCollection}
                    nameHandler={nameHandler}
                    ageHandler={ageHandler}
                    idHandler={idHandler}
                    loanHandler={loanHandler}
                    interestHandler={interestHandler}
                    durationHandler={durationHandler}
                    monthly={monthly}
                    formHandler={formHandler}
                    userList={userList}
                    monthlyDebt={monthlyDebt}
                    interestValue={interestValue}
                    handleSubmitEntry={handleSubmitEntry}
                    handleDate={handleDate}
                    handleCredit={handleCredit}
                    handlePay={handlePay}
                    date={date}
                    credit={credit}
                    pay={pay}
                    handleDelete={handleDelete}
                    handleUser={handleUser}
                    handlePassword={handlePassword}
                    handleLogin={handleLogin}
                />
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default App;