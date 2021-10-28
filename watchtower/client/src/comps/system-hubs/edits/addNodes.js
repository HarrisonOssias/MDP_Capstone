import React, { useState, useEffect } from 'react';
import { TreeSelect, Button, Row, Col } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const axios = require('axios');

function AddNodes({ net }) {
	const [data, setData] = useState([]);
	const [tree, setTree] = useState([]);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_ENDPOINT + '/network/get_devices')
			.then(function (response) {
				// handle success
				console.log(response.data);
				setData(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, []);

	const ogNodes = net.devices
		.filter((node) => {
			if (!node.isNode) {
				return false;
			} else {
				return true;
			}
		})
		.map((node) => {
			return node.Id;
		});

	//console.log(ogNodes);
	let keyVal;
	const treeData =
		data.length === 0
			? []
			: data.networks.length === 0
			? []
			: data.networks.map((net, index) => {
					keyVal = index;
					return {
						title: net.name,
						value: net.Id,
						key: keyVal,
						checkable: false,
						disableCheckbox: true,
						children: net.nodes.map((node, index) => {
							return {
								title: node.name,
								value: node.Id,
								key: index + node.Id,
								checkable: true,
							};
						}),
					};
			  });
	const uns =
		data.length === 0
			? []
			: data.unallocated.length === 0
			? []
			: data.unallocated.map((node, index) => {
					return {
						title: node.name,
						value: node.Id,
						key: index + node.Id,
						checkable: true,
					};
			  });
	treeData.push({ title: 'Unallocated', value: null, key: keyVal + 1, checkable: false, disableCheckbox: true, children: uns });

	const [vals, setVals] = useState(ogNodes);

	const handleChange = (value) => {
		setVals(value);
	};

	const tProps = {
		treeData,
		value: vals,
		onChange: handleChange,
		treeCheckable: true,
		placeholder: 'Please select',
		treeCheckStrictly: true,
		virtual: false,
		style: {
			width: '100%',
		},
	};

	const submit = () => {
		let alo = vals.filter((v) => {
			if (!ogNodes.includes(v.value)) {
				return v;
			}
		});

		let unalo = ogNodes.filter((v) => {
			if (vals.filter((i) => i.value === v).length === 0) {
				return v;
			}
		});

		const alocate = alo.map((node) => {
			return node.value;
		});

		axios
			.post(process.env.REACT_APP_API_ENDPOINT + '/network/update_nodes', {
				id: net.Id,
				allocate: alocate,
				unallocate: unalo,
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	return (
		<>
			<Row>
				<Col xs={6}>
					<p>Add Or Remove Nodes:</p>
				</Col>
				<Col xs={15}>
					<TreeSelect {...tProps} />
				</Col>
				<Col xs={1} offset={1}>
					<Button type='primary' icon={<CheckOutlined />} size='mid' onClick={() => submit()} />
				</Col>
			</Row>
		</>
	);
}

export default AddNodes;
