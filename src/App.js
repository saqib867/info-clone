import './App.css';
import Header from './component/header/Header';
import Login from './component/login/Login';
import Signup from './component/signup/Signup';
import {BrowserRouter, Routes,Route,useNavigate, Navigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { createBrowserHistory } from 'history';
import { useStateValue } from './stateProvoider';
import { collection, onSnapshot } from 'firebase/firestore';
import Home from './component/Home';
import Profile from './component/profile/Profile';
import Edit from './component/edit/Edit';
import PostRight from './component/postRight/PostRight';
import PostRightMob from './component/postRightMob/PostRightMob';


const history=createBrowserHistory()
let cUser=''

function App() {

  
  const[{user},dispatch]=useStateValue()
  const[userAuth,setUserAuth]=useState('')
  const [isLoggedIn , setIsLoggedIn]=useState(false)

useEffect(()=>{

       
   const unsubscribe= onAuthStateChanged(auth,(authUser)=>{
       
         if(authUser){
          console.log('auth user -->>',authUser)
          setIsLoggedIn(true)
          setUserAuth(authUser.uid)
          onSnapshot(collection(db,'userInfo'),(snapshot)=>{
            snapshot.docs.forEach(snap=>{
              authUser.uid ===snap.data().userId &&
              dispatch({
                type:'LOG_USER',
                user:snap.data()
              })
             
            })
          })
          
         }
         else{
          setIsLoggedIn(true)
           dispatch({
            type:'LOG_USER',
            user:null
          })
         
         }
         
       })
       return ()=>{
         //perform some cleanup actions
         unsubscribe()
       }
       
},[])



  return (

    <div className="App">
          <div className='App__loading'>{isLoggedIn && (
             <BrowserRouter>
             <Routes>
                 
                 <Route path='/signup' element={userAuth?<Navigate to={'/'}/>:<Signup/> }/>
                 <Route path='/login' element={userAuth?<Navigate to={'/'}/>:<Login/>}/>
                 <Route path='/profile/:userId' element={userAuth?<Profile/>:<Navigate to={'/signup'}/>}/>
                 <Route path='/edit' element={userAuth?<Edit/>:<Navigate to={'/signup'}/>}/>
                 <Route path='/profileright' element={userAuth?<PostRightMob/>:<Navigate to={'/signup'}/>} />
                 <Route path='/' element={userAuth?<Home/>:<Navigate to={'/signup'}/>}/>
                 
             </Routes>
           </BrowserRouter>
          )}
          
          </div>
    </div>
  );

}

export default App;
