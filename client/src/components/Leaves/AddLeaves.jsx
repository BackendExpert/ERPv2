import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup'
import axios from 'axios'

const AddLeaves = () => {
  const navigate = useNavigate()
  //curent login user
  const EmailUser = secureLocalStorage.getItem("Login1");
  const RoleUser = secureLocalStorage.getItem("Login2");

  // get all hods in database
  const [hodD, SetHodData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/leave/hodData')
    .then(res => SetHodData(res.data.Result))
    .catch(err => console.log(err)) 
  }, [])


  if(RoleUser !== null && EmailUser !== null){
    return (
      <div>
        <div className="bg-white py-4 px-8 rounded shadow-md">
          {
            hodD.map((hod) => {
              return (
                <div className="" key={hod._id}>
                  {hod.email} asdasd
                </div>
              )
            })
          }
          <h1 className="font-semibold text-gray-500 text-2xl">New Leave</h1>
          <hr />
          <div className="my-4">
            <form>
              <div className="md:grid grid-cols-3 gap-4">
                <div className="my-4">
                  <label htmlFor="" className="text-gray-500">Start Time</label>
                  <input type="time" name="" id="" className="text-gray-700 h-12 w-full my-2 rounded bg-gray-200 shadow-md pl-2" required placeholder='Enter Start Time' 
                  />
                </div>

                <div className="my-4">
                  <label htmlFor="" className="text-gray-500">Email</label>
                  <input type="email" name="" id="" className="text-gray-700 h-12 w-full my-2 rounded bg-gray-200 shadow-md pl-2" required disabled placeholder='Enter Start Time' 
                  value={EmailUser}/>
                </div>

                <div className="my-4">
                  <label htmlFor="" className="text-gray-500">HOD Email</label>
                  <select name="" id="" className='text-gray-700 h-12 w-full my-2 rounded bg-gray-200 shadow-md pl-2'>
                    <option value="">Select One</option>
                    <option value="hod2@123.com">hod1@123.com</option>
                    <option value="hod2@123.com">hod2@123.com</option>
                    <option value="hod2@123.com">hod3@123.com</option>
                    <option value="hod2@123.com">hod4@123.com</option>
                  </select>
                </div>

                <div className="my-4">
                  <label htmlFor="" className="text-gray-500">Start Date</label>
                  <input type="date" name="" id="" className="text-gray-700 h-12 w-full my-2 rounded bg-gray-200 shadow-md pl-2" required placeholder='Enter Start Date' 
                  />
                </div>

                <div className="my-4">
                  <label htmlFor="" className="text-gray-500">End Date</label>
                  <input type="date" name="" id="" className="text-gray-700 h-12 w-full my-2 rounded bg-gray-200 shadow-md pl-2" required placeholder='Enter End Date' 
                  />
                </div>

                <div className="my-4">
                  <label htmlFor="" className="text-gray-500">Dutarion</label>
                  <input type="text" name="" id="" className="text-gray-700 h-12 w-full my-2 rounded bg-gray-200 shadow-md pl-2" required placeholder='Enter Dutarion' 
                  />
                </div>                
              </div>

              <div className="my-4">
                <button type="submit" className="bg-gradient-to-r from-green-500 via-white-500 to-blue-500 text-white py-4 px-8 rounded font-semibold">Request Leave</button>
              </div>
            </form>
          </div>
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

export default AddLeaves