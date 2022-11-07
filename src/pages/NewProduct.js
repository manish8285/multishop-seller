import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import Base from "../components/Base"
import { getAllCategories } from "../services/category-service"
import { DRIVE_IMAGE_URL } from "../services/helper"
import { SaveNewProduct } from "../services/product-service"

const NewProduct=()=>{
    const [product,setProduct]=useState({"images":[]


    })
    const [categories,setCategories]=useState([])
    const [catid,setCatid] = useState(0)
    let navigate = useNavigate()


    useEffect(()=>{
        getAllCategories().then(data=>{
            //console.log(data)
            setCategories(data)
        })
    },[])
    const updateProduct=(event)=>{
        setProduct({...product,[event.target.id]: event.target.value})
        const catiid= document.getElementById("category")?.value
        setCatid(catiid)
        
     }

     useEffect(()=>{
        setProduct({...product,"categoryId":catid})
     },[catid])


    const saveProduct=()=>{

        console.log(product)
        SaveNewProduct(product).then(data=>{
            //console.log(data)
            toast.success("Product added successfully !!")
            navigate(`/product-edit/${data.id}`)
        }).catch(error=>{
            console.log(error)
            toast.error("Something went wrong !!!")
        })
        
    }

    return(
        <Base>
            <Container className="mt-3">
                <Card>
                    <CardHeader>
                    <i class="fas fa-plus-square"></i> Add New Product
                        
                        
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label for="name" md={2}>Name</Label>
                                <Col md={10}>
                                    <Input required id="name" onChange={(event)=>{updateProduct(event)}} value={product.name} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="mrp" onChange={(event)=>{updateProduct(event)}} typeof="text" md={2}>MRP</Label>
                                <Col md={10}>
                                    <Input required id="mrp" onChange={(event)=>{updateProduct(event)}} type="number" value={product.mrp} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="price" onChange={(event)=>{updateProduct(event)}} typeof="text" md={2}>Price</Label>
                                <Col md={10}>
                                    <Input required id="price" onChange={(event)=>{updateProduct(event)}} type="number" value={product.price} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="mrp" typeof="number" md={2}>Quantity</Label>
                                <Col md={10}>
                                    <Input required id="quantity" onChange={(event)=>{updateProduct(event)}} type="number" value={product.quantity} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="rack" typeof="text" md={2}>SKU</Label>
                                <Col md={10}>
                                    <Input  id="rack" onChange={(event)=>{updateProduct(event)}} type="text" value={product.rack} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="rack" typeof="text" md={2}>Category</Label>
                                <Col md={10}>
                                    <Input id="category" type="select" >
                                        {
                                            categories.map((category,index)=>(
                                                <option key={index} id={category.id} value={category.id}  >{category.name}</option>
                                            ))
                                        }
                                        
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="rack" typeof="text" md={2}>Brand</Label>
                                <Col md={10}>
                                    <Input  id="brand" onChange={(event)=>{updateProduct(event)}} type="text" value={product.brand} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="rack" typeof="text" md={2}>Origin</Label>
                                <Col md={10}>
                                    <Input  id="origin" onChange={(event)=>{updateProduct(event)}} type="text" value={product.origin} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="tags" onChange={(event)=>{updateProduct(event)}} typeof="text" md={2}>Tags</Label>
                                <Col md={10}>
                                    <Input id="tags" onChange={(event)=>{updateProduct(event)}} type="text" value={product.tags} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" typeof="text" md={2}>Description</Label>
                                <Col md={10}>
                                    <Input id="description" onChange={(event)=>{updateProduct(event)}} rows="10" type="textarea" value={product.description} />
                                </Col>
                            </FormGroup>

                            <Button onClick={()=>saveProduct()} style={{float:"right"}}>Save Product</Button>

                       
                          
                         
                        
                        </Form>
                    </CardBody>

                    

                </Card>

            </Container>
        </Base>
    )
}

export default NewProduct