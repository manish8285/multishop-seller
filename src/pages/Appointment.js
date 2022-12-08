import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row, Toast } from "reactstrap"
import Base from "../components/Base"
import { useEffect, useState } from "react"
import { getAppointById, updateAppointByAadmin } from "../services/doctor-service"
import { BASE_URL, privateAxios } from "../services/helper"
import {toast} from 'react-toastify'
const Appointment=()=>{
    let navigate=useNavigate()
    const {appId} = useParams()
    

    const [appointment,setAppointment]= useState()

    const updateApp=(event)=>{
        setAppointment({
            ...appointment,
            [event.target.id]:event.target.value
        })
    }

    const updateDetails=()=>{
        console.log(appointment)
        
        updateAppointByAadmin(appointment).then(data=>{
            toast.success("Prescription Saved Successfully!!!")
        }).catch(error=>console.log(error))
        
    }

    const updatePrescriptionImage=()=>{
        //console.log(appointment)
        const form = document.forms.namedItem("form2")
        const formData = new FormData(form)
       // formData.append("prescription_image",document.getElementById("prescription_image").)
        privateAxios.put(BASE_URL+`doctor/appointment_update_image/${appointment.id}`,formData,{headers:{
            'Content-Type':'multipart/form-data',
        }}).then(response=>{
            //console.log(response.data)
            toast.success("Saved Successfully !!!")
            loadAppointment()
        }).catch(error=>console.log(error))
        
    }

    const loadAppointment=()=>{
        getAppointById(appId).then(data=>{
            setAppointment(data)
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        loadAppointment()
    },[])




    return (

        <Base>
            <Container>
                
                <Card className="mt-1">
                    <CardBody>
                        <Row>
                            <Col md="4">
                                <div className="table-responsive">
                                <table>
                                    <tr>
                                        <th>Pt. Name:</th>
                                        <td>{appointment?.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Age :</th>
                                        <td>{appointment?.age}</td>
                                    </tr>
                                    <tr>
                                        <th>Mobile :</th>
                                        <td>{appointment?.mobile}</td>
                                    </tr>
                                    <tr>
                                        <th>Email :</th>
                                        <td>{appointment?.email}</td>
                                    </tr>
                                </table>
                                </div>
                            </Col>
                            <Col md="4">
                            <Container className="text-center">
                            <i class="fas fa-plus-circle fa-3x text-success"></i>
                            </Container>
                            </Col>
                            <Col md="4">
                            <div className="table-responsive">
                                <table>
                                    <tr>
                                        <th>Dr. {appointment?.doctor?.name}</th>
                                        
                                    </tr>
                                    <tr>
                                    <td>{appointment?.doctor.specialization?.name}</td>
                                    </tr>
                                    <tr>
                                     
                                        <td>{appointment?.doctor?.qualification}</td>
                                    </tr>
                                    <tr>

                                        <td>{appointment?.doctor?.address?.city}</td>
                                    </tr>
                                </table>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="rounded-0 mt-1">
                    <CardBody>
                        <div style={{float:"right"}}>
                           
                            <i className={"fas fa-info-circle text-warning"}  onClick={()=>navigate("/verify_payment/"+appointment?.selfPayment?.id)} > {appointment?.selfPayment?.verified?'Payment Verified':'Payment Not Verified'}</i>
                            <p className="my-0">₹ {appointment?.fee}</p>
                        </div>
                    <i class="fas fa-prescription fa-2x text-danger"></i>
                        <Form>
                            <FormGroup>
                                <Label for="symptoms">Symptoms</Label>
                                <Input onChange={(event)=>updateApp(event)} type="textarea" id="symptoms" value={appointment?.symptoms}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="disease">Disease</Label>
                                <Input onChange={(event)=>updateApp(event)} type="textarea" id="disease" value={appointment?.disease}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="prescription">Prescription</Label>
                                <Input onChange={(event)=>updateApp(event)}  type="textarea" id="prescription" value={appointment?.prescription}></Input>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="nextDate">Next Date</Label>
                                <Input onChange={(event)=>updateApp(event)} id="nextDate" type="date" value={appointment?.nextDate} />
                            </FormGroup>
                            <Container className="text-center">
                                <Button className="btn btn-success" onClick={()=>updateDetails()} type="button">Submit</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
                <Card className="my-1">
                    <CardBody>
                    <Row>
                                
                                <Col md="6">
                                    {
                                        (appointment?.prescription_image) && (<a href={BASE_URL+"images/prescriptions/"+appointment?.prescription_image}><img width={240} src={BASE_URL+"images/prescriptions/"+appointment?.prescription_image} alt="" /></a>)
                                    }
                                </Col>
                                <Col md="6">
                                <Form name="form2" id="form2" encType="multipart/form-data">
                                <FormGroup>
                                <Label for="prescription_image">Prescription Image</Label>
                                <Input name="prescription_image" id="prescription_image" type="file"></Input>
                                </FormGroup>
                                    
                                    <Button className="btn btn-warning" onClick={()=>updatePrescriptionImage()} type="button">Submit</Button>
                                </Form>
                                </Col>
                            </Row>
                    </CardBody>
                </Card>
            </Container>
        </Base>
    )
}

export default Appointment