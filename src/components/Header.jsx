import React from 'react';
import { Link } from 'react-router';
import { Nav, Navbar, NavBrand, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';


const Header = () =>{
    return(
        <Navbar fixedTop>
            <Navbar.Header>
            <Navbar.Brand>
                Invoice App
            </Navbar.Brand>
            <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    
                     <IndexLinkContainer to="/">
                        <NavItem>Invoices</NavItem>
                    </IndexLinkContainer>
                    
                     <LinkContainer to="/products">
                        <NavItem>Products</NavItem>
                    </LinkContainer>
                    
                     <LinkContainer to="/customers">
                        <NavItem>Customers</NavItem>
                    </LinkContainer>
                    
                

                </Nav>

                </Navbar.Collapse>
                </Navbar>

//        <ul style={{listStyleType: "none"}}>
//            <li><Link to="/">Invoices</Link></li>
//            <li><Link to="/products">Products</Link></li>
//            <li><Link to="/customers">Customers</Link></li>
//        </ul>
    );
}

export default Header;