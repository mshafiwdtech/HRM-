// import MainLayout from '../layouts/Main'
import MainLayout from "../layouts/V2/Main_V2";
import Container from '@material-ui/core/Container';

import { useState } from 'react';
import SettingsGrid from '../components/settings/SettingsGrid';
import SettingsTableGrid from '../components/settings/settingsTableGrid';
import { AppBar, Box, Grid, Tab, Tabs } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import SettingsTripleColumnGrid from '../components/settings/settingsTripleColumnGrid';
import ProjectGrid from '../components/settings/ProjectGrid';

const Settings = () => {
    const [value, setValue] = useState('1')
    const handleChange = (event, value) => {
        setValue(value);
    }

    //border:'1px solid green'
    return (
        <MainLayout>
            <Container style={{overflow:'hidden',display:'flex',maxWidth:"92.2vw"}} >
                <Box style={{display:'flex', maxWidth:'95%',margin:'50px',flexDirection:'column',minWidth:'90%'}}>
                <TabContext value={value}>
                        <TabList
                            onChange={handleChange}
                            variant='scrollable'
                            scrollButtons='auto' >
                            <Tab label="Location" value='1' />
                            <Tab label="Next Action" value='2' />
                            <Tab label="Status" value='10' />
                            <Tab label="Demographic" value='11' />
                            <Tab label="Stages" value='12' />
                        </TabList>
                    <TabPanel value='1'> <SettingsGrid title="Location" data="locationData" title1='locations' /></TabPanel>
                    <TabPanel value='2'> <SettingsGrid title="Next Action" data="actionData" title1='nextaction' /></TabPanel>
                    <TabPanel value='10'> <SettingsTableGrid title="Status" secTitle='Stage' data="statusData" title1='status' /></TabPanel>
                    <TabPanel value='11'> <SettingsTableGrid title="Demographic" secTitle='Type' data="demographicData" title1='demographic' /></TabPanel>
                    <TabPanel value='12'> <SettingsTableGrid title="Stages" secTitle='Colour' data="colorData" title1='stage' /></TabPanel>
                </TabContext>
                </Box>
            </Container >
            {/*<Box sx={{ flexGrow: 1, width:'80%', bgcolor: 'background.paper' }}>
                <TabContext value={value}>
                    <Tabs
                        onChange={handleChange}
                        variant="scrollable"
                        //scrollButtons
                        //aria-label="visible arrows tabs example"
                    >
                        <Tab label="Item One"  value='100'/>
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                        <Tab label="Item Four" />
                        <Tab label="Item Five" />
                        <Tab label="Item Six" />
                        <Tab label="Item Seven" />
                    </Tabs>
                    <TabPanel value='100'> <SettingsGrid title="Location" data="locationData" title1='locations' /></TabPanel>
            </TabContext>
    </Box>*/}
        </MainLayout>


    )
}

const styles = {
    container: {
        //border: '1px solid',
        //display: "flex",
        margin: '10px',
        backgroundColor: 'white',

    },
    secondaryContainer: {
        justifyContent: 'space-around'
    }
}


export default Settings

/*<MainLayout>
            <Container disableGutters={true}>
                <TabContext value={value}>
                    <AppBar position='static' color="primary" >
                        <TabList
                            onChange={handleChange}
                            variant='scrollable'
                            scrollButtons='auto'>
                            <Tab label="Location" value='1' />
                            <Tab label="Next Action" value='2' />
                            <Tab label="Channel" value='3' />
                            <Tab label="Medium" value='4' />
                            <Tab label="Source" value='5' />
                            <Tab label="Sub Source" value='6' />
                            <Tab label="Campaign Name" value='7' />
                            <Tab label="Campaign Term" value='8' />
                            <Tab label="Campaign Content" value='8' />
                            <Tab label="Status" value='10' />
                            <Tab label="Demographic" value='11' />
                            <Tab label="Stages" value='12' />
                            <Tab label="Project Type" value='13' />
                            <Tab label="Project Status" value='14' />
                            <Tab label="Project" value='15' />
                        </TabList>
                   </AppBar>
                    <TabPanel value='1'> <SettingsGrid title="Location" data="locationData" title1='locations' /></TabPanel>
                    <TabPanel value='2'> <SettingsGrid title="Next Action" data="actionData" title1='nextaction' /></TabPanel>
                    <TabPanel value='3'> <SettingsGrid title="Channel" data="channelData" title1='channel' /></TabPanel>
                    <TabPanel value='4'> <SettingsTableGrid title="Medium" secTitle='Channel' data="mediumData" title1='medium' /></TabPanel>
                    <TabPanel value='5'> <SettingsTableGrid title="Source" secTitle='Medium' data="sourceData" title1='source' /></TabPanel>
                    <TabPanel value='6'> <SettingsTripleColumnGrid title="Sub Source" secTitle='Source' terTitle='Text Label' data="subSourceData" title1='subsource' /></TabPanel>
                    <TabPanel value='7'> <SettingsTripleColumnGrid title="Campaign" secTitle='Source' terTitle='Sub Source' data="campaignData" title1='campaign' /></TabPanel>
                    <TabPanel value='10'> <SettingsTableGrid title="Status" secTitle='Stage' data="statusData" title1='status' /></TabPanel>
                    <TabPanel value='11'> <SettingsTableGrid title="Demographic" secTitle='Type' data="demographicData" title1='demographic' /></TabPanel>
                    <TabPanel value='12'> <SettingsTableGrid title="Stages" secTitle='Colour' data="colorData" title1='stage' /></TabPanel>
                    <TabPanel value='15'> <ProjectGrid  /></TabPanel>
                </TabContext>
            </Container>*/