import { Avatar, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import './postRight.css'
import { db } from '../../firebase'
import {Link} from 'react-router-dom'
import { useStateValue } from '../../stateProvoider'

function PostRight() {

      const[friends,setFriends]=useState([])
      const[{user},dispatch]=useStateValue()
      const[isUser,setIsUser]=useState(friends)
       console.log('friends==>>',friends)
       
 useEffect(()=>{
      
        onSnapshot(collection(db,'userInfo'),(snapshot)=>{
             setFriends(snapshot.docs.map(snap=>({
                    
                    userId:snap.id,
                    allFriend:snap.data()
             })
                  
             ))
        })
 },[])    

 const follow=(id)=>{

     const collectionRef=query(collection(db,'userInfo'),where("userId","==",user?.userId)) 
     getDocs(collectionRef)
     .then(response=>{
        response.docs.map(snap=>{
              const following={
                 followings: [...snap.data().followings,id]
              }
               //followings=[...snap.data().followings,id]
               const docRef=doc(db,"userInfo",snap?.id)
               updateDoc(docRef,following)
               .then(res=>{
                  console.log('updated',res)
               })
               
        })
     })

     .catch(err=>console.log('error while following==',err))  
      const collectionRef2=query(collection(db,'userInfo'),where("userId","==",id)) 
      getDocs(collectionRef2)
     .then(response=>{
        response.docs.map(snap=>{
              const follower={
                 followes:[...snap.data().followes,user?.userId]
              }
               //followings=[...snap.data().followings,id]
               const docRef2=doc(db,"userInfo",snap?.id)
               updateDoc(docRef2,follower)
               .then(res=>{
                  console.log('updated',res)
               })
               
        })
     })
     .catch(err=>console.log('error while following==',err)) 
 }
     
  return (
     <Container fluid='xxl'> 
          <Row> 
             <Col >
             <div className='postRight'>
                    <div className="right__wrapper">
                         <div className="right__header">
                              <div className='header__left'>
                                   <Avatar src={user?.profileImg}/>
                                   <h6>{user?.userName}</h6>
                              </div> 
                              <span>switch</span>
                         </div>
                      <h6 className='post__suggestion'>Suggested for you</h6>
                         <div className='right__body'>
                             
                             <div className='body__users'>
                            {
                              friends.map(({userId,allFriend},i)=>{
                                   
                              return(
                                           
                                   <div key={i} className='body__user'>
                                        { user!=='' && user?.userId!==allFriend.userId && !user?.followings.includes(allFriend.userId) ?<>
                                          <Link to={`/profile/${allFriend?.userId}`} className='user__info'>
                                          <Avatar src={allFriend?.profileImg}/>
                                          <div className='user__name'>
                                            <h6>{allFriend.userName}</h6>
                                            
                                          </div> 
                                        </Link>
                                       
                                       <div className='user__follow'>
                                         
                                           <Button onClick={()=>follow(allFriend.userId)}>follow</Button>
                                       </div>
                                        
                                       </> :''   
                                        }
                                                                                  
                                   </div>
                                      )
                                 })    
                                
                                }  
                               
                             </div>

                         </div>
                        
                    </div>
               </div>
             </Col>
          </Row>
    </Container>
  )
}

export default PostRight