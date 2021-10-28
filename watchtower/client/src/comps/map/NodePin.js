import React, { useState, useEffect, useContext } from 'react';
import { WifiOutlined } from '@ant-design/icons';
import { Tooltip, Col, Row } from 'antd';
import './pulse.css';
import { UserContext } from '../../pages/UserConsole';

const NodePin = (props) => {
	const [pulser, setPulser] = useState('greenBlob');
	const { hubList, setHubList, currentHub, setCurrentHub, openDrawer, setOpenDrawer } = useContext(UserContext);

	useEffect(() => {
		if (props.status === false) setPulser('redBlob');
	}, []);

	const handleClick = (val) => {
		setOpenDrawer(!openDrawer);
		setCurrentHub(val);
		//console.log(val);
	};

	const ttObj = (
		<>
			<Row justify='space-around'>
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
	);

	return (
		<div className='pin'>
			<Tooltip title={ttObj}>
				{/* <WifiOutlined style={{ fontSize: '32px', color: '#fdbe93' }} /> */}
				<div className={pulser} onClick={() => handleClick(props.val)} />
			</Tooltip>
		</div>
	);
};

export default NodePin;
