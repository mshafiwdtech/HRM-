import { Box } from '@material-ui/core';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import React, { useEffect } from 'react'
import Tab1_v2 from './V2/Tab2/Tab1_v2';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadLeadActivity } from '../../store/actions/SingleLead';
import {Timeline as TL} from 'antd'
import Divider from '@mui/material/Divider';

import ActivityTab from '../activity/ActivityTab';


import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import FolderIcon from '@mui/icons-material/Folder';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DangerousIcon from '@mui/icons-material/Dangerous';



const Tab1 = () => {
    const dispatch = useDispatch()

    /*useEffect(()=>{
        dispatch(loadLeadActivity(id1))
    },[])*/

    const data = useSelector((state)=>state.leadSingle['leadActivity'])

    const data1 =[
        {
            "action": "lead_created",
            "leadId": "618e4785b0526a00fc5ffb01",
            "createdAt": "2021-11-12T10:52:53.632Z",
            "email": "sharnam@hotmail.com",
            "phone": "9662108954",
            "_id": "618e4785b0526a00fc5ffb04"
        },
        {
            "action": "project_enquiry",
            "leadId": "618e4785b0526a00fc5ffb01",
            "createdAt": "2021-11-12T10:52:53.632Z",
            "projects": [
                "New Project name"
            ],
            "_id": "618e4785b0526a00fc5ffb05"
        },
        {
            "action": "soucres",
            "leadId": "618e4785b0526a00fc5ffb01",
            "createdAt": "2021-11-12T10:52:53.633Z",
            "channel": "Digital",
            "medium": "Social",
            "source": "Facebook",
            "_id": "618e4785b0526a00fc5ffb06"
        }
        /*{
            action: "comment"
            comment: [{…}]
            createdAt: "2021-11-18T07:07:40.729Z"
            leadId: "619204833e82052b68765de1"
            projects: []
            userId: "userId123456"
            userName: "userName Sam"
            _id: "6195fbbc8d8aae2a788d1dfa"
        }*/
    ]

    return (

        <Box style={styles.container}>
            {data !== undefined && data.length>0 ? 
            <Box style={{width:'90%'}}>
                {data.slice(0).reverse().map((item, index) => {
                    return(
                        <Box style={{}}>
                            <Box style={{display:'flex',flexDirection:'row',margin:'0px 25px 0px 25px'}}>
                                <Box style={{display:'flex',flexDirection:'column',alignItems:"center",justifyContent:'space-between' }}>
                                    <Box style={{width:'30px',height:'30px',borderRadius:'15px',alignItems:'center',justifyContent:'center',display:'flex'}}>
                                        {item.action==='lead_created'? <FolderIcon color='secondary' style={{fontSize:'27',color:'red'}} /> :
                                        item.action==='project_enquiry'? <AssignmentIcon style={{fontSize:'27',color:'orange'}}/> : 
                                        item.action==='source' ? <TripOriginIcon style={{fontSize:'27',color:'indigo'}}/> : 
                                        item.action==='comment' ? <TextsmsIcon style={{fontSize:'27',color:'#4267B2'}}/> :
                                        item.action==='assignedTopresaleExecutive' ? <DoubleArrowIcon style={{fontSize:'30',color:'#1EE500'}}/>  : 
                                        item.action==='assignedTosalesExecutive' ? <DoubleArrowIcon style={{fontSize:'30',color:'#1EE5B2'}}/>  : 
                                        item.action==='handover_completed' ? <BeenhereIcon style={{fontSize:'27',color:'purple'}}/> : 
                                        item.action==='handover_requested' ?  <ArrowForwardIcon style={{fontSize:'35',color:'brown'}}/> :
                                        item.action==='booking_completed' ? <DangerousIcon style={{fontSize:'29',color:'#CD22B3'}}/> : null }
                                    </Box>
                                    {/*<Divider sx={{backgroundColor:'blue'}} orientation='vertical' />*/}
                                    <Box style={{width:"4px",backgroundColor:'#008B8B',flex:'1',marginTop:'2px',borderRadius:'10px'}} />
                                </Box>
                                <Box style={{margin:'10px 0px 0px 10px',width:'80%',flex:'1',border:'1px solid',borderRadius:'10px',padding:"10px 0px"}}>
                                    <ActivityTab item={item} />
                                </Box>
                            </Box>
                            {/*<Divider sx={{marginLeft:'25px'}}/>*/}
                        </Box>
                    )
                })}
            </Box>
            : null} 

            {/*data !== undefined && data.length>0 ? 
                <Timeline style={styles.timelineGrid}>
                    {data.slice(0).reverse().map((item, index) => {
                        return (
                            <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot style={{backgroundColor :'blue'}}>
                                            {/*item.action==='lead_created'? <FileDownloadDoneIcon/> :
                                                item.action==='project_enquiry'? <AssignmentIcon/> : 
                                                item.action==='soucres' ? <TripOriginIcon/> : null 
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Box style={styles.container}>
                                            {item.action==='lead_created'? <LeadCreated item={item} /> :
                                                item.action==='project_enquiry'? <ProjectEnquiry item={item}/>: 
                                                item.action==='source' ? <Sources item={item}/> : 
                                                item.action=== 'comment' ? <Comment item={item}/> : 
                                                item.action=== 'assign' ? <Executive item={item}/> : null  }
                                            </Box>
                                        </TimelineContent>
                                </TimelineItem> 
                                )
                    })}
                </Timeline> 
                : null*/} 

            {/*<Tab1_v2 />*/}
        </Box>
    )
}

const styles = {
    container:{
        //border:'1px solid red',
        display:'flex',
        //alignItems:'flex-start',
        flex:1,
        //backgroundColor:'#F0F8FF',
        //maxWidth:'100px'
    },
    timelineGrid:{
        display:'flex',
        //width:'500px',
        //height:'200px',
        flexDirection:'column',
        //alignItems:'flex-start',
        //border:'1px solid red',
    },
    itemContainer:{
        //border:'1px solid red',
        display:'flex',
        //alignItems:'flex-start',
        flex:1,
        //maxWidth:'100px'
    }
}


export default Tab1;


