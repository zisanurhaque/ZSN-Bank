import Delete from "@material-ui/icons/Delete";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { ToastContainer } from "react-toastify";

const UserList = ({userList, handleDelete}) => {

    return(

        <>
            <div className="usersData">
                <h4 className="pb-4 text-secondary">Member's List</h4>
                <table>
                    <tr>
                        <th className="col5">Sr</th>
                        <th className="col7">User ID</th>
                        <th className="col6">Name</th>
                        <th className="col8">Savings</th>
                        <th className="col9">Debt</th>
                        <th className="col10">Interest</th>
                        <th className="col11">Installment</th>
                        <th className="col12">Del</th>
                    </tr>
                    <Scrollbars style={{height: 300}}>
                    {
                        userList.map((item, index) => (
                            <tr key={item._id}>
                                <a href={`/profile/${item._id}`}>
                                    <td className="col5"> {index + 1} </td>
                                    <td className="col7"> #{item.uid} </td>
                                    <td className="col6"> {item.userName} </td>
                                    <td className="col8">{item.userData.reduce((a,b) => (a + b.credit),0)}</td>
                                    <td className="col9">{item.loan}</td>
                                    <td className="col10">{item.interest}%</td>
                                    <td className="col11"> {item.monthly} </td>
                                </a>
                                <button className="col12" onClick={() => handleDelete(item._id)}><Delete/></button>
                            </tr>
                        ))
                    }
                    </Scrollbars>
                </table>
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

export default UserList;