import React from "react";
import {Container,Nav ,Navbar }from 'react-bootstrap';



const navBar = ()=> {
    return(
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">CRUD Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add">Add</Nav.Link>
            <Nav.Link href="/update">Update</Nav.Link>
          </Nav>
          {/* <Nav>
            <Nav.Link href="#deets">Sign in</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Sign up 
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default navBar