import { Button, CircularProgress, Dialog, DialogContent, FormControl, Grid, IconButton, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react' 
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import { addSettingsProject, deleteSettingsApi, editSettingsProject, loadSettingsApi } from '../../store/actions/Settings';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { Box } from '@mui/system';


const ProjectGrid = () => {

      const [editId,setEditId] = useState();
      const addFlag1 = useSelector((state)=>state.setting['addFlag'])
      const [empty,setEmpty] = useState(1);
      const [editFlag,setEditFlag] = useState(0);

      const [location,setLocation] = useState('');
      const [projectName,setProjectName] = useState('');
      const [shortName,setShortName] = useState('')
      const [status,setStatus] = useState('')
      const [projectType,setProjectType] = useState('');
      const [units,setUnits] = useState('');
      const [stocks,setStocks] = useState('');

      const dispatch = useDispatch()
      const [unitList,setUnitList] = useState([])

      useEffect(()=>{
            dispatch(loadSettingsApi('projectData','project'))
            dispatch(loadSettingsApi('locationData','location'))
            dispatch(loadSettingsApi('projectType','projectType'))
            dispatch(loadSettingsApi('projectStatus','projectStatus'))
      },[])

      const projectData = useSelector((state)=>state.setting['projectData'])

      const locationData = useSelector((state)=>state.setting['locationData'])
      const projectTypeData = useSelector((state)=>state.setting['projectType'])
      const projectStatusData = useSelector((state)=>state.setting['projectStatus'])

      const [deleteFlag,setDeleteFlag] = useState(false)
      const [deleteId,setDeleteId] = useState('')

      const handleSubmit = () => {
            if ((location && projectName && shortName && status && projectType && units && stocks) !== ('' && null && undefined) ){
                  dispatch(addSettingsProject(projectName,shortName,location,projectType,status,units,stocks))
                  setEmpty(1)
                  setLocation(''); setProjectName(''); setShortName(''); setProjectType(''); setStatus('');
                  setUnits(''); setStocks('');
            }
            else{
                  setEmpty(0)
            }
      }

      const handleEdit = (item) => {
            console.log(item,'^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            setEditId(item._id )
            setEditFlag(1)
            setLocation((item.location && item.location!==null) ? item.location._id : '')
            setProjectName(item.name)
            setShortName(item.shortName)
            setProjectType((item.projectType && item.type!==null)?item.projectType._id:'')
            setStatus((item.projectStatus && item.status!==null)?item.projectStatus._id:'')
            setUnits(item.units)
            setStocks(item.stocks)
      }

      const handleEditSubmit = () => {
           if ((location && projectName && shortName && status && projectType && units && stocks) !== ('' || null || undefined) ){
                  dispatch(editSettingsProject(editId,projectName,shortName,location,projectType,status,units,stocks))
                  setEditFlag(0); setEmpty(1)
                  setLocation(''); setProjectName(''); setShortName(''); setProjectType(''); setStatus('');
                  setUnits(''); setStocks('');
            }
            else{
                  setEditFlag(1)
                  setEmpty(0)
            }
      }

      const handle_delete = () => {
            dispatch(deleteSettingsApi(deleteId,'projectData','project'))
            setDeleteId('')
            setDeleteFlag(false)
       }
   
      const handleDeleteSubmitModalNo = () => {
            setDeleteFlag(false)
      }

      const handleDeleteSubmitModalYes = (id) => {
            setDeleteId(id)
            setDeleteFlag(true)
      }

      
      
      /*const unitPress = () => {
            setUnitList([...unitList,{type:'',units:'',price:'',stock:''}])
      }

      const onChangeText = (index,text,type) => {
            const updatedData = unitList
            updatedData[index][type] = text
            setUnitList([...updatedData])
      }

      const deleteUnits =  (index) => {
            const updatedData = unitList
            updatedData.splice(index,1);
            setUnitList([...updatedData])*/
      return (
            <Grid style={styles.container}>

                   <Dialog open={deleteFlag}  onClose={handleDeleteSubmitModalNo}>
                        <DialogContent>
                              <Box>
                              <h3>Are you sure you want to delete ?</h3>
                              <Box style={{display:'flex',justifyContent:'space-around'}}>
                                    <Button variant='outlined' color='secondary' onClick={()=>handle_delete()}>Yes</Button>
                                    <Button variant='outlined' color='secondary' onClick={()=>setDeleteFlag(false)}>No</Button>
                              </Box>
                              </Box>
                        </DialogContent>
                  </Dialog>

                  <Grid style={styles.subGrid1}>
                  <TableContainer>
                              <Table>
                                    <TableHead>
                                          <TableRow>
                                                <TableCell style={styles.title}>Project</TableCell>
                                                <TableCell  style={styles.title}>Short Name</TableCell>
                                                <TableCell  style={styles.title}>Location</TableCell>
                                                <TableCell  style={styles.title}>Type</TableCell>
                                                <TableCell  style={styles.title}>Status</TableCell>
                                                <TableCell  style={styles.title}>Units</TableCell>
                                                <TableCell  style={styles.title}>Stock</TableCell>
                                                {/*<TableCell >Price</TableCell>*/}
                                                <TableCell ></TableCell>
                                          </TableRow>
                                    </TableHead>
                                    <TableBody>
                                          {projectData !== undefined && projectData.length > 0 && addFlag1===0  ? projectData.map((item,index) => (
                                                <TableRow key={item.id} >
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.shortName}</TableCell>
                                                <TableCell>{(item.location && item.location!==null) ?item.location.name:''}</TableCell>
                                                <TableCell>{(item.projectType && item.type!==null)?item.projectType.name:''}</TableCell>
                                                <TableCell>{(item.projectStatus && item.status!==null)?item.projectStatus.name:''}</TableCell>
                                                <TableCell>{item.units}</TableCell>
                                                <TableCell>{item.stocks}</TableCell>
                                                {/*<TableCell>{item.price}</TableCell>*/}
                                                <TableCell style={{width:'20px'}} >
                                                      <Grid style={{display:'flex'}}> 
                                                            {editFlag === 1 && item._id === editId ?
                                                            <IconButton onClick={()=>{
                                                                  setEditFlag(0); setEmpty(1)
                                                                  setLocation(''); setProjectName(''); setShortName(''); setProjectType(''); setStatus('');
                                                                  setUnits(''); setStocks('');
                                                            }}>
                                                                  <CloseIcon style={{ color:'crimson'}}/>
                                                            </IconButton> : 
                                                            <IconButton onClick={()=>handleEdit(item)} >
                                                                  <EditIcon style={{color:'green'}} />
                                                            </IconButton> }
                                                
                                                            <IconButton onClick={()=>handleDeleteSubmitModalYes(item._id)}>
                                                                  <DeleteIcon  style={{ color:'orange'}}/>
                                                            </IconButton>
                                                      </Grid>
                                                </TableCell>
                                          </TableRow>
                                          )) :
                                          <div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
                                                <CircularProgress/> 
                                          </div>
                                    }
                                    </TableBody>
                              </Table>
                        </TableContainer>
                  </Grid>

                  <Grid style={styles.subGrid2}>
                    <Grid>
                        <h3>Location</h3>
                        <FormControl style={{width:'90%'}}>
                            <Select native variant='outlined' 
                            value={location}
                            style={{backgroundColor:'white'}}
                            onChange={(e)=>setLocation(e.target.value)}
                            >
                            <option aria-label="None" value=''>Choose Location</option>
                            {locationData.map((item,index)=>{ return (<option value={item._id}>{item.name}</option>)})}
                            </Select>
                        </FormControl>
                    </Grid> 

                  <div >
                        <h3>Project Name</h3>
                        <TextField style={{ backgroundColor: 'white',width:'90%' }} variant='outlined' size='small' value={projectName}
                              onChange={(text)=>setProjectName(text.target.value)}
                        />
                    </div>

                    <div >
                        <h3>Short Name</h3>
                        <TextField style={{ backgroundColor: 'white',width:'90%' }} variant='outlined' size='small' value={shortName}
                              onChange={(text)=>setShortName(text.target.value)}
                        />
                    </div>

                    <div>
                        <h3>Project Status</h3>
                        <FormControl style={{width:'90%'}}>
                            <Select native variant='outlined' 
                            value={status}
                            style={{backgroundColor:'white'}}
                            onChange={(e)=>setStatus(e.target.value)}
                            >
                            <option aria-label="None" value=''>Choose Status</option>
                            {projectStatusData.map((item,index)=>{ return (<option value={item._id}>{item.name}</option>)})}
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <h3>Project Type</h3>
                        <FormControl style={{ width:'90%'}}>
                            <Select native variant='outlined' 
                            value={projectType}
                            style={{backgroundColor:'white'}}
                            onChange={(e)=>setProjectType(e.target.value)}
                            >
                            <option aria-label="None" value=''>Choose Type</option>
                            {projectTypeData.map((item,index)=>{ return (<option value={item._id}>{item.name}</option>)})}
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <div style={{display:"flex",justifyContent:'space-around',width:'90%'}} >
                              <div>
                                    <h3>Units</h3>
                                    <TextField value={units} style={{ margin:'3px',backgroundColor:'white'}} variant='outlined' size='small'  onChange={(t)=>setUnits(t.target.value)} />
                              </div>
                              <div>
                                    <h3>Stock</h3>
                                    <TextField value={stocks} style={{ margin:'3px',marginRight:'7px',backgroundColor:'white'}} variant='outlined' size='small'  onChange={(t)=>setStocks(t.target.value)} />
                              </div>
                        </div>
                    </div>

                    {/*unitList.map((item,index)=>{
                                    return (
                                          <div key={index} style={{backgroundColor:'white',marginRight:'10px',marginBottom:'15px'}}>
                                                <div style={{display:"flex"}} >
                                                      <TextField  label='Type' style={{ margin:'3px'}} variant='outlined' size='small'  value={item.type} onChange={(t)=>onChangeText(index,t.target.value,'type')} />
                                                      <TextField label='Units' style={{ margin:'3px'}} variant='outlined' size='small'  onChange={(t)=>onChangeText(index,t.target.value,'units')} />
                                                      <IconButton onClick={()=>deleteUnits(index)}><CloseIcon/></IconButton>
                                                </div>
                                                <div style={{display:"flex"}}>
                                                      <TextField label='Price' style={{ margin:'3px'}} variant='outlined' size='small'  onChange={(t)=>onChangeText(index,t.target.value,'price')} />
                                                      <TextField label='Stock' style={{ margin:'3px'}} variant='outlined' size='small'  onChange={(t)=>onChangeText(index,t.target.value,'stock')} />
                                                      
                                                </div>
                                          </div>
                                    )
                    })*/}

                    {empty === 0 ? 
                    <div>
                        <h4>Choose all fields</h4>
                    </div> :
                    null}
                    <br/>
                    <div style={styles.buttonContainer}>
                        {editFlag===0?
                        <Button variant='contained' color='secondary' size='small' onClick={()=>handleSubmit()}>
                            Save
                        </Button> :
                        <Button variant='contained' color='secondary' size='small' onClick={()=>handleEditSubmit()}>
                              Update
                        </Button>}
                    </div>
                  </Grid>
            </Grid>
      )
}

const styles = {
      container:{
            //border:'1px solid black',
            display:'flex',
            flexDirection:'row',
            minHeight:'10rem'
      },
      subGrid1:{
            width:'80%',
            border:'1px solid black',
            backgroundColor:'white',
            display:'flex',
            flexDirection:'row',
      },
      subGrid2:{
            width:'20%',
            border:'1px solid black',
            paddingLeft:'15px',
            display:'flex',
            paddingBottom:'15px',
            flexDirection:'column',
      },
      title:{
            fontWeight:'bold',
            fontSize:'16px',
      },
      titleGrid1:{
            flex:1,
            marginLeft:'10px'
      }
}
export default ProjectGrid;