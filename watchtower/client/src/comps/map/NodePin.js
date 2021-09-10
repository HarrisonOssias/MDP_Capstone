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
		console.log(props.status);
		if (props.status == 'Down') setPulser('redBlob');
	}, []);

	return (
		<div className='pin'>
			<Tooltip title='node'>
				{/* <WifiOutlined style={{ fontSize: '32px', color: '#fdbe93' }} /> */}
				<div className={pulser} onClick={() => setOpenDrawer(!openDrawer)} />
			</Tooltip>
		</div>
	);
};

export default NodePin;
