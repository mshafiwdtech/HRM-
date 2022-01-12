import { Box } from '@material-ui/core'
import React from 'react'
import Tab3Drop from './Tab3Drop'

const Tab3 = () => {
    const customerTypeData = [
        '3rd Person',
        'End User',
        'Investor'
    ]

    const residentialStatusData = [
        'Native',
        'Nri'
    ]

    const ageData = [
        '18-24',
        '25-30',
    ]

    const genderData = [
        'Male',
        'Female',
    ]

    const occupationData = [
        'Architect',
        'Engineer'
    ]

    const industryData = [
        'Finance',
        'Health Care',
    ]

    const incomeRangeData = [
        '1000-2000',
        '3000-4000'
    ]

    return (
        <Box>
            <Tab3Drop title='Customer Type' data={customerTypeData} stateName='customerType' />
            <Tab3Drop title='Residential Status' data={residentialStatusData} stateName='residentialStatus' />
            <Tab3Drop title='Age' data={ageData} stateName='age' />
            <Tab3Drop title='Gender' data={genderData} stateName='gender' />
            <Tab3Drop title='Occupation' data={occupationData} stateName='occupation' />
            <Tab3Drop title='Industry' data={industryData} stateName='industry' />
            <Tab3Drop title='Income Range' data={incomeRangeData} stateName='incomeRange' />
        </Box>
    )
}

export default Tab3;
