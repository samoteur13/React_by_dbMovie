import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';


const Home = () => {

  const icon = (
    <Paper sx={{ m: 1 }} elevation={4}>
      <p>Filtre recherch</p> 
    </Paper>
  );

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
   


  return (
    <section>
      <h1>Test Material UI</h1>
      <Fade in={checked}>
            {icon}
      </Fade>
      <article>
      <Box sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="filtre"
        />
        <Box sx={{ display: 'flex' }}>
          <Fade in={checked}>
            {icon}
            </Fade>
        </Box>
      </Box>
      </article>

    </section>
  );

}

export default Home