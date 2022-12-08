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
                <NavLink tag={ReactLink} to="/allorders"><i class="fas fa-shopping-cart"></i> Orders</NavLink>
                </NavItem>
                <NavItem>
              <NavLink tag={ReactLink} to="/newProduct" ><i class="fas fa-plus-square"></i> Add Product</NavLink>
            </NavItem>
                <NavItem>
              <NavLink tag={ReactLink} to="/products" ><i class="fas fa-gift"></i> Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/categories" ><i class="fas fa-layer-group"></i> Categories</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/users" ><i class="fas fa-users"></i> Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/customers" ><i class="fas fa-user-tag"></i> Customers</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/sellers" ><i class="fas fa-user-tag"></i> Sellers</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/specialization" ><i class="fas fa-tags"></i> Specialization</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/appointments" ><i class="fas fa-notes-medical"></i> Appointments</NavLink>
            </NavItem>


                </Nav>
                
            </Navbar>
        </div>
    )
}

export default SideNavbar