import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Table } from "reactstrap";
import { DRIVE_IMAGE_URL } from "../services/helper";
import { decreaseProductQuantity, deleteProduct, GetAllProducts, increaseProductQuantity, searchProduct } from "../services/product-service";
import Product from "./Product";

const AllProducts=()=>{
    const [page,setPage] = useState({
        "totalPages":'',
        "pageSize":'',
        "pageNumber":'',
        "totalElements":'',
        "lastPage":false,
        "products":[]

    })

    const [currentPage,setCurrentPage] = useState(0)

    let navigate = useNavigate()

    useEffect(()=>{
        changePage();
    },[])

    const searchForProduct=(key)=>{
        searchProduct(key).then(response=>{
            //console.log(response)
            setPage(response)

        }).catch(error=>{
            console.log(error)
        })
    }

    const decreaseProduct=(productId)=>{
        decreaseProductQuantity(productId).then(data=>{
            changePage(currentPage,10)
        })
    }
    const increaseProduct=(productId)=>{
        increaseProductQuantity(productId).then(data=>{
            changePage(currentPage,10)
        })
    }

    const deleteThisProduct=(productId)=>{
        deleteProduct(productId).then(data=>{
            changePage(currentPage,10)
            toast.success(data)
        }).catch(error=>{
            toast.error("You can not delete this product")
            console.log(error)
        })
    }


    const changePage=(pageNumber=0,pageSize=10)=>{
        GetAllProducts(pageNumber,pageSize).then(response=>{
            //console.log(response)
            setPage(response)
        }).catch(error=>{
            console.log(error)
        })
    }

    const myfun=()=>{}

    return(
      
        <div>
            <div class="container-fluid bg-dark mb-30 py-2">
                <div class="row px-xl-5 mx-1">
                        <div class="input-group">
                            <input type="text" onChange={(event)=>{searchForProduct(event.target.value)}} class="form-control" placeholder="Search for products" />
                            <div class="input-group-append">
                                <span class="input-group-text bg-transparent text-primary">
                                    <i class="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                       
                </div>
                  
            </div>

            <div class="col-lg-9 col-md-8 offset-md-1">
            
                

                <div class="pb-3 my-2">
                <Table
            responsive
            striped
            >
            <thead>
                <tr>
                <th>
                #Product Id
                </th>
                <th>
                    Name
                </th>
                <th>
                    Price
                </th>
                <th>
                    MRP
                </th>
                <th>
                    Quantity
                </th>
                <th>
                    Actions
                </th>
                </tr>
            </thead>
            <tbody>
                    {page.products.map(product=>(
                        <tr>
                            <td>{product.id}</td>
                            <td><img class="img-fluid" width={"60px"} src={DRIVE_IMAGE_URL+product?.images[0]?.name} alt="product image" /></td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.mrp}</td>
                            <td className="align-middle">
                                <div className="input-group quantity mx-auto" style={{width: "100px"}}>
                                    <div className="input-group-btn">
                                        <button onClick={()=>decreaseProduct(product.id)} className="btn btn-sm btn-warning btn-minus" >
                                        <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" className="form-control form-control-sm bg-light border-0 text-center" value={product.quantity} />
                                    <div className="input-group-btn">
                                        <button onClick={()=>increaseProduct(product.id)} className="btn btn-sm btn-warning btn-plus">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td>
                            <a className="text-danger" onClick={()=>deleteThisProduct(product.id)} style={{marginRight:"10px"}} ><i class="fas fa-trash-alt"></i></a>
                            <a onClick={()=>navigate(`/product-edit/${product.id}`)} className="btn-primary"><i class="fas fa-edit"></i></a>
                            </td>
                        </tr>

                    ))}
            </tbody>
                </Table>        
                    
                 </div>   
            </div>
            



    </div>
    )
}

export default AllProducts