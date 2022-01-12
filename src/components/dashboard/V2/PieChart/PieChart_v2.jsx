import React from 'react'
import Chart from "react-google-charts";

function PieChart_v2() {

    const options = {
        pieHole: 0.6,
        is3D: false,
        slices: [
            {
                color: "#2BB673",
            },
            {
                color: "#d91e48",
            },
            {
                color: "#007fad",
            },
            {
                color: "#e9a227",
            },
        ],
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "233238",
                fontSize: 14,
            },
        },
        chartArea: { width: "fit-content" },
    };


    return (
        <Chart
            chartType="PieChart"
            height="400px"
            data={[
                ["Age", "Weight"],
                ["New", 16.6],
                ["Hot", 16.6],
                ["Cold", 16.6],
                ["Warm", 16.6],
                ["Sale", 16.6],
                ["Frozen", 16.6],
            ]}
            options={options}
        />
    )
}

export default PieChart_v2
