import React, { useState, useEffect, useContext } from 'react';
import { WifiOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Circle } from 'react-shapes';
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
		console.log(val);
	};

	return (
		<div className='pin'>
			<Tooltip title='node'>
				{/* <WifiOutlined style={{ fontSize: '32px', color: '#fdbe93' }} /> */}
				<div className={pulser} onClick={() => handleClick(props.val)} />
			</Tooltip>
		</div>
	);
};

export default NodePin;
