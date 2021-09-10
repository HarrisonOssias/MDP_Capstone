import React, { useState, useEffect, useContext } from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import { UserContext } from '../../pages/UserConsole';

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

	return (
		<div className='pin'>
			<CloudUploadOutlined style={styles} onClick={() => handleClick(props.val)} />
		</div>
	);
};

export default HubPin;
