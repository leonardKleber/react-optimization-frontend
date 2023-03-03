import React from 'react';
import Chart from "react-apexcharts";

function SingleLiveChart({render, data}) {
  if(render === true) {
    return (
      <Chart
        options={data.options}
        series={data.series}
        type="line"
        height={350}
      />
    )
  } else {
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }
}

export default SingleLiveChart;