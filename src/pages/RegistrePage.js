import React from 'react'
import "./RegistrePage.css"
import { Link, useHistory } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'

export default function() {

    const history = useHistory();
   const [errorMessage, setErrorMesage] = useState();
   const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "CLIENT"
   });

   const [repeatPassword, setRepeatPassword] =useState("");

   const[status, setStatus] = useState(false);

   const {firstName, lastName, email, password} = user;
   
  const onInputChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value});
   };

   const change = (e) =>{
    setRepeatPassword(e.target.value);
   }

   const changeStatus = (e) => {
    setStatus(!status);
    console.log(status);
   }

   const handleClick =async () => {
    if(status === true){
        if(user.password === repeatPassword){
        const result = await axios.post("http://localhost:8080/connect", user);
          if(!result.data){
            await axios.post("http://localhost:8080/user/admin", user);
            history.push('/login');
            setErrorMesage("");
          }else{
            setErrorMesage("User already exist!!!");
          }
        }else{
            setErrorMesage("Passwords dosen't match!!!");
        }
    }else {
        setErrorMesage("You need to agree with the terms!!!");
    }
   }

  return (
    <div>

<section className="vh-100 bg-image">
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>
              <h2 className="text-uppercase text-center mb-5" style={{color:"red"}}>{errorMessage}</h2>
              <form>
               
                <div className="form-outline mb-4">
                  <input type="text" id="form3Example1cg" className="form-control form-control-lg" 
                   name = "firstName"
                   value={firstName}
                   onChange ={(e) => onInputChange(e)}
                  />
                  <label className="form-label" for="form3Example1cg">Your FirstName</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="text" id="form3Example1cg" className="form-control form-control-lg"
                                    name ="lastName"
                                     value={lastName}
                                     onChange ={(e) => onInputChange(e)}
                                      />
                  <label className="form-label" for="form3Example1cg">Your LastName</label>
                </div>

                <div classNameName="form-outline mb-4">
                  <input type="email"  className="form-control form-control-lg" 
                  name ="email"
                  value={email}
                  onChange ={(e) => onInputChange(e)}
                  />
                  <label className="form-label" for="form3Example3cg">Your Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cg" className="form-control form-control-lg" 
                                    name ="password"
                                     value={password}
                                     onChange ={(e) => onInputChange(e)}
                  />
                  <label className="form-label" for="form3Example4cg">Password</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cdg" className="form-control form-control-lg" 
                                     name ="repeatPassword"
                                     value={repeatPassword}
                                     onChange ={(e) => change(e)}
                  />
                  <label className="form-label" for="form3Example4cdg">Repeat your password</label>
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                  <input className="form-check-input me-2" type="checkbox" id="form2Example3cg" 
                                    name="status"
                                     value={status}
                                     onChange ={(e) => changeStatus(e)}
                  />
                  <label className="form-check-label" for="form2Example3g">
                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                  </label>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="button"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick = {handleClick}>Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                    className="fw-bold text-body"><Link to="/login">Login here</Link></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    </div>
  )
}
