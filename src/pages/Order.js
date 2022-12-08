import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardBody, CardHeader, Col, Container, NavItem, Row, Table } from "reactstrap"
import Base from "../components/Base"
import { toast } from "react-toastify";
import { BASE_URL, DRIVE_IMAGE_URL } from "../services/helper"
import { GetOrderById, SendCancelOrderStatus, SendCancelPickupRequest, SendDeliveredOrderStatus, SendOutForDeliveryOrderStatus, SendPickupRequest } from "../services/order-service"

const Order=()=>{
    let navigate=useNavigate()
    const {orderId}=useParams()
    const [order,setOrder]=useState({
        "status":[]
    });
    const loadOrder=()=>{
        GetOrderById(Number(orderId)).then((data)=>{
            setOrder(data)
            console.log(data)
        }).catch(error=>{
            console.log(error)
        })
        console.log(order)
    }

    useEffect(()=>{
        loadOrder()
    },[])

    const requestPickup=()=>{
        SendPickupRequest(orderId).then(data=>{
            toast.success("Order Pickup Requested Successfully !!!")
            console.log(data)
            loadOrder()
        }).catch(error=>{
            toast.error("Sorry something went wrong !!!")
            console.log(error)
        })
    }
    const cancelPickupRequest=()=>{
        SendCancelPickupRequest(orderId).then(data=>{
            toast.success("Pickup Request Cancelled Successfully !!!")
            console.log(data)
            loadOrder()
        }).catch(error=>{
            toast.error("Sorry something went wrong !!!")
            console.log(error)
        })
    }
    //cancel order status only
    const cancelOrder=()=>{
        SendCancelOrderStatus(orderId).then(data=>{
            toast.success("Order Cancelled Successfully")
            loadOrder()
        }).catch(error=>{
            toast.error("Sorry Something went wrong")
            console.log(error)
        })
    }
    const outForDelivery=()=>{
        SendOutForDeliveryOrderStatus(orderId).then(data=>{
            toast.success("OUT FOR DELIVERY status changed successfully")
            loadOrder()
        }).catch(error=>{
            console.log(error)
            toast.error("Sorry Something Went Wrong")
        })


    }
    const deliveredOrderStatus=()=>{
        SendDeliveredOrderStatus(orderId).then(data=>{
            toast.success("DELIVERED status changed successfully")
            loadOrder()
        }).catch(error=>{
            console.log(error)
            toast.error("Sorry Something Went Wrong")
        })
    }

    return(
        <Base>

            <Container className="mt-2">
                <Card>
                    <CardHeader className=""> 
                        <p>Order ID : <b> {order?.orderId} </b></p>
                        <p className="" >Status : <b> {order?.status[order.status.length-1]?.status}</b></p>
                    
                    </CardHeader>
                    <CardBody>
                    {(order.selfPayment) && (
                        <Row>
                            <Col md="4">
                                <p className="m-0 text-success"><i class="fas fa-globe-asia"></i> <b> Online Payment ₹{order.selfPayment.amount}</b></p>
                                {
                                    !(order.selfPayment.verified) &&(<i class="fas fa-info-circle text-warning"> Payment Not Verification</i>)
                                }
                                <p></p>
                            </Col>
                            <Col md="4">
                                <a href={BASE_URL+"images/recipts/"+order.selfPayment.recipt}>
                                <img  src={BASE_URL+"images/recipts/"+order.selfPayment.recipt} width={210} alt="" />
                                </a>
                                
                            </Col>
                            <Col md="4">
                            <Button onClick={()=>navigate("/verify_payment/"+order.selfPayment.id)}  className="btn-success rounded-0" style={{marginRight:"10px",width:"100%"}}>Verify Payment</Button>
                            <br  />
                            </Col>

                        </Row>
                    )}    
                    <p className="text-center cursor"><b><u>Item details</u></b></p>
                        <Table responsive>
                        <tbody>
                            <tr>
                                <th>Item number</th>
                                <th>Item name</th>
                                <th>Item quantity</th>
                                <th>Item price</th>
                            </tr>
                            {
                            order?.items?.map((item,i)=>(
                                <tr key={i}>
                                <td>{item.id}</td>
                                <td style={{whiteSpace:"nowrap"}} > <img width="60px" src={DRIVE_IMAGE_URL+item.product?.images[0]?.name} alt="" />{item.product?.name} </td>
                                <td>X {item.quantity}</td>
                                <td style={{whiteSpace:"nowrap"}} >₹ {item.price}</td>
                            </tr>
                            ))
                            }
                            <tr>
                                <td></td>
                                <td>Delivery Charge</td>
                                <td></td>
                                <td style={{whiteSpace:"nowrap"}} >₹ {order.deliverycharge}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><b>Total price</b></td>
                                <td></td>
                                <td style={{whiteSpace:"nowrap"}}><b>₹ {order.amount}</b></td>
                            </tr>
                            <tr>
                                <td>Order Type</td>
                                <td>{order.ordertype}</td>
                            </tr>
                            {
                                (order.trackingId !=null) && (
                                    <tr>
                                <td>Tracking Id</td>
                                <td>{order.trackingId}</td>
                                <td><a className="btn-success" target="_blank" href={`https://pickrr.com/track/${order.trackingId}`}>Track</a></td>
                            </tr>
                                )
                            }
                        </tbody>
                        </Table>
                        <Row>
                            <Col md="8">
                            <Table className="table-borderless">
                            <tbody>
                                <tr>
                                    <th>Status</th>
                                    <th>Date-Time</th>
                                </tr>
                                {
                                    order.status?.map((st,i)=>(
                                        <tr>
                                        <td>{st.status}</td>
                                        <td>{st.date}</td>
                                        <td>
                                        
                                        </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                            </Col>
                            <Col md="4">
                            <Container className="">
                        <Button onClick={()=>requestPickup()} className="btn-success rounded-0" style={{marginRight:"10px",width:"100%"}}>Pickup Request</Button>
                        <br  />
                        <Button onClick={()=>cancelPickupRequest()} className="btn-danger rounded-0" style={{marginRight:"10px",width:"100%"}}>Cancel Pickup Request</Button>
                        <br  />
                        <Button onClick={()=>outForDelivery()} className="btn-warning rounded-0 mt-3" style={{marginRight:"10px",width:"100%"}}>OUT For Delivery</Button>
                        <br />
                        <Button onClick={()=>deliveredOrderStatus()} className="btn-dark rounded-0" style={{marginRight:"10px",width:"100%" }}>Delivered</Button>
                        <br />
                        <Button onClick={()=>cancelOrder()} className="btn-danger rounded-0" style={{width:"100%"}} >Cancel Order</Button>
                        </Container>
                            </Col>
                        </Row>
                        <p className="text-center"><b><u>Address Details </u></b></p>
                        <Table>
                            <tbody>
                            <tr>
                                    <th>Name :</th>
                                    <td>{order?.address?.name}</td>
                                </tr>
                            <tr>
                                    <th>Address Line 1 :</th>
                                    <td>{order?.address?.address}</td>
                                </tr>
                                <tr>
                                    <th>City :</th>
                                    <td>{order?.address?.city}</td>
                                </tr>
                                <tr>
                                    <th>State :</th>
                                    <td>{order?.address?.state}</td>
                                </tr>
                                <tr>
                                    <th>PIN Code :</th>
                                    <td>{order?.address?.pincode}</td>
                                </tr>
                                <tr>
                                    <th>Mobile No :</th>
                                    <td>{order?.address?.mobile}</td>
                                </tr>
                            </tbody>
                        </Table>

                        
                    </CardBody>
                </Card>
            </Container>
        </Base>
    )

}

export default Order