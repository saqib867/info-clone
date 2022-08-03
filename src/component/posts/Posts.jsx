import React, { useEffect, useState } from 'react'
import np from '../../np.jpg'
import { Avatar, Button } from '@mui/material'
import {MoreVert,FavoriteBorderOutlined,CommentOutlined,ShareOutlined,BookmarkBorder, Favorite} from '@mui/icons-material'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { useStateValue } from '../../stateProvoider'
import { db } from '../../firebase'
import { Link } from 'react-router-dom'
function Posts({allPost,postId}) {
     
     const[{user},dispatch]=useStateValue()
     const[cUser,setCuser]=useState({})
     const[postComment,setPostComment]=useState('')
     const[getComment,setGetComment]=useState([])
     const[likes,setLikes]=useState(allPost?.likes.length);
     const[showComment,setShowComment]=useState(false)

 
 useEffect(()=>{ 
     
       const collectionRef=collection(db,'userInfo');
       const q=query(collectionRef,where('userId','==',allPost.userId))
       getDocs(q).then(res=>{
            
            setCuser(res.docs.map(doc=>
               doc.data()))

       })
       
 },[])  

 useEffect(()=>{

          if(postId){
                
               let collectionRef=collection(db,'posts',postId,'comments')
               onSnapshot(collectionRef,(qsnapshot)=>{

              setGetComment(qsnapshot.docs.map(snap=>
                      
                          snap.data() 
                    ))
               })
               setPostComment('')
          }
 },[postId])
 
 const comment=(e)=>{

          let postcomment  
       
          const docRef=doc(db,'posts',postId)
          const commentCol=collection(docRef,'comments')
          
          addDoc(commentCol,{
               userId:user.userName,
               commentText:postComment
          }).then(res=>{

               console.log('response=> ',res)
               
          })
          .catch(err=>console.log('error occured while commenting',err))
     
 } 

 const like=(id)=>{
        
     
     const collectionRef=collection(db,'posts')
     getDocs(collectionRef)
     .then(response=>{
        response.docs.map(snap=>{
              if(snap.id===id){
                   console.log('likes==> ',snap.data().likes.includes(user?.userId))
               if(!snap.data().likes.includes(user?.userId)){
                    const likePost={
                         likes:[...snap.data().likes,user?.userId]
                      }
                       const docRef=doc(db,"posts",id)
                       updateDoc(docRef,likePost)
                       .then(res=>{
                          console.log("res==>> ",res)
                          setLikes(likes+1)
                       })
                       .catch(err=>console.log('error while favoritizing...',err))
                   } 
                   else{
                        const disLike={
                             likes:snap.data().likes.filter(v=>v!==user?.userId)      
                         }
                        const docRef=doc(db,"posts",id)
                        updateDoc(docRef,disLike)
                       .then(res=>{
                          console.log("res==>> ",res)
                          setLikes(likes-1)
                       })
                       .catch(err=>console.log('error while favoritizing...',err))
                   }
                   

              }
              
               
        })
     })

     .catch(err=>console.log('error while liking the post==',err)) 
 }

  return (
      
       <div className='post'>
                    <div className='posts__header'>
                    <Link to={`/profile/${cUser[0]?.userId}`} className='post__headerLink'>
                          <div className='posts__left'>
                         <Avatar src={cUser[0]?.profileImg}/>
                         <h5>{cUser[0]?.userName}</h5>
                         
                         </div> 
                    </Link>    
                         <div className='posts__right'>
                              <MoreVert/>
                         </div>
                    </div> 
                    <div className='posts__body'>
                         <img src={allPost?.img} alt='' className='posts__body--img' />
                         <div className='posts__bottom'>
                              <div className='bottom__left'>
                                    <span onClick={()=>like(postId)}>
                                   {allPost.likes.includes(user?.userId)?<Favorite/>:<FavoriteBorderOutlined/>}
                                    {likes===0?'':likes}
                                   </span>
                                   <span><CommentOutlined /></span>
                                   <ShareOutlined/>
                              </div>
                              <div className='bottom__right'>
                                   <BookmarkBorder/>
                              </div>
                         </div>
                         <div className='posts__caption'>
                             {allPost?.post}
                         </div>  
                         
                             {
                                  getComment.map((v,c)=>{
                                       return(
                                        <div key={c} className='all__comments'>
                                          <p>{v?.userId}</p><span>{v?.commentText}</span>
                                         </div>
                                       )
                                  })
                             }
                         
                         <div className='post__comment'>
                              <input type={'text'} placeholder='Add a comment'
                               onChange={e=>setPostComment(e.target.value)}
                               value={postComment}
                              />
                              <Button onClick={comment}
                               disabled={!postComment}
                              >Post</Button>
                         </div>
                    </div>
                    </div>
  )
}

export default Posts