import React from 'react';
import { AppBar, Grid, IconButton, styled } from '@mui/material';
import './header.css'
import auLogo from '../../static/images/au.jpg';
import bookIcon from '../../static/images/book-icon.png';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
}));

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: 'transparent'}}>
      <Grid container spacing={3} alignItems="center" justifyContent="space-between">
        <Grid item xs={4} md={4}>
          <Item>
            <IconButton>
              <a href='/home'><img src={auLogo} className='img-css' alt='logo' /></a>
            </IconButton>
          </Item>
        </Grid>
        <Grid  item xs={4} md={3}>
            <Item>
                <h2>Anna University</h2>
            </Item>
        </Grid>
        <Grid item container xs={4} md={5} justifyContent="flex-end" className='right-links'>
          <Item><a href="/books">BOOKS</a></Item>
          <Item><a href="/about">ABOUT US</a></Item>
          <Item><a href="/signup">SIGN IN</a></Item>
          <img src={bookIcon} className='img-css float-left-child' alt='book' />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
