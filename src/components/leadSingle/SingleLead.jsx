import { Box, Chip, CircularProgress, Dialog, DialogContent, InputAdornment, MenuItem, OutlinedInput, Select } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react'
import Form from './Form';
import DatePickerSingle from './DatePickerSingle';
import Comment from './Comment';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import QualityCard from "./QualityCard";
import TabBar from "./TabBar";
import InputData from "./InputData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  loadSingleLead,
  saveSingleData,
  editLeadDetails,
  submitLeadDetailPart1,
  submitLeadDetailPart2,
  closeSubmit,
  loadLeadActivity,
} from "../../store/actions/SingleLead";
import { getleadStages } from "../../store/actions/Leads";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getSingleUser } from "../../store/actions/Users";
import { loadSettingsApi, loadStageStatusApi } from "../../store/actions/Settings";
import { useLocation, useParams } from 'react-router';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment'
import { set } from 'date-fns';


const SingleLead = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    
    const id = (location.state === undefined? '619204833e82052b68765de1' : location.state.id)
    const mainUser = JSON.parse(localStorage.getItem('epitomeUser'))
    //const mainUser = {role:"Pre Sale Manager"}
    const [modal, setModal] = useState(false);
    const [modalType,setModalType] = useState('')
  
    useEffect(()=>{
        dispatch(loadSingleLead(id))
        dispatch(loadLeadActivity(id))
        dispatch(getleadStages())
        dispatch(loadStageStatusApi('stageStatusData'))
        dispatch(loadSettingsApi('projectData','project'))
        dispatch(getSingleUser({ role: "Pre Sale Executive" }));
        dispatch(getSingleUser({ role: "Sales Executive" },'usersManager'));
        dispatch(loadSettingsApi('actionData','nextAction'))
    },[])

    const allState = useSelector((state) => state.leadSingle['leadData'])
    const projectData = useSelector((state)=>state.setting['projectData'])
    const nextActionList = useSelector((state=>state.setting['actionData']))
    const stageStatus = useSelector((state)=>state.setting['stageStatusData'])
    const userData = useSelector((state)=>state.leadSingle['leadData'])
    const submitFlag = useSelector((state)=>state.leadSingle['submitFlag']) 

    //const [userData,setUserData] = useState({})
    const date = new Date().toLocaleString()

    const { users } = useSelector((state) => state.user);
    const {usersManager} = useSelector((state)=>state.user)

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [altEmail,setAltEmail] = useState('')
    const [altPhone,setAltPhone] = useState('')
    const [nextContactDate,setNextContactDate] = useState(null)
    const [presaleExecutive,setPresaleExecutive] = useState('')
    const [salesExecutive,setSalesExecutive] = useState('')
    const [nextAction,setNextAction] = useState('')
    const [status,setStatus] = useState('')
    const [statusName,setStatusName] = useState('')
    const [stage,setStage] = useState('');
    const [nextContactTime,setNextContactTime] = useState('')
    const [comments,setComments] = useState('') 
    const [projectList,setProjectList] = useState([])

    const [price,setPrice] = useState('')
    const [bookingDate,setBookingDate] = useState(null)

    const [updatedData,setUpdatedData] = useState({})
    const [isEmpty,setIsEmpty] = useState(false)
    const [nameEmpty,setNameEmpty] = useState(false)
    const [dateFlag,setDateFlag] = useState(0)
    const [executiveFlag,setExecutiveFlag]=useState('0') // Used for Sales and Pre Sales Executive
    const [dropDownFlag,setDropDownFlag] = useState('0')
    const [bookingFlag,setBookingFlag] = useState(false)
    const [bookingEmpty,setBookingEmpty] = useState(false)

    const [handoverParam,setHandoverParam] = useState('') // Used for sending param as query
    const [handSales,setHandSales] =useState('')
    const [salesEmptyFlag,setSalesEmptyFlag] = useState(false)

    
    
    useEffect(()=>{ 
        setProjectList(userData.projects)
        setFirstName(userData.firstName)
        setLastName(userData.lastName)
        setNextContactDate(userData.nextContactDate)
        setNextContactTime(userData.nextContactTime)
        setNextAction(userData.nextContactAction?userData.nextContactAction._id:'')
        setPresaleExecutive(userData.presaleExecutive?userData.presaleExecutive._id:'')
        setSalesExecutive(userData.salesExecutive?userData.salesExecutive._id:'')
        setStatus(userData.status===undefined?'':userData.status._id)
        setStatusName(userData.status===undefined?'':userData.status.name)
        setStage(userData.stage===undefined?'':userData.stage._id)
        setAltEmail(userData.alternateEmail)
        setAltPhone(userData.alternatePhone)
        handleDropDown(userData.handoverRequestedTo,userData.assignedTo)
      } ,[userData])

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '95%'
            },
        },
    }));
    const classes = useStyles();

    const handleOpenModal = () => {
        setModal(true);
      };
    const handleCloseModal = () => {
        setModal(false);
        setSalesEmptyFlag(false)
    };

    const handleCloseSubmitModal = () => {
        dispatch(closeSubmit())
    }

    const handleIsEmpty = () => {
        setIsEmpty(false)
    }

    const handleNameEmpty = () => {
        setNameEmpty(false)
    }

    const handle_edit = (dataName,text) => {
        console.log(dataName,text,'||||||||||||||||||||||||||||||||||||||||||||||')
        if (dataName==='status'){
           let stage = ''
           stageStatus.map((item,index)=>{
               item.statusList.map((item1,index1)=>{
                   if(item1._id === text){
                       stage = item._id
                       setStatusName(item1.name)
                   }
               })
           })
            setStatus(text)
            handleFinalPayload('stage',stage)
        }
        else if(dataName==='projects'){
            let updatedData = userData
            updatedData['projects'] = typeof text === 'string' ? text.split(',') : text
            try{
                dispatch(editLeadDetails({...updatedData}))
            }
            catch(e){
                console.log('ERROR',e)
            }
            //console.log(typeof(projectList))*/
        }
        else{
            let updatedData = userData
            updatedData[dataName]=text
            dispatch(editLeadDetails({...updatedData}))
            
        }
    }

    const compare = (value) => {
        if (value===null){
            return false
        }
        else if (value===undefined){
            return false
        }
        else if(value==='') {
            return false
        }
        else{
            return true
        }
    }
    
    const handleFinalPayload = (dataName,value) => {
        let objData = updatedData
        //console.log(typeof(value)==='object'?value.length:null)
        let itemArray =['status','stage','presaleExecutive','salesExecutive' ,'nextContactAction']
        let result = itemArray.find((item)=>item===dataName)
        if(compare(value) && compare(result)){
            if(userData[dataName]===undefined || userData[dataName]._id!==value) {
                console.log('hello',dataName,value)
                objData[dataName]=value
                if(dataName==='presaleExecutive'){
                    if (userData.isHandoverCompleted===false && userData.handoverRequestedTo==='presaleExecutive'){
                        setUpdatedData(handleHandoverAccept(value))
                        setHandoverParam('handoverCompleted=true')
                    }
                    else{
                        console.log('1')
                        objData['assignedTo']='presaleExecutive'
                        setUpdatedData(objData)
                    }
                }
                else if (dataName==='salesExecutive'){
                    if (userData.isHandoverCompleted===false && userData.handoverRequestedTo==='salesExecutive'){
                        setUpdatedData(handleHandoverAccept(value))
                        setHandoverParam('handoverCompleted=true')
                    }
                    else{
                        console.log('1')
                        objData['assignedTo']='salesExecutive'
                        setUpdatedData(objData)
                    }
                }
            }
            else if (userData[dataName]._id===value && objData[dataName]!==undefined){
                delete objData[dataName]
                setUpdatedData(objData)
            }
        }
        else if (dataName==='projects' && value.length===[]){
            console.log(JSON.stringify(userData[dataName].sort())===JSON.stringify(value.sort()))
            if(JSON.stringify(userData[dataName].sort())!==JSON.stringify(value.sort())){
                console.log('hello',dataName,value)
                objData[dataName]=value
                //objData={...updatedData,...dummy}
                setUpdatedData(objData)
            }
            else if (JSON.stringify(userData[dataName].sort())!==JSON.stringify(value.sort()) && objData[dataName]!==undefined){
                console.log('hello 1',dataName,value)
                delete objData[dataName]
                setUpdatedData(objData)
            }
        }
        else if (compare(value)) {
            if(userData[dataName]!==value){
                console.log('hello2',dataName,value)
                objData[dataName]=value
                //objData={...updatedData,...dummy}
                setUpdatedData(objData)
            }
            else if (userData[dataName]===value && objData[dataName]!==undefined){
                delete objData[dataName]
                setUpdatedData(objData)
            }
        }
        else if (!compare(value)){
            if (objData[dataName]!==undefined){
                console.log('hello3',dataName,value)
                if(dataName==='presaleExecutive' || dataName==='salesExecutive'){
                    if (userData.isHandoverCompleted===false){
                        let delItem=['assignedTo','handoverRequestedTo','isHandoverCompleted','presaleExecutive','salesExecutive']
                        for (let item in delItem){
                            console.log(delItem[item])
                            if (objData[delItem[item]]!==undefined){
                                delete objData[delItem[item]]
                            }
                        }
                        setHandoverParam('')
                    }
                    else if (objData['assignedTo']!==undefined) {
                        console.log('1D')
                        delete objData[dataName]
                        delete objData['assignedTo']
                    }
                /*if((dataName === 'presaleExecutive' || dataName==='salesExecutive') && objData['assignedTo']!==undefined ){
                    console.log('3D')
                    delete objData[dataName]
                    delete objData['assignedTo']*/
                }
            else {
                delete objData[dataName]
            }
                setUpdatedData(objData)
            }
        }
    }

    const handleSubmitPart1 = () => {
        //console.log(submitFlag)
        if(firstName!==''){
            dispatch(submitLeadDetailPart1(userData._id,firstName,lastName,userData.email,userData.phone,altEmail,altPhone))
        }
        else{
            setNameEmpty(true)
        }
    }
    
    const handleSubmitPart2 = () => {
        console.log('()()()()()',updatedData,'()()()()()()',statusName)
        ///console.log(stage,status,projectList,presaleExecutive,salesExecutive,nextContactDate,userData.comments,nextContactTime,/*nextAction*/)
        if ((userData.status.name==='Booked' ? true : statusName!=='Booked'? true : false)){
            if (Object.keys(updatedData).length>0){
                dispatch(submitLeadDetailPart2(userData._id,updatedData,handoverParam))
                setUpdatedData({})
                setComments('')
                setHandoverParam('')
                setExecutiveFlag('0')
                console.log(true)
            }
            else{
                setIsEmpty(true)
            }
        }
        else{
            setBookingFlag(true)
        }
    }

    const handleBookingModal = () => {
        if (price!=='' && bookingDate!=='') {
            let objData = updatedData
            objData['bookingAmount'] = price
            objData['bookingDate'] = bookingDate
            setUpdatedData(objData)
            dispatch(submitLeadDetailPart2(userData._id,updatedData,handoverParam))
            setBookingFlag(false)
            setUpdatedData({})
        }
        else{
            setBookingEmpty(true)
        }
    }
    
    const handleHandoverAccept = (value) => {
        if (userData.handoverRequestedTo==='presaleExecutive'){
            return {
                assignedTo:'presaleExecutive',
                handoverRequestedTo:'presaleExecutive',
                isHandoverCompleted:true,
                presaleExecutive:value,
                salesExecutive:userData.salesExecutive._id,
            }
            
        }
        else if (userData.handoverRequestedTo==='salesExecutive'){
            return {
                assignedTo:'salesExecutive',
                handoverRequestedTo:'salesExecutive',
                isHandoverCompleted:true,
                presaleExecutive:userData.presaleExecutive._id,
                salesExecutive:value,
            }
        }
        
    }
    
    const handleHandoverSubmit = () => {
        if(modalType==='0'){
            let updatedData = {assignedTo:userData.assignedTo,handoverRequestedTo:'salesExecutive',isHandoverCompleted:false}
            dispatch(submitLeadDetailPart2(userData._id,updatedData,'handoverRequested=true'))
        }
        else if (modalType === '1'){
            let updatedData = {assignedTo:userData.assignedTo,handoverRequestedTo:'presaleExecutive',isHandoverCompleted:false}
            dispatch(submitLeadDetailPart2(userData._id,updatedData,'handoverRequested=true'))
        }
        setModal(false)
    }
    
    const handleDropDown = (handoverRequestedTo,assignedTo) => {
        if (userData.isHandoverCompleted===true || userData.handoverRequestedTo){
            setDropDownFlag('3')
            console.log('3')
        }
        else {
            if (userData.assignedTo === 'salesExecutive'){
                setDropDownFlag('2')
                console.log('2')
            }
            else if (userData.assignedTo === 'presaleExecutive'){
                
                setDropDownFlag('1')
                console.log('1')
            }
        }
    }

    const handleBookingClose = () => {
        setBookingFlag(false)
        setBookingEmpty(false)
    }
    
    const InputProps = {
        endAdornment:(
            <InputAdornment position='end' >
                <EditIcon />
            </InputAdornment>
        ),
    }
    
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 150,
            },
        },
      };

    const comparison = (value) => {
        if (value === undefined){
            return true
        }
        else if (value === null){
            return true
        }
        else if (value=== ''){
            return true
        }
        else{
            return false
        }
    }

    return (
        <Box style={styles.container}>
            <Dialog open={modal} onClose={handleCloseModal}>
                    <DialogContent>
                        <h3 style={{color:'blue'}}>{modalType==='1' ?'HAND OVER TO PRE SALES TEAM':'HAND OVER TO SALES TEAM'}</h3>
                        <Box style={{display:'flex',justifyContent:'space-around'}}>
                            <Button variant='contained' color='primary' onClick={handleHandoverSubmit}>Yes</Button>
                            <Button variant='contained' color='secondary' onClick={()=>setModal(false)}>No</Button>
                        </Box>
                    </DialogContent>
            </Dialog>

            <Dialog open={bookingFlag} onClose={()=>setBookingFlag(false)} >
                    <DialogContent style={{display:'flex',flexDirection:'column'}}>
                        <TextField label='Price' type='number' variant='outlined' margin='dense' onChange={(e)=>setPrice(e.target.value)} />
                        <br/>
                        <Box>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} variant="outlined">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant='inline'
                                    label="Booking Date"
                                    inputVariant="outlined"
                                    format="dd/MM/yyyy"
                                    margin='dense'
                                    value={bookingDate}
                                    onChange={(date)=>{setBookingDate(date)}}
                                    style={{ width: '100%'}}
                                />
                            </MuiPickersUtilsProvider>
                        </Box>
                        {bookingEmpty?<h3 style={{alignSelf:'center'}}>FIELDS CANNOT BE EMPTY</h3>:null}
                        <div style={{justifyContent:'space-around',display:'flex',margin:'10px'}}>
                            <Button variant='contained' style={{height:30,width:'75px'}} color='primary' onClick={handleBookingClose}>Cancel</Button>
                            <Button variant='contained' style={{height:30,width:'75px'}} color='secondary' onClick={handleBookingModal}>Confirm</Button>
                        </div>
                    </DialogContent>
            </Dialog>

            <Dialog open={submitFlag}  onClose={handleCloseSubmitModal}>
                    <DialogContent>
                        <h3>Updated Successfully</h3>
                    </DialogContent>
            </Dialog>

            <Dialog open={isEmpty}  onClose={handleIsEmpty}>
                    <DialogContent>
                        <h3>NO FIELD IS SELECTED</h3>
                    </DialogContent>
            </Dialog>

            <Dialog open={nameEmpty}  onClose={handleNameEmpty}>
                    <DialogContent>
                        <h3>First Name Field Cannot Be Empty</h3>
                    </DialogContent>
            </Dialog>

            <Box style={styles.subgrid1}>
            { (Object.keys(userData).length>0)?
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '25px' }}>
                    <Box style={styles.avatar}>
                        {/*<img src='../../../assets/avatar.jpg' />*/}
                        {/*<AccountCircleIcon style={{ fontSize: '110px' }} />*/}
                        <p style={styles.imageCircle}>{userData.firstName !== '' ? userData.firstName[0].toUpperCase():null}{userData.lastName!=='' ? userData.lastName[0].toUpperCase() :null}</p>
                    </Box>
                    <Box style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <div style={{alignItems:'center',display:'flex',flexDirection:'column'}}>
                            <p style={{ fontSize: '25px', margin:"1em 0px" }}>{userData.firstName} {userData.lastName}</p>
                            <p style={{ fontSize: '20px', margin:"1em 0px" }}>{userData.email}</p>
                        </div>
                        <div style={{display:'flex',justifyContent:'space-around'}}>
                            {/*<div style={{backgroundColor:userData.stage.color,borderRadius:'10px',minWidth:'50px',minHeight:'15px'}}><p style={{color:'white',fontSize:'18px'}}>{userData.stage.name.toUpperCase()}</p></div>
                            <div style={{backgroundColor:userData.stage.color,borderRadius:'10px',minWidth:'50px'}}><p>{userData.status.name.toUpperCase()}</p></div>*/}
                            <Button disableRipple={true} variant="contained" style={{backgroundColor:userData.stage.color}} color='primary'>{userData.stage.name}</Button>
                            <Button disableRipple={true} variant="contained" style={{backgroundColor:userData.stage.color,marginLeft:'10px'}} color="primary" >{userData.status.name}</Button>
                        </div>
                    </Box>
                    <Box style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <form className={classes.root}  >
                            <TextField label="First Name" value={firstName} InputProps={InputProps} onChange={(text)=>{setFirstName(text.target.value)}} />
                            <TextField label="Last Name" value={lastName} InputProps={InputProps} onChange={(text)=>{setLastName(text.target.value)}}/>
                            <TextField label="Phone" disabled inputProps={{readOnly:true}} value={userData.phone } /*onChange={(text)=>{handle_edit('phone',text.target.value)}}*/ />
                            <TextField label="Email" disabled inputProps={{readOnly:true}} value={userData.email } /*onChange={(text)=>{handle_edit('email',text.target.value)}}*/ />
                            <TextField label="Alternate Email" value={comparison(altEmail) ? '' : altEmail} InputProps={InputProps} onChange={(text)=>{setAltEmail(text.target.value)}}/>
                            <TextField label="Alternate Phone" value={comparison(altPhone) ? '' : altPhone} InputProps={InputProps} onChange={(text)=>{setAltPhone(text.target.value)}}/>
                            <TextField label="Next Contact Date" inputProps={{readOnly:true}} value={comparison(userData.nextContactDate) ? '' : moment(userData.nextContactDate).format('DD/MM/YYYY')} />
                            <TextField label="Next Contact Time" inputProps={{readOnly:true}} value={comparison(userData.nextContactTime) ?'' :moment(userData.nextContactTime).format('LT')} />
                            <TextField label="Source" inputProps={{readOnly:true}} value={comparison(userData.source) ? '' : userData.source} /*onChange={(text)=>{handle_edit('source',text.target.value)}}*//>
                        </form>
                    </Box>
                    <Box style={{alignSelf:'center'}}>
                        <Button variant='contained' color='Secondary' onClick={()=>{handleSubmitPart1()}} >Submit</Button>
                    </Box>
                    </div> :
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <CircularProgress />
                    </div> }
                    


            </Box>
            { (Object.keys(userData).length>0) ?
            <Box style={styles.rightSubgrid}>
                <Box style={styles.subgrid2}>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft:'50px',marginRight:'50px' }}>
                        <Box>
                            <p style={styles.selectLabel}>Status</p>
                            <FormControl style={{minWidth:'120px'}}>
                                <NativeSelect
                                    input={<OutlinedInput />}
                                    value={status}
                                    variant='outlined'
                                    onChange={(e,value) => {
                                        handle_edit('status',e.target.value)
                                        handleFinalPayload('status',e.target.value)
                                    }}
                                >
                                {stageStatus.map((item,index)=>{
                                        if (userData.status.name==='Booked'){ 
                                            if (item.name==='Sale'){
                                                return(
                                                    <optgroup value={item.name} label={item.name} style={{ color:item.color }}>
                                                        {item.statusList.map((item1,index1)=>{
                                                            return(
                                                                <option style={{ color: 'black' }} value={item1._id} >{item1.name}</option>
                                                            )
                                                        })}
                                                    </optgroup>
                                                )
                                            }
                                            else{
                                                return null
                                            }
                                        }
                                        else{
                                            return(
                                                <optgroup value={item.name} label={item.name} style={{ color:item.color }}>
                                                    {item.statusList.map((item1,index1)=>{
                                                        return(
                                                            <option style={{ color: 'black' }} value={item1._id} >{item1.name}</option>
                                                        )
                                                    })}
                                                </optgroup>
                                        )}
                                    })}
                                </NativeSelect>
                            </FormControl>
                        </Box>
                    </Box>
                    
            
                    <Box style={styles.dateMain}>
                        {<Box style={{flex:1}}>
                            <p style={styles.selectLabel}>Next Contact Date</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} variant="outlined">
                                <KeyboardDatePicker
                                    disabled={!comparison(userData.status) ? (userData.status.name==='Booked'?true:false) : false}
                                    disablePast
                                    disableToolbar
                                    cancelText='Cancel'
                                    variant='inline'
                                    inputVariant="outlined"
                                    
                                    format="dd/MM/yyyy"
                                    //id="date-picker-inline"
                                    //defaultValue={userData.nextContactDate===''?date:userData.nextContactDate}
                                    value={nextContactDate===''?date:nextContactDate}
                                    onChange={(date)=>{
                                        setNextContactDate(date)
                                        setDateFlag(1)
                                        handleFinalPayload('nextContactDate',date)
                                    }}
                                    style={{ width: '170px'}}
                                />
                            </MuiPickersUtilsProvider>
                        </Box>}
                        {/*<DatePickerSingle/>*/}
                        {dateFlag===1 /*&& nextContactDate !== (null && ('' && undefined) ) */? 
                        <Box style={styles.datePicker}>
                            <div style={{marginLeft:'50px'}}>
                                <p style={styles.selectLabel}>Next Contact Time</p>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                    id="time-picker"
                                    // label="Time picker"
                                    value={nextContactTime}
                                     inputVariant="outlined"
                                    onChange={(e)=>{
                                        setNextContactTime(e)
                                        handleFinalPayload('nextContactTime',e)}}
                                    /*KeyboardButtonProps={{
                                        "aria-label": "change time",
                                    }}*/
                                    style={{ width: '170px'}}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <Box style={{marginLeft:'50px'}}>
                                <p style={styles.selectLabel}>Next Action</p>
                                <FormControl>
                                    <NativeSelect
                                    //defaultValue={userData.nextContactAction._id}
                                    input={<OutlinedInput />}
                                    value={nextAction}
                                    onChange={(e)=>{
                                        setNextAction(e.target.value)
                                        handleFinalPayload('nextContactAction',e.target.value)
                                    }}
                                    >
                                    <option value="">Select action</option>
                                    {nextActionList.map((item,index)=>{
                                    return  <option value={item._id}>{item.name}</option>
                                    })}
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                            {/*<Form title='Next Action' data={projectData}  stateName='project' />*/}
                        </Box> : null}
                    </Box>

                    <Box style={{justifyContent:'center',display:'flex'}}>               
                        <Button style={{width: '150px',  margin: '20px' }} variant='contained' color='secondary' onClick={()=>handleSubmitPart2()} >Submit</Button>
                    </Box>

                </Box>

                <Box style={styles.tabBar}>           
                    <TabBar id={userData._id}/>
                </Box>
            </Box> :
            <div style={{display:'flex',justifyContent:'center'}}>
                <CircularProgress />
             </div> }

    </Box>
  );
};

const styles = {
    container: {
        //border: '1px solid',
        display: 'flex',
        //height: '90%',
        margin: '1rem 4rem 3rem 4rem',
    },
    subgrid1:{
        border: '1px solid grey',
        display: 'flex',
        flex:2, 
        height:'50%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection:'column',
        borderRadius:'20px',
        backgroundColor:'white', 
    },
    rightSubgrid:{
        //border: '0.5px solid grey',
        flex: 5,
        display: 'flex', 
        flexDirection: 'column',
    },
    subgrid2:{
        border:'1px solid grey' ,
        margin:'0px 0px 20px 20px',
        borderRadius:'20px',
        backgroundColor:'white',
        padding:"20px 0px"
        //border: '0.5px solid grey', flex: 5, display: 'flex', flexDirection: 'column'
    },
    handover:{
        border:'1px solid grey',
        borderRadius:'20px',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        padding:'30px',
        backgroundColor:'white',
        //alignItems:'flex-end',
        margin:'0px 0px 20px 20px'
    },
    tabBar:{
        border:'1px solid grey',
        borderRadius:'20px',
        margin:'0px 0px 0px 20px',
        backgroundColor:'white',
    },
    avatar: {
        //margin:'3rem 1rem 1rem 6rem',
        height: '120px',
        width: '120px',
        borderRadius: '75px',
        display:'flex',
        flexDirection:"row",
        alignItems:"center",
        alignSelf: 'center',
        //border:'1px solid green',
        justifyContent:'center',
        backgroundColor:'green',

    },
    imageCircle:{
        alignSelf:'center',
        fontWeight:'bold',
        color:'white',
        fontSize:'50px',
        margin:0
    },
    label: {
        fontWeight: 'bold',
        fontSize: '14px'
    },
    selectLabel: {
        fontSize: '14px',
        fontWeight: 'bold'
    },
    dateMain:{
        margin:'20px',
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        marginLeft:'50px',
        marginRight:'50px',/*justifyContent: 'space-between'*/ 
    },
    datePicker:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex:2,
    },
    commentContainer: {
        display: 'flex',
        //border:'1px solid',
        flexDirection: 'column',
        margin: '20px 50px 0px 50px'
    }
}

export default SingleLead;
