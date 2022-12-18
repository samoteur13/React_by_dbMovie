import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


const Footer = () => {
    return (
        <footer className="text-muted">
            <Typography variant="body2" color="text.secondary" align="center" >
                {'Copyright © '}
                <Link color="inherit" href="http://samy-chabani.ri7.tech:8080/">
                    My projects by Chabani Samy
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    )
}

export default Footer;