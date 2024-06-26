import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup'
import axios from 'axios'

const Employee = () => {
    const navigate = useNavigate()
    //curent login user
    const EmailUser = secureLocalStorage.getItem("Login1");
    const RoleUser = secureLocalStorage.getItem("Login2");

    // get all Employees
    const [UserData, SetUserData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/Dept/UsertoDept')
        .then(res => SetUserData(res.data.Result))
        .catch(err => console.log(err))
    }, [])

    // when click add to dept button
    const headleAddDept = (email) => {
        if(RoleUser === "HOD"){
            alert("add to my Dept")
        }
        else if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary"){
            navigate('AdminDeptadd/'+ email)
        }
    }

    if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary" || RoleUser === "HOD"){
        return (
            <div className='mx-4'>
                    <div class="py-2 px-4 rounded shadow-md overflow-x-auto my-8 bg-white">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <th scope="col" class=" table-cell">
                                    <p className="md:block hidden">Employee Email</p>
                                    <p className="md:hidden block">Employee Data</p>                                                                        
                                </th>
                                <td scope="col" class=" hidden md:table-cell">
                                    Username
                                </td>
                                <td scope="col" class=" hidden md:table-cell">
                                    Designation
                                </td>
                                <td scope="col" class=" hidden md:table-cell">
                                    Department
                                </td>
                                <td scope="col" class="table-cell">
                                    Action
                                </td>
                            </thead>
                            <tbody>
                                {
                                    UserData.map((deptUser, index) => {
                                        if(deptUser.Role !== "Director" && deptUser.Role !== "Secretary"){
                                            return (
                                                <tr key={index}>
                                                    <td scope="row" class="px-2 py-4 text-gray-500 whitespace-nowrap dark:text-white">
                                                        {deptUser.email}
                                                        <div className="md:hidden max-w-20 md:w-auto">
                                                            <p className="">{deptUser.username}</p>
                                                            <p className="">{deptUser.Role}</p>
                                                            <p className="">{deptUser.Department}</p>
                                                        </div>
                                                    </td>
                                                    <td scope="row" class="hidden md:table-cell px-2 py-4 text-gray-500 whitespace-nowrap dark:text-white">
                                                        {deptUser.username}
                                                    </td>
                                                    <td scope="row" class="hidden md:table-cell px-2 py-4 text-gray-500 whitespace-nowrap dark:text-white">
                                                        {deptUser.Role}
                                                    </td>
                                                    <td scope="row" class="hidden md:table-cell px-2 py-4 text-gray-500 whitespace-nowrap dark:text-white">
                                                        {deptUser.Department}
                                                    </td>
                                                    <td scope="row" class=" px-2 py-4 text-gray-500 whitespace-nowrap dark:text-white">
                                                        <div className="md:flex">
                                                            {
                                                                (() => {
                                                                    if(deptUser.Department !== ""){
                                                                        return (
                                                                            <p className='py-1 px-3 font-semibold rounded bg-blue-500 shadow-md text-white'>Alredy Added</p>                                                                    )
                                                                    }
                                                                    else{
                                                                        if(RoleUser === "HOD"){
                                                                            return (
                                                                                <button onClick={() => headleAddDept(deptUser.email)} className='py-1 px-3 bg-none text-blue-500 font-semibold rounded duration-500 hover:bg-blue-500 hover:shadow-md hover:text-white'>+ Add to My Dept</button>
                                                                            )
                                                                        }
                                                                        else if(RoleUser === "SuperAdmin" || RoleUser === "Director" || RoleUser === "Secretary" ){
                                                                            return (
                                                                                <button onClick={() => headleAddDept(deptUser.email)} className='py-1 px-3 bg-none text-blue-500 font-semibold rounded duration-500 hover:bg-blue-500 hover:shadow-md hover:text-white'>+ Add to Dept</button>
                                                                            )
                                                                        }
                                                                    }
                                                                })()
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

        )
    }
    else{
        useEffect(() => {
            localStorage.clear()
            navigate('/')
        }, [])
    }
}

export default Employee