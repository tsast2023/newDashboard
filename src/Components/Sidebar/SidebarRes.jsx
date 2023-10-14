import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    // Clear the token to log the user out
    Cookies.remove('token', { path: '/' });
    window.location.href = '/login'
  };
  return (
    <>
      <button style={{border: "none"}}  onClick={handleShow}>
      <div className="sidenav-toggler-inner">
          <i className="sidenav-toggler-line" />
          <i className="sidenav-toggler-line" />
          <i className="sidenav-toggler-line" />
        </div>
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>   <div className="sidenav-header">
    
    <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
    <Link className="navbar-brand m-0" to={"/"}>
      <img src="../assets/img/logo-ct-dark.png" style={{height:"100%" , width:"75%"}}  />
    </Link>
  </div></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
     
  
 
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link  " to={'/'}>
          
          <span className="nav-link-text ms-1">Dashboard</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link  "  to={'/Users'}>
          
          <span className="nav-link-text ms-1">Users</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link  " to={'/Services'}>
          
          <span className="nav-link-text ms-1">Services</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link  " to={'/avis'}>
         
          <span className="nav-link-text ms-1">Avis</span>
        </Link>
      </li>
      <li className="nav-item">
        <button onClick={handleLogout} className="nav-link  " to={'/avis'}>
          
          <span className="nav-link-text ms-1">Logout</span>
        </button>
      </li>
      
    </ul>
 
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;