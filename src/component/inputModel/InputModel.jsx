import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AddBoxOutlined, ArrowBackIos, CameraAlt, Cancel } from '@mui/icons-material';
import { useStateValue } from '../../stateProvoider'
import './inputModel.css'
import { addDoc, collection, serverTimestamp,Timestamp } from 'firebase/firestore';
import {db, storage} from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { IconButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};
 
function InputModel(props) {
  const[{user},dispatch]=useStateValue()
  const[file,setFile]=useState(null)
  const[postInput,setPostInput]=useState('')
  const[isuploading,setIsLoding]=useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setFile(null)
    setPostInput('')
  };


  const handlePost=()=>{
      
    const storageRef=ref(storage,`images/${Date.now()}-${file.name}`)

    setIsLoding(true)
    uploadBytesResumable(storageRef,file)
    .then((snapshot)=>{
      
        getDownloadURL(snapshot.ref)
        .then((getImgUrl)=>{
             const collectionRef=collection(db,'posts')
             const postBody={
               timestamp: serverTimestamp(),
               stamp:new Date(Timestamp.now().seconds*1000).toLocaleString(),
               post:postInput,
               img:getImgUrl,
               userId:user.userId ,
               likes:[]
             }
             addDoc(collectionRef,postBody)
             .then(response=>{
                console.log('post has been posted',response)
             })
             .catch(err=>console.log('err while uploading data...',err))
             setIsLoding(false)
        })
        .catch(error=>console.log('error while downloading url-->',error))
    })
    .catch(err=>console.log('error while uploading file'))

    setFile(null)
    setPostInput('')
    setOpen(false)
} 
  return (
    <div>
      {props.cam?<Button variant='text'color='inherit' onClick={handleOpen}><CameraAlt style={{fontSize:'55px'}}/></Button> :
       <Button variant='text'color='inherit' onClick={handleOpen}><AddBoxOutlined/></Button>}
      <Modal
        open={open} 
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='model'
      >
        <Box sx={style} className='model__box' >
            
               <ArrowBackIos  className='model__close--back'  onClick={handleClose}/>
             
             <div className='box__wrapper'>
                <h4>Create a Post</h4>
                <Button><label htmlFor='getImage'>Select an image</label></Button>
                <div className='wrapper__object' >
                <img src={file && URL.createObjectURL(file)} className='box__imgPreview'
                 height={file ?'200px':'0px'}  width={file ?'170px':'0px'} />

                <input type={'file'} id='getImage'  className='box__input'
                onChange={e=>setFile(e.target.files[0])} />
                
                <textarea value={postInput} onChange={e=>setPostInput(e.target.value)}/>
                </div>
                <Button disabled={file ?false:true} onClick={handlePost}
                className='model__next'
                >Post</Button> 
             </div>
            <IconButton 
               className='model__close'
               onClick={handleClose}><Cancel/>
            </IconButton>
     
          
        </Box>
      </Modal>
    </div>
  );
}
export default InputModel
