import { ArrowBackIos } from '@mui/icons-material'
import { Avatar,Button } from '@mui/material'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where,updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
import { useStateValue } from '../../stateProvoider'
import './postRightMob.css'

function PostRightMob() {

     const[{user},dispatch]=useStateValue()
     const[friends,setFriends]=useState([])
     console.log('user== ',user)
useEffect(()=>{
      
      onSnapshot(collection(db,'userInfo'),(snapshot)=>{
           setFriends(snapshot.docs.map(snap=>({
                  userId:snap.id,
                  allFriend: snap.data()
           })
                
           ))
      })
},[]) 

const follow=(id)=>{
         
          /*  const q1=query(collection(db,"userInfo"),where("userId","==",user?.userId))
            getDocs(q1)
            .then(response=>{
              response.docs.map(snapshot=>{
               const docRef=doc(db,'userInfo',snapshot.id)
               const commentCol=collection(docRef,'following')
               addDoc(commentCol,{

                   following:id
               })
               .then(response=>console.log('following response==> ',response))
               .catch(err=>console.log('follow error==> ',err))
                

              })
            })

            const q2=query(collection(db,"userInfo"),where("userId","==",id))
            getDocs(q2)
            .then(response=>{
              response.docs.map(snapshot=>{
               const docRef=doc(db,'userInfo',snapshot.id)
               const commentCol=collection(docRef,'follower')
               addDoc(commentCol,{

                   follower:user?.userId,
                  
               })
               .then(response=>console.log('following response==> ',response))
               .catch(err=>console.log('follow error==> ',err))
                
              })
            })*/
         
         const collectionRef=query(collection(db,'userInfo'),where("userId","==",user?.userId)) 
         getDocs(collectionRef)
         .then(response=>{
            response.docs.map(snap=>{
                  const following={
                     followings:[...snap.data().followings,id]
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
             <Col xs={12} sm={12}>
             <div className='postRightMob'>
                    <div className="rightMob__wrapper">
                         <div className='rightMob__header'>
                             <Link className='rightMob__link' to={`/profile/${user?.userId}`}><ArrowBackIos/></Link>
                             <h5>Discover</h5>
                         </div>
                      <h6 className='postMob__suggestion'>Suggested</h6>
                         <div className='rightMob__body'>
                             
                           <div className='bodyMob__users'>
                              {friends.map(({userId,allFriend},i)=>{
                                 return(
                                 <div key={i} className='bodyMob__user'>
                                    {user!=='' && user?.userId !==allFriend?.userId && !user?.followings.includes(allFriend.userId) ?
                                    <>
                                    <Link to={`/profile/${allFriend?.userId}`} className='userMob__info'>
                                     <Avatar/>
                                       <div className='userMob__name'>
                                         <h6>{allFriend?.userName}</h6>
                                        
                                      </div> 
                                    </Link>
                                    <div className='userMob__follow'>
                                      <Button onClick={()=>follow(allFriend?.userId)}>Follow</Button>
                                    </div>
                                    </>:''
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

export default PostRightMob