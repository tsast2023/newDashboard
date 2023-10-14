import React, { useEffect, useState , useContext} from 'react'
import Eam from './Sidebar/SidebarRes'
import Modify from './modals/ModalServicesUpdate'
import Add from './modals/ModalServicesAdd'
import axios from 'axios';
import { GlobalState } from '../GlobalState';
import { Button } from 'bootstrap';
import Swal from "sweetalert2"
function Services(props) {
  const [isMobile, setIsMobile] = useState(false);
  const state = useContext(GlobalState);
  const data = state.ServicesApi
  const removeService = async(id)=>{
  
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
      console.log(id)
      try{
       const res =  axios.delete(`http://82.180.130.113/api/service/delete/${id}`)
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
  useEffect(()=>{
  console.log('services:' , data)
  } , [])
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
    
     
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " style={{minHeight : "100vh"}}>
        {/* Navbar */}
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="#">Pages</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Services</li>
              </ol>
              <h6 className="font-weight-bolder mb-0">Services</h6>
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
                  <div className='row'>
                    <div className='col-10'>
                    <h6>Services</h6>
                    </div>
                    <div className='col-2'>
                    <Add/>
                    </div>
                  </div>
                 
                 
                </div>
                {isMobile ? (
                   <div className="card-body px-0 pt-0 pb-2">
                   <div className="table-responsive p-0">
                     <table className="table align-items-center mb-0">
                       <thead>
                         {/* <tr>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">nom de service</th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">icon</th>
                           <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">date e creation</th>
                           <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> </th>
                           <th className="text-secondary opacity-7"></th>
                         </tr> */}
                       </thead>
                       <tbody>
                         {
                           data?.map((item)=>{
                             return(
                           <tr key={item._id} className='row' style={{textAlign:'center'}}>
                             <th style={{backgroundColor : 'rgba(107,197,216 , 0.2)'}} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">nom de service</th>
                           <td className='col-sm-12'>
                             <div className="align-middle">
                               <div>
                                 <img src={`data:image/jpeg;base64,${item.img}`} className="avatar avatar-sm me-3" alt="user1" />
                               </div>
                               <div className="d-flex flex-column justify-content-center">
                                 <h6 className="mb-0 text-sm">{item.nom}</h6>
                                 
                               </div>
                             </div>
                           </td>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">icon</th>
                           <td className='col-sm-12'>
                           
                             <div className="align-middle">
                              <img src={`data:image/jpeg;base64,${item.icon}`} style={{height : "40px"}}/>
                             </div>
                           </td>
                           <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">date e creation</th>
                           <td className="align-middle text-center">
                             <span className="text-secondary text-xs font-weight-bold">{new Date(item.createdAt).toISOString().slice(8, 10) + "/" + new Date(item.createdAt).toISOString().slice(5, 7) + "/" + new Date(item.createdAt).toISOString().slice(0, 4)}</span>
                           </td>
                           <td className="align-middle text-center text-sm">
                             <button style={{border : "none"}} onClick={()=>{removeService(item._id)}} className="badge badge-sm bg-gradient-danger">delete</button>
                           </td>
                           <td className="align-middle">
                            <Modify id={item._id} service={item}/>
                           </td>
                         </tr>
                             )
                           })
                         }
                         
                        
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
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">nom de service</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">icon</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">date e creation</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data?.map((item)=>{
                            return(
                          <tr key={item._id}>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div>
                                <img src={`data:image/jpeg;base64,${item.img}`} className="avatar avatar-sm me-3" alt="user1" />
                              </div>
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{item.nom}</h6>
                                
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex px-2 py-1">
                             <img src={`data:image/jpeg;base64,${item.icon}`} style={{height : "40px"}}/>
                            </div>
                          </td>
                          
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">{new Date(item.createdAt).toISOString().slice(8, 10) + "/" + new Date(item.createdAt).toISOString().slice(5, 7) + "/" + new Date(item.createdAt).toISOString().slice(0, 4)}</span>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <button style={{border : "none"}} onClick={()=>{removeService(item._id)}} className="badge badge-sm bg-gradient-danger">delete</button>
                          </td>
                          <td className="align-middle">
                           <Modify id={item._id} service={item}/>
                          </td>
                        </tr>
                            )
                          })
                        }
                        
                       
                      </tbody>
                    </table>
                  </div>
                </div>
                )}
                
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6>Projects table</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center justify-content-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Project</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Budget</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Status</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Completion</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex px-2">
                              <div>
                                <img src="../assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm rounded-circle me-2" alt="spotify" />
                              </div>
                              <div className="my-auto">
                                <h6 className="mb-0 text-sm">Spotify</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">$2,500</p>
                          </td>
                          <td>
                            <span className="text-xs font-weight-bold">working</span>
                          </td>
                          <td className="align-middle text-center">
                            <div className="d-flex align-items-center justify-content-center">
                              <span className="me-2 text-xs font-weight-bold">60%</span>
                              <div>
                                <div className="progress">
                                  <div className="progress-bar bg-gradient-info" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} style={{width: '60%'}} />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">
                            <button className="btn btn-link text-secondary mb-0">
                              <i className="fa fa-ellipsis-v text-xs" />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex px-2">
                              <div>
                                <img src="../assets/img/small-logos/logo-invision.svg" className="avatar avatar-sm rounded-circle me-2" alt="invision" />
                              </div>
                              <div className="my-auto">
                                <h6 className="mb-0 text-sm">Invision</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">$5,000</p>
                          </td>
                          <td>
                            <span className="text-xs font-weight-bold">done</span>
                          </td>
                          <td className="align-middle text-center">
                            <div className="d-flex align-items-center justify-content-center">
                              <span className="me-2 text-xs font-weight-bold">100%</span>
                              <div>
                                <div className="progress">
                                  <div className="progress-bar bg-gradient-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{width: '100%'}} />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">
                            <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-ellipsis-v text-xs" />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex px-2">
                              <div>
                                <img src="../assets/img/small-logos/logo-jira.svg" className="avatar avatar-sm rounded-circle me-2" alt="jira" />
                              </div>
                              <div className="my-auto">
                                <h6 className="mb-0 text-sm">Jira</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">$3,400</p>
                          </td>
                          <td>
                            <span className="text-xs font-weight-bold">canceled</span>
                          </td>
                          <td className="align-middle text-center">
                            <div className="d-flex align-items-center justify-content-center">
                              <span className="me-2 text-xs font-weight-bold">30%</span>
                              <div>
                                <div className="progress">
                                  <div className="progress-bar bg-gradient-danger" role="progressbar" aria-valuenow={30} aria-valuemin={0} aria-valuemax={30} style={{width: '30%'}} />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">
                            <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-ellipsis-v text-xs" />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex px-2">
                              <div>
                                <img src="../assets/img/small-logos/logo-slack.svg" className="avatar avatar-sm rounded-circle me-2" alt="slack" />
                              </div>
                              <div className="my-auto">
                                <h6 className="mb-0 text-sm">Slack</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">$1,000</p>
                          </td>
                          <td>
                            <span className="text-xs font-weight-bold">canceled</span>
                          </td>
                          <td className="align-middle text-center">
                            <div className="d-flex align-items-center justify-content-center">
                              <span className="me-2 text-xs font-weight-bold">0%</span>
                              <div>
                                <div className="progress">
                                  <div className="progress-bar bg-gradient-success" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={0} style={{width: '0%'}} />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">
                            <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-ellipsis-v text-xs" />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex px-2">
                              <div>
                                <img src="../assets/img/small-logos/logo-webdev.svg" className="avatar avatar-sm rounded-circle me-2" alt="webdev" />
                              </div>
                              <div className="my-auto">
                                <h6 className="mb-0 text-sm">Webdev</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">$14,000</p>
                          </td>
                          <td>
                            <span className="text-xs font-weight-bold">working</span>
                          </td>
                          <td className="align-middle text-center">
                            <div className="d-flex align-items-center justify-content-center">
                              <span className="me-2 text-xs font-weight-bold">80%</span>
                              <div>
                                <div className="progress">
                                  <div className="progress-bar bg-gradient-info" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={80} style={{width: '80%'}} />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">
                            <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-ellipsis-v text-xs" />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex px-2">
                              <div>
                                <img src="../assets/img/small-logos/logo-xd.svg" className="avatar avatar-sm rounded-circle me-2" alt="xd" />
                              </div>
                              <div className="my-auto">
                                <h6 className="mb-0 text-sm">Adobe XD</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">$2,300</p>
                          </td>
                          <td>
                            <span className="text-xs font-weight-bold">done</span>
                          </td>
                          <td className="align-middle text-center">
                            <div className="d-flex align-items-center justify-content-center">
                              <span className="me-2 text-xs font-weight-bold">100%</span>
                              <div>
                                <div className="progress">
                                  <div className="progress-bar bg-gradient-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} style={{width: '100%'}} />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">
                            <button className="btn btn-link text-secondary mb-0" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-ellipsis-v text-xs" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
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

export default Services
