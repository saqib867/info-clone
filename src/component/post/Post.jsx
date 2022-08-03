
import React, { useEffect, useState } from 'react'
import { db} from '../../firebase'
import './post.css'
import { Col, Container, Row } from 'react-bootstrap'
import Posts from '../posts/Posts'
import { collection, getDocs, onSnapshot, query, where,orderBy ,} from 'firebase/firestore'
import PostRight from '../postRight/PostRight'
import { useStateValue } from '../../stateProvoider'

function Post() {
  
   const[posts,setPosts]=useState([])
   const[{user},dispatch]=useStateValue()

 useEffect(()=>{
       
       let followings=[]
       let followers=[]   
       let userPost=[]
      
     const collectionRef=collection(db,"posts")
     const q=query(collectionRef,orderBy('timestamp',"desc"))
     const unsub= onSnapshot(q,(snapshot)=>{
    
        snapshot.docs.map(snap=>{
           
             user?.followings.map(getId=>{ 

                    snap.data().userId === getId && followings.push({postId:snap.id, post:snap.data()}) 
              }) 
             user?.followes.map(getId=>{  
 
              snap.data().userId === getId && followers.push({postId:snap.id, post:snap.data()}) 

              }) 
              snap.data().userId === user?.userId && userPost.push({postId:snap.id, post:snap.data()}) 
            
      })  
      const combo=userPost.concat(followers,followings)
       
      const uniquePost=[...new Map(combo.map(item=>[item.postId,item])).values()].sort((p1,p2)=>{
        return new Date(p2.stamp)- new Date(p2.stamp)
      })
     
      setPosts(uniquePost)
  }) 
  return ()=>{
    unsub()
  }
    
 },[user])
 
 
  return (
   <div className='post__wrapper'>  
    <Container fluid='xxl'>
        <Row >
             
             <Col xs={12} sm={12} md={7} >
               
                <div className='posts'>
                 {posts===[]?<span className='post__nopost'>No post to display</span>:
                  posts.map(({postId,post})=>{
                   return(
                    <Posts key={postId} allPost={post} postId={postId} />
                   )
                 })
                    
                 }
                </div>
             </Col>
             <Col md={5} >
                 <div className='post__right'>
                   <PostRight/>
                 </div>
             </Col>
        </Row>
    </Container>
    </div> 
  )
}

export default Post