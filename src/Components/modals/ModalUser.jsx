import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
function MyVerticallyCenteredModal(props) {
  const token = Cookies.get('token');
  const { user } = props;
  const [data,setData] = useState({nom:user.nom , password:user.password  , numtel:user.numtel,ville:user.ville , region:user.region , img:user.img})
  useEffect(()=>{
    console.log('user passed',user)
  })
  const updateUser = async (id) => {
    console.log("new Data:" ,data);
    console.log(id)
    try {
      const res = await axios.put(
        `http://82.180.130.113/api/user/updateUser/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User has been updated',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.reload(); 
      });
      
    } catch (err) {
      console.log(err);
    }
  };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           update {user.nom}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={()=>updateUser(user._id)} style={{textAlign: "center"}}>
        <Modal.Body>
          
            <label>name</label><br></br>
            <input type='text' name='' value={data.nom} onChange={e=>setData({...data , nom:e.target.value})} /><br></br>
            <label>numtel</label><br></br>
        
            <input type='text' name='' value={data.numtel} onChange={e=>setData({...data , numtel:e.target.value})} /><br></br>
            <label>ville</label><br></br>
            <input type='text' name='' value={data.ville} onChange={e=>setData({...data , ville:e.target.value})} /><br></br>
            <label>region</label><br></br>
            <input type='text' name='' value={data.region} onChange={e=>setData({...data , region:e.target.value})} /><br></br>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" type='submit'>update</Button>
          <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
  
  function Modify(props) {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <button style={{border: "none" , backgroundColor:"white"}} onClick={() => setModalShow(true)}>
        <a href="#" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
          Edit
          </a>
        </button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={props.id}
          user={props.user}
        />
      </>
    );
  }
  
 export default Modify ;