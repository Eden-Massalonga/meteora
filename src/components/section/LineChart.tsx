import { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { ForecastContext } from '../../context/ForecastContext';
import moment from 'moment';
import styled from 'styled-components';

const ChartContainer = styled.div`
    margin: 10px auto;
    padding: 15px;
    height: 200px;
    width: 90%;
    box-shadow: 2px 1px 1px 0px rgba(0,0,0,0.2);
    border: 0.2px solid rgba(0,0,0,0.2);
    border-radius: 5px 5px 5px 5px;
    background: rgba(255,255,255,0.4);
`

const LineChart = () => {
    const { forecast, loading } = useContext(ForecastContext)
    const days: string[] = [];
    const maxTemps: number[] = [];
    const minTemps: number[] = [];

    forecast.forEach((dailyForecast, index) => {
        days[index] = moment.unix(dailyForecast.dt).format('ddd - DD/MM/YY')
        maxTemps[index] = Math.round(dailyForecast.temp.max)
        minTemps[index] = dailyForecast.temp.min
    })

    useEffect(() => {
        setBarData({
            labels: days,
            datasets: [
                {
                    label: 'Max Temps.',
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
                    label: 'Min temps.',
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
                    text: '',
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
        maintainAspectRatio: true,
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
