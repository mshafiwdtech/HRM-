import React from "react";

import Chart from "react-google-charts";
export default function PieChart() {
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
    chartArea: { width: "100%", height: "80%" },
  };

  return (
    <div>
      <div className="leadDetailContainer">
        <div className="Container">
          <div className="leadheadingBorder">
            <text className="leadHeading">LEAD STAGES</text>
          </div>
          <div className="leadsBottomBorder">
            <div style={{ display: "flex" }}>
              <div style={{ padding: 10 }}>
                <text>Year</text>
              </div>
              <div style={{ padding: 10 }}>
                <text>Month</text>
              </div>
              <div style={{ padding: 10 }}>
                <text>Week</text>
              </div>
              <div style={{ padding: 10 }}>
                <text>Yesterday</text>
              </div>
              <div style={{ padding: 10 }}>
                <text>Today</text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={[
          ["Age", "Weight"],
          ["a", 12],
          ["b", 5.5],
        ]}
        options={options}
      />
    </div>
  );
}
