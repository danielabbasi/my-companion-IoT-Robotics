import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
    { name: 'Mon', Visits: 2200, Orders: 3400 },
    { name: 'Tue', Visits: 1280, Orders: 2398 },
    { name: 'Wed', Visits: 5000, Orders: 4300 },
    { name: 'Thu', Visits: 4780, Orders: 2908 },
    { name: 'Fri', Visits: 5890, Orders: 4800 },
    { name: 'Sat', Visits: 4390, Orders: 3800 },
    { name: 'Sun', Visits: 4490, Orders: 4300 },
];

const data2 = [
    { name: 'Mon', Value: 21.0 },
    { name: 'Tue', Value: 21.6 },
    { name: 'Wed', Value: 22.4 },
    { name: 'Thu', Value: 24.2 },
    { name: 'Fri', Value: 25.6 },
    { name: 'Sat', Value: 23.8 },
    { name: 'Sun', Value: 21.9 },
];

function SimpleLineChart() {
    return (
        // 99% per https://github.com/recharts/recharts/issues/172
        <ResponsiveContainer width="99%" height={200}>
            <LineChart data={data2}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Value" stroke="#82ca9d" />
                {/*<Line type="monotone" dataKey="Orders" stroke="#8884d8" activeDot={{ r: 8 }} />*/}
            </LineChart>
        </ResponsiveContainer>
    );
}

export default SimpleLineChart;