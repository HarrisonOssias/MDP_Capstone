import React, { useState } from 'react';
import { Form, Button, Input, Divider } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

function CreateNetwork() {
	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Form name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
			<Form.Item label='name' name='name' rules={[{ required: true, message: 'Please input the network name!' }]}>
				<Input />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}

export default CreateNetwork;
