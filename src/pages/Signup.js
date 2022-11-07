import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Container, Form, FormFeedback, FormGroup, FormText, Input, Label } from "reactstrap"
import { doLogin } from "../auth"
import Base from "../components/Base"
import { signUp } from "../services/user_service"

const Signup=()=>{

    let navigate=useNavigate()

    const [userdata,setUserdata]=useState({
        "name":"",
        "email":"",
        "password":"",
        "about":"",
    })

    const [errors,setErrors] = useState([])

    const updateUserData=(event)=>{
        setUserdata({
            ...userdata,
            [event.target.id]:event.target.value
        })
    }

    const attemptSignup=()=>{
        signUp(userdata).then((data)=>{
            //console.log(data)
            doLogin(data,()=>{
                
            })
            toast.success("You have registered successfully !!!")
           // window.URL="/"
            navigate("/login")
        }).catch((error)=>{
            console.log(error)
            toast.error("Sorry Something went wrong !!!")
        })
    }
    useEffect(()=>{
        
    },[])

    return (

            <Container className="mt-2">
            <div className="row offset-md-2">
                <div className="col-md-8">
                <div className="card">
            <div className="card-body">
                <h1>Signup to Continue</h1>
                <Form>
  
                <FormGroup>
                    <Label for="name">
                    Enter your Full Name
                    </Label>
                    <Input name="name" type="text" id="name" value={userdata.name} onChange={(event)=>updateUserData(event)} />
                </FormGroup>

                <FormGroup>
                    <Label for="email">
                    Enter your Email
                    </Label>
                    <Input name="email" type="email" id="email" value={userdata.email} onChange={(event)=>updateUserData(event)} />

                </FormGroup>

                <FormGroup>
                    <Label for="password">
                    Enter Password
                    </Label>
                    <Input name="password" type="password" id="password" value={userdata.password} onChange={(event)=>updateUserData(event)} />
 
                </FormGroup>

                <FormGroup className="position-relative">
                    <Label for="about">
                    About
                    </Label>
                    <Input type="textarea" id="about" value={userdata.about} onChange={(event)=>updateUserData(event)} />

                </FormGroup>
                <Container className="text-center">
                <button className="btn btn-primary" onClick={()=>attemptSignup()}>Signup</button>
                </Container>
 
</Form>
                 <a className="text-dark" onClick={()=>{navigate("/login")}} >Already member? Login</a> 
                {/* <Navigate to="/login">Already member? Login</Navigate> */}
            </div>
        </div>
                </div>
            </div>
            </Container>
    )

}

export default Signup