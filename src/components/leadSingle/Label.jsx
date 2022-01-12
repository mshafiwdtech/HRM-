import { Box, TextField } from '@material-ui/core'
import React from 'react'

const Label = ({title,item}) => {
    return (
        <Box style={{}}>
             <p style={styles.label}>{title}</p>
            <TextField defaultValue={item} />
        </Box>
    )
}

const styles = {
    label:{
        fontWeight:'bold',
        fontSize:'14px'
    }
}

export default Label;