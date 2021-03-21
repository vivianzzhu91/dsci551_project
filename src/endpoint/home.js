import moment from 'moment';
import api from './init';

export default function sentimentOverTime() {
  const data = {
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

  api('/sentiment_over_time').then((resp) => {
    Object.keys(resp).forEach((key) => {
      const date = moment.unix(key).format('MM/DD');
      data.labels.push(date);
      if ('positive' in resp[key]) {
        data.datasets[0].data.push(resp[key].positive);
      } else {
        data.datasets[0].data.push(0);
      }

      if ('negative' in resp[key]) {
        data.datasets[1].data.push(resp[key].negative);
      } else {
        data.datasets[1].data.push(0);
      }

      if ('neutral' in resp[key]) {
        data.datasets[2].data.push(resp[key].neutral);
      } else {
        data.datasets[2].data.push(0);
      }
    });
  });

  return data;
}
