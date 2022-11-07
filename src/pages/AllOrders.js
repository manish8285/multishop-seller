import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, NavItem, Table } from "reactstrap"
import Base from "../components/Base"
import { GetAllorders } from "../services/order-service"

const AllOrders=()=>{

  let navigate = useNavigate()

    const [allOrders,setAllOrders] = useState([])


    useEffect(()=>{
        GetAllorders().then(data=>{
            setAllOrders(data)
            console.log(data)
        }).catch(error=>{
            console.log(error)
        })
    },[])

    


    return (
        <Base>
            <Container>
            <Table
  responsive
  striped
>
  <thead>
    <tr>
      <th>
        #Order Id
      </th>
      <th>
        Name
      </th>
      <th>
        Date
      </th>
      <th>
        Amount
      </th>
      <th>
        Status
      </th>
    </tr>
  </thead>
  <tbody>
    
      {
        allOrders.map((order,i)=>(
          
          <tr key={i}>
            <th className="myHover" onClick={()=>navigate(`/order/${order.orderId}`)} scope="row">
        {order.orderId}
      </th>
      <td>
        {order.address.name}
      </td>
      <td>
        {order.date}
      </td>
      <td>
        {order.amount}
      </td>
      <td>
          {order?.status[order.status.length-1]?.status}
      </td>
    </tr>
 
          
        )
        )
      }
  
  </tbody>
</Table>
            </Container>
        </Base>
    )
        
    
}

export default AllOrders