import { Box, Button } from '@material-ui/core';
import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Tab2 = () => {
  const userData = useSelector((state)=>state.leadSingle['leadData'])
  
  //const mainUser = JSON.parse(localStorage.getItem('epitomeUser'))
  const mainUser = {
    role:'Super Admin',
  }

  const data = [
    {
      DATE: '24-08-2021',
      CHANNEL: 'Paid social',
      SOURCE: 'Facebook',
      MEDIUM: 'Feeds',
      NAME: '',
      TERM: 'Lcl-intrst-jv-onam',
      CONTENT: 'Sngl-jv-onam',
      ACTION: ''
    },
    {
      DATE: '24-08-2021',
      CHANNEL: 'Paid social',
      SOURCE: 'Facebook',
      MEDIUM: 'Feeds',
      NAME: '',
      TERM: 'Lcl-intrst-jv-onam',
      CONTENT: 'Sngl-jv-onam',
      ACTION: ''
    }
  ]

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>DATE</TableCell>
              <TableCell >CHANNEL</TableCell>
              <TableCell >MEDIUM</TableCell>
              <TableCell >SOURCE</TableCell>
              {mainUser.role === 'Admin' || mainUser.role === 'Super Admin' ? <TableCell >SUB SOURCE</TableCell> : null}
              {mainUser.role === 'Admin' || mainUser.role === 'Super Admin' ? <TableCell >CAMPAIGN NAME</TableCell> : null}
              {mainUser.role === 'Super Admin' ? <TableCell >CAMPAIGN TERM</TableCell> : null}
              {mainUser.role === 'Super Admin' ? <TableCell >CAMPAIGN CONTENT</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
                <TableCell >{moment(userData.createdAt).format('LLL')}</TableCell>
                <TableCell >{userData.channel}</TableCell>
                <TableCell >{userData.medium}</TableCell>
                <TableCell >{userData.source}</TableCell>
                {mainUser.role === 'Admin' || mainUser.role === 'Super Admin' ? <TableCell >{userData.subSource}</TableCell>  : null}
                {mainUser.role === 'Admin' || mainUser.role === 'Super Admin' ? <TableCell >{userData.campaignname}</TableCell>  : null}
                {mainUser.role === 'Super Admin' ? <TableCell >{userData.campaignterm}</TableCell> : null}
                {mainUser.role === 'Super Admin' ? <TableCell >{userData.campaigncontent}</TableCell> : null}
              </TableRow>
          </TableBody>
        </Table>
            </TableContainer>
    </Box>
  )
}


export default Tab2;