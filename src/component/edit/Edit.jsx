import { Avatar, Button } from '@mui/material'
import { doc, setDoc,updateDoc,query,collection,where,getDocs} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { db, storage } from '../../firebase'
import { useStateValue } from '../../stateProvoider'
import Header from '../header/Header'
import './edit.css'

function Edit() {

  const[{user},dispatch]=useStateValue()
  const[profileImg,setProfileImg]=useState(null)
  const[userName,setUserName]=useState('')
  const[website,setWebsite]=useState('')
  const[bio,setBio]=useState('')
  const[email,setEmail]=useState('')
  const[cellNo,setCellNo]=useState('')
  const[gender,setGender]=useState('')


  console.log('edit user-->> ',user)
 const editProfile=(id)=>{

     const storageRef=ref(storage,`images-profile/${Date.now()}-${profileImg?.name}`)
     uploadBytesResumable(storageRef,profileImg)
     .then((snapshot)=>{

          getDownloadURL(snapshot.ref)
          .then(profileUrl=>{

                 const q=query(collection(db,"userInfo"),where("userId","==",id))
                 getDocs(q)
                 .then(res=>
                  res.docs.forEach(snap=>{
                    
                    const docRef=doc(db,"userInfo",snap?.id)
                    
                    const payload={
                      profileImg:profileImg===null ? (!user?.profileImg?'':user.profileImg ):profileUrl,
                      userName:userName==='' ? user?.userName :userName,
                      bio:bio==='' ?(!user?.bio ? '':user?.bio) :bio,
                      website:website==='' ? (!user?.website?'':user?.website) : website,
                      phoneNumber:cellNo==='' ?(!user?.phoneNumber ? '' :user?.phoneNumber ):cellNo,
                      gender:gender==='' ? (!user?.gender?'':user?.gender) : gender
                    }
                    
                    updateDoc(docRef,payload)
                    .then(response=>{
                      console.log('profile image  updated successfullly',response)
                    })
                    .catch(err=>console.log('err occured',err))
                  })
                  )
                 
          })
     })
 } 

  return (

    <>
    
        <Header/>
        <div className='edit'>
         <Container fluid='xxxl'>
              <Row>
                <Col md={4}>
                  <div className='edit__left'>
                      <p>Edit profile</p>
                      <p>Change password</p>
                      <p>Apps and Websites</p>
                      <p>Email and SMS</p>
                      <p>Push Notification</p>
                      <p>Manage Contacts</p>
                      <p>Privacy and Security</p>
                      <p>Login Activity</p>
                      <p>Email from Instagram</p>
                      <p>Help</p>
                      
                  </div>
                </Col>
                <Col xs={12} sm={12} md={8}>
                    <div className='edit__right'>
                      <div className='edit__wrapper'>
                         <div className="edit__header">
                           <Avatar src={user?.profileImg}/>
                           <div className='header__user'>
                             <h6>{ user?.userName}</h6>
                             <Button size='small'><label htmlFor='profilePhoto'>change profile photo</label></Button>
                             <input type={'file'} style={{display:'none'}} id='profilePhoto'
                              onChange={e=>setProfileImg(e.target.files[0])} accept="image/*"/>
                              
                           </div>
                         </div>
                         <div className='edit__body'>
                             
                         <div className='body__wrapper'>
                              <label>Username</label>
                              
                              <input defaultValue={user?.userName} 
                              onChange={e=>setUserName(e.target.value)}
                              />
                             </div>
                             
                             <small>Help people discover your account by using the name 
                              you're known by either your full name, nickname,
                             or business name. You can only change your name twice within 14 days.</small>
                             
                             <div className='body__wrapper'>
                              <label>Website</label>
                              <input defaultValue={user?.website} 
                                onChange={e=>setWebsite(e.target.value)} />
                             </div>
                             <div className='body__wrapper'>
                              <label>Bio</label>
                              <input defaultValue={user?.bio}
                               onChange={e=>setBio(e.target.value)} />
                             </div>
                             <div className='body__wrapper'>
                              <label>Email</label>
                              <input defaultValue={user?.email} readOnly />
                             </div>
                             <div className='body__wrapper'>
                              <label>Phone number</label>
                              <input defaultValue={user?.phoneNumber} 
                               onChange={e=>setCellNo(e.target.value)} />
                             </div>
                             <div className='body__wrapper'>
                              <label>Gender</label>
                              <input defaultValue={user?.gender} 
                               onChange={e=>setGender(e.target.value)} />
                             </div>
                             
                         </div>
                         
                      </div>
                      <Button onClick={()=>editProfile(user?.userId)}>UPDATE</Button>
                    </div>
                </Col>
              </Row>
         </Container>
         </div>
         </>
  )
}

export default Edit