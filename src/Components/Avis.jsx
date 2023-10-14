import React, { useEffect, useState , useContext } from 'react'
import Eam from './Sidebar/SidebarRes'
import axios from "axios"
import { GlobalState } from '../GlobalState';
import Rating from './Rating';
function Avis(props) {
  const [isMobile, setIsMobile] = useState(false);

  const state = useContext(GlobalState);
  const data = state.AvisAPI
 

  useEffect( ()=>{
   console.log("avisApi" , data);
  })
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
  
  <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg" style={{minHeight : "100vh"}}>
  <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
        <div className="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="#">Pages</a></li>
              <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Avis</li>
            </ol>
            <h6 className="font-weight-bolder mb-0">Avis</h6>
          </nav>
          <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
             
            </div>
            <ul className="navbar-nav  justify-content-end">
  
 
  
  
  <Eam/>
 </ul>
          </div>
        </div>
      </nav>
    <div className="card">
      <div className="card-header pb-0">
        <div className="row">
          <div className="col-lg-6 col-7">
            <h6>Avis</h6>
          </div>
        
        </div>
      </div>
      {
        isMobile ? (
          <div className="card-body px-0 pb-2">
          <div className="table-responsive">
            <table className="table align-items-center mb-0">
              <thead>
                
              </thead>
              <tbody>
               {data?.map((item)=>{
                return(
                  <tr key={item._id} className='row' style={{textAlign: 'center'}}>
                    <th style={{backgroundColor: "rgba(107,197,216,0.5)"}}></th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Client</th>
                <td className='col-sm-12'>
                  <div className="align-middle">
                    <div>
                      <img src="../assets/img/small-logos/logo-slack.svg" className="avatar avatar-sm me-3" alt="team7" />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">{item.nomUser}</h6>
                    </div>
                  </div>
                </td>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >avis</th>
                <td className='col-sm-12'>
                  <div className="align-middle">
                    
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">{item.description}</h6>
                    </div>
                  </div>
                </td>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">nombre des etoiles</th>
                <td className='col-sm-12'>
                  <div className="avatar-group mt-2">
                    <Rating stars={item.nbrating}/>
                    
                  </div>
                </td>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Worker</th>
                <td className="align-middle text-center text-sm">
                  <span className="text-xs font-weight-bold"> {item.nomWorker} </span>
                </td>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">rating</th>
                <td className="align-middle">
                  <div className="progress-wrapper w-75 mx-auto">
                    <div className="progress-info">
                      <div className="progress-percentage">
                        <span className="text-xs font-weight-bold"> ({((item.nbrating/5)*100) + "%"})</span>
                      </div>
                    </div>
                    <div className="progress">
                      {((item.nbrating/5)*100)}
                      <div className="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow={(item.nbrating/5)*100} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                </td>
              </tr>
                );
  
               })}
                
              
              </tbody>
            </table>
          </div>
        </div>
        ):(
          <div className="card-body px-0 pb-2">
          <div className="table-responsive">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Client</th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 " style={{textAlign:"center"}}>Avis</th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">nombre des etoiles</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">workers</th>
                  <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">rating</th>
                </tr>
              </thead>
              <tbody>
               {data?.map((item)=>{
                return(
                  <tr key={item._id}>
                <td>
                  <div className="d-flex px-2 py-1">
                    <div>
                      <img src="../assets/img/small-logos/logo-slack.svg" className="avatar avatar-sm me-3" alt="team7" />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">{item.nomUser}</h6>
                    </div>
                  </div>
                </td>
                <td className="align-middle text-center text-sm">
                  <span className="text-xs font-weight-bold"> {item.description} </span>
                </td>
                <td>
                  <div className="avatar-group mt-2">
                    <Rating stars={item.nbrating}/>
                    
                  </div>
                </td>
                <td className="align-middle text-center text-sm">
                  <span className="text-xs font-weight-bold"> {item.nomWorker} </span>
                </td>
                <td className="align-middle">
                  <div className="progress-wrapper w-75 mx-auto">
                    <div className="progress-info">
                      <div className="progress-percentage">
                        <span className="text-xs font-weight-bold"> ({((item.nbrating/5)*100) + "%"})</span>
                      </div>
                    </div>
                    <div className="progress">
                      {((item.nbrating/5)*100)}
                      <div className="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow={(item.nbrating/5)*100} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </div>
                </td>
              </tr>
                );
  
               })}
                
              
              </tbody>
            </table>
          </div>
        </div>
        )
      }
   
    </div>
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
  </main>
</>

  )
}

export default Avis
