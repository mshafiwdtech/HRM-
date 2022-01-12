import React, { useEffect, useState } from 'react'
import { SpinArrow } from '../../assets/Icons'
import './resfreesel.css'

function ResFreeSel({setValue, value}) {

    let [isOpen, setOpen] = useState(true)
    let dates=["Today","Yesterday","Week","Month","Year"]
    let datesKey=["today","yesterday","week","month","year"]

    useEffect(() => {

        setOpen(false)
       
    }, [value])

   
    return (
        <div className="res-free-sel-container">
            <div className="res-free-sel-spin" onClick={()=>{setOpen(!isOpen)}}>
                <span>{value}</span>

                <span><SpinArrow status={isOpen}/></span>
               
            </div>

            <div className={isOpen?"res-free-sel-drop":"res-free-sel-drop-hidden"}>
             
             {dates.map((obj,key)=>{
                 return(  <span onClick={()=>{setValue(datesKey[key])}}>{obj}</span>)
             })
             }
              
            </div>
        </div>
    )
}

export default ResFreeSel
