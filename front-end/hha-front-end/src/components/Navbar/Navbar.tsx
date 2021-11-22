import React, { Component, useContext } from "react";
import styles from "./Navbar.module.css";
import logo from "./logo.svg";
import Button from '@mui/material/Button';
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Context} from "../../index";
import { useHistory } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";


const MenuItems = [
    {
        title: 'Home',
    },
    {
        title: 'Departments',
    },
    {
        title: 'Forms',
    },
    {
        title: 'Case Study',
    },
]

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

const Navbar = () => {
    const isMobile = useMediaQuery('(max-width:900px)');

    const [open, setOpen] = React.useState(false);
    const [chosenIndex, setIndex] = React.useState(0);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const {store} = useContext(Context);
    const history = useHistory();

    const logoutFunc = async () => {
        await store.logout();
        history.push('/');
    }

    const profileFunc = async () => {
        history.push('/userProfile');
    }

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

    const handleClick = (index: number, item: any) => {
        if(index == chosenIndex) return;
        
        if (item.title === "Case Study") {
            history.push('/caseStudy');
        } else if (item.title === "Home") {
            history.push('/homePage');
        } else if (item.title === "Forms") {
            history.push('/forms');
        }
        
        setIndex(index);
    }

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
  
    const {t, i18n} = useTranslation();

    return (
        <Box sx={{ flexGrow: 1, fontFamily: 'Arial', fontWeight: 'light' }} >
            <AppBar position="static" style={navStyle}>
                <Toolbar>
                        { isMobile ?
                            <React.Fragment>
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
                                        {MenuItems.map((item, index) => {
                                        return (
                                                <Box ml={2}>
                                                    <Button sx={{fontFamily: 'Arial', fontWeight: 400, flexGrow: 1}}
                                                    style={chosenIndex == index ? buttonStyleChoosen : buttonStyle}
                                                    onClick={() => handleClick(index, item)}
                                                    >
                                                        {item.title}
                                                    </Button>
                                                </Box>
                                            
                                        ) 
                                        })}
                                        <Box mt={2}>
                                            <MenuItem>Create Account</MenuItem>
                                            <MenuItem onClick={profileFunc}>Settings</MenuItem>
                                            <MenuItem onClick={logoutFunc}> Logout</MenuItem>
                                        </Box>
                                        </MenuList>
                                    </ClickAwayListener>
                                    </Paper>
                                </Grow>
                                )}
                            </Popper>
                        </React.Fragment>
                        :
                        null
                        }
                    <img src={logo} height={80} ></img>
                    {!isMobile ?
                        <React.Fragment>
                            <Box sx={{flexGrow: 1,}} display="flex" justifyContent="center" alignItems="center">
                            {MenuItems.map((item, index) => {
                                return (
                                    <Box mr={4}>
                                            <Button sx={{fontFamily: 'Arial', fontWeight: 400}}
                                            style={chosenIndex == index ? buttonStyleChoosen : buttonStyle}
                                            onClick={() => handleClick(index, item)}
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
                                            <Trans i18nKey = 'Navbar.create'>Create Account</Trans>
                                        </MenuItem>
                                        <MenuItem onClick={profileFunc}>
                                            <Trans i18nKey = 'Navbar.settings'>Settings</Trans>
                                        </MenuItem>
                                        <MenuItem onClick={logoutFunc}>
                                            <Trans i18nKey = 'Navbar.logout'>Logout</Trans>
                                        </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                    </Paper>
                                </Grow>
                                )}
                            </Popper>
                        </React.Fragment>
                        :
                        null
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
  }

export default Navbar;