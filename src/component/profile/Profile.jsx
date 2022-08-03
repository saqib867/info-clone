import {AssignmentInd, BookmarkBorder, Camera, CameraAlt, CameraAltTwoTone, Computer, PersonAdd, Window } from '@mui/icons-material'
import { Avatar, Button, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {auth, db} from '../../firebase'
import {collection, doc,onSnapshot} from 'firebase/firestore'
import { Col, Row } from 'react-bootstrap'
import { useStateValue } from '../../stateProvoider'
import {Link,useParams} from 'react-router-dom'
import InputModel from '../inputModel/InputModel'
import Edit from '../edit/Edit'
import Header from '../header/Header'
import np from '../../np.jpg'
import './profile.css'
import { signOut } from 'firebase/auth'

function Profile() {

  const userParam=useParams().userId
  const [getUser,setGetUser]=useState('')
  const[{user},dispatch]=useStateValue()
  const[postsLength,setPostLength]=useState([])
  const[isModel,setIsModel]=useState(false)

useEffect(()=>{
        
       const collectionRef=collection(db,'userInfo')
       onSnapshot(collectionRef,(snapshot)=>{

           snapshot.docs.map(snap=>{
             
             snap.data().userId ===userParam && setGetUser(snap.data())
             
           })
       })
},[userParam])

useEffect(()=>{
       
       const collectionRef=collection(db,'posts')
       let postLen=[]
       onSnapshot(collectionRef,(snapshot)=>{
            snapshot.docs.map(snap=>{
              snap.data().userId===userParam && postLen.push(snap.data())
            })
            setPostLength(postLen)
       }) 
},[])

const signOutBtn=(e)=>{

  // e.preventDefault()
  if(user){
   signOut(auth)
   
   window.location.reload()
}
 
}  

  return (
    <div className='profile'>
          <Header/>
          <Container>
            <Row>
               <Col xs='12' sm='12' md='9' >
                 <div className="profile__header">
                   <div className='profile__heading'>
                      <Button onClick={signOutBtn}>Logout</Button>
                      <span>{user?.userName}</span>
                      <Link to='/profileright'><PersonAdd/></Link>

                   </div>
                   <div className='header__info'>
                       <Avatar src={getUser?.profileImg} sx={{width:60,height:60}} />
                       <div className='header__info--info'>
                         <h5>{getUser?.userName}</h5>
                          { getUser?.userId ===user?.userId &&
                             <Link to={'/edit'} className='info__edit' >
                                <Button variant='outlined' color='inherit'
                                className='info__edit--btn' >Edit profile</Button>
                             </Link>
                         }
                       </div>
                   </div>
                   <div className='profile__body'>
                     <div className='body__top'>
                          <div className='top__post'>
                              <span>{postsLength.length===0?'0':postsLength?.length}</span>
                              <span>posts</span>
                          </div>
                          <div className='top__post'>
                              <span>{!getUser?.followes?'0':getUser?.followes.length}</span>
                              <span>followers</span>
                          </div>
                          <div className='top__post'>
                              <span>{!getUser?.followings?'0':getUser?.followings.length}</span>
                              <span>following</span>
                          </div>
                     </div>
                    
                     <div className='body__middle'>
                       <Window/>
                       <BookmarkBorder/>
                       <AssignmentInd/>
                     </div>
                     <div className='body__imgs'>
                         <img src={np} alt=''/>
                         <img src={np} alt=''/>
                         <img src={np} alt=''/>
                         <img src={np} alt=''/>
                         <img src={np} alt=''/>
                         <img src={np} alt=''/>
                         <img src={np} alt=''/>
                         <img src={np} alt=''/>
                         <img src={np} alt=''/>
                         
                     </div>
                   </div>
                   <div className='profile__bottom'>
                       
                       <span  className='profile__inputmodel' ><InputModel cam/></span>
                       <p>Share photos</p>
                       <span>Share your photo with</span>
                       <span>friends and faimly</span>
                   </div>
                 </div>
               </Col>
               
            </Row>
          </Container>
    </div>
  )
}

export default Profile