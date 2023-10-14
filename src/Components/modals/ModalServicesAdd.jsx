import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2"
function MyVerticallyCenteredModal(props) {
  const [data,setData] = useState({nom:"" , description:"", img:"" , icon : ""})
  const [base64Image, setBase64Image] = useState('');
  const addService = async(e)=>{
    e.preventDefault();
    console.log(data)
    try{
     const res = await axios.post(`http://82.180.130.113/api/service/add`, data);
     console.log(res.data)
     Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your service has been saved',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.reload(); 
    });
     
    }catch(err){
  console.log(err)
    }
   };
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
           add Service {props.name}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={addService} style={{textAlign: "center"}}>
        <Modal.Body>
          
            <label>nom</label><br></br>
            <input type='text' name='' onChange={e=>setData({...data , nom:e.target.value})} /><br></br>
            <label>description</label><br></br>
            <input type='text' name='' onChange={e=>setData({...data , description:e.target.value})} /><br></br>
            <label>img</label><br></br>
            <input type='file' accept="image/png" name='' onChange={handleImageUpload} /><br></br>
            <label>icon</label><br></br>
            <input type='file' accept="image/png" name='' onChange={handleIconUpload} /><br></br>

          
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' variant="info">add</Button>
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
        <button style={{border: "none" , backgroundColor:"rgba(107,197,216 , 1)" , borderRadius:"10px" , padding:"5px 15px" , marginBottom:"15px"}} onClick={() => setModalShow(true)}>
       
          Add
          
        </button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  
 export default Modify ;