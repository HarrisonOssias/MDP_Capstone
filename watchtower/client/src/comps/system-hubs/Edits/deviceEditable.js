import React, { useState } from 'react';
import { Row, Col, Input } from 'antd';

function DeviceEditable(props) {
	return (
		<Row>
			<Col span={4}>
				Name:
				<Input placeholder={props.name} />
			</Col>
			<Col span={4}></Col>
			<Col span={4}></Col>
			<Col span={4}></Col>
		</Row>
	);
}

export default HubMenu;
