import React,{useState} from 'react' 
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { saveSingleData } from '../../store/actions/SingleLead';

const Form = ({title,stateName,data}) => {
    const stateValue = useSelector((state)=>state.leadSingle[stateName])
    const dispatch = useDispatch()
    return (
            <Box>
                <p style={styles.selectLabel}>{title}</p>
                <FormControl>
                    <NativeSelect
                    value={stateValue}
                    onChange={(e)=>dispatch(saveSingleData(e.target.value,stateName))}
                    >
                    <option value="">Select {title}</option>
                    {data.map((item,index)=>{
                       return  <option value={item}>{title==='Executive'?item.name:item}</option>
                    })}
                    </NativeSelect>
                </FormControl>
            </Box>
    )
}

const styles = {
    label:{
        fontWeight:'bold',
        fontSize:'14px'
    },
    selectLabel:{
        fontSize:'14px',
        fontWeight:'bold'
    }
}

export default Form;