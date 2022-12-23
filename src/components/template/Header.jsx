import React, {useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import {MyContext} from '../../store/AppContext'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MovieSharpIcon from '@mui/icons-material/MovieSharp';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const HEADER = () => {

    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = (e) => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = (event) => {
          setAnchorElUser(null);
      };

    const {store, setStore} = useContext(MyContext);

    return(
        <div>
            {store.isUserAuth ? 
                <AppBar position="static" style={{marginBottom:20}}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <MovieSharpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                }}
                            >
                                TV RI7
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                >
                                <MenuIcon />
                                </IconButton>
                                <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                                >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography  onClick={() => {navigate('/')}} textAlign="center">Accueil</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography onClick={() => {navigate('/liste-de-filme')}}  textAlign="center">Film</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography onClick={() => {navigate('/liste-de-serie')}} textAlign="center">Serie</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography onClick={() => {navigate('/ajouter-un-filme')}} textAlign="center">ajouter un filme</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
    
                            <MovieSharpIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href=""
                                sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                }}
                            >
                                TV RI7
                            </Typography>
    
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <Button
                                    onClick={() => {navigate('/')}}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Accueil
                                </Button>
                                <Button
                                    onClick={() => {navigate('/liste-de-filme',)}}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    film
                                </Button>                            
                                <Button
                                    onClick={() => {navigate('/liste-de-serie')}}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    serie
                                </Button>
                                <Button
                                    onClick={() => {navigate('/ajouter-un-filme')}}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    ajouter un filme
                                </Button>
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                                </Tooltip>
                                <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <AccountBoxIcon/>
                                        <Typography  onClick={() => {navigate('/profile')}} textAlign="center">profil</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <PersonOffIcon/>
                                        <Typography onClick={() => {sessionStorage.clear() }} textAlign="center">deconexion</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            :
                <AppBar position="static" style={{marginBottom:20}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <MovieSharpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            TV RI7
                        </Typography>

                        <MovieSharpIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            TV RI7
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Button
                                onClick={() => {navigate('/inscription-ou-connexion')}}
                                sx={{ my: 2 }}
                            >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                            </Avatar>
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
                </AppBar>
            }
        </div>
    )
}

export default HEADER;