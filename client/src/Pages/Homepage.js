import React from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Scrollbars } from "../../node_modules/react-custom-scrollbars-2";

const Homepage = ({login, config, userList, balance, totalInvest, totalCollection, totalProfit}) => {

    

    if(config.user !== login.user && config.password !== login.password){

        return <Redirect to={"/login"}/>
        
    }else{
        return(
            <>
                <main>
                    
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable={false}
                        pauseOnHover={false}
                        theme='colored'
                    />
                    
                    <div className="topRow">
                        <div className="card">
                            <h5>Total Balance</h5>
                            <h2>{balance} USD</h2>
                        </div>
                        <div className="card">
                            <h5>Total Investment</h5>
                            <h2>{totalInvest} USD</h2>
                        </div>
                        <div className="card">
                            <h5>Total Collection</h5>
                            <h2>{totalCollection} USD</h2>
                        </div>
                        <div className="card">
                            <h5>Expected Profit</h5>
                            <h2>{totalProfit} USD</h2>
                        </div>
                    </div>
    
                    <div className="investmentRecord">
                        <h4 className="pb-4 pt-4 text-secondary">Investment Record</h4>
                        <table>
                            <tr>
                                <th className="serial">Sr</th>
                                <th className="memberName">Member's Name</th>
                                <th className="investment">Investment</th>
                                <th className="interest">Interest</th>
                                <th className="collection">Collection</th>
                                <th className="profit">Expected Profit</th>
                            </tr>
                            <Scrollbars style={{height: 150 }}>
                            {
                                userList.map((item, index) => (
                                    <tr>
                                        <a href={`/profile/${item._id}`}>
                                            <td className="serial">{index+1}</td>
                                            <td className="memberName">{item.userName}</td>
                                            <td className="investment">{item.loan}</td>
                                            <td className="interest">{item.interest}%</td>
                                            <td className="collection">{item.userData.reduce((a,b) => (a + b.paid), 0)}</td>
                                            <td className="profit">{(item.monthly * (item.duration*12) - item.loan)}</td>
                                        </a>
                                    </tr>
                                ))
                            }
                            </Scrollbars>
                        </table>
                    </div>
                </main>
            </>
        )
    }
}

export default Homepage;