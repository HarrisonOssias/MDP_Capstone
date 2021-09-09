import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import HubMenu from './HubMenu';
import mockData from './mock.json';



function SystemCard(props) {
	const data = mockData;
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
		<Card style={{ height: '93vh', maxHeight: '93vh', overflow: 'auto' }}>
			<Row>
				<Col span={18}>{hubDrops}</Col>
			</Row>
		</Card>
	);
}

export default SystemCard;
