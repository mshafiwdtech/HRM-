import React from 'react'
import './tab1.css'
import TimelineItem from './TimelineItem'

function Tab1_v2() {
    return (
        <div className="main-container">
            <TimelineItem variant="1"/>
            <TimelineItem variant="2"/>
            <TimelineItem variant="3" isLast/>
        </div>
    )
}

export default Tab1_v2
