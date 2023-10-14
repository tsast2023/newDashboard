import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2"
function MyVerticallyCenteredModal(props) {
  const {service} = props
  const [data,setData] = useState({nom:service.nom , description:service.description , img:service.img , icon : service.icon})
  const updateService = async(id)=>{
    console.log(id)
    try{
     const res = await axios.put(`http://82.180.130.113/api/service/update/${id}`,data);
     console.log(res.data)
     Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your service has been updated',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.reload(); 
    });
    }catch(err){
  console.log(err)
    }
   }
   const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64data = event.target.result;
        const base64ImageWithoutPrefix = base64data.split(',')[1]
        setData({...data , img : base64ImageWithoutPrefix}); // Store base64 image data in state
      };

      reader.readAsDataURL(file);
    }
  };
  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64data = event.target.result;
        const base64ImageWithoutPrefix = base64data.split(',')[1]
        setData({...data , icon : base64ImageWithoutPrefix}); // Store base64 image data in state
      };

      reader.readAsDataURL(file);
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
           update {props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form style={{textAlign: "center"}}>
            <label>nom </label><br></br>
            <input type='text' name='' value={data.nom} onChange={e=>setData({...data , nom:e.target.value})} /><br></br>
            <label>description</label><br></br>
            <textarea type='email' name='' value={data.description} onChange={e=>setData({...data , description:e.target.value})} /><br></br>
            <label>img</label><br></br>
            <input type='file' accept='images/*' name='' onChange={handleImageUpload} /><br></br>
            <label>icon</label><br></br>
            <input type='file' accept='images/*' name='' onChange={handleIconUpload} /><br></br>
           
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={()=>updateService(props.id)}>update</Button>
          <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
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
          service={props.service}
        />
      </>
    );
  }
  
 export default Modify ;