import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, NavItem, Row, Table } from "reactstrap"
import Base from "../components/Base"
import { GetAllorders, GetAllProductorders } from "../services/order-service"

const AllOrders=()=>{

  let navigate = useNavigate()
  const [page,setPage] = useState({
    "totalPages":'',
    "pageSize":'',
    "pageNumber":'',
    "totalElements":'',
    "lastPage":false,
    "orders":[]
})
      const [currentPage,setCurrentPage]= useState(0)
      const changePage=(pageSize=10)=>{
        GetAllProductorders(currentPage,pageSize).then((data)=>{
            setPage({...page,
                "pageNumber":data.pageNumber,
                "lastPage":data.lastPage,
                "orders":[...page.orders,...data.orders]
            })
        }).catch((error)=>{
            console.log(error)
        })
      }

      useEffect(()=>{
        changePage()
      },[currentPage])

      useEffect(()=>{
          changePage()
          
      },[])


    


    return (
        <Base>
            <Container className="pt-1">
              

  <InfiniteScroll
                           dataLength={page.totalElements}
                           hasMore={!page.lastPage}
                           next={()=>{setCurrentPage(currentPage+1)}}
                           endMessage={    <h1 style={{ textAlign: 'center' }}>...End of Page...</h1>    }
                           >
    
      {
        page.orders.map((order,i)=>(
          <Card key={i} className="mb-1">
          
            <CardBody>
                 {/* <th className="myHover" onClick={()=>navigate(`/order/${order.orderId}`)} scope="row"> */}

                <Row>
                  <Col sm={9}  >
                  <b>{order.orderId}</b>
                  <br />
                  {order.address.name} ,{order.address.city}
                  <div style={{float:"right",color:"blue"}}>
                  {(order.selfPayment) && (<i class="fas fa-globe-asia text-success"></i>)}
                  <p className="p-0 m-0">₹ {order.amount}</p>
                  <p className="p-0 m-0"> {order.ordertype}</p>
                  </div>
                  <br />
                  <small className="text-success">{order.date}</small>
                  </Col>


                  <Col sm="3"  >
                    <Button className="btn-small rounded-0 btn-primary">{order?.status[order.status.length-1]?.status}</Button>
                  <Button onClick={()=>navigate("/order/"+order.orderId)} className="btn-small rounded-0 btn-warning">View</Button>
                  </Col>
                </Row>

                    


            
           
            
            

            

              
            </CardBody>
         

                  </Card> 
                      )
                      )
                    }
                  
                </InfiniteScroll>
                
             
            </Container>
        </Base>
    )
        
    
}

export default AllOrders