import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Table } from "reactstrap"
import Base from "../components/Base"
import { addSpecialization, getAllSpecialization } from "../services/doctor-service"

const Specialization=()=>{
    const [special,setSpecial]= useState([])

    const [speciality,setSpeciality]= useState({
        id:"",
        name:""
    })

    const resetSpeciality=()=>{
        setSpeciality({
            id:"",
            name:""
        })
    }

    const loadData=()=>{
        getAllSpecialization().then(data=>{
            setSpecial(data)
            console.log(data)
        }).catch(error=>console.log(error))
    }

    useEffect(()=>{
        loadData()
    },[])

    const addNewSpecialization=()=>{
        setSpeciality({name:speciality.name})
        addSpecialization(speciality).then(data=>{
            toast.success("New Specialization Added successfully")
            loadData()
        }).catch(error=>{
            console.log(error)
            toast.error("Sorry Something went wrong !!!")
        })
    }

    const editSpeciality=(sp)=>{
        setSpeciality({
            id:sp.id,
            name:sp.name
        })
    }
    return (
        <Base>
            <Container>
            <Card className="my-3">
            <CardBody>
            <Form>
            <FormGroup>
                    <Input placeholder="specialization id" type="number" disabled id="id" value={speciality.id} />
                </FormGroup>
                <FormGroup>
                    <Input type="text" onChange={(event)=>setSpeciality({...speciality,name:event.target.value})} value={speciality.name}   placeholder="Specialization Name" id="name" />
                </FormGroup>
                
                <Button style={{marginRight:"10px"}} onClick={()=>addNewSpecialization()} className="btn btn-success" >Add/Update SPecialization</Button>
                <Button type="reset" onClick={()=>resetSpeciality()} >Reset</Button>
            </Form>
            </CardBody>
            </Card>

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
                        Name
                    </th>
                    <th>
                        Action
                    </th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        special.map((sp,i)=>(
                        
                        <tr key={i}>
                            <th scope="row">
                        {sp.id}
                    </th>
                    <td>
                        {sp.name}
                    </td>
                    <td>
                        <Button className="btn-warning" onClick={()=>editSpeciality(sp)}>Edit</Button>
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
export default Specialization