import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Table } from "reactstrap"
import Base from "../components/Base"
import { DRIVE_IMAGE_URL } from "../services/helper"
import { DeleteProductImage, GetProductById, updateSavedProduct, SaveProductImage } from "../services/product-service"

const ProductUpdate=()=>{
    const {productId}=useParams()

    // console.log(productId)
     const [product,setProduct]=useState({"images":[]})
     const [newImage,setNewImage] = useState({"name":""})
     const [imgName,setImgName] = useState("")
     let navigate = useNavigate()

 
     const fetchProduct=()=>{
         GetProductById(productId).then((data)=>{
             //console.log(data)
             setProduct(data);
         }).catch((error)=>{
             console.log(error)
         })
     }

     const updateProduct=(event)=>{
        setProduct({...product,[event.target.id]: event.target.value})
     }

     const updateThisProduct=()=>{
         updateSavedProduct(product).then(data=>{
             fetchProduct()
            toast.success("product updated successfully !!!")
         }).catch(error=>{
             console.log(error)
             toast.error("Something went wrong !!!")
         })
     }

     useEffect(()=>{
         fetchProduct(productId)
         //console.log(product)
     },[])


     const saveImage=()=>{
         SaveProductImage(product.id,newImage).then((data)=>{
            setProduct(data)
            toast.success("Image has been added successfully !!!")
         }).catch((error)=>{
             console.log(error)
         })
     }

     const deleteImage=(id)=>{
            DeleteProductImage(product.id, id).then((data)=>{
                    setProduct(data)
                    toast.success("Image has been deleted successfully !!!")
            }).catch((error)=>{
                toast.error("Sorry something went wrong !!!")
            })
        }

    //extracting image name from url
    useEffect(()=>{
            let lastIndex = newImage.name.indexOf("/view?usp=sharing")
            var name = newImage.name.substring(32,lastIndex)
            //console.log(name)
            setImgName(name)
            
        
    },[newImage])



    return (
        <Base>
            <Container className="mt-3">
                <Card>
                    <CardHeader>
                        <Row>
                            <Col md={2}>
                            <img src={DRIVE_IMAGE_URL+product?.images[0]?.name}  width="40px" alt="product image" />
                            </Col>
                            <Col md={10}>
                            <p className="text-center"><b>{product.name}</b></p>
                            </Col>
                        </Row>
                        
                        
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label for="name" md={2}>Name</Label>
                                <Col md={10}>
                                    <Input id="name" onChange={(event)=>{updateProduct(event)}} value={product.name} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="mrp" onChange={(event)=>{updateProduct(event)}} typeof="text" md={2}>MRP</Label>
                                <Col md={10}>
                                    <Input id="mrp" onChange={(event)=>{updateProduct(event)}} type="number" value={product.mrp} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="price" onChange={(event)=>{updateProduct(event)}} typeof="text" md={2}>Price</Label>
                                <Col md={10}>
                                    <Input id="price" onChange={(event)=>{updateProduct(event)}} type="number" value={product.price} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="origin" onChange={(event)=>{updateProduct(event)}} typeof="text" md={2}>Origin</Label>
                                <Col md={10}>
                                    <Input id="origin" onChange={(event)=>{updateProduct(event)}} type="text" value={product.origin} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="brand" onChange={(event)=>{updateProduct(event)}} typeof="text" md={2}>Brand</Label>
                                <Col md={10}>
                                    <Input id="brand" onChange={(event)=>{updateProduct(event)}} type="text" value={product.brand} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="mrp" typeof="text" md={2}>Quantity</Label>
                                <Col md={10}>
                                    <Input id="mrp" onChange={(event)=>{updateProduct(event)}} type="number" value={product.quantity} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="rack" typeof="text" md={2}>SKU</Label>
                                <Col md={10}>
                                    <Input id="rack" onChange={(event)=>{updateProduct(event)}} type="text" value={product.rack} />
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

                            <Button onClick={()=>updateThisProduct()}  style={{float:"right"}}>Update Product</Button>

                       
                          
                            <br style={{marginBottom:"45px"}} />

                        
                            {product.images.map((img,i)=>(
                                <FormGroup row>
                                <Label md="4" for={i}><img src={DRIVE_IMAGE_URL+img.name} width="250px" ></img></Label>
                                <Col md="8">
                                <Input id={i} value={img.name} />
                                <Button onClick={()=>{deleteImage(img.id)}} className="mt-3 btn-danger">Delete Image</Button>
                                </Col>
                                </FormGroup>
                            ))}
                        
                        </Form>
                    </CardBody>

                    

                </Card>
                <Card className="my-2">
                        <CardBody>
                            <p className="text-center"><b><u>Add New Image</u></b></p>
                            <Form>
                                <FormGroup row>
                                    <Label md="4" for="imageName"> <img width="250px" src={DRIVE_IMAGE_URL+imgName} alt="new Image" /> </Label>
                                    <Col md="8">
                                        <Input id="imageName" value={newImage.name} onChange={(event)=>{setNewImage({"name":event.target.value})}}  />
                                        <Button onClick={()=>{saveImage()}} className="mt-3">Save Image</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
            </Container>
        </Base>
    )
}

export default ProductUpdate