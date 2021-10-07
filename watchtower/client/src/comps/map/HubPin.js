import React, { useState, useEffect, useContext } from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import { UserContext } from '../../pages/UserConsole';
import { Tooltip, Col, Row } from 'antd';


const HubPin = (props) => {
	const [styles, setStyles] = useState({ fontSize: '32px', color: '#89D3E7' });
	const { hubList, setHubList, currentHub, setCurrentHub, openDrawer, setOpenDrawer } = useContext(UserContext);

	useEffect(() => {
		if (props.status == 'Down') setStyles({ fontSize: '32px', color: '#EE6864' });
	}, []);

	const handleClick = (val) => {
		setOpenDrawer(!openDrawer);
		setCurrentHub(val);
	};

	const ttObj = (
		<>
			<Row justify="space-around">
				<Col>{props.val}</Col>
				<Col>|</Col>
				<Col>{props.battery * 100}%</Col>
			</Row>
			<Row>
				<Col>Lat: {props.lat}</Col>
				<Col>&nbsp;&nbsp;</Col>
				<Col>Long: {props.lng}</Col>
			</Row>
			{/* map data */}
		</>
	)

	return (
		<div className='pin'>
			<Tooltip title={ttObj}>
				<CloudUploadOutlined style={styles} onClick={() => handleClick(props.val)} />
			</Tooltip>
		</div>
	);
};

export default HubPin;
