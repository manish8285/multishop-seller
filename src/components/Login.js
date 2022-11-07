import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Container, Form, FormFeedback, FormGroup, FormText, Input, Label } from "reactstrap";
import { doLogin, isLogedIn } from "../auth";
import { login } from "../services/user_service";

const Login=()=>{

    let navigate = useNavigate()

    const [logindata,setlogindata] =useState({
        "email":"",
        "password":""
    })
    const [errors,setErrors]=useState({})

    //console.log(isLogedIn())
   // console.log(localStorage.getItem("data"))

    const updateLoginData=(event)=>{
        
        setlogindata({
            ...logindata,
            [event.target.id]:event.target.value
        })
    }

    const attemptLogin=()=>{
        const authRequest= {
            "username":logindata.email,
            "password":logindata.password
        }
        login(authRequest).then((data)=>{
            doLogin(data,()=>{
                toast.success("You have logged in successfully !!!")
                navigate("/allorders")
            })
            
           console.log(data)
        }).catch((error)=>{
            
            console.log(error)
            setErrors(error.response.data)
            if(error.response.status===401){
                toast.error("Credentials do not match")
            }
            //toast.error("something went wrong")
        })
    }



    return (


                    <div className="card mt-2">
                        <div className="card-body">
                        <Form className="">
                        <FormFeedback invalid>
                                {JSON.stringify(logindata.error)}
                            </FormFeedback>
                            <FormGroup>
                            <Label>Enter you username</Label>
                            <Input invalid={errors?.username?true:false} type="email" name="email" id="email" placeholder="Enter your email" value={logindata.email} onChange={(event)=>updateLoginData(event)} />
                            
                            
                            </FormGroup>

                            <FormGroup>
                            <Label>Enter your password</Label>
                            <Input valid={errors?.password?true:false} type="password" placeholder="Enter your password" id="password" name="password" value={logindata.password}  onChange={(event)=>updateLoginData(event)} />
                            
                            </FormGroup>
                            <Container className="text-center">
                            <Button onClick={()=>attemptLogin()} >Login</Button>
                            </Container>
                            <a className="text-dark" onClick={()=>{navigate("/signup")}} >New member? Signup</a>
                            </Form>

                        </div>

                    </div>

    );
}

export default Login