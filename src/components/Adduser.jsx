import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './Adduser.css'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const Adduser = () => {


  const [data, setData] = useState([{}]);

  useEffect(() => {
    getUsers();
    console.log("Get Data", data);
  }, [])


  const getUsers = async () => {
    await axios.get('http://localhost:4000/posts').then(res => setData(
      res.data
    ))
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    date: ""
  });
  

   
  const handleFormData = async (e) => {

    const res = await axios
      .post('http://localhost:4000/posts', formData)

    if (res) {
      alert("Data Submit Successfully")
    } else {
      alert("Errors Plz Check!!")
    }

    setFormData({
      name: "",
      email: "",
      password: "",
      number: "",
      date: ""
    })
    getUsers();
    console.log("FomrData", formData);
  }


  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/posts/${id}`).then(res => {
      alert("Delete Successfully")
      getUsers();
    })
  }

  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    date: "",
    id : ""
  });

  const handleUpdate = async()=>{
    await axios.put(`http://localhost:4000/posts/${updateData.id}`,updateData).then(res =>{
       alert("User Data updated Successfully!!")
       getUsers();
    })
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <h3>Register Here!!!</h3>
          </div>
          <div className="md-3">
            <label htmlFor="FormInput">Name</label>
            <input type="text"
              name='name'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder='Enter-FullName' className='form-control' />
          </div>
          <div className="md-3">
            <label htmlFor="FormInput">Email</label>
            <input type="email"
              name='email'
              placeholder='Enter-Email' className='form-control'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="md-3">
            <label htmlFor="FormInput">Password</label>
            <input type="password"
              name='password'
              placeholder='********' className='form-control'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="md-3">
            <label htmlFor="FormInput">Mobile No..</label>
            <input type="number" placeholder='000-000-0000'
              name='number'
              className='form-control'
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            />
          </div>
          <div className="md-3">
            <label htmlFor="FormInput">Date</label>
            <input type="date" className='form-control' name='date'
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div className='Button'>
            <button className="btn btn-success"
              onClick={handleFormData}
            >
              AddUser
            </button>
          </div>
        </div>
        <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Mobile No..</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data && data.map((user, id) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.number}</td>
                    <td>{user.date}</td>
                    <td style={{ display: "flex", justifyContent: "space-between" }} >
                      <button className="btn btn-info"
                       data-bs-toggle="modal"
                       data-bs-target="#exampleModal"
                       onClick={(e)=>setUpdateData({
                         name : user.name,
                         email : user.email,
                         password : user.password,
                         number : user.number,
                         date : user.date,
                         id : user.id
                       })}
                       >Edit</button>
                      <button className="btn btn-danger"
                        onClick={() => handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <div className="md-3">
                  <label htmlFor="FormInput">Name</label>
                  <input type="text"
                    name='name'
                    value={updateData.name}
                    onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                    placeholder='Enter-FullName' className='form-control' />
                </div>
                <div className="md-3">
                  <label htmlFor="FormInput">Email</label>
                  <input type="email"
                    name='email'
                    placeholder='Enter-Email' className='form-control'
                    value={updateData.email}
                    onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                  />
                </div>
                <div className="md-3">
                  <label htmlFor="FormInput">Password</label>
                  <input type="password"
                    name='password'
                    placeholder='********' className='form-control'
                    value={updateData.password}
                    onChange={(e) => setUpdateData({ ...updateData, password: e.target.value })}
                  />
                </div>
                <div className="md-3">
                  <label htmlFor="FormInput">Mobile No..</label>
                  <input type="number" placeholder='000-000-0000'
                    name='number'
                    className='form-control'
                    value={updateData.number}
                    onChange={(e) => setUpdateData({ ...updateData, number: e.target.value })}
                  />
                </div>
                <div className="md-3">
                  <label htmlFor="FormInput">Date</label>
                  <input type="date" className='form-control' name='date'
                    value={updateData.date}
                    onChange={(e) => setUpdateData({ ...updateData, date: e.target.value })}
                  />
                </div>


              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={handleUpdate} data-bs-dismiss="modal" class="btn btn-primary">Update User</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Adduser