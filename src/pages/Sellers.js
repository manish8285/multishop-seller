import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Button, Card, CardBody, Container, Form, FormFeedback, FormGroup, Input, Label, Table } from "reactstrap"
import Base from "../components/Base"
import { getAllSellers, registerNewSeller } from "../services/seller-service"
import { getUserByEmail } from "../services/user_service"

const Sellers=()=>{

    const [sellers,setSellers]=useState([])
    var sellerUserId=-1;

    const [sellerDto,setSellerDto] = useState({
        email:'',
        storeName:"",
        gstNo:"",
        address:{
            name:"",
            city:"",
            state:"",
            pincode:"",
            mobile:"",
            address:""
        }

    })

    const resetSellerDto=()=>{
        setSellerDto({
            email:'',
            storeName:"",
            gstNo:"",
            address:{
                name:"",
                city:"",
                state:"",
                pincode:"",
                mobile:"",
                address:""
            }
    
        })
    }

    const fetchUser=(event)=>{
        let email = event.target.value
        let fb = document.getElementById("emailFeedback")
        if(email.includes("@gmail.com")){
            getUserByEmail(email).then(data=>{
                sellerUserId=data.id
                console.log(data.name)
                fb.innerHTML=data.name
                fb.style.color="green"
            }).catch(error=>{
                    fb.innerHTML="Not a Homeorx User"
                    fb.style.color="red"
                    sellerUserId=-1
            })
        }else{
            console.log("invalid email")
            fb.innerHTML="Invalid Email"
            fb.style.color="red"
        }
        
    }

    let f=false;
    const showHide=()=>{
        let frame = document.getElementById("sellerForm");
        if(!f){
            frame.style.display="block"
            f=true
        }else{
            frame.style.display="none"
            f=false
        }
    }

    const updateSellerDto=(event)=>{
        setSellerDto({
            ...sellerDto,
            [event.target.id]:event.target.value
        })
    }
    const updateSellerAddress=(event)=>{
        setSellerDto({
            ...sellerDto,
            address:{
                ...sellerDto.address,
                [event.target.id]:event.target.value
            }
        })
    }

    const loadAllSellers=()=>{
        getAllSellers().then(data=>{
            console.log(data)
            setSellers(data)
        })
    }

    const validateSeller=()=>{
        if(sellerDto.storeName.length<3){
            return false
        }else if(!sellerDto.email.includes("@gmail.com")){
            return false
        }else if(sellerDto.address.address.length<3){
            return false
        }else if(sellerDto.address.city.length<3){
            return false
        }else if(sellerDto.address.state.length<3){
            return false
        }else if(sellerDto.address.pincode.length<6){
            return false
        }else if(sellerDto.address.mobile.length<10){
            return false
        }else if(sellerUserId===-1){
            return false
        }
        return true
    }
    useEffect(()=>{
        loadAllSellers()
    },[])

    const addNewSeller=()=>{
        if(!validateSeller()){
            toast.error("Please fill all the details...")
            return
        }
        showHide()
        registerNewSeller(sellerDto,sellerUserId).then(data=>{
            toast.success("Seller Registered Successfully!!!")
            loadAllSellers()
            resetSellerDto()
        }).catch(error=>{
            console.log(error)
        })
    }

    return (
        <Base>
        <Container>
            <Card className="my-1 rounded-0 p-1">
            <i class="fas fa-user-tag fa-2x text-warning"> Sellers <Button onClick={()=>showHide()} className="btn-small btn-info">Add New</Button></i> 
            </Card>

            <Card id="sellerForm" style={{display:'none'}}>
                <CardBody>
                <Form>
                    <FormGroup>
                        <Input onBlur={(event)=>fetchUser(event)} placeholder="User Email" id="email" onChange={(event)=>updateSellerDto(event)} value={sellerDto.email} type="text" />
                        <small className="ml-1" id="emailFeedback"></small>
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder="STORE NAME" id="storeName" onChange={(event)=>updateSellerDto(event)} value={sellerDto.storeName} type="text" />
                    </FormGroup>
                    <FormGroup>
                        <Input placeholder="GST NO if any" id="gstNo" onChange={(event)=>updateSellerDto(event)} value={sellerDto.gstNo} type="text" />
                    </FormGroup>

                    <FormGroup>
                        <Label>Store Address</Label>
                        <Input placeholder="Contact Person Name" id="name" onChange={(event)=>updateSellerAddress(event)} value={sellerDto.address.name} type="text" />
                        <Input placeholder="Address Line 1" id="address" onChange={(event)=>updateSellerAddress(event)} value={sellerDto.address.address} type="text" />
                        <Input className="mt-1" placeholder="city" id="city" onChange={(event)=>updateSellerAddress(event)} value={sellerDto.address.city} type="text" />
                        <Input className="mt-1" placeholder="state" id="state" onChange={(event)=>updateSellerAddress(event)} value={sellerDto.address.state} type="text" />
                        <Input className="mt-1" placeholder="PIN Code" id="pincode" onChange={(event)=>updateSellerAddress(event)} value={sellerDto.address.pincode} type="number" />
                        <Input className="mt-1" placeholder="mobile no" id="mobile" onChange={(event)=>updateSellerAddress(event)} value={sellerDto.address.mobile} type="number" />
                    </FormGroup>
                    <Container className="text-center">
                        <Button onClick={()=>addNewSeller()} className="btn-warning rounded-0" type="button">Add New Seller</Button>
                        <Button onClick={()=>resetSellerDto()} className="btn-primary rounded-0 ml-1" type="reset">Reset</Button>
                    </Container>



                </Form>
                </CardBody>
            </Card>

            <Card>
            <Table
            responsive
            striped
            >
            <thead>
                <tr>
                <th>
                    #Id
                </th>
                <th>
                    Store Name
                </th>
                <th>
                    Address
                </th>
                <th>
                    Email
                </th>
                <th>
                    Mobile
                </th>
                </tr>
            </thead>
            <tbody>
                
                {
                    sellers.map((seller,i)=>(
                    
                    <tr key={i}>
                        <th className="myHover" scope="row">
                    {seller.id}
                </th>
                <td>
                    {seller.storeName}
                </td>
                <td>
                    {seller.address?.city}
                </td>
                <td>
                    {seller.email}
                </td>
                <td>
                    {seller.address?.mobile}
                </td>
                </tr>
            
                    
                    )
                    )
                }
            
            </tbody>
            </Table>
            </Card>
            
        </Container>
        </Base>
    )
}

export default Sellers