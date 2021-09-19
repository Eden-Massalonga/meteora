import { useState } from 'react'
import { Line } from 'react-chartjs-2';

const LineChart = () => {



    // set data

    const [barData, setBarData] = useState({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: '5 days Forecast',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(255, 23, 68,0.4)',
                borderColor: 'rgba(255, 23, 68,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255, 23, 68,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255, 23, 68,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [12, 30, 21, 34, 23]
            },
        ]
    });

    // set options
    const [barOptions, setBarOptions] = useState({

        title: {
            display: true,
            text: '5 days Forecast',
            fontSize: 14
        },
        legend: {
            display: true,
            position: 'right'
        },
        maintainAspectRatio: false,
    }
    );
    return (
        <div>
            <Line
                data={barData}
                options={barOptions} />
        </div>
    )
}

export default LineChart
