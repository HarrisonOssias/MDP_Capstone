import React, { useState } from 'react';
import { Space, Input, InputNumber, Select, Typography, Row, Col, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const axios = require('axios');
const { Option } = Select;
const { Title } = Typography;

function CreateDevice() {
	const [isNode, setIsNode] = useState(false);
	const [pack, setPack] = useState({ id: null, battery: null, isNode: null, lat: null, lng: null, name: null, status: null, network_id: null });
	const handleChange = (val) => {
		setIsNode(val);
	};

	const submitNew = async (id, name, type, lat, lng, netId) => {
		try {
			const resp = await axios.post(process.env.REACT_APP_API_ENDPOINT + '/device/put', pack);
		} catch (err) {
			console.log(err);
		}
	};

	// const handleData = (id, e) => {
	// 	let newData = pack;
	// 	newData[id] = e.target.val;
	// 	setPack(newData);
	// };
	return (
		<>
			<Row align='center'>
				<Col>
					<Title level={3}>Device Details</Title>
					<Space direction='vertical'>
						<Input id='id' placeholder='Unique Identifier' />

						<Input id='name' placeholder='Device Name' />

						<Select id='type' placeholder='Device Type' style={{ width: 120 }}>
							<Option value='true'>Node</Option>
							<Option value='false'>Hub</Option>
						</Select>

						<InputNumber id='lat' placeholder='Latitude' />

						<InputNumber id='lng' placeholder='Latitude' />

						<Input id='netId' placeholder='Network Id' />
					</Space>
				</Col>
			</Row>
			<Row style={{ marginTop: '2vh' }} align='center'>
				<Button shape='round' style={{ backgroundColor: '#364156' }} onClick={() => console.log(pack)}>
					<Typography style={{ color: 'white' }}>Submit</Typography>
				</Button>
			</Row>
		</>
	);
}

export default CreateDevice;
