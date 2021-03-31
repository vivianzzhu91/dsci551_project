import moment from 'moment';
import api from './init';

export default function sentimentOverTime() {
  return api('/sentiment_over_time').then((resp) => {
    const result = {
      labels: [],
      datasets: [
        {
          label: 'Positive',
          data: [],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          yAxisID: 'y-axis-1',
        },
        {
          label: 'Negative',
          data: [],
          fill: false,
          backgroundColor: 'rgb(54,162,235)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
          label: 'Neutral',
          data: [],
          fill: false,
          backgroundColor: '#e29578',
          borderColor: '#d4a373',
        },
      ],
    };
    Object.keys(resp).forEach((key) => {
      const date = moment.unix(key).format('MM/DD');
      result.labels.push(date);
      if ('positive' in resp[key]) {
        result.datasets[0].data.push(resp[key].positive);
      } else {
        result.datasets[0].data.push(0);
      }

      if ('negative' in resp[key]) {
        result.datasets[1].data.push(resp[key].negative);
      } else {
        result.datasets[1].data.push(0);
      }

      if ('neutral' in resp[key]) {
        result.datasets[2].data.push(resp[key].neutral);
      } else {
        result.datasets[2].data.push(0);
      }
    });
    return result;
  });
}
