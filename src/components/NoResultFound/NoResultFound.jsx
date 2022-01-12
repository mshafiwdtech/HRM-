import React from 'react'
import { NoResultFoundIllustration } from '../../assets/Icons'
import './noresult.css'

function NoResultFound() {
    return (
        <div className="no-data-container">

            <NoResultFoundIllustration/>

            <span className="no-data-container-tittle">No Results found for your filter 😥</span>
            <span className="no-data-container-caption">(Please reset filter and try again)</span>
            
        </div>
    )
}

export default NoResultFound
