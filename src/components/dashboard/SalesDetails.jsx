import React from "react";
import { Chart } from "react-charts";
import PieChart from "./PieChart";
export default function SalesDetails() {
  const data = React.useMemo(
    () => [
      {
        label: "Sales",
        data: [
          [0, 1],
          [1, 2],
          [2, 4],
          [3, 2],
          [4, 7],
        ],
      },
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      // { primary: true, type: "bar", position: "bottom" },
      // { type: "bar", position: "left" },
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear", stacked: true },
    ],
    []
  );

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "60%", marginRight: 20 }}>
          <div className="leadDetailContainer">
            <div className="Container">
              <div className="leadheadingBorder">
                <text className="leadHeading">SALES</text>
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
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "white",
            }}
          >
            <Chart
              data={data}
              axes={axes}
              series={{ type: "bar" }}
              primaryCursor
              secondaryCursor
              tooltip
            />
          </div>
        </div>
        <div style={{ width: "40%" }}>
          <PieChart />
        </div>
      </div>
    </div>
  );
}
