import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap"
import Base from "../components/Base"
import { getAllAppointments } from "../services/doctor-service"

const AllAppointments=()=>{
    let navigate = useNavigate()
    const [currentPage,setCurrentPage] = useState(0)
    const [pageData,setPageData] = useState({
        pageNumber:"",
        pageSize:"",
        totalElements:"",
        totalPages:"",
        lastPage:true,
        appointments:[]
    })

    useEffect(()=>{
        getAllAppointments(0,5).then(data=>{
            console.log(data)
            setPageData(data)
        }).catch(error=>console.log(error))
    },[])

    useEffect(()=>{
        getAllAppointments(currentPage,5).then(data=>{
            setPageData({
                pageNumber:data.pageNumber,
                pageSize:data.pageSize,
                totalElements:data.totalElements,
                totalPages:data.totalPages,
                lastPage:data.lastPage,
                appointments:[...pageData.appointments,...data.appointments]})
        }).catch(error=>console.log(error))
    },[currentPage])
    return (
        <Base>
            
            <Container>
            <Card className="rounded-0 my-1 py-1">
            <i class="fas fa-headset fa-2x text-warning mx-2"> All Appointments</i>
            </Card>
            <InfiniteScroll
                        dataLength={pageData.totalElements}
                        hasMore={!pageData.lastPage}
                        next={()=>{setCurrentPage(currentPage+1)}}
                        
                    >
                    {(pageData.appointments).map(ap=>(
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md="1">

                                            <Container className="text-center">
                                                <i class="fas fa-user-injured fa-2x text-primary"></i>
                                                <i class="fas fa-headset fa-2x text-primary mx-2"></i>
                                                <i class="fas fa-user-md fa-2x text-primary"></i>
                                                
                                            </Container>
                                        </Col>
                                        <Col md="2">
                                        <h5 className="text-success my-0">Dr. {ap.doctor?.name}</h5>
                                        <p className="my-0">{ap.doctor?.specialization?.name}</p>
                                        <p className="my-0"><i class="fas fa-map-marker-alt"></i>  {ap.doctor?.address?.city}</p>
                                        <p className="my-0"><i class="fas fa-phone-alt"></i> {ap.doctor?.address?.mobile}</p>
                                        
                                            
                                        </Col>
                                        <Col md="4">
                                            <div className="table-responsive">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Date</td>
                                                        <td>{ap.date}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pt. Name</td>
                                                        <td>{ap.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mobile : </td>
                                                        <td><a href={`tel:${ap.mobile}`}> {ap.mobile} </a> </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email : </td>
                                                        <td><a href={`mailto:${ap.email}`}> {ap.email}</a> </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Symptoms : </td>
                                                        <td> {ap.symptoms}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                         
                                        </Col>
                                        <Col md="3">
                                        <Button disabled style={{marginRight:"10px",width:"100%"}} className="btn-small rounded-0 btn-outline-warning">
                                            {ap?.selfPayment?.verified && (<i class="fas fa-wallet text-success"> {ap?.status}</i>)}
                                            {!(ap?.selfPayment?.verified) && (<i class="fas fa-wallet text-warning"> {ap?.status}</i>)}
                                        
                                        </Button>
                                        <Button onClick={()=>navigate("/appointment/"+ap.id)} style={{marginRight:"10px",width:"100%"}} className="btn-small rounded-0 btn-warning">View</Button>
                                        </Col>
                                   
                                    
                                </Row>
                            </CardBody>

                        </Card>
                        
                    ))}
                    </InfiniteScroll>

            </Container>
        </Base>
    )
}
export default AllAppointments