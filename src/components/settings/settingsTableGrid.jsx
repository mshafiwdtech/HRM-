import MainLayout from '../../layouts/Main'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Box, Dialog, DialogContent } from '@material-ui/core'

import Autocomplete from '@mui/material/Autocomplete';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { useEffect, useState } from 'react';
import { CircularProgress, IconButton, MenuItem } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import CloseIcon from '@material-ui/icons/Close';

import { Select as SelectAnt } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { SketchPicker } from 'react-color';
import { addSettingsSecond, addSettingsSecondApi, deleteSetting, deleteSettingsApi, editSettingsSecond, editSettingsSecondApi, loadSettingsApi } from '../../store/actions/Settings';
import id from 'date-fns/esm/locale/id/index.js';


const SettingsTableGrid = ({ title, secTitle, data, title1 }) => {

    const { Option } = SelectAnt
    const addFlag1 = useSelector((state) => state.setting['addFlag']);

    const [textData, setTextData] = useState('')
    const [picker, setPicker] = useState('')
    const [valuePicker, setValuePicker] = useState('')

    const [editFlag, setEditFlag] = useState(0)
    const [editId, setEditId] = useState();
    const [typeFlag, setTypeFlag] = useState(secTitle === undefined ? 0 : 1);

    const [empty, setEmpty] = useState(0);
    const [color, setColor] = useState('')

    const [deleteFlag,setDeleteFlag] = useState(false)
    const [deleteId,setDeleteId] = useState('')
    const [repeatFlag,setRepeatFlag] = useState(false)


    const dispatch = useDispatch()

    useEffect(() => {
        switch (title) {
            case 'Medium':
                dispatch(loadSettingsApi('channelData', 'channel'))
                break
            case 'Source':
                dispatch(loadSettingsApi('mediumData', 'medium'))
                break
            case 'Sub Source':
                dispatch(loadSettingsApi('sourceData', 'source'))
                break
            case 'Status':
                dispatch(loadSettingsApi('colorData', 'stage'))
                break
            case 'Campaign Term':
                dispatch(loadSettingsApi('campaignData', 'campaign'))
                break
            case 'Campaign Content':
                dispatch(loadSettingsApi('campTermData', 'campaignTerm'))
                //dispatch(loadSettingsApi('campaignData','campaign'))
                break
            default:
                break
        }
        dispatch(loadSettingsApi(data, title1))
    }, [])

    let secondaryData = title === 'Medium' ? 'channelData' :
        title === 'Source' ? 'mediumData' :
            title === 'Sub Source' ? 'sourceData' :
                title === 'Status' ? 'colorData' :
                    title === 'Campaign Term' ? 'campaignData' :
                        title === 'Campaign Content' ? 'campTermData' : null

    const locData = useSelector((state) => state.setting[data])
    const secondaryColumnData = useSelector((state) => state.setting[secondaryData])

    const demographicData = ['Customer Type', 'Residential Status', 'Age', 'Gender', 'Occupation', 'Industry', 'Income Range']

    const secondaryColumn = title !== 'Demographic' ? secondaryColumnData : demographicData
    let pickerList = title !== 'Demographic' ? secondaryColumnData : demographicData

    const updatedPickerList = title!=='Stages' ? pickerList.length && pickerList.map(pic => ({ label: pic.name, id: pic._id })) : null
    //console.log({ pickerList })

    const handleInputSubmit = (text1) => {
        console.log(picker, valuePicker, title, data, '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
        if ((title === 'Stages' ? color : picker !== '') && (title === 'Stages' ? color : picker !== null) && textData !== '') {
            if (locData.find(item=>item.name.toUpperCase()===textData.toUpperCase())===undefined){
                console.log('true')
                dispatch(addSettingsSecondApi(textData, title === 'Stages' ? color : picker, data, title, title1))
                setEmpty(0)
                setTextData('')
                setPicker('')
                setValuePicker('')
                setRepeatFlag(false)
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
        dispatch(editSettingsSecondApi(id, textData, title === 'Stages' ? color : picker, data, title, title1))
        setTextData(null)
    }

    const handle_delete = () => {
        dispatch(deleteSettingsApi(deleteId, data, title1))
        setDeleteFlag(false)
    }

    const secAttribute = (item, state = '0') => {
        let attrVariable = (title === 'Demographic' ? item.type :
            title === 'Medium' ? (item.channelId && item.channelId.name !== null) ? (state === '0' ? item.channelId.name : item.channelId._id) : '' :
                title === 'Source' ? (item.mediumId && item.mediumId.name !== null) ? (state === '0' ? item.mediumId.name : item.mediumId._id) : '' :
                    title === 'Sub Source' ? (item.sourceId && item.sourceId.name !== null) ? (state === '0' ? item.sourceId.name : item.sourceId._id) : '' :
                        title === 'Campaign' ? (item.sourceId && item.sourceId.name !== null) ? (state === '0' ? item.sourceId.name : item.sourceId._id) : '' :
                            title === 'Status' ? (item.stageId && item.stageId.name !== null) ? (state === '0' ? item.stageId.name : item.stageId._id) : '' :
                                title === 'Campaign Term' ? (item.campaignId && item.campaignId.name !== null) ? (state === '0' ? item.campaignId.name : item.campaignId._id) : '' :
                                    title === 'Campaign Content' ? (item.campaignId && item.campaignId.name !== null) ? (state === '0' ? item.campaignId.name : item.campaignId._id) : '' : null)
        return attrVariable
    }

    const handleDeleteSubmitModalNo = () => {
        setDeleteFlag(false)
    }

    const handleDeleteSubmitModalYes = (id) => {
        setDeleteId(id)
        setDeleteFlag(true)
    }



    

    return (
        <Grid style={styles.mainGrid}
        //container
        //spacing={0}
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
                <Grid container style={{ borderBottom: '1px solid #f4f4f7', flexDirection: 'row' }}>
                    <Grid item style={{ width: '30%' }}>
                        <h3 style={{ marginLeft: '10px' }}>{title}</h3>
                    </Grid>

                    <Grid item style={{ width: '30%' }}>
                        <h3 style={{ marginLeft: '10px' }}>{secTitle}</h3>
                    </Grid>

                </Grid>
                <Grid item>
                    {locData !== undefined && locData.length > 0 && addFlag1 === 0 ? locData.map((item, index) =>
                    (
                        <List key={`${item}${index}`} style={styles.listItem}>
                            <Grid container style={{ flexDirection: 'row', width: '65%' }}>
                                <Grid item style={{ width: '45%' }}>
                                    <ListItemText style={{ marginLeft: '10px', justifyContents: 'flex-end', wordWrap: 'break-word' }} primary={item.name} />
                                </Grid>
                                <Grid style={{ width: '45%' }}>
                                    {title !== 'Stages' ?
                                        <ListItemText style={{ marginLeft: '10px', justifyContents: 'flex-end', wordWrap: 'break-word' }}
                                            primary={secAttribute(item)}
                                        /> :
                                        <Grid>
                                            <ListItemText style={{ marginLeft: '10px', justifyContents: 'flex-end' }} primary={item.color} />
                                            <div style={{ maxHeight: '100px', maxWidth: '100px', borderRadius: '50px', backgroundColor: item.color }}><br /></div>
                                        </Grid>
                                    }
                                </Grid>

                            </Grid>


                            <ListItemSecondaryAction>
                                <Grid container>
                                    <Grid item >
                                        {editFlag === 1 && item._id === editId ?
                                            <IconButton onClick={() => {
                                                //handle_edit(item._id)
                                                setEditFlag(0)
                                                setTextData('')
                                                setPicker('')
                                                setColor('')
                                                setValuePicker('')
                                            }}>
                                                <CloseIcon style={{ color:'crimson'}}/>
                                            </IconButton> :
                                            <IconButton onClick={() => {
                                                setEditId(item._id)
                                                setEditFlag(1)
                                                setTextData(item.name)
                                                setPicker(secAttribute(item, '1'))
                                                setColor(title==='Stages' ? item.color : '')
                                                setValuePicker(secAttribute(item))
                                                console.log(secAttribute(item, '1'), secAttribute(item),setColor(item.color))
                                            }}>
                                                <EditIcon style={{color:'green'}} />
                                            </IconButton>}
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
                    ) :
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress />
                        </div>}
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} style={styles.subGrid2}>
                <div style={{ marginLeft: '10px' }}>
                    <div>
                        <h3>Add {title}</h3>
                    </div>
                    <div style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                        <TextField style={{ backgroundColor: 'white', width: '80%' }}
                            variant='outlined'
                            size='small'
                            value={textData}
                            onChange={(e) => setTextData(e.target.value)}
                        />
                    </div>
                    <Grid>
                        <h3>{secTitle}</h3>
                    </Grid>
                    {title !== 'Stages' ?
                        <Grid>
                            {title === 'Campaign Term' || title === 'Campaign Content' ?
                                <Box>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        value={valuePicker}
                                        options={updatedPickerList}
                                        sx={{ width: '80%',backgroundColor:'white' }}
                                        onChange={(e,value)=>{
                                            console.log(e,value)
                                            setPicker(value!==( null && undefined) ? value.id : '')
                                            setValuePicker(value!==(null && undefined) ? value.label : '' )
                                        }}
                                        renderInput={(params) => <TextField variant='outlined' /*value={valuePicker}*/ {...params} label="Choose Text" />}
                                    />
                                    {/*<SelectAnt
                            showSearch
                            style={{ width: 500 }}
                            placeholder="Search to SelectAnt"
                            optionFilterProp="child"
                            filterOption={(input, option) =>
                            option.child.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                            optionA.child.toLowerCase().localeCompare(optionB.child.toLowerCase())
                            }
                        >
                            {
                                pickerList.map((item,index)=>{
                                    return(
                                        <Option value={item._id}>{item.name}</Option>
                                    )
                                })
                            }
                        </SelectAnt>*/}
                                </Box> :
                                <FormControl style={{ width: '80%' }}>
                                    <Select
                                        native
                                        variant='outlined'
                                        style={{ backgroundColor: 'white' }}
                                        value={picker}
                                        onChange={(e) => setPicker(e.target.value)}
                                    >
                                        <option aria-label="None" value=''>Choose {secTitle}</option>
                                        {pickerList.map((item, index) => {
                                            return (<option value={title !== 'Demographic' ? item._id : item}>{title !== 'Demographic' ? item.name : item}</option>)
                                        })
                                        }
                                    </Select>
                                </FormControl>
                            }

                        </Grid> :
                        <Grid>
                            <SketchPicker
                                color={color}
                                onChangeComplete={(color) => setColor(color.hex)}
                            />
                        </Grid>}
                    {empty === 1 ?
                        <div>
                            <h4>Choose all fields</h4>
                        </div> :
                        null}
                    {repeatFlag===true ?
                     <div>
                        <h4>Name Already Exists</h4>
                    </div> : null }
                    <br />
                    <div style={styles.buttonContainer}>
                        {editFlag === 0 ?
                            <Button variant='contained' color='secondary' size='small' onClick={() => handleInputSubmit()}>
                                Save
                            </Button> :
                            <Button variant='contained' color='secondary' size='small' onClick={() => {
                                handle_edit(editId)
                                setEditFlag(0)
                                setTextData('')
                                setPicker('')
                                setValuePicker('')
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
        border: '1px solid grey',
        //backgroundColor:'pink',
        width: '90%',
        //elevation:'below',
        display: 'flex',
        boxShadow: '5px',
        //maxHeight: '300px',
        overFlow: 'scroll',
        flexBasis: '50%',
        margin: '30px',
        flexDirection: 'row',

    },
    subGrid1: {
        border: '0.3px solid grey',
        width: '95%',
        backgroundColor: 'white'
    },
    subGrid2: {
        border: '0.3px solid grey',
        width: '5%',
        backgroundColor: '#eef5f9',
    },
    listItem: {
        flexDirection: 'row',
    },
    buttonContainer: {
        //border:'1px solid blue',
        alignItems: "center",
        marginBottom: '20px',
    }

}


export default SettingsTableGrid;

