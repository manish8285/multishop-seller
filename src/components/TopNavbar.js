import React, { useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLogedIn } from '../auth';
import { sidebarToggler } from '../services/sidebar-service';

const TopNavbar=(args)=>{
  let navigate = useNavigate()
    

  const [isOpen, setIsOpen] = useState(false);

  //const [isSidebarActive,setIsSidebarActive]=useState(false)

  const toggle = () => setIsOpen(!isOpen);

  const userLogout=()=>{
    doLogout(()=>{
      navigate("/login")
    })
  }

  return (
    
    <div>
       

      <Navbar {...args}
        color="dark"
        dark
        expand="md"
      >
        <NavbarBrand onClick={()=>{sidebarToggler()}}>
        <i class="fas fa-bars"></i>
        </NavbarBrand>
        
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          <NavItem>
              <NavLink tag={ReactLink} to="/allorders" >All Orders</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/products" >All Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/categories" >All Categories</NavLink>
            </NavItem>


          </Nav>
         {isLogedIn()&&(
                       <UncontrolledDropdown nav inNavbar>
                       <DropdownToggle nav caret className='text-white' style={{marginRight:"90px"}}>
                       <i class="far fa-user"></i> {getCurrentUserDetail().name}
                       </DropdownToggle>
                       <DropdownMenu  >
                         <DropdownItem onClick={()=>userLogout()}>Logout <i class="fas fa-sign-out-alt"></i></DropdownItem>
                       </DropdownMenu>
                     </UncontrolledDropdown>


         )}

        {!isLogedIn()&&(
                       <UncontrolledDropdown nav inNavbar className='mr-5'>
                       <DropdownToggle nav caret className='text-white mr-5'><i class="far fa-user"></i> Login Signup</DropdownToggle>
                       <DropdownMenu >
                         <DropdownItem  onClick={()=>navigate("/login")}>Login</DropdownItem>
                         <DropdownItem onClick={()=>navigate("/signup")}>Signup</DropdownItem>
                       </DropdownMenu>
                     </UncontrolledDropdown>


         )}
        </Collapse>
      </Navbar>
    </div>


  );
}



export default TopNavbar