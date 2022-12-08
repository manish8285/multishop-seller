import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, CardBody, Container } from "reactstrap"
import Base from "../components/Base"
import { BASE_URL } from "../services/helper"
import { getOnlinePayment, verifyOnlinePayment } from "../services/payment-service"

const PaymentVerification=()=>{
    let navigate =useNavigate()
    const {payId} = useParams()
    const [selfPayment,setSelfPayment]=useState({
        amount:'',
        verified:false
    })

    const loadSelfPayment=()=>{
        getOnlinePayment(payId).then(data=>{
            setSelfPayment(data)
        }).catch(error=>console.log(error))
    }

    const verifyPayment=()=>{
        
        verifyOnlinePayment(selfPayment).then(data=>{
            toast.success("Payment Verified Successfully !!!")
            loadSelfPayment()
        }).catch(error=>console.log(error))
    }

    useEffect(()=>{
        console.log("payment id ="+payId)
        loadSelfPayment()
        
    },[])
    return (
        <Base>
            <Container>
                <Card className="my-1 p-1 text-primary">HomeoRx Payments | Self Payment</Card>
                <Card>
                    <CardBody>
                    <div style={{float:"right"}}>
                   
                           
                           {
                               (selfPayment.verified) &&(<i class="fas fa-info-circle text-success" > Verified </i>)
                           }
                           {
                               (!selfPayment.verified) && (<i class="fas fa-info-circle text-warning" > Waiting For Verification </i>)
                           }
                           
                       </div>
                        <Container className="text-center">
                            <h3 className="text-danger">Rs {selfPayment?.amount}</h3>
                            <a href="">
                            <img className="w-100" style={{maxWidth:"250px"}} src={BASE_URL+"images/prescriptions/"+selfPayment.prescription_image} alt="payment sleep" />
                            </a>
                            
                        </Container>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        
                            <Container className="text-center">
                            <Button onClick={()=>verifyPayment()} type="button" >Verify Payment</Button>
                            </Container>
                        
                    </CardBody>
                </Card>
            </Container>
        </Base>
    )
}

export default PaymentVerification