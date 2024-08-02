import {useEffect, useState} from "react";
import axios from "axios";
import '../../styles/Login.css';
import '../../styles/bootstrap.min.css';

export default function() {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disableBtn, setDisableBtn] = useState(true);

    function authenticate(){
        const body = {'username':username, 'password':password};
        axios.post('http://localhost:8080/authenticate', body)
            .then(function (response) {
                setMessage(response.data.token);
            })
            .catch((error) =>{
                if(error.response) // if there was a response with status != 2xx
                    setMessage(error.response.data.message);
                else // if there was no response
                    setMessage("something went wrong.");
            })
    }

    function validate(input:any){
        if(input.target.name == "username")
            setUsername(input.target.value.trim());

        if(input.target.name == "password")
            setPassword(input.target.value.trim());
    }

    useEffect(()=>{
        if(username.length > 2 && password.length > 2)
            setDisableBtn(false);
        else
            setDisableBtn(true);
    });

    return(
        <div className="container">
    <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
        <div className="card border border-light-subtle rounded-3 shadow-sm">
            <div className="card-body p-3 p-md-4 p-xl-5">
            <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                <div className="row gy-2 overflow-hidden">
                <div className="err_msg">{message}</div>
                <div className="col-12">
                    <div className="form-floating mb-3">
                        <input className="form-control" name="username" id="username" placeholder="Usename" onChange={validate} />
                        <label htmlFor="username" className="form-label">Username</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" name="password" id="password" placeholder="Password"  onChange={validate} />
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="d-grid my-3">
                        <button disabled={disableBtn} id={disableBtn?"disabled_btn":""} className="btn btn-primary btn-lg" type="submit" onClick={authenticate}>Log in</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    );
}