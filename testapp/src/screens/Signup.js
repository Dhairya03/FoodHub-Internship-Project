import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Signup() {
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""})
   // let [address, setAddress] = useState("");
  let navigate = useNavigate()

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   let navLocation = () => {
  //     return new Promise((res, rej) => {
  //       navigator.geolocation.getCurrentPosition(res, rej);
  //     });
  //   }
  //   let latlong = await navLocation().then(res => {
  //     let latitude = res.coords.latitude;
  //     let longitude = res.coords.longitude;
  //     return [latitude, longitude]
  //   })
  //   // console.log(latlong)
  //   let [lat, long] = latlong
  //   console.log(lat, long)
  //   const response = await fetch("http://localhost:5000/api/getlocation", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ latlong: { lat, long } })

  //   });
  //   const { location } = await response.json()
  //   console.log(location);
  //   setAddress(location);
  //   setcredentials({ ...credentials, [e.target.name]: location })
  // }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        })
        const json=await response.json()
        console.log(json)

        if(!json.success){
            alert("enter valid credentials")
        }
        else{
          localStorage.setItem('token', json.authToken)
      navigate("/login")
        }
    }

    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <>
     <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar />
      </div>
    <div className='conatiner'>
    <form onSubmit={handleSubmit}> 
    <div className="m-3">
    <label htmlFor="Name" className="form-label">Name</label>
    <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange}  />
  </div>
  <div className="m-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="m-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
  <div className="m-3">
  <label htmlFor="Address" className="form-label">Address</label>
            
  <input type="text" className="form-control" name='geolocation'  value={credentials.geolocation} onChange={onChange} aria-describedby="emailHelp" />
            
  </div>
  
  <button type="submit" className="m-3 btn btn-success">Submit</button>
<Link to="/login" className='m-3 mx-1 btn btn-danger'>Already a User</Link>
</form>
</div>
</div>
    </>
  )
}
