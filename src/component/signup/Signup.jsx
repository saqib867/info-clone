import React, { useEffect, useState } from 'react'
import './signup.css'
import instaLogo from '../../instagram logo.jpg'
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useStateValue } from '../../stateProvoider';
import {Link, useNavigate} from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore';


function Signup() {
  const[{user},dispatch]=useStateValue() // destructure the state-->state.user-->{user}
  const[email,setEmail]=useState('')
  const[userName,setUserName]=useState('')
  const[password,setPassword]=useState('')
  const[emailErr,setEmailErr]=useState('')
  const[isSignup,setIsSignup]=useState(false)
  const history=useNavigate()

 const signup=(e)=>{
  
     e.preventDefault();
     setIsSignup(true)
     createUserWithEmailAndPassword(auth,email,password)
     .then(response=>{
           updateProfile(response.user,{
             displayName:userName,
           })
         const collectionRef=collection(db,'userInfo')
         const payload={email:response.user.email,userName:userName,userId:response.user.uid,followes:[],followings:[]}
          addDoc(collectionRef,payload)
         .then(userResponse=>{
           console.log('user info submitted',userResponse)
           window.location.reload()
         })
         
        //history('/')
      
     })
     .catch(err=>{
       if(err.code==='auth/email-already-in-use'){
         setEmailErr("Email already in use")
         setIsSignup(false)
       }
       else if(err.code==='auth/invalid-email'){
          setEmailErr('Invalid email')
          setIsSignup(false)
       }
      })
     
 } 
  return (
    <div className='signup'>
      
            <div className='signup__inputs'>
              <img src={instaLogo} alt='' className='signup__logo' />
              <p>
                <span> Sign up to see photos and videos</span> 
                <span>from your friends</span> 
              </p>
              <div>
                 
                 <input type={'text'} placeholder='Email...'
                   onChange={e=>setEmail(e.target.value)}
                 />
                 <small style={{color:'red'}}>{emailErr}</small>
                 <input type={'text'} placeholder='Username...'
                   onChange={e=>setUserName(e.target.value)}
                 />
                 <input type={'text'} placeholder='Password...'
                   onChange={e=>setPassword(e.target.value)}
                 />
                 <button disabled={userName && email && password ?false:true} 
                  onClick={signup}>{isSignup?'Signing up...':'Sign up'}</button>
              </div>
            </div>
            <div className='signup__button'>
               Already have an account?
               <Link to={'/login'} className='signup__link'>
                  Log in
                </Link>
            </div>
    </div>
  )
}

export default Signup