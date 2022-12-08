import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { getCurrentSellerDetails, getUserRoles, isSeller } from "../auth"
import Base from "../components/Base"
import { getAllCategories } from "../services/category-service"
import { DRIVE_IMAGE_URL } from "../services/helper"
import { SaveNewProduct, SaveNewProductSeller } from "../services/product-service"
import { getAllSellers } from "../services/seller-service"

const NewProduct=()=>{
    const [product,setProduct]=useState({
        name:"",
        price:"",
        quantity:"",
        mrp:"",
        rack:"",
        brand:"",
        origin:"",
        pathy:"",
        expiry:"",
        size:"",
        category:{
            id:''
        },
        seller:{
            id:''
        },
        "images":[]


    })
    const [sellers,setSellers]=useState([])

    const loadSellers=()=>{
        if(isSeller()){
            const iseller=getCurrentSellerDetails()
            setSellers(isSeller)
            setProduct({
                ...product,
                seller:isSeller
            })
        }else{
            getAllSellers().then(data=>{
                setSellers(data)
            }).catch(error=>console.log(error))
        }
    }


    const [categories,setCategories]=useState([])
    let navigate = useNavigate()


    useEffect(()=>{
        getAllCategories().then(data=>{
            //console.log(data)
            setCategories(data)
        })

        loadSellers()
    },[])
    const updateProduct=(event)=>{
        setProduct({...product,[event.target.id]: event.target.value})
     }

    const validateProduct=()=>{
        if(product.name.length<3){
            return false
        }else if(product.mrp==null){
            return false
        }else if(product.price<=0){
            return false
        }else if(product.quantity<1){
            return false
        }else if(product.rack.length<1){
            return false
        }else if(product.brand.length<1){
            return false
        }else if(product.origin.length<1){
            return false
        }else if(product.size.length<1){
            return false
        }else if(product.category.id==null){
            return false
        }else if(product.seller.id==null){
            return false
        }
        return true
    }



    const saveProduct=()=>{
        if(!validateProduct()){
           // console.log(product)
            toast.error("please provide all the details!!!")
            return
        }
        console.log(product)

        if(isSeller()){
            SaveNewProductSeller(product).then(data=>{
                //console.log(data)
                toast.success("Product added successfully !!")
                navigate(`/product-edit/${data.id}`)
            }).catch(error=>{
                console.log(error)
                toast.error("Something went wrong !!!")
            })
            return
        }
        
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
                                <Label for="name" md={2}>Name *</Label>
                                <Col md={10}>
                                    <Input required id="name" onChange={(event)=>{updateProduct(event)}} value={product.name} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="mrp" onChange={(event)=>{updateProduct(event)}} typeof="number" md={2}>MRP *</Label>
                                <Col md={10}>
                                    <Input required id="mrp" onChange={(event)=>{updateProduct(event)}} type="number" value={product.mrp} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="price" onChange={(event)=>{updateProduct(event)}} typeof="number" md={2}>Price *</Label>
                                <Col md={10}>
                                    <Input required id="price" onChange={(event)=>{updateProduct(event)}} type="number" value={product.price} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="mrp" typeof="number" md={2}>Quantity *</Label>
                                <Col md={10}>
                                    <Input required id="quantity" onChange={(event)=>{updateProduct(event)}} type="number" value={product.quantity} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="rack" typeof="text" md={2}>SKU *</Label>
                                <Col md={10}>
                                    <Input  id="rack" onChange={(event)=>{updateProduct(event)}} type="text" value={product.rack} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="categoryId" typeof="text" md={2}>Category</Label>
                                <Col md={10}>
                                    <Input defaultValue="1" id="categoryId" onChange={(event)=>setProduct({...product,category:{id:event.target.value}})} type="select" >
                                        <option selected> ---Select Category--- </option>
                                        {
                                            categories.map((category,index)=>(
                                                <option key={index}  value={category.id}  >{category.name}</option>
                                            ))
                                        }
                                        
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="seller" typeof="text" md={2}>Seller</Label>
                                <Col md={10}>
                                    <Input id="seller" onChange={(event)=>setProduct({...product,seller:{id:event.target.value}})} type="select" >
                                        <option selected disabled> ---Select Seller--- </option>
                                        {
                                            sellers.map((s,index)=>(
                                                <option key={index} value={s.id}  >{s.storeName}</option>
                                            ))
                                        }
                                        
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="brand" typeof="text" md={2}>Brand *</Label>
                                <Col md={10}>
                                    <Input  id="brand" onChange={(event)=>{updateProduct(event)}} type="text" value={product.brand} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="origin" typeof="text" md={2}>Origin</Label>
                                <Col md={10}>
                                    <Input  id="origin" onChange={(event)=>{updateProduct(event)}} type="text" value={product.origin} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="pathy" typeof="text" md={2}>Pathy</Label>
                                <Col md={10}>
                                    <Input  id="pathy" onChange={(event)=>{updateProduct(event)}} type="text" value={product.pathy} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="expiry" typeof="text" md={2}>Expiry</Label>
                                <Col md={10}>
                                    <Input  id="expiry" onChange={(event)=>{updateProduct(event)}} type="text" value={product.expiry} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="size" typeof="text" md={2}>Size *</Label>
                                <Col md={10}>
                                    <Input required id="size" onChange={(event)=>{updateProduct(event)}} type="text" value={product.size} />
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