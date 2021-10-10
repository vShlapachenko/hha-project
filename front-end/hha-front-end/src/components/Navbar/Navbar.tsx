import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";
import logo from "./logo.svg";
import Button from '@mui/material/Button';
import { createTheme } from "@mui/material/styles";
import { AppBar, Box, IconButton, selectClasses, Toolbar, Typography } from "@mui/material";
import { sizeHeight } from "@mui/system";
import {  } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const navStyle = {
    background: '#ffffff',
};

const buttonStyle = {
    color: '#000000',
};

const buttonStyleChoosen = {
    color: '#ffffff',
    background: '#009CC4',
};

const textStyle = {
    color: '#000000',
};

const Navbar = (email : String) => {

    var state = {clicked : false, chosen: false};

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
        ) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        } else if (event.key === 'Escape') {
        setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);
  
    return (
        <Box sx={{ flexGrow: 1, fontFamily: 'Arial', fontWeight: 'light' }} >
            <AppBar position="static" style={navStyle}>
                <Toolbar>
                <img src={logo} height={80} ></img>
                <Box sx={{flexGrow: 1,}} display="flex" justifyContent="center" alignItems="center">
                {MenuItems.map((item, index) => {
                       return (
                           <Box mr={4}>
                                <Button sx={{fontFamily: 'Arial', fontWeight: 400}}
                                style={item.isChoosen ? buttonStyleChoosen : buttonStyle}
                                >
                                    {item.title}
                                </Button>
                            </Box>
                       ) 
                    })}
                </Box>
                <Typography variant="subtitle1" style={textStyle}>
                    {/* {email != null ? email : 'staff@hha.com'} */}
                </Typography>
                <IconButton
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <MenuIcon fontSize='large' style={{color: '#009CC4'}} />
                </IconButton>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                                >
                                <MenuItem>
                                    Create Account
                                </MenuItem>
                                <MenuItem>Settings</MenuItem>
                                <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                            </Paper>
                        </Grow>
                        )}
                    </Popper>
                </Toolbar>
            </AppBar>
        </Box>
    );
  }

export default Navbar;