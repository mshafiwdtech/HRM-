import { Box } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import AccountCircle from '@material-ui/icons/AccountCircle';

const ActivityTab = ({item}) => {
    let dateLocal = moment(item.createdAt).format('DD/MM/YYYY')
    let timeLocal = moment(item.createdAt).format('LT')
    let relativeTime = moment(item.createdAt).fromNow()
    return (
        <Box style={styles.container}>
            <Box>
                {item.action==='comment' ? <p style={styles.textStyle}>Commented "<b>{item.comment}</b>"" </p> : 
                item.action===('assignedTopresaleExecutive') ? <p style={styles.textStyle}><em>Lead Assigned to Presale Executive:</em> <b>{item.assignedTo ? item.assignedTo.firstName : ''}</b> </p> :
                item.action===('assignedTosalesExecutive') ? <p style={styles.textStyle}><em>Lead Assigned to Sales Executive:</em> <b>{item.assignedTo ? item.assignedTo.firstName : ''}</b> </p> :
                item.action === 'lead_created' ? <p style={styles.textStyle}><em>Created Lead</em> <b>{item.email}</b> </p> : 
                item.action==='project_enquiry' ? <p style={styles.textStyle}><em>Enquired on new project</em> "<b>{item.project}</b>"</p> : 
                item.action==='source' ? 
                    <div style={{display:'flex'}}>
                        <h7 style={styles.textStyle}>{item.source?<p><em>Source:</em> <b>{item.source},</b></p>:null} </h7>
                        <h7 style={styles.textStyle}><em>Channel:</em> <b>{item.channel}</b>, <em>Medium:</em> <b>{item.medium}</b></h7> 
                    </div> :
                item.action==='handover_requested' ? 
                    (item.type==='presaleExecutiveTosalesExecutive' ? <p style={styles.textStyle}><em>Lead Handover requested from Presales to Sales</em></p> :
                    item.type==='salesExecutiveTopresaleExecutive' ? <p style={styles.textStyle}><em>Lead Handover requested from Sales to Presale</em></p> : null) :
                item.action==='handover_completed' ? 
                    (item.type==='presaleExecutiveTosalesExecutive' ? 
                        <p style={styles.textStyle}><em>Lead Handed Over from Presale Executive:</em> <b>{item.handoverFrom ? item.handoverFrom.firstName :''}</b> <em>to Sales Executive:</em> <b>{item.handoverTo? item.handoverTo.firstName:''}</b> </p> :
                    item.type==='salesExecutiveTopresaleExecutive' ? 
                        <p style={styles.textStyle}><em>Lead Handed Over from Sales Executive:</em> <b>{item.handoverFrom ? item.handoverFrom.firstName :''}</b> <em>to Presale Executive:</em> <b>{item.handoverTo? item.handoverTo.firstName:''}</b> </p> : null) :
                null } 
            </Box> 
            <p style={styles.dateStyle}>{relativeTime}, {dateLocal} {timeLocal} </p>
            {item.userId ? 
            <Box style={{display:'flex',alignItems:'center',margin:'0px 0px 5px 0px'}}>
                <AccountCircle style={{fontSize:'30px',marginRight:"10px"}} /> 
                {item.userId.firstName}
            </Box> :
            null }
            
        </Box>
    )
}

const styles= {
    container:{
        margin:"0px 0px 0px 10px",
        //alignItems:'flex-start',
        //display:'flex',
        //flexDirection:'column',
        //justifyContents:''
    },
    dateStyle:{
        fontSize:'15px',
        fontStyle:'italic',
        color:'grey'
    },
    textStyle:{
        fontSize:'16px'
    }
}

export default ActivityTab;