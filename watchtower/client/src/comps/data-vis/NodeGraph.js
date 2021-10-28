import React, { useState, useContext, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserContext } from '../../pages/UserConsole';

//axios library to handle api reqs
const axios = require('axios');

const NodeGraph = (props) => {
	const { hubList, setHubList, currentHub, setCurrentHub } = useContext(UserContext);
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_ENDPOINT + '/data/get/' + currentHub.toString())
			.then(function (response) {
				// handle success
				console.log(response.data);
				setData(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, [currentHub]);

	const graphData = {
		[currentHub]: data.map((data, index) => {
			data.data.name = index;
			return data.data;
		}),
	};

	console.log(graphData);

	return (
		<ResponsiveContainer width='100%' height='100%'>
			<LineChart
				width={500}
				height={300}
				data={graphData[currentHub]}
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
