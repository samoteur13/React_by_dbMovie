import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TextField } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const Filter = (props) => {
    return(
        <Grid container>
          <Grid container  sx={{
                              p : 1 ,
                              display: 'grid',
                              gap: 1,
                              gridTemplateColumns: 'repeat(2, 1fr)',
                            }}
                            xs={{p : 0}}
                            >
            <Grid container  sx={{
                              md : 12 ,
                              display: 'grid',
                              gap: 1,
                              gridTemplateColumns: 'repeat(2, 1fr)',
                            }}>
              <TextField    
                  label='date début'
                  name='startDate'
                  type='number' 
                  onChange={props.changeDate}
                  value={props.startValue}
              />
              <TextField       
                  label='date fin'  
                  type='number' 
                  name='endDate'
                  onChange={props.changeDate}
                  value={props.endValue}
              />
            </Grid >
            <Paper 
                 
              md={6}
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%'}}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Recherchez votre filme"
                label='Recherche'
                name='search'
                type='text'
                onChange={props.changeSearch}
                value={props.searchValue}
                inputProps={{ 'aria-label': 'Recherchez votre filme' }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon actionSearch="" />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>
          </Grid>

          <Paper
              elevation={0}
              className="scrollbar style-3 "
              sx={{
                  display: 'flex',
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  flexWrap: 'wrap',
              }}
              >
              <StyledToggleButtonGroup
                  size="small"
                  value={props.formats}
                  onChange={props.onChange}
                  aria-label="text formatting"
                  color='info'
                  // style={{display: 'flex', flexWrap:'inherit', justifyContent: 'center'}}
              >
                    {props.genres.map((info) => {
                                      return (
                                        <ToggleButton 
                                          key={info.id}
                                          id={info.id} 
                                          value={info.id} 
                                          size="small"  
                                          aria-label={info.name}
                                        >
                                          {info.name}
                                        </ToggleButton>
                                      )
                                      })}
              </StyledToggleButtonGroup>
          </Paper>
        </Grid>
    )
}

export default Filter