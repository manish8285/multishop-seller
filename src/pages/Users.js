import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Table } from "reactstrap";
import { DRIVE_IMAGE_URL} from "../services/helper";
import { decreaseProductQuantity, deleteProduct, GetAllProducts, increaseProductQuantity, searchProduct } from "../services/product-service";
import InfiniteScroll from 'react-infinite-scroll-component';
import { deleteUser, getAllUsers } from "../services/user_service";
import Base from "../components/Base";
const Users=()=>{
    const [page,setPage] = useState({
        "totalPages":'',
        "pageSize":'',
        "pageNumber":'',
        "totalElements":'',
        "lastPage":false,
        "users":[]

    })

    const [currentPage,setCurrentPage] = useState(0)

    let navigate = useNavigate()

    useEffect(()=>{
        changePage();
    },[currentPage])

    const searchForProduct=(key)=>{
        toast.info("function not working")
        // searchProduct(key).then(response=>{
        //     //console.log(response)
        //     setPage(response)

        // }).catch(error=>{
        //     console.log(error)
        // })
    }



    const deleteThisUser=(userId)=>{
        deleteUser(userId).then(data=>{
            toast.success("User Deleted Successfully !!!")
            changePage()
        }).catch(error=>{
            console.log(error)
        })
    }


    const changePage=(pageSize=10)=>{
        getAllUsers(currentPage,pageSize).then(response=>{
            console.log("fetching users...")
            console.log(response)
            setPage({...page,
                "pageNumber":response.pageNumber,
                "lastPage":response.lastPage,
                "users":[...response.users]
            })
        }).catch(error=>{
            console.log(error)
        })
    }

    const myfun=()=>{}

    return(
      
        <Base>
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
                #Id
                </th>
                <th>
                    Name
                </th>
                <th>Role</th>
                <th>
                    Email
                </th>
                <th>
                    Actions
                </th>
                </tr>
            </thead>
            <tbody>
            
                
                    {page.users.map(user=>(
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user?.roles[0]?.name}</td>
                            <td>{user.email}</td>
                            
                            <td>
                            <a className="text-danger" onClick={()=>deleteThisUser(user.id)} style={{marginRight:"10px"}} ><i class="fas fa-trash-alt"></i></a>
                            <a onClick={()=>navigate(`/product-edit/${user.id}`)} className="btn-primary"><i class="fas fa-edit"></i></a>
                            </td>
                        </tr>

                    ))}
                
            </tbody>
                </Table> 
                <div >
                        <nav>
                          <ul class="pagination justify-content-center">
                            {
                                (currentPage>0) &&(
                                    <>
                                    <li class="page-item"><a class="page-link" onClick={()=>setCurrentPage(currentPage-1)}><span>Previous</span></a></li>
                                    <li class="page-item"><a class="page-link" onClick={()=>setCurrentPage(currentPage-1)}>{currentPage}</a></li>
                                    </>
                                )
                            }
                           
                            
                            {
                                (!page.lastPage) && (
                                <>
                                <li class="page-item active"><a class="page-link">{currentPage+1}</a></li>
                                <li class="page-item"><a class="page-link" onClick={()=>setCurrentPage(currentPage+1)}>{currentPage+2}</a></li>
                                </>
                                )
                            }
                            
                            {
                                (!page.lastPage) && (
                                    <li class="page-item"><a class="page-link" onClick={()=>setCurrentPage(currentPage+1)}>Next</a></li>
                                )
                            }
                          </ul>
                        </nav>
                    </div>        
                 </div>   
            </div>
            



    </div>
        </Base>
    )
}

export default Users