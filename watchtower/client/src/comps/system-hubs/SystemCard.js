import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import HubMenu from './HubMenu';
import mockData from './mock.json';

function SystemCard(props) {
	const data = mockData;
	const hubLength = data.length;

	const hubDrops = data.map((hub, index) => {
		console.log(hub);
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
		<Card style={{ height: '88vh', overflow: 'auto', backgroundColor: '#EDF2F5' }}>
			<Row>
				<Col span={18}>{hubDrops}</Col>
			</Row>
		</Card>
	);
}

export default SystemCard;
