import { NavLink as ReactLink } from "react-router-dom"
import { Button, Container, Nav, Navbar , NavItem, NavLink} from "reactstrap"
import { sidebarToggler } from "../services/sidebar-service"

const SideNavbar=()=>{

    return (
        <div className='' style={{display:"none"}} id="sideNavbar">
            <Container className="mb-5" >
            <Button onClick={()=>sidebarToggler()} className="ml-5 pl-5" style={{float:"right"}}><i class="fas fa-times"></i></Button>
            </Container>
            
            <Navbar dark>
                <Nav navbar>
                <NavItem className="sidebarItem">
                <NavLink tag={ReactLink} to="/allorders"><i class="fas fa-shopping-cart"></i> All Orders</NavLink>
                </NavItem>
                <NavItem>
              <NavLink tag={ReactLink} to="/newProduct" ><i class="fas fa-plus-square"></i> Add Product</NavLink>
            </NavItem>
                <NavItem>
              <NavLink tag={ReactLink} to="/products" ><i class="fas fa-gift"></i> All Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/categories" >All Categories</NavLink>
            </NavItem>
                </Nav>
                
            </Navbar>
        </div>
    )
}

export default SideNavbar