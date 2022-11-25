
import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
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




const HEADER = () => {

    const navigate = useNavigate()

    const pages = ['Acueille', 'Filme', 'Serie'];
    const navTo = ['/', '/liste-de-filme','/liste-de-serie']
    const settings = ['Profile', 'Account', 'Dashboard', 'Déconnexion'];
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
  

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
      }

    const {store, setStore} = useContext(MyContext);


    return(
        <div>
            {/* <nav className="navbar navbar-light bg-light text-white bg-dark p-5 mb-5">
                <h1>TV RI7</h1>
                <nav className="form-inline">
                    <Button color="secondary" variant="contained"><Link className="badge badge-pill" to="/">Accueil</Link></Button>                
                    {store.isUserAuth ?
                        <>  
                            <Button color="secondary" variant="contained"><Link className="badge badge-pill" to="/liste-de-filme">Liste de film</Link></Button>
                            <Button color="secondary" variant="contained"><Link className="badge badge-pill" to="/liste-de-serie">Liste de série</Link></Button>
                            <Button color="secondary" variant="contained"><Link className="badge badge-pill" to="/profile">Profile</Link></Button>
                            <Button color="secondary" variant="contained"><Link className="badge badge-pill" to="/ajouter-un-filme">Ajouter un filme</Link></Button>
                            <Button color="secondary" variant="contained" onClick={() => {  setStore({...store , isUserAuth : false })}}>Déconnexion</Button>
                        </> 
                    : 
                        <>
                            <button className="btn btn-warning m-1" type="button"><Link className="badge badge-pill" to="/inscription-ou-connexion">Inscription/connexion</Link></button>
                        </>
                    }

                </nav>
            
            </nav> */}
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
                                <MenuItem onClick={handleCloseUserMenu}>
                                <Typography  onClick={() => {navigate('/profile')}} textAlign="center">profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                <Typography onClick={() => {navigate('/ajouter-un-filme')}}  textAlign="center">ajouter un filme</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                <Typography onClick={() => {console.log('deconnexion')}} textAlign="center">deconexion</Typography>
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
                            </Button>                            <Button
                                onClick={() => {navigate('/liste-de-serie')}}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                serie
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
                                <Typography  onClick={() => {navigate('/profile')}} textAlign="center">profil</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                <Typography onClick={() => {navigate('/ajouter-un-filme')}}  textAlign="center">ajouter un filme</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                <Typography onClick={() => {console.log('deconnexion')}} textAlign="center">deconexion</Typography>
                                </MenuItem>

                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default HEADER;