import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NodeData from './NodeData.json';

const data = NodeData.hub0;

const NodeGraph = (props) => {
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<LineChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line type='monotone' dataKey={props.unit} stroke='#8884d8' activeDot={{ r: 8 }} />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default NodeGraph;