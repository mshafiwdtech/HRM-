import { Box } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { saveSingleData } from '../../store/actions/SingleLead';

const Tab3Drop = ({title,data,stateName}) => {
    //const [stateValue,setStateValue] = useState();
    const dispatch = useDispatch()
    const  stateValue = useSelector((state)=>state.leadSingle[stateName])
    
    return (
        <Box style={styles.container}>
            <Box style={{display:'flex',width:'50%',justifyContent:'space-between'}}>
                <p style={styles.p1}>{title}</p>
                <p style={styles.p2}>:</p>
            </Box>
            <Box style={{width:'20%'}}>
                <FormControl>
                    <NativeSelect
                    value={stateValue}
                    style={{width:'150px'}}
                    onChange={(e)=>dispatch(saveSingleData(e.target.value,stateName))}
                    >
                    <option value="">Select</option>
                    {data.map((item,index)=>{
                        return  <option value={item}>{item}</option>
                    })}
                    </NativeSelect>
                </FormControl>
            </Box>
        </Box>
    )
}

const styles = {
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        
    },
    p1:{
        fontWeight:'bold',
    },
    p2:{
        fontWeight:'bold',
    },
    form:{
    }
}

export default Tab3Drop;
