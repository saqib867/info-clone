import React, { useState } from 'react'
import { useStateValue } from '../../stateProvoider'
import instaLogo from '../../instagram logo.jpg'
import './login.css'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { Col, Container, Row } from 'react-bootstrap'

function Login() {

  const[{user},dispatch]=useStateValue()
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[err,setErr]=useState('')
  const[isLogging,setIsLogging]=useState(false)

const login=(e)=>{
      e.preventDefault()
      setIsLogging(true)
      signInWithEmailAndPassword(auth,email,password)
      .then(response=>{
         window.location.reload()
      })
      .catch(err=>{
           
        console.log('err catch==> ',err.code)
            if(err.code==='auth/invalid-email'){
              
              setErr('Invalid email')
              setIsLogging(false)
            }
            else if(err.code==='auth/user-not-found'){
                
                setErr('User not found with this email adress')
                setIsLogging(false)
            }
            else if(err.code==='auth/wrong-password'){
              setErr('wrong password')
              setIsLogging(false)
            }
      })
}  
  return ( 
      <Container>
        <Row>
          <Col xs={12} sm={12}>
        <div className='login'>
            <div className='login__inputs'>
              <div>
                 <img src={instaLogo} alt='' className='login__logo'/>
                 <small style={{color:'red'}}>{err}</small>
                 <input type={'text'} placeholder='Email...'
                 onChange={e=>setEmail(e.target.value)}
                 />
                 
                 <input type={'text'} placeholder='Password...'
                 onChange={e=>setPassword(e.target.value)}
                 />
                 
                 <button className='login__button'
                 onClick={login}
                 >{isLogging?'logging in' :'Login'}</button>
              </div>
            </div>
            <div className='login__signup'>
            Don't have an account? <Link to={'/signup'}> Sign up</Link>
            </div>

    </div>
    </Col>
    </Row>
    </Container>
  )
}

export default Login