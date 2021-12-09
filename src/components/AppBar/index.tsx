import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {toggleWrapper} from './style';
import {AppBarProps} from './interface'
import ThemeToggle from '../ThemeToggle';

const NavBar: React.FunctionComponent<AppBarProps> = ({title}) => { 
  return (
    <AppBar position="absolute">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography variant="h4" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
                    {title}
                </Typography>
                <Box sx={toggleWrapper}>
                    <ThemeToggle/>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
  )
}
export default NavBar;