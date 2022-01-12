import MainLayout from '../../layouts/Main'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Autocomplete, { createFilterOptions, } from "@material-ui/lab/Autocomplete";
import { addSettings, addSettingsApi, deleteSetting, deleteSettingsApi, editSettings, editSettingsApi, loadSettingsApi } from '../../store/actions/Settings'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton,Dialog, DialogContent } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import CloseIcon from '@material-ui/icons/Close';

import { useSelector, useDispatch } from 'react-redux';
import { set } from 'date-fns/esm';


const SettingsGrid = ({ title, secTitle, data, title1 }) => {

    const locData =  useSelector((state) => state.setting[data])
    const addFlag1 = useSelector((state)=>state.setting['addFlag']);
    const [empty,setEmpty] = useState(0)
    const [textData, setTextData] = useState(null)
    const [editFlag, setEditFlag] = useState(0)
    const [editId, setEditId] = useState();
    const [typeFlag, setTypeFlag] = useState(secTitle === undefined ? 0 : 1);
    const [picker, setPicker] = useState('')
    
    const [deleteFlag,setDeleteFlag] = useState(false)
    const [deleteId,setDeleteId] = useState('')
    const [repeatFlag,setRepeatFlag] = useState(false)

    const dispatch = useDispatch()

    const stage = ['New', 'Cold', 'Warm', 'Hot']

    let pickerList = []

    if (title === 'Status') {
        pickerList = stage
    }

    useEffect(()=>{
        dispatch(loadSettingsApi(data,title1))
    },[])
    
    const handleInputSubmit = () => {
        if(textData!==null && textData!=='' ){
            if(locData.find(item=>item.name.toUpperCase()===textData.toUpperCase())===undefined){
                console.log('textData NOt empty 444444444444444444444444')
                dispatch(addSettingsApi(textData, data,title1))
                setTextData('')
                setEmpty(0)
                setRepeatFlag(false)
            }
            else{
                setRepeatFlag(true)
            }
        }
        else{
            setEmpty(1)
        }
    }


    const handle_edit = (id) => {
        dispatch(editSettingsApi(textData,id,data,title1))
        setTextData('')
        setEditFlag(0)
    }

    const handle_delete = () => {
         dispatch(deleteSettingsApi(deleteId,data,title1))
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

    return (
        <Grid
            style={styles.mainGrid}
            container
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

            <Grid item xs={12} sm={6} style={styles.subGrid1}>
                <Grid item style={{ borderBottom: '1px solid #f4f4f7' }}>
                    <h3 style={{ marginLeft: '10px' }}>{title}</h3>
                </Grid>
                <Grid item>
                    {locData !== undefined && locData.length > 0 && addFlag1===0 ? locData.map((item, index) =>
                    (
                        <List key={`${item}${index}`} style={styles.listItem}>
                            <ListItemText style={{ marginLeft: '5px',  maxWidth: '70%',wordWrap:'break-word' }} primary={item.name} />
                            {/*typeFlag === 1 ? <ListItemText style={{ marginLeft: '5px',  maxWidth: '100px' }} primary={item.text1} /> : null*/ }

                            <ListItemSecondaryAction>
                                {editFlag === 1 && item._id === editId ?
                                    <IconButton onClick={() => {
                                        setEditFlag(0)
                                        setTextData('')
                                    }}>
                                        <CloseIcon style={{ color:'crimson'}}/>
                                    </IconButton> :
                                    <IconButton onClick={() => {
                                        setEditId(item._id)
                                        setEditFlag(1)
                                        setTextData(item.name)
                                    }}>
                                        <EditIcon style={{color:'green'}} />
                                    </IconButton>}
                                <IconButton onClick={() => { handleDeleteSubmitModalYes(item._id) }}>
                                    <DeleteIcon size='small' style={{ color:'orange'}} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </List>
                    )
                    ):
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <CircularProgress/> 
                    </div> }

                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} style={styles.subGrid2}>
                <div style={{ marginLeft: '10px' }}>
                    <div>
                        <h3>Add {title}</h3>
                    </div>
                    <div style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                        <TextField style={{ backgroundColor: 'white' }} variant='outlined'  size='small' value={textData} onChange={(e) => setTextData(e.target.value)} />
                    </div>
                    {typeFlag === 1 ?
                        <Grid>
                            <h3>{secTitle}</h3>
                        </Grid> :
                        null}
                    {typeFlag === 1 ?
                        <Grid>
                            <FormControl style={{ width: '14rem' }}>
                                {/*<InputLabel>Choose {secTitle}</InputLabel>*/}
                                <Select
                                    native
                                    variant='outlined'
                                    value={picker}
                                    onChange={(e) => setPicker(e.target.value)}
                                >
                                    <option aria-label="None">Choose {secTitle}</option>
                                    {pickerList.map((item, index) => {
                                        return (
                                            <div>
                                                <option value={item}>{item}</option>
                                            </div>
                                        )
                                    })
                                    }
                                </Select>
                            </FormControl>
                        </Grid> :
                        null}
                   
                    {empty===1 ?
                     <div>
                        <h4>Choose all fields</h4>
                    </div> : null }

                    {repeatFlag===true ?
                     <div>
                        <h4>Name Already Exists</h4>
                    </div> : null }

                    <div style={styles.buttonContainer}>
                        {editFlag===0 ?
                        <Button variant='contained' color='secondary' size='small' onClick={() => handleInputSubmit()}>
                            Save
                        </Button> :
                        <Button variant='contained' color='secondary' size='small' onClick={() => {
                            handle_edit(editId)
                            
                        }}>
                            Update
                        </Button>}
                    </div>
                </div>
            </Grid>
        </Grid>

    )
}
//handleInputSubmit()

const styles = {
    mainGrid: {
        //border: '1px solid grey',
        //backgroundColor:'pink',
        //width:'300px',
        //elevation:'below',
        display: 'flex',
        boxShadow: '5px',
        //maxHeight: '300px',
        overFlow: 'scroll',
        flexBasis: '50%',
        margin: '30px',
        width:'60%',
        //justifyContent:'center',
        flexDirection: 'row',

    },
    subGrid1: {
        border: '0.3px solid grey',
        //elevation:'below',
        boxShadow: '5px',
        //marginLeft:'100px',
        backgroundColor: 'white'
    },
    subGrid2: {
        border: '0.3px solid grey',
        //marginLeft:'10px',
        backgroundColor: '#eef5f9',
        //elevation: 'below',
    },
    listItem: {
        flexDirection: 'row',
    },
    buttonContainer: {
        //border:'1px solid blue',
        //alignItems: "center",
        marginBottom:'10px',
        marginTop:'20px'

    }

}


export default SettingsGrid;

