import React, { useState, useRef, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import HubMenu from './NetworkMenu';
import Scrollbar from './Scrollbar.css';

//axios library to handle api reqs
const axios = require('axios');

function SystemCard(props) {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_ENDPOINT + '/get_all')
			.then(function (response) {
				// handle success
				console.log(response.data);
				setData(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, []);
	console.log(data);
	const hubLength = data.length;
	const hubDrops = data.map((hub, index) => {
		return (
			<>
				<Row>
					<HubMenu hub={hub} />
				</Row>
				{hubLength === index + 1 ? null : <div style={{ marginTop: '16px' }} />}
			</>
		);
	});
	return (
		<Card className={Scrollbar} style={{ height: '89vh', overflow: 'auto', backgroundColor: '#EDF2F5', marginRight: 30 }}>
			<Row>
				<Col span={18}>{hubDrops}</Col>
			</Row>
		</Card>
	);
}

export default SystemCard;
