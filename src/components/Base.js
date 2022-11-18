import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLogedIn } from "../auth"
import SideNavbar from "./SideNavbar"
import TopNavbar from "./TopNavbar"

const Base=({children})=>{
        let navigate=useNavigate();   
        useEffect(()=>{
                if(!isLogedIn()){
                        navigate("/login")
                }
        },[])

        
    return (
            
            <div>
                    <SideNavbar />
                    <div className="" id="bodyArea">
                    <TopNavbar />
                    {children}
                    </div>  
            </div>
            
    
            
        
    )
}

export default Base