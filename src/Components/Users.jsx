import React, { useContext, useEffect, useState } from 'react'
import Eam from './Sidebar/SidebarRes'
import Modify from './modals/ModalUser'
import axios from 'axios';
import { GlobalState } from '../GlobalState';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
function Users() {
  const [isMobile, setIsMobile] = useState(false);
 const state = useContext(GlobalState);
 const data = state.UserApi
 const token = Cookies.get('token');
 const removeUser = async(id)=>{

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      try{
        const res = axios.delete(`http://82.180.130.113/api/user/deleteuser/${id}` , {headers:{Authorization : `bearer ${token}`}});
        console.log(res.data)
      }catch(err){
        console.log(err)
      }
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      ).then((result)=>{
        if (result.isConfirmed) {
          console.log('Action after "OK" in the alert');
          window.location.reload(); // Example action: reload the page
        }
      })
      
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
 }

 useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 750);
  };

  window.addEventListener('resize', handleResize);

  // Initial check
  handleResize();

  // Clean up the event listener on component unmount
  return () => window.removeEventListener('resize', handleResize);
}, []);

  return (
   <>
  
   
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      {/* Navbar */}
      <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
        <div className="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="#">Pages</a></li>
              <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Utilsateurs</li>
            </ol>
            <h6 className="font-weight-bolder mb-0">Utilsateurs</h6>
          </nav>
          <ul className="navbar-nav  justify-content-end">
  
 
  
  
  <Eam/>
 </ul>
        </div>
      </nav>
      {/* End Navbar */}
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h6>Utilisateurs</h6>
              </div>
              {isMobile ? (
                 <div className="card-body px-0 pt-0 pb-2">
                 <div className="table-responsive p-0">
                   <table className="table align-items-center mb-0">
                     
                     <tbody>
                       {data?.map((item)=>{
                         return(
                           <tr key={item._id} className='row' style={{textAlign:'center'}} >
                                 <th style={{backgroundColor: "rgba(107,197,216,0.5)"}}></th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">nom</th>
                         <td className='col-sm-12'>
                           <div className="align-middle">
                             <div>
                               <img src={`data:image/jpeg;base64,${item.img}`} className="avatar avatar-sm me-3" alt="user1" />
                             </div>
                             <div className="d-flex flex-column justify-content-center">
                               <h6 className="mb-0 text-sm">{item.nom}</h6>
                               <p className="text-xs text-secondary mb-0">{item.service}</p>
                             </div>
                           </div>
                         </td>
                         <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Role</th>
                         <td className='col-sm-12'>
                           <p className="text-xs font-weight-bold mb-0">{item.role}</p>
                           
                         </td>
                         <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">email</th>
                         <td className='col-sm-12'>
                           <p className="text-xs font-weight-bold mb-0">{item.email}</p>
                           
                         </td>
                         
                         <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">date de creation</th>
                         <td  className="align-middle text-center">
                           <span className="text-secondary text-xs font-weight-bold">{new Date(item.createdAt).toISOString().slice(8, 10) + "/" + new Date(item.createdAt).toISOString().slice(5, 7) + "/" + new Date(item.createdAt).toISOString().slice(0, 4)}</span>
                         </td>
                         
                         <td className="align-middle text-center text-sm">
                           <button onClick={()=>{removeUser(item._id)}} style={{border: "none"}} className="badge badge-sm bg-gradient-danger">remove</button>
                         </td>
                         <td className="align-middle">
                           <Modify id={item._id} user={item}/>
                         </td>
                       </tr>
                         );
 
                       })}
                     
                     </tbody>
                   </table>
                 </div>
               </div>
              ):(
                <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Users</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Role</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">email</th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">date de creation</th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                        <th className="text-secondary opacity-7" />
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item)=>{
                        return(
                          <tr key={item._id} >
                        <td >
                          <div className="d-flex px-2 py-1">
                            <div>
                              <img src={`data:image/jpeg;base64,${item.img}`} className="avatar avatar-sm me-3" alt="user1" />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">{item.nom}</h6>
                              <p className="text-xs text-secondary mb-0">{item.service}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-xs font-weight-bold mb-0">{item.role}</p>
                          
                        </td>
                        <td  className="align-middle text-center">
                          <p className="text-xs font-weight-bold mb-0">{item.email}</p>
                          
                        </td>
                        
                        <td className="align-middle text-center">
                          <span className="text-secondary text-xs font-weight-bold">{new Date(item.createdAt).toISOString().slice(8, 10) + "/" + new Date(item.createdAt).toISOString().slice(5, 7) + "/" + new Date(item.createdAt).toISOString().slice(0, 4)}</span>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <button onClick={()=>{removeUser(item._id)}} style={{border: "none"}} className="badge badge-sm bg-gradient-danger">remove</button>
                        </td>
                        <td className="align-middle">
                          <Modify id={item._id} user={item}/>
                        </td>
                      </tr>
                        );

                      })}
                    
                    </tbody>
                  </table>
                </div>
              </div>
              )}
             
            </div>
          </div>
        </div>
       {/* <Tablle/> */}
        <footer className="footer pt-3  ">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-lg-between">
              <div className="col-lg-6 mb-lg-0 mb-4">
                <div className="copyright text-center text-sm text-muted text-lg-start">
                  2023© ,
                  made with <i className="fa fa-heart" /> by
                  <a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank">Ramcha App</a>
                  
                </div>
              </div>
              
            </div>
          </div>
        </footer>
      </div>
    </main>
    
  
</>

  )
}

export default Users
