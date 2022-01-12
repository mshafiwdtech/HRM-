import { TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editLeadDetails } from '../../store/actions/SingleLead';

const InputData = ({label,value,userData,setUserData,dataName}) => {
      
      const locText = useSelector((state)=>state.leadSingle.leadData)

      const [data,setData] = useState(locText[dataName]);

      const dispatch = useDispatch();
      
      const handle_change = (text) => {
            setData(text)
            let currentData = locText
            currentData[dataName] = text
            console.log(currentData[dataName],'555555555555555555555555555555555555')
            dispatch(editLeadDetails(currentData))
      }

      return(
            <div style={{display:'flex'}}>
                  <TextField style={{width:'100%'}} id="standard-basic" label={label} value={data} onChange={(text)=>handle_change(text.target.value)} />
            </div>
      )
}

export default InputData;