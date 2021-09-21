import { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { ForecastContext } from '../../context/ForecastContext';
import moment from 'moment';
import styled from 'styled-components';

const ChartContainer = styled.div`
    width: 90%;
`

const LineChart = () => {
    const { forecast, loading } = useContext(ForecastContext)
    const days: string[] = [];
    const maxTemps: number[] = [];
    const minTemps: number[] = [];

    useEffect(() => {
        forecast.map((dailyForecast, index) => {
            days[index] = moment.unix(dailyForecast.dt).format('ddd - DD/MM/YY')
            maxTemps[index] = Math.round(dailyForecast.temp.max)
            minTemps[index] = dailyForecast.temp.min
        })

        setBarData({
            labels: days,
            datasets: [
                {
                    label: '5 days Forecast Max',
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
                    data: maxTemps
                },

                {
                    label: '5 days Forecast Min',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(255, 196, 0,0.4)',
                    borderColor: 'rgba(255, 196, 0,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(255, 196, 0,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(255, 196, 0,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: minTemps
                }
            ]
        })

        setBarOptions(
            {

                title: {
                    display: true,
                    text: 'OOO',
                    fontSize: 14
                },
                legend: {
                    display: true,
                    position: 'right'
                },
                maintainAspectRatio: false,
            }
        )
    }, [forecast])

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
                data: maxTemps
            },

            {
                label: 'Near misses',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(255, 196, 0,0.4)',
                borderColor: 'rgba(255, 196, 0,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255, 196, 0,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(255, 196, 0,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: minTemps
            }
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

    if (loading)
        return <></>
    else
        return (
            <ChartContainer>
                <Line
                    data={barData}
                    options={barOptions} />
            </ChartContainer>
        )
}

export default LineChart
