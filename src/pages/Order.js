import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Card, CardBody, CardHeader, Container, NavItem, Table } from "reactstrap"
import Base from "../components/Base"
import { DRIVE_IMAGE_URL } from "../services/helper"
import { GetOrderById } from "../services/order-service"

const Order=()=>{
    const {orderId}=useParams()
    const [order,setOrder]=useState({
        "status":[]
    });

    useEffect(()=>{
        GetOrderById(Number(orderId)).then((data)=>{
            setOrder(data)
            console.log(data)
        }).catch(error=>{
            console.log(error)
        })
        console.log(order)
    },[])

    return(
        <Base>

            <Container className="mt-2">
                <Card>
                    <CardHeader className=""> 
                        <p>Order ID : <b> {order?.orderId} </b></p>
                        <p className="" >Status : <b> {order?.status[order.status.length-1]?.status}</b></p>
                    
                    </CardHeader>
                    <CardBody>
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
                                <td> <img width="60px" src={DRIVE_IMAGE_URL+item.product?.images[0]?.name} alt="" /> {item.product?.name}</td>
                                <td>X {item.quantity}</td>
                                <td>Rs {item.price}</td>
                            </tr>
                            ))
                            }
                            <tr>
                                <td><b>Total price</b></td>
                                <td></td>
                                <td><b> {order.amount}</b></td>
                            </tr>
                        </tbody>
                        </Table>
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
                            </tbody>
                        </Table>

                        <Container className="text-center">
                        <Button >Place Order</Button>
                        </Container>
                    </CardBody>
                </Card>
            </Container>
        </Base>
    )

}

export default Order