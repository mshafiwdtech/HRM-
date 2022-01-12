import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import React, { useState } from 'react' 
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

const TabBar = ({id}) => {
    const [value,setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
            <Box style={styles.container}>        
                <TabContext value={value}>
                    <AppBar position="static">
                    <TabList onChange={handleChange} centered>
                        <Tab label="Activity" value="1" />
                        <Tab label="Sources" value="2" />
                        {/*<Tab label="Demographics" value="3" />*/}
                    </TabList>
                    </AppBar>
                    {<TabPanel value="1"><Tab1 /></TabPanel>}
                    <TabPanel value="2"><Tab2/></TabPanel>
                    {/*<TabPanel value="3"><Tab3/></TabPanel>*/}
                </TabContext>
            </Box>
    )
}

const styles = {
    container:{
        margin:'20px',
    }
}

export default TabBar;