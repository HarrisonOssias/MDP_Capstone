import React, { useState } from 'react';
import { Drawer, Button, Space, Divider } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

function NavDrawer() {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const drawerContent = (
		<>
			<Space direction='vertical'>
				<Button style={{ width: '200px' }}>Profile Settings</Button>

				<Divider />
				<Button style={{ width: '200px' }}>Create Network</Button>

				<Button style={{ width: '200px' }}>Create Device</Button>
			</Space>
		</>
	);

	const drawerFooter = (
		<Button type='primary' style={{ width: '220px' }}>
			settings
		</Button>
	);

	return (
		<>
			<MenuOutlined style={{ color: '#bfd0ef', fontSize: '32px', padding: '0px 16px 0px 16px' }} onClick={showDrawer} />

			<Drawer title='Menu' placement='right' onClose={onClose} visible={visible} footer={drawerFooter}>
				{drawerContent}
			</Drawer>
		</>
	);
}

export default NavDrawer;
