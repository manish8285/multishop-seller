import { useEffect, useState } from "react"
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Table, Toast, ToastBody, ToastHeader } from "reactstrap"
import Base from "../components/Base"
import { addNewCategory, deleteCategory, getAllCategories, updateCategory } from "../services/category-service"
import { toast } from "react-toastify";

const Categories=()=>{
    const [categories,setCategories]=useState([])
    const [category,setCategory] = useState({
        "id":0,
        "name":"",
        "tags":""
    })

    useEffect(()=>{
        getAllCategories().then(data=>{
           // console.log(data)
            setCategories(data)
        })
    },[])

    const addCategory=()=>{
        addNewCategory(category).then(data=>{
            setCategories([data,...categories])
            toast.success("Category has been added successfully !!!")
            resetCategory()
           // console.log(data)
        }).catch(error=>{
            toast.error("Sorry Something went wrong !!!")
           // console.log(error)
        })
    }

    const updateThisCategory=(category)=>{
            setCategory(category)
    }
    const resetCategory=()=>{
        setCategory({"id":"","name":"","tags":""})
    }

    const deleteThisCategory=(catId)=>{
        deleteCategory(catId).then(data=>{
            toast.success("category deleted successfully !!!")
                getAllCategories().then(data=>{
                    setCategories(data)
                })
        }).catch(error=>{
            toast.error("sorry something went wrong")
           // console.log(error)
        })
    }

    const attemptApdateCategory=()=>{  
        if(category.id != 0){
            updateCategory(category).then(data=>{
                resetCategory()
                toast.success("category updated successfully !!!")
                getAllCategories().then(data=>{
                    setCategories(data)
                })
            }).catch(error=>{
                toast.error("sorry something went wrong")
               // console.log(error)
            })
        }
        
    }

    return(
        <Base>
            <Container>

            <Card className="my-3">
            <CardBody>
            <Form>
                <FormGroup>
                    <Input type="text" value={category.name} onChange={(event)=>setCategory({...category,"name":event.target.value})} placeholder="Category Name" id="name" />
                </FormGroup>
                <FormGroup>
                    <Input type="text" value={category.tags} onChange={(event)=>setCategory({...category,"tags":event.target.value})} placeholder="Category Tags" id="tags" />
                </FormGroup>
                <Button style={{marginRight:"10px"}} className="btn btn-success" onClick={()=>addCategory()}>Add</Button>
                <Button style={{marginRight:"10px"}}  onClick={()=>attemptApdateCategory()} className="ml-2" >Update</Button>
                <Button onClick={()=>resetCategory()} className="btn btn-warning">Reset</Button>
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
                #Category Id
                </th>
                <th>
                    Name 
                </th>
                <th>
                    Tags
                </th>
                <th>
                    Actions
                </th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category)=>(
                    <tr>
                    <td>{category.id} </td>
                    <td>{category.name} ({category.totalitems})</td>
                    <td>{category.tags}  </td>
                    <td><a className="btn-danger" onClick={()=>deleteThisCategory(category.id)} style={{marginRight:"5px"}} ><i class="fas fa-trash-alt"></i></a>
                    <a onClick={()=>updateThisCategory(category)} className="btn-primary"><i class="fas fa-edit"></i></a>                    
                     </td>

                </tr>
                ))}
            </tbody>

            </Table>
            
            </Container>
        </Base>
    )
}
export default Categories