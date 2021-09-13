import React, { useState, useEffect, useContext } from 'react';
import { WifiOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import './pulse.css';
import { UserContext } from '../../pages/UserConsole';

const NodePin = (props) => {
	const [pulser, setPulser] = useState('greenBlob');
	const { hubList, setHubList, currentHub, setCurrentHub, openDrawer, setOpenDrawer } = useContext(UserContext);

	useEffect(() => {
		if (props.status == 'Down') setPulser('redBlob');
	}, []);

	const handleClick = (val) => {
		setOpenDrawer(!openDrawer);
		setCurrentHub(val);
		//console.log(val);
	};

	const ttObj = (
		<>
			<p>{props.val}</p>
			<p>lat: {props.lat}</p>
			<p>long: {props.lng}</p>
			<p>battery: {props.battery * 100}%</p>
		</>
	)

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
