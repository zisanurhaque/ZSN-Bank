import React from "react";
import { ToastContainer } from "react-toastify";

const UserEntry = ({nameHandler, ageHandler, idHandler, loanHandler, interestHandler, durationHandler, formHandler, monthlyDebt, interestValue}) => {
    return(
        <> 
            <div className="userEntry">

                <h4 className="pb-4 text-secondary">Member Registration</h4>

                <div className="inputRow">
                    <input 
                        name="useName" 
                        type="text" 
                        placeholder="Name" 
                        onChange={(e) => nameHandler(e)}
                    />
                    <input 
                        name="age" 
                        className="smallInput" 
                        type="number" 
                        placeholder="Age" 
                        onChange={(e) => ageHandler(e)}
                    />
                    <input 
                        name="userID" 
                        type="text" 
                        placeholder="User ID" 
                        onChange={(e) => idHandler(e)}
                    />
                </div>

                <div className="inputRow">
                    <input 
                        name="totalLoan" 
                        type="text" 
                        placeholder="Debt" 
                        onChange={(e) => loanHandler(e)}
                    />
                    <input 
                        name="interest" 
                        className="smallInput" 
                        type="text" 
                        placeholder="Interest(%)" 
                        onChange={(e) => interestHandler(e)}
                    />
                    <input 
                        name="duration" 
                        type="text" 
                        placeholder="Duration(Year)" 
                        onChange={(e) => durationHandler(e)}
                    />
                </div>
                <div className="inputRow">
                    <input 
                        name="monthlyDue" 
                        type="text" 
                        className="halfInput"
                        placeholder="Interest"
                        value={`Total Interest - ${interestValue}`}
                        disabled
                    />
                    <input 
                        name="monthlyDue" 
                        type="text" 
                        className="halfInput"
                        placeholder="Monthly Debt"
                        value={`Monthly Debt - ${monthlyDebt}`}
                        disabled
                    />
                </div>

                <button onClick={(e) => formHandler(e)}>Add Member</button>

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
        </>
    )
}

export default UserEntry;