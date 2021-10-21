import React, { useState } from 'react';
import { TreeSelect } from 'antd';

const data = [
	{
		Id: '0',
		name: 'Unallocated',
		nodes: [
			{
				Id: '1.1',
				name: 'node32',
			},
			{
				Id: '1.2',
				name: 'node64',
			},
			{
				Id: '1.3',
				name: 'node128',
			},
		],
	},
	{
		Id: '1',
		name: 'network1',
		nodes: [
			{
				Id: '1.1',
				name: 'node1',
			},
			{
				Id: '1.2',
				name: 'node2',
			},
			{
				Id: '1.3',
				name: 'node3',
			},
		],
	},
	{
		Id: '2',
		name: 'network2',
		nodes: [
			{
				Id: '2.1',
				name: 'node4',
			},
			{
				Id: '2.2',
				name: 'node5',
			},
			{
				Id: '2.3',
				name: 'node6',
			},
		],
	},
];

const treeData = data.map((net, index) => {
	let keyVal = index;
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

console.log(treeData);

function AddNodes() {
	const [vals, setVals] = useState([]);

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
	return <TreeSelect {...tProps} />;
}

export default AddNodes;
