import React, { useEffect, useState } from 'react'
import instaLogo from '../../instagram logo.jpg'
import './header.css'
import {Home,Search,AddBoxOutlined,FavoriteBorder} from '@mui/icons-material';
import {signOut} from 'firebase/auth'
import { auth } from '../../firebase'
import { useStateValue } from '../../stateProvoider'
import {Link, useNavigate} from 'react-router-dom'
import { Button,Avatar } from '@mui/material'
import { Col, Container, Row } from 'react-bootstrap'
import InputModel from '../inputModel/InputModel';
import BasicMenu from '../menu/Menu';

function Header() {

  const[{user},dispatch]=useStateValue()
  const history=useNavigate()
  
  return (

     <div className='header' >
        <Container fluid='xxl'>
          <Row className='header__container' >
            <Col md={7}>
              <div className='header__left'>
                  <img src={instaLogo} className='header__logo' />
                  <div className='header__left--search'>
                      <Search/>
                      <input type={'text'} placeholder='search...'/>
                  </div>
              </div>
              {/**033358 */}
            </Col>
            <Col xs={12} sm={12} md={5}>
                <div className='header__right'>
                  <div className='header__right--icons'>
                     <Link to={'/'}><Home className='icon__home' /></Link>
                     <Search/>
                     <InputModel/>
                     <FavoriteBorder/>
                     <BasicMenu />
                     
                  </div>
                </div>
            </Col>
          </Row>
        </Container>
        
        </div>
  )
}

export default Header