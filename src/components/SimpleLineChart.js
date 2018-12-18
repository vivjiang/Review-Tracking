import React from 'react';
import axios from 'axios';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';


class ReviewChart extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.displayData = this.displayData.bind(this);
  }

  componentDidMount() {
    console.log('Review chart in component did mount');
    this.displayData();
  }

  async displayData() {
    console.log('in create data');
    await axios.get('http://localhost:9090/reviews/graph/cumulative/all')
      .then((res) => {
        console.log(res);
        console.log('chart data fetched', res.data);
        // const dates = Object.keys(res.data);
        // dates.sort((a, b) => {
        //   return new Date(a) - new Date(b);
        // });
        //
        // const graphData = [];
        // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // for (let i = 0; i < dates.length; i += 1) {
        //   console.log(dates[i]);
        //   if (new Date(dates[i]).getFullYear() >= 2016) {
        //     const monthYear = `${(months[new Date(dates[i]).getMonth()])}, ${(new Date(dates[i]).getFullYear())}`;
        //     const cumulativeNegativePercent = Number((res.data[dates[i]].CumulativePercentNeg * 100).toFixed(1)); //  `${Number((res.data[dates[i]].CumulativePercentNeg * 100).toFixed(1))}%`;
        //     const cumulativePositivePercent = `${Number((res.data[dates[i]].CumulativePercentPos * 100).toFixed(1))}%`;
        //     graphData.push(this.createData(monthYear, cumulativeNegativePercent, cumulativePositivePercent));
        //   }
        // }
        const graphData = [];
        const periods = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12', 'P13'];
        const years = [2017, 2018];
        for (let i = 0; i < years.length; i += 1) {
          for (let j = 0; j < periods.length; j += 1) {
            const periodYear = `${periods[j]} ${years[i]}`;
            const cumulativeNegativePercent = Number((res.data[periodYear].CumulativePercentNeg * 100).toFixed(1)); //  `${Number((res.data[dates[i]].CumulativePercentNeg * 100).toFixed(1))}%`;
            const cumulativePositivePercent = Number((res.data[periodYear].CumulativePercentPos * 100).toFixed(1));
            graphData.push(this.createData(periodYear, cumulativeNegativePercent, cumulativePositivePercent));
          }
        }
        this.setState({ data: graphData });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createData(periodYear, cumulativeNegativePercent, cumulativePositivePercent) {
    return {
      date: periodYear,
      'Negative Reviews as Percentage of Total (Cumulative)': cumulativeNegativePercent,
      'Positive Reviews as Percentage of Total (Cumulative)': cumulativePositivePercent,
    };
  }

  render() {
    const { data } = this.state;
    return (
    // 99% per https://github.com/recharts/recharts/issues/172
      <ResponsiveContainer width="50%" height={550}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Negative Reviews as Percentage of Total (Cumulative)" stroke="red" width="10" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default ReviewChart;
