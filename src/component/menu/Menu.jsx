import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { useStateValue } from '../../stateProvoider';
import './menu.css'

 function BasicMenu() {

  const[{user},dispatch]=useStateValue()   
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
const signOutBtn=(e)=>{

     // e.preventDefault()
     if(user){
      signOut(auth)
      
      window.location.reload()
 }
    
 }  

  return (
    <div className='menu'>
        <Link to={`/profile/${user?.userId}`} className='menu__profile'>
          <Avatar src={user?.profileImg} />
        </Link>  
      <Button
        className='menu__btn'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Link to={`/profile/${user?.userId}`} className='menu__item'>Profile</Link></MenuItem>
        <MenuItem onClick={signOutBtn}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
export default BasicMenu