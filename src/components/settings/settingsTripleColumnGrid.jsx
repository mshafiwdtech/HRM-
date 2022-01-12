import MainLayout from '../../layouts/Main'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Autocomplete, {createFilterOptions,} from "@material-ui/lab/Autocomplete";

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { useEffect, useState } from 'react';
import { CircularProgress, Dialog, DialogContent, IconButton } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import CloseIcon from '@material-ui/icons/Close';

import { useSelector, useDispatch } from 'react-redux';
import { SketchPicker } from 'react-color';
import { addSettingsSecond, addSettingsSecondApi, deleteSetting, deleteSettingsApi, editSettingsSecond, editSettingsSecondApi, loadSettingsApi } from '../../store/actions/Settings';
import id from 'date-fns/esm/locale/id/index.js';
import { Box } from '@mui/system';


const SettingsTripleColumnGrid = ({ title,secTitle, terTitle, data, title1 }) => {

    const locData =  useSelector((state) => state.setting[data])
    const addFlag1 = useSelector((state)=>state.setting['addFlag']);
    const editFlag1 = useSelector((state)=>state.setting['editFlag']);
    const deleteFlag1 = useSelector((state)=>state.setting['deleteFlag']);

    const [textData, setTextData] = useState('')
    const [textDataSec,setTextDataSec] = useState('')
    
    const [picker,setPicker] = useState('')
    const [pickerSec,setPickerSec] = useState('')

    const [editFlag,setEditFlag] = useState(0)
    const [editId,setEditId] = useState();
    const [typeFlag,setTypeFlag] =useState( secTitle===undefined ? 0 : 1);

    const [empty,setEmpty] = useState(0);
    const [color,setColor] = useState('')

    const [deleteFlag,setDeleteFlag] = useState(false)
    const [deleteId,setDeleteId] = useState('')
    const [repeatFlag,setRepeatFlag] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        switch (title){
            case 'Sub Source':
                dispatch(loadSettingsApi('sourceData','source'))
                break
            case 'Campaign':
                dispatch(loadSettingsApi('sourceData','source'))
                dispatch(loadSettingsApi('subSourceData','subsource'))
                break
            default :
                break
        }
        dispatch(loadSettingsApi(data,title1))
    },[])

    const secondaryColumn = useSelector((state)=>state.setting['sourceData'])
    const terColumn = useSelector((state)=>state.setting['subSourceData'])
    
    let pickerListSource = secondaryColumn
    let pickerListSubSource = terColumn

    const handleInputSubmit = (text1) => {
        console.log(textData,picker,data,title,title1,textDataSec,'||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
        if ( picker !== '' && picker !== null && textData!=='' && textDataSec !== ''){
            if (locData.find(item=>item.name.toUpperCase()===textData.toUpperCase())===undefined){
                dispatch(addSettingsSecondApi(textData,picker,data,title,title1,textDataSec))
                setEmpty(0)
                setTextData('');setPicker('');setTextDataSec('');setRepeatFlag(false)
            }
            else{
                setRepeatFlag(true)
            }
        }
        else {
            setEmpty(1)
        }
    }

    const handle_edit = (id) => {
        dispatch(editSettingsSecondApi(id,textData,picker,data,title,title1,textDataSec))
        setTextData('');setPicker('');setTextDataSec('')
    }

    const handle_delete = () => {
        dispatch(deleteSettingsApi(deleteId,data,title1))
        setDeleteFlag(false)
   }

    const handleDeleteSubmitModalNo = () => {
        setDeleteFlag(false)
    }

    const handleDeleteSubmitModalYes = (id) => {
        setDeleteId(id)
        setDeleteFlag(true)
    }
    return (
        <Grid
            style={styles.mainGrid}
            spacing={0}
        >
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
                <Grid container style={{ borderBottom: '1px solid #f4f4f7', flexDirection:'row',width:'80%',display:'flex' }}>
                    <Grid item style={{width:'35%',flex:'1'}}>
                        <h3 style={{ marginLeft: '10px' }}>{title}</h3>
                    </Grid>

                    <Grid item style={{width:'30%',flex:'1'}}>
                        <h3 style={{ marginLeft: '10px' }}>{secTitle}</h3>
                    </Grid>

                    <Grid item style={{width:'30%',flex:'1'}}>
                        <h3 style={{ marginLeft: '10px' }}>{terTitle}</h3>
                    </Grid>

                </Grid>
                <Grid item>
                    {locData !== undefined && locData.length > 0 && addFlag1===0 ? locData.map((item, index) =>
                    (
                        <List key={`${item}${index}`} style={styles.listItem}>
                           <Grid container style={{flexDirection:'row',width:'80%',display:'flex'}}>
                                <Grid item style={{width:'35%',flex:'1'}}>
                                    <ListItemText style={{ margin: '0px 10px 0px 10px', wordWrap:'break-word' }} primary={item.name}  />
                                </Grid>

                                <Grid style={{width:'30%',flex:'1'}}>
                                    <ListItemText style={{ marginLeft: '10px', wordWrap:'break-word' }} 
                                    primary={item.sourceId && item.sourceId!==null ? item.sourceId.name : ''}  
                                    />
                                </Grid>

                                <Grid style={{width:'30%',flex:'1'}}>
                                    <ListItemText 
                                    style={{ marginLeft: '10px', justifyContents: 'flex-end',wordWrap:'break-word' }} 
                                    primary={ title==='Sub Source' ? item.labelText : (item.subSourceId && item.subSourceId!==null) ? item.subSourceId.name : '' }
                                    />
                                </Grid>
                            </Grid>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                            
                            
                            <ListItemSecondaryAction>
                                <Grid container>
                                    <Grid item >
                                        {editFlag === 1 && item._id===editId ?
                                            <IconButton onClick={()=>{
                                                //handle_edit(item._id)
                                                setEditFlag(0)
                                                setTextData('')
                                                setTextDataSec('')
                                                setPicker('')
                                            }}>
                                                <CloseIcon style={{ color:'crimson'}}/>
                                            </IconButton> :
                                            <IconButton onClick={()=>{
                                                console.log(item,'())()()()()()()()()()')
                                                setEditId(item._id)
                                                setEditFlag(1)
                                                setTextData(item.name)
                                                setTextDataSec(title==='Sub Source'? item.labelText : (item.subSourceId && item.subSourceId!==null) ? item.subSourceId._id : '')
                                                setPicker(item.sourceId && item.sourceId!==null ? item.sourceId._id : '')
                                            }}>
                                                <EditIcon style={{color:'green'}} />
                                            </IconButton> }
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => { handleDeleteSubmitModalYes(item._id) }}>
                                            <DeleteIcon size='small' style={{ color:'orange'}}/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            
                            </ListItemSecondaryAction>
                        </List>
                    )
                    ):
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <CircularProgress/> 
                    </div>}
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} style={styles.subGrid2}>
                <div style={{ marginLeft: '10px' }}>
                    <div>
                        <h3>Add {title}</h3>
                    </div>
                    <div style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                        <TextField style={{ backgroundColor: 'white',width:'80%' }} 
                            variant='outlined' 
                            size='small' 
                            value={textData} 
                            onChange={(e) => setTextData(e.target.value)}
                        />
                  </div>
                    <Grid>
                        <h3>{secTitle}</h3>
                    </Grid>

                    <Grid>
                        <FormControl style={{width:'80%'}}>
                            {/*<InputLabel>Choose {secTitle}</InputLabel>*/}
                            <Select
                            native
                            style={{backgroundColor:'white'}}
                            variant='outlined'
                            value={picker}
                            onChange={(e)=>setPicker(e.target.value)}
                            >
                            <option aria-label="None" value=''>Choose {secTitle}</option>
                            {pickerListSource.map((item,index)=>{
                                return (<option value={item._id}>{item.name}</option>)
                            })
                            }
                            </Select>
                        </FormControl>
                    </Grid> 

                  <div>
                        <h3>{terTitle}</h3>
                  </div>
                  {title ==='Sub Source' ? 
                  <div style={{ flexDirection: 'column', alignItems: 'stretch'}}>
                        <TextField style={{ backgroundColor: 'white',width:'80%' }} 
                        variant='outlined' 
                        size='small' 
                        value={textDataSec} 
                        onChange={(e) => setTextDataSec(e.target.value)}
                        />
                  </div> :
                  <Grid>
                        <FormControl style={{width:'80%'}}>
                              {/*<InputLabel>Choose {secTitle}</InputLabel>*/}
                              <Select
                              native
                              style={{backgroundColor:'white'}}
                              variant='outlined'
                              value={textDataSec}
                              onChange={(e)=>setTextDataSec(e.target.value)}
                              >
                              <option aria-label="None" value=''>Choose {terTitle}</option>
                              {pickerListSubSource.map((item,index)=>{
                                    return (<option value={item._id}>{item.name}</option>)
                              })
                              }
                              </Select>
                        </FormControl>
                  </Grid> }
                    
                  {empty === 1 ? 
                    <div>
                        <h4>Choose all fields</h4>
                    </div> :
                    null}

                    {repeatFlag===true ?
                     <div>
                        <h4>Name Already Exists</h4>
                    </div> : null }
                    <br/>
                    <div style={styles.buttonContainer}>
                        {editFlag===0?
                        <Button variant='contained' color='secondary' size='small' onClick={() =>  handleInputSubmit()}>
                            Save
                        </Button> :
                         <Button variant='contained' color='secondary' size='small' onClick={() => {
                            handle_edit(editId)
                            setEditFlag(0)
                            setTextData('')
                            setTextDataSec('')
                            setPicker('')
                         }}>
                            Update
                        </Button>} 
                    </div>
                </div>
            </Grid>
        </Grid>

    )
}
//

const styles = {
    mainGrid: {
        width:'90%',
        display: 'flex',
        overFlow:'scroll',
        flexBasis: '50%',
        margin: '30px',
        flexDirection: 'row',
        border: '1px solid grey',
    },
    subGrid1: {
        border: '0.3px solid grey',
        width:'95%',
        backgroundColor: 'white'
    },
    subGrid2: {
        border: '0.3px solid grey',
        backgroundColor: '#eef5f9',
        width:'5%',
    },
    listItem: {
        flexDirection: 'row',
    },
    buttonContainer: {
        alignItems: "center",
        marginBottom:'20px',
    }

}


export default SettingsTripleColumnGrid;

