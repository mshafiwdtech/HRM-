import { Box, Button } from '@material-ui/core';
import React from 'react'
import Form from './Form';

const QualityCard = () => {
    const budgetData = [
        'FEASIBLE',
        'NOT FEASIBLE',
        'EXTENDED',
    ]

    const projectStatusData = [
        'AVAILABLE',
        'NOT AVAILABLE',
        'EXTENDED',
    ]

    return (
        <Box style={styles.container}>
            <h2>CUSTOMER QUALITY CARD</h2>
            <Box style={{ display: 'flex', justifyContent: 'space-around', width: '90%' }}>
                <Form title='Budget' data={budgetData} />
                <Form title='Project Status' data={projectStatusData} />
            </Box>
            <Button style={{ margin: '10px' }} variant='outlined' color='secondary'>Submit</Button>


        </Box>
    )
}
const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '20px',
        padding: '10px',
        border: '1px solid grey',
        backgroundColor: '#cae6ff'
    }
}
export default QualityCard;