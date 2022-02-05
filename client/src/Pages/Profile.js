import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Redirect, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Profile = ({login, config, handleSubmitEntry, handleDate, handleCredit, handlePay, userList}) => {
    
    const { id } = useParams();

    const user = userList.find((item) => {
        return item._id === id
    })

    const totalSavings = user?.userData.reduce((a,b) => {
        return a + b.credit;
    }, 0);

    const totalPaid = user?.userData.reduce((a,b) => {
        return a + b.paid;
    }, 0);

    const totalDebt = user?.monthly*(user?.duration*12);

    if(config.user !== login.user && config.password !== login.password){
        return <Redirect to={"/login"}/>
    }else{
        return(
            <>
                <main> 
                    <div className="user">
                    
                        <div className="box">
                            
                            <h4 className="pb-4 text-secondary">Member's Profile</h4>
    
                            <div className="profile">
                            
                                <h5><span>Name </span>: {user?.userName}</h5>
                                <h5><span>User ID </span>: {user?.uid}</h5>
                                <h5><span>Age </span>: {user?.age}</h5>
                                <h5><span>Debt </span>: {user?.loan}</h5>
                                <h5><span>Duration </span>: {user?.duration*12} Month</h5>
    
                            </div>
    
                            <div className="loanDetails">
                                <div>
                                    <p>Total Savings</p>
                                    <h5>{totalSavings}</h5>
                                </div>
                                <div>
                                    <p>Total Debt</p>
                                    <h5> {user?.loan} </h5>
                                </div>
                                <div>
                                    <p>Interest</p>
                                    <h5> {user?.interest}% </h5>
                                </div>
                                <div>
                                    <p>Remain Debt</p>
                                    <h5>{totalDebt - totalPaid}</h5>
                                </div>
                                <div>
                                    <p>Monthly Debt</p>
                                    <h5> {user?.monthly} </h5>
                                </div>
                            </div>
                            
                        </div>
    
                        <div className="box">
    
                            <h4 className="pb-4 text-secondary">Installment</h4>
    
                            <div className="monthlyEntry">
                                <input 
                                    type="date"
                                    onChange={(e) => handleDate(e)}
                                />
                                <input 
                                    className="credit" 
                                    type="text" 
                                    placeholder="Savings(25+)"
                                    onChange={(e) => handleCredit(e)}
                                />
                                <input 
                                    className="monthly" 
                                    type="text" 
                                    placeholder="Monthly Debt"
                                    onChange={(e) => handlePay(e)}
                                />
                                <button onClick={() => handleSubmitEntry(id)}>Submit</button>
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
                            </div>
    
                            <div className="data">
                                <table>
                                    <tr>
                                        <th className="col1">Date</th>
                                        <th className="col2">No</th>
                                        <th className="col3">Savings</th>
                                        <th className="col4">Payment</th>
                                    </tr>
                                    <Scrollbars style={{height: 220}}>
                                    {
                                        user?.userData.map((item, index) => (
                                            <tr key={index}>
                                                <td className="col1">{item.date}</td>
                                                <td className="col2">{index+1}</td>
                                                <td className="col3">{item.credit}</td>
                                                <td className="col4">{item.paid}</td>
                                            </tr>
                                        ))
                                    }
                                    </Scrollbars>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        )
    }

}
export default Profile;