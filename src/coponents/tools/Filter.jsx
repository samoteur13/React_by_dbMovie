import * as React from 'react';
import Paper from '@mui/material/Paper';


import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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
        <div>
            <Paper
                elevation={0}
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
                    style={{display: 'flex', flexWrap:'inherit', justifyContent: 'center'}}
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
        </div>
    )
}

export default Filter