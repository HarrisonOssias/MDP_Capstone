import React, { useState, forwardRef } from 'react';

import MaterialTable from 'material-table';
import { EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
const axios = require('axios');

const EditInfo = ({ hub }) => {
	const [change, setChange] = useState(true);
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

	return (
		<div style={{ maxWidth: '100%' }}>
			<MaterialTable
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
					Edit: forwardRef((props, ref) => <EditOutlined {...props} ref={ref} />),
					Clear: forwardRef((props, ref) => <CloseCircleOutlined {...props} ref={ref} />),
					Check: forwardRef((props, ref) => <CheckCircleOutlined {...props} ref={ref} />),
				}}
				columns={columns}
				editable={{
					onRowUpdate: async (newData, oldData) => {
						const dataUpdate = data;
						const index = oldData.tableData.id;
						dataUpdate[index] = newData;
						console.log(data);
						try {
							const resp = await axios
								.post(process.env.REACT_APP_API_ENDPOINT + '/device/update', {
									id: dataUpdate[index].id,
									name: dataUpdate[index].name,
									lat: dataUpdate[index].lat,
									lng: dataUpdate[index].long,
								})
								.then(function (response) {
									console.log(response);

									for (let i = 0; i < devices.length(); i++) {
										if (devices[i].id == dataUpdate[index].id) {
											devices[i] = {
												id: dataUpdate[index].id,
												name: dataUpdate[index].name,
												lat: dataUpdate[index].lat,
												lng: dataUpdate[index].long,
											};
										}
									}
								})
								.catch(function (error) {
									console.log(error);
								});
						} catch (err) {
							console.log(err);
						}
						setData(dataUpdate);
						// new Promise((resolve, reject) => {
						// 	setTimeout(() => {
						// 		// const dataUpdate = [...data];
						// 		// const index = oldData.tableData.id;
						// 		// dataUpdate[index] = newData;
						// 		// setData([...dataUpdate]);
						// 		// console.log(data);
						// 		// axios
						// 		// 	.post(process.env.REACT_APP_API_ENDPOINT + '/device/update', {
						// 		// 		id: dataUpdate[index].id,
						// 		// 		name: dataUpdate[index].name,
						// 		// 		lat: dataUpdate[index].lat,
						// 		// 		lng: dataUpdate[index].long,
						// 		// 	})
						// 		// 	.then(function (response) {
						// 		// 		console.log(response);
						// 		// 		resolve();
						// 		// 	})
						// 		// 	.catch(function (error) {
						// 		// 		console.log(error);
						// 		// 		resolve();
						// 		// 	});
						// 	}, 600);
						// 	console.log(2);
						//});
						console.log(3);
					},
				}}
				// 	onRowDelete: (oldData) =>
				// 		new Promise((resolve, reject) => {
				// 			setTimeout(() => {
				// 				const dataDelete = [...data];
				// 				const index = oldData.tableData.id;
				// 				dataDelete.splice(index, 1);
				// 				setData([...dataDelete]);

				// 				resolve();
				// 			}, 1000);
				// 		}),

				data={devices}
				title={hub.name}
			/>
		</div>
	);
};

export default EditInfo;
