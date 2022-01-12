import { Box, TextField } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { saveSingleData } from '../../store/actions/SingleLead'

const Comment = () => {
    const [text, setText] = useState('')
    return (
        <Box style={styles.commentContainer}>
            <h3>Comments</h3>
            <TextField
                style={{}}
                rows={4}
                multiline
                variant='outlined'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </Box>
    )
}

const styles = {
    commentContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '20px'
    }
}

export default Comment;