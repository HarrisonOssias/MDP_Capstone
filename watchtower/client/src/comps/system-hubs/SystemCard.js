import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import HubMenu from './HubMenu';
import mockData from './mock.json';
import Scrollbar from './Scrollbar.css';

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
		<Card className={Scrollbar} style={{ height: '89vh', overflow: 'auto', backgroundColor: '#EDF2F5', marginRight: 30 }}>
			<Row>
				<Col span={18}>{hubDrops}</Col>
			</Row>
		</Card>
	);
}

export default SystemCard;
