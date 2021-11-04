import React, { useState, forwardRef, useEffect, useContext } from 'react';

import MaterialTable from 'material-table';
import { Row, Col, Divider, Button, Typography } from 'antd';
import { EditFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import AddNodes from './addNodes.js';
import { HubContext } from '../SystemCard.js';
const axios = require('axios');

const EditInfo = ({ hub }) => {
	const [change, setChange] = useState(hub);

	const devices = hub.devices.map((device) => {
		return {
			id: device.Id,
			name: device.name,
			long: device.lng,
			lat: device.lat,
			status: device.status ? 'Ok' : 'Down',
			type: device.isNode === true ? 'node' : 'hub',
		};
	});
	const [data, setData] = useState(devices);

	const handleChange = (data) => {
		data.isNode = true;
		let newNet = {};
		const devices = change.devices.filter((dev, index) => {
			if (dev.id === data.id) {
				return data;
			} else {
				return dev;
			}
		});
		newNet.Id = hub.Id;
		newNet.name = hub.name;
		newNet.devices = devices;
		console.log(newNet);
		setChange(newNet);
	};

	const columns = [
		{ title: 'Device ', field: 'name', align: 'center', headerStyle: { margin: 'auto', width: '50%' }, cellStyle: { paddingLeft: '30px' } },
		{ title: 'Longitude', field: 'long', type: 'numeric', align: 'center', headerStyle: { margin: 'auto', width: '50%' } },
		{ title: 'Latidude', field: 'lat', type: 'numeric', align: 'center', headerStyle: { margin: 'auto', width: '50%' } },
		{
			title: 'Status',
			field: 'status',
			cellStyle: (e, rowData) => {
				if (rowData.status === 'Ok') {
					return { color: 'green', fontSize: '15px' };
				} else {
					return { color: 'red' };
				}
			},
			align: 'center',
			headerStyle: { margin: 'auto', width: '50%' },
		},
		{
			title: 'Type',
			field: 'type',
			align: 'center',
			headerStyle: { margin: 'auto', width: '50%' },
		},
	];

	return (
		<div>
			<Divider orientation='left' plain>
				Add Nodes to Network{' '}
			</Divider>
			<Row style={{ marginBottom: 20 }} align='center'>
				<Col xs={18}>
					<AddNodes net={change} />
				</Col>
			</Row>
			<Divider orientation='left' plain>
				Edit Devices in Network{' '}
			</Divider>

			<Row align='center'>
				<div style={{ maxWidth: '100%' }} value={change}>
					<Button style={{ marginBottom: 20, backgroundColor: '#364156', opacity: 0.9 }} block>
						<Typography style={{ color: 'white' }} level={4}>
							Reload
						</Typography>
					</Button>
					<MaterialTable
						data={data}
						title={hub.name}
						options={{
							rowStyle: {
								fontSize: 10,
							},
							search: false,
							paging: false,
							add: false,
							headerStyle: { textAlign: 'right' },
						}}
						icons={{
							Edit: forwardRef((props, ref) => <EditFilled {...props} style={{ color: '#364156' }} ref={ref} />),
							Clear: forwardRef((props, ref) => <CloseCircleFilled {...props} style={{ color: '#364156' }} ref={ref} onClick={() => setChange(change + 1)} />),
							Check: forwardRef((props, ref) => <CheckCircleFilled {...props} style={{ color: '#364156' }} ref={ref} />),
						}}
						columns={columns}
						editable={{
							onRowUpdate: async (newData, oldData) => {
								const dataUpdate = data;
								const index = oldData.tableData.id;
								dataUpdate[index] = newData;
								setData([...dataUpdate]);

								try {
									const resp = await axios.post(process.env.REACT_APP_API_ENDPOINT + '/device/update', {
										id: newData.id,
										name: newData.name,
										lat: newData.lat,
										lng: newData.long,
									});
									handleChange(newData);
								} catch (err) {
									console.log(err);
								}
							},
						}}
					/>
				</div>
			</Row>
		</div>
	);
};

export default EditInfo;
