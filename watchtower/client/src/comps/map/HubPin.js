import React, { useState, useEffect } from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';

const HubPin = (props) => {
	const [styles, setStyles] = useState({ fontSize: '32px', color: '#89D3E7' });
	useEffect(() => {
		if (props.status == 'Down') setStyles({ fontSize: '32px', color: '#EE6864' });
	}, []);
	return (
		<div className='pin'>
			<CloudUploadOutlined style={styles} />
		</div>
	);
};

export default HubPin;
