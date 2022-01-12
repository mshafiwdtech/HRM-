import React from 'react'
import { CallIcon, EditIcon, NoteIcon } from '../../../../assets/Icons';

function TimelineItem({ variant, isLast }) {

    let variantClasses = [
        "timeline-content-1",
        "timeline-content-2",
        "timeline-content-3"];


    let circleClasses = [
        "left-content-circle-1",
        "left-content-circle-2",
        "left-content-circle-3"];


    return (
        <div className="timeline-item-container">

            <div className="left-content">

                <div className={variant == "1" ?
                    circleClasses[0] : variant == "2" ?
                        circleClasses[1] : variant == "3" ?
                            circleClasses[2] : null
                }>

                    {/* <CallIcon/> */}
                    {/* <NoteIcon/> */}
                    {/* <EditIcon/> */}

                    {
                        variant == "1" ?
                        <CallIcon/> : variant == "2" ?
                        <NoteIcon/> : variant == "3" ?
                        <EditIcon/> : null
                    }

                </div>

                {
                    !isLast ?
                        <div className="left-content-line">

                        </div>
                        : null
                }

            </div>
            <div className={variant == "1" ?
                variantClasses[0] : variant == "2" ?
                    variantClasses[1] : variant == "3" ?
                        variantClasses[2] : null
            }>
                <h4 style={{ marginBottom: "0", marginTop: "0" }}>Call-2 hours ago</h4>
                <span className="timeline-content-description">Follow up with Shaju to discuss new marketing needs.</span><br />
                <div className="bottom-row">

                    <img className="user-avatar" src="https://pbs.twimg.com/profile_images/864282616597405701/M-FEJMZ0_400x400.jpg" alt="" />
                    <span className="bottom-row-user-name">Shaju PD</span>
                    <span className="bottom-row-user-time">2 hours ago</span>

                </div>
            </div>
        </div>
    )
}

export default TimelineItem
