import React , {createContext , useState , useEffect} from 'react'
import  axios  from 'axios'
import Cookies from "js-cookie"

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
 const token = Cookies.get('token');
  const [Users , setUsers] = useState();
  const [Services , setServices] = useState();
  const [Avis , setAvis] = useState();
  const [workers , setWorkers] = useState();
  const [orderCount , SetOrderCount] = useState(0);
  const [userCount , SetUsersCount] = useState(0);
  const [avisCount , SetAvisCount] = useState(0);
  useEffect(()=>{
    

  console.log(token);
  if(token){
    const getServices = async ()=>{
        const res = await axios.get("http://82.180.130.113/api/service/getAll");
        console.log("services:", res.data);
        setServices(res.data);
        console.log(Services)
      }
      const getUsers = async()=>{
        const res = await axios.get("http://82.180.130.113/api/user/getAll")
        console.log(res.data)
        setUsers(res.data)
      }
      const getDataa = async()=>{
        try{
          const res = await axios.get("http://82.180.130.113/api/avis/getAllAvis" , {headers : {Authorization: `bearer ${token}`} , withCredentials:true} );
          console.log(res.data)
          setAvis(res.data)
        }catch(eerr){
          console.log(eerr)
        }
      }
      const getOrdercount = async()=>{
        try{
          const res = await axios.get("http://82.180.130.113/api/order/getCount" , {headers : {Authorization: `bearer ${token}`} , withCredentials:true} );
          console.log(res.data);
          SetOrderCount(res.data)
        }catch(err){
         console.log(err)
        }
       
      }
      const getUserscount = async()=>{
        try{
          const res = await axios.get("http://82.180.130.113/api/user/getCount");
          console.log(res.data);
          SetUsersCount(res.data)
        }catch(err){
          console.log(err)
        }
      }
      const getAviscount = async()=>{
       try{
        const res = await axios.get("http://82.180.130.113/api/avis/getCount" );
        console.log(res.data);
        SetAvisCount(res.data)
       }catch(err){
        console.log(err)
       }
      }
  getServices();
  getUsers();
  getDataa();
  getOrdercount();
  getUserscount();
  getAviscount();
}
  } , [token])
  
   const state ={
    
    ServicesApi : Services ,
    UserApi : Users,
    AvisAPI :Avis,
    orderCount : orderCount ,
    UserCount : userCount ,
    AvisCount : avisCount ,



  }

  return(
    <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>
  )
}