import {Navbar, Container, Nav, NavLink, Button} from "react-bootstrap";
import { observer } from "mobx-react";
import domain from "../serversettings"
import { useNavigate } from "react-router-dom";



const Header = () => {
  var navigate = useNavigate();

  const LKshower = observer(()=>{
  
    if(window.localStorage.getItem('name') !== null && window.localStorage.getItem('role') !== 'admin' )
    {
        return (
          <Nav>
            <Nav.Link className="justify-content-end" href='/User'>личный кабинет</Nav.Link>
            <Nav.Link  variant="danger" onClick={LogOut}>выйти</Nav.Link >
          </Nav>
        )
    }
    else if(window.localStorage.getItem('name') !== null && window.localStorage.getItem('role') === 'admin' ){
      return (
        <Nav>
          <Nav.Link  variant="danger" onClick={()=>navigate('/Admin')}>AdminPanel</Nav.Link >
          <Nav.Link className="justify-content-end" href='/User'>личный кабинет</Nav.Link>
          <Nav.Link  variant="danger" onClick={LogOut}>выйти</Nav.Link >
        </Nav>
      )
    }
    else
    return (<Nav.Link className="justify-content-end" href="/Auth">войти</Nav.Link>)
  });

  const LogOutButton = () =>{
  
  }

  function LogOut(){
    window.localStorage.clear();
    navigate('/');
  }
    return (
  <Navbar bg="light" expand="lg">
  <Container fluid>
  <Navbar.Brand href={"/"}>
              <img alt={""} src={"logo.jpg"}
                   width={"30"}
                   height={"30"}
                   className="d-inline-block align-top"
                   />
              App for engineering design
          </Navbar.Brand>   
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/Articles">Articles</Nav.Link>
        
      </Nav>
      <LKshower/>
    </Navbar.Collapse>
    
  </Container>
</Navbar>
    );
}

export default Header;