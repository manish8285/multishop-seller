import Login from "../components/Login";
import Base from "../components/Base";
import { Container } from "reactstrap";
import { isLogedIn } from "../auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage=()=>{
    let navigate =useNavigate()


    

    return (

            <Container>
                
                <div className="row mr-0">
                    <div className="col-md-6 offset-md-3">
                    <h1 className="text-center text-warning">MULTISHOP | LOGIN</h1>
                    <Login></Login>
                    </div>
                </div>
            </Container>
    );

}
export default LoginPage